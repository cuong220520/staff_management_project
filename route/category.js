const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Category = require('../models/Category')

const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const category = await Category.find()

        if (category.length === 0) {
            return res.status(404).json({ msg: 'There is no category here' })
        }

        res.json(category)
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
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, description } = req.body

        try {
            const category = new Category({
                name: name,
                description: description
            })

            await category.save()

            res.json(category)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

router.get('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        res.json(category)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no category here' })
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
        check('name', 'Name is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, description } = req.body

        const categoryInfo = {}

        if (name) categoryInfo.name = name
        if (description) categoryInfo.description = description

        try {
            let category = await Category.findById(req.params.id)

            if (category) {
                category = await Category.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: categoryInfo },
                    { new: true }
                )
            }

            res.json(category)
        } catch (err) {
            if (err.kind === 'ObjectId') {
                res.status(404).json({ msg: 'There is no category here' })
            } else {
                console.error(err.message)
                res.status(500).json({ msg: 'Server error' })
            }
        }
    }
)

router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        await category.remove()

        res.json({ msg: 'Category removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'There is no category here' })
        } else {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
})

module.exports = router