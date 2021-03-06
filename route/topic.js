const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Topic = require('../models/Topic')
const Course = require('../models/Course')

const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const topics = await Topic.find()
            .populate('trainer', ['name'])
            .populate('courses', ['name', 'code'])

        if (topics.length === 0) {
            return res.status(404).json({ msg: 'There is no topic here' })
        }

        res.json(topics)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.post(
    '/',
    [
        auth,
        check('name', 'Name is required').not().isEmpty(),
        check('code', 'Code is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, code, description } = req.body

        try {
            const topic = new Topic({
                name: name.toUpperCase(),
                code: code,
                description: description,
            })

            await topic.save()

            res.json(topic)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.get('/:id', auth, async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('courses', [
            'name',
            'code',
        ])

        res.json(topic)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no topic here' })
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
        check('name', 'Name is required').not().isEmpty(),
        check('code', 'Code is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, code, courseCode, description } = req.body

        const topicInfo = {}

        if (name) topicInfo.name = name.toUpperCase()
        if (code) topicInfo.code = code
        if (description) topicInfo.description = description

        try {
            let topic = await Topic.findById(req.params.id)

            if (courseCode) {
                const course = await Course.findOne({ code: courseCode })
                const already = topic.courses.filter(
                    (item) => item._id.toString() === course.id
                )

                if (already.length !== 0) {
                    return res.status(400).json({
                        msg: 'This topic is already in this course',
                    })
                } else {
                    topic = await Topic.findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: topicInfo },
                        { new: true }
                    )

                    topic.courses.unshift({
                        _id: course._id,
                    })

                    await topic.save()

                    res.json(topic)
                }
            } else {
                topic = await Topic.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: topicInfo },
                    { new: true }
                )

                res.json(topic)
            }
        } catch (err) {
            if (err.kind === 'ObjectId') {
                res.status(404).json({ msg: 'There is no topic here' })
            } else {
                console.error(err.message)
                res.status(500).json({ msg: 'Server error' })
            }
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)

        await topic.remove()

        res.json({ msg: 'Topic removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no topic here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

router.post('/search', auth, async (req, res) => {
    const { input } = req.body

    try {
        const topics = await Topic.find({
            $or: [
                { name: new RegExp(input, 'i') },
                { code: new RegExp(input, 'i') },
            ],
        })
            .populate('trainer', ['name'])
            .populate('courses', ['name', 'code'])

        if (topics.length === 0) {
            return res.status(404).json({ msg: 'There are no topic' })
        }

        res.json(topics)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
