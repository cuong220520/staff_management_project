const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Staff = require('../models/Staff')
const Course = require('../models/Course')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const courses = await Course.find()

        if (courses.length === 0) {
            return res.status(404).json({ msg: 'There is no course here' })
        }

        res.json(courses)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('code', 'Code is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            code
        } = req.body

        try {
            const course = new Course({
                name: name.toUpperCase(),
                code: code
            })

            await course.save()

            res.json(course)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.get('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (course) {
            res.json(course)
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'There is no course here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.put(
    '/:id',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('code', 'Code is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            name,
            code
        } = req.body

        const courseInfo = {}

        if (name) courseInfo.name = name.toUpperCase()
        if (code) courseInfo.code = code

        try {
            let course = await Course.findById(req.params.id)

            if (course) {
                course = await Course.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: courseInfo },
                    { new: true }
                )

                course.staffs.map(async item => {
                    const staff = await Staff.findById(item.staff)

                    if (!staff) {
                        return res.status(404).json({ msg: 'This course have no staff' })
                    }

                    if (staff.courses.length > 0) {
                        staff.courses = staff.courses.filter(courseOfStaff => courseOfStaff.course.toString() !== req.params.id)
                    }

                    staff.courses.unshift({
                        course: course._id,
                        name: courseInfo.name,
                        code: courseInfo.code
                    })

                    await staff.save()
                })

                res.json(course)
            }
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'There is no course here' })
            } else {
                console.error(err.message)
                res.status(500).json({ msg: 'Server error' })
            }
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (course) {
            if (course.staffs.length > 0) {
                return res.status(400).json({ msg: 'This course still has staffs' })
            }

            await course.remove()

            res.json({ msg: 'Course remove successfully' })
        }
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'There is no course here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

module.exports = router
