const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const Staff = require('../models/Staff')
const Course = require('../models/Course')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const staffs = await Staff.find().select('-password')

        if (staffs.length === 0) {
            return res.status(404).json({ msg: 'There is no staff here' })
        }

        res.json(staffs)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.post(
    '/profile',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('email', 'Invalid email').isEmail(),
            check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
            check('gender', 'Gender is required').not().isEmpty(),
            check('dateOfBirth', 'Birth date is required').not().isEmpty(),
            check('position', 'Position is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            email,
            password,
            gender,
            dateOfBirth,
            position,
            ieltsDegree
        } = req.body

        const image = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })

        try {
            const staff = new Staff({
                name: name,
                email,
                password,
                gender: gender,
                dateOfBirth: dateOfBirth,
                position: position.toLowerCase(),
                ieltsDegree: ieltsDegree,
                image: image,
            })

            const salt = await bcrypt.genSalt(10)

            staff.password = await bcrypt.hash(password, salt)

            await staff.save()

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.get('/:position', auth, async (req, res) => {
    try {
        const staffsByPosition = await Staff.find({
            position: req.params.position,
        })

        if (staffsByPosition.length === 0) {
            return res
                .status(404)
                .json({ msg: 'There is no staff for this position' })
        }

        res.json(staffsByPosition)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.get('/profile/:id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)

        if (staff) {
            res.json(staff)
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no staff here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.put(
    '/profile/:id',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('gender', 'Gender is required').not().isEmpty(),
            check('dateOfBirth', 'Birth date is required').not().isEmpty(),
            check('position', 'Position is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, gender, dateOfBirth, position, image, ieltsDegree } = req.body

        const staffProfile = {}

        try {
            let staff = await Staff.findById(req.params.id)

            if (name) staffProfile.name = name
            if (gender) staffProfile.gender = gender
            if (dateOfBirth) staffProfile.dateOfBirth = dateOfBirth
            if (position) staffProfile.position = position
            if (ieltsDegree) staffProfile.ieltsDegree = ieltsDegree
            if (image) {
                staffProfile.image = image
            } else {
                staffProfile.image = gravatar.url(staff.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm',
                })
            }

            if (staff) {
                staff = await Staff.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: staffProfile },
                    { new: true }
                )

                staff.courses.map(async (item) => {
                    const course = await Course.findById(item.course)

                    if (course.staffs.length > 0) {
                        course.staffs = course.staffs.filter(
                            (staffInCourse) =>
                                staffInCourse.staff.toString() !== req.params.id
                        )
                    }

                    course.staffs.unshift({
                        staff: staff._id,
                        name: staffProfile.name,
                        dateOfBirth: staffProfile.dateOfBirth,
                        image: staffProfile.image,
                    })

                    await course.save()
                })

                res.json(staff)
            }
        } catch (err) {
            if (err.kind === 'ObjectId') {
                res.status(404).json({ msg: 'There is no staff here' })
            } else {
                console.error(err.message)
                res.status(500).json({ msg: 'Server error' })
            }
        }
    }
)

router.delete('/profile/:id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)
        staff.courses.map(async (item) => {
            const course = await Course.findById(item.course)

            if (!course) {
                return res
                    .status(404)
                    .json({ msg: 'This staff has not joined any course yet' })
            }

            if (course.staffs.length > 0) {
                course.staffs = course.staffs.filter(
                    (staffInCourse) =>
                        staffInCourse.staff.toString() !== req.params.id
                )

                await course.save()
            }
        })

        if (staff) {
            await staff.remove()
            res.json({ msg: 'Staff remove successfully' })
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no staff here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.put('/profile/:id/course', auth, async (req, res) => {
    const { code } = req.body

    try {
        let staff = await Staff.findById(req.params.id)

        const course = await Course.findOne({ code: code })

        if (!course) {
            return res
                .status(404)
                .json({ msg: 'There is no course for this code' })
        }

        const already = staff.courses.filter(
            (item) => item.course.toString() === course.id
        )

        if (already.length !== 0) {
            return res
                .status(400)
                .json({ msg: 'This staff is already in this course' })
        } else {
            staff.courses.unshift({
                course: course._id,
                name: course.name,
                code: course.code,
            })

            course.staffs.unshift({
                staff: staff._id,
                name: staff.name,
                dateOfBirth: staff.dateOfBirth,
                image: staff.image,
            })

            await staff.save()
            await course.save()

            res.json(staff.courses)
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no staff here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.delete('/profile/:id/course/:courseId', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)
        const course = await Course.findById(req.params.courseId)

        const removeIndexForStaff = staff.courses
            .map((item) => item.id)
            .indexOf(req.params.courseId)
        const removeIndexForCourse = course.staffs
            .map((item) => item.staff)
            .indexOf(req.params.id)

        console.log(removeIndexForStaff + 'staff')
        console.log(removeIndexForCourse + 'course')

        staff.courses.splice(removeIndexForStaff, 1)
        course.staffs.splice(removeIndexForCourse, 1)

        await staff.save()
        await course.save()

        res.json(staff)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no staff here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, company, location, from, to, description } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            description,
        }

        try {
            const staff = await Staff.findById(req.staff.id)

            console.log(staff)

            staff.experience.unshift(newExp)

            await staff.save()

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.user.id)

        // get remove index
        const removeIndex = staff.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id)

        staff.experience.splice(removeIndex, 1)

        await staff.save()

        res.json(staff)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            current,
            description,
        } = req.body

        const newEdu = {
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            current,
            description,
        }

        try {
            const staff = await Staff.findById(req.user.id)

            staff.education.unshift(newEdu)

            await staff.save()

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.user.id)

        // get remove index
        const removeIndex = staff.education
            .map((item) => item.id)
            .indexOf(req.params.edu_id)

        staff.education.splice(removeIndex, 1)

        await staff.save()

        res.json(staff)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

module.exports = router
