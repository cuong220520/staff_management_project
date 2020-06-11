const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const Staff = require('../models/Staff')
const Course = require('../models/Course')
const Topic = require('../models/Topic')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const staffs = await Staff.find()
            .select('-password')
            .populate({
                path: 'topics',
                select: ['name', 'code'],
                populate: {
                    path: 'courses',
                    select: ['name', 'code'],
                    model: 'Course',
                },
            })

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
            check(
                'password',
                'Password must have at least 6 characters'
            ).isLength({ min: 6 }),
            check('gender', 'Gender is required').not().isEmpty(),
            check('dateOfBirth', 'Birth date is required').not().isEmpty(),
            check('position', 'Position is required').not().isEmpty(),
        ],
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
            ieltsDegree,
        } = req.body

        let staff = await Staff.findOne({ email })

        // see if user exists
        if (staff) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Staff already exists' }] })
        }

        const image = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })

        let date = new Date(dateOfBirth)

        date = date.toISOString().split('T')[0]

        try {
            staff = new Staff({
                name: name,
                email,
                password,
                gender: gender,
                dateOfBirth: date,
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
            .select('-password')
            .populate({
                path: 'topics',
                select: ['name', 'code'],
                populate: {
                    path: 'courses',
                    select: ['name', 'code'],
                    model: 'Course',
                },
            })
            .populate('courses', ['name', 'code'])

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
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            gender,
            dateOfBirth,
            position,
            image,
            ieltsDegree,
        } = req.body

        let date = new Date(dateOfBirth)

        date = date.toISOString().split('T')[0]

        const staffProfile = {}

        try {
            let staff = await Staff.findById(req.params.id)

            if (name) staffProfile.name = name
            if (gender) staffProfile.gender = gender
            if (date) staffProfile.date = date
            if (position) staffProfile.position = position
            if (dateOfBirth) staffProfile.dateOfBirth = date
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
        if (staff.courses.length > 0) {
            staff.courses.map(async (item) => {
                const course = await Course.findById(item._id)

                if (course.staffs.length > 0) {
                    course.staffs = course.staffs.filter(
                        (staffInCourse) =>
                            staffInCourse._id.toString() !== req.params.id
                    )

                    await course.save()
                }
            })
        }

        if (staff) {
            await staff.remove()
            res.json({ msg: 'Staff removed' })
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
                _id: course._id,
            })

            course.staffs.unshift({
                _id: staff._id,
            })

            await staff.save()
            await course.save()

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

router.put('/profile/:id/topic', auth, async (req, res) => {
    const { code } = req.body

    try {
        let staff = await Staff.findById(req.params.id)

        const topic = await Topic.findOne({ code: code })

        if (!topic) {
            return res
                .status(404)
                .json({ msg: 'There is no topic for this code' })
        }

        const already = staff.topics.filter(
            (item) => item._id.toString() === topic.id
        )

        if (already.length !== 0) {
            return res
                .status(400)
                .json({ msg: 'This staff is already in this topic' })
        } else {
            staff.topics.unshift({
                _id: topic._id,
            })

            await staff.save()

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

router.delete('/profile/:id/topic/:topic_id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)

        // get remove index
        const removeIndex = staff.topics
            .map((topic) => topic.id)
            .indexOf(req.params.topic_id)

        staff.topics.splice(removeIndex, 1)

        await staff.save()

        res.json(staff)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
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
    '/experience/:id',
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
            const staff = await Staff.findById(req.params.id)

            staff.experience.unshift(newExp)

            await staff.save()

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.delete('/experience/:id/:exp_id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)

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
    '/education/:id',
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
            const staff = await Staff.findById(req.params.id)

            staff.education.unshift(newEdu)

            await staff.save()

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.delete('/education/:id/:edu_id', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)

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

router.put(
    '/profile/:id/change-credentials',
    auth,
    [
        check('email', 'Email is required').not().isEmpty(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let { email, password } = req.body
        try {
            let staff = await Staff.findById(req.params.id)

            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)

            staff = await Staff.findOneAndUpdate(
                { _id: staff.id },
                { email: email },
                { password: password }
            )

            res.json(staff)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

module.exports = router
