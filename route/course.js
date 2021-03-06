const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Staff = require('../models/Staff')
const Course = require('../models/Course')
const Category = require('../models/Category')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const courses = await Course.find().populate('category', ['name'])

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
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, code } = req.body

        try {
            const course = new Course({
                name: name.toUpperCase(),
                code: code,
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
            .populate('category', ['name'])
            .populate('staffs', ['name', 'email', 'gender', 'dateOfBirth'])

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
            check('categoryName', 'Category is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, code, categoryName } = req.body

        try {
            const category = await Category.findOne({ name: categoryName })

            const courseInfo = {}

            if (name) courseInfo.name = name.toUpperCase()
            if (code) courseInfo.code = code
            if (category) courseInfo.category = category._id

            let course = await Course.findById(req.params.id)

            if (course) {
                course = await Course.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: courseInfo },
                    { new: true }
                )

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
                return res
                    .status(400)
                    .json({ msg: 'This course still has staffs' })
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

router.put(
    '/:id/category',
    [auth, check('categoryId', 'Course is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { categoryId } = req.body

        try {
            let course = await Course.findById(req.params.id)
            const category = await Category.findById(categoryId)

            if (course) {
                course = await Course.findOneAndUpdate(
                    { _id: req.params.id },
                    { category: category._id },
                    { new: true }
                )
            }

            res.json(course)
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .json({ msg: 'There is no course/category here' })
            } else {
                console.error(err.message)
                res.status(500).json({ msg: 'Server error' })
            }
        }
    }
)

router.post('/search', auth, async (req, res) => {
    const { input } = req.body

    try {
        const courses = await Course.find({
            $or: [
                { name: new RegExp(input, 'i') },
                { code: new RegExp(input, 'i') },
            ],
        })

        if (courses.length === 0) {
            return res.status(404).json({ msg: 'There are no course' })
        }

        res.json(courses)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
