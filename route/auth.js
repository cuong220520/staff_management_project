const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const Staff = require('../models/Staff')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const staff = await Staff.findById(req.staff.id).select('-password')

        res.json(staff)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

router.post(
    '/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            let staff = await Staff.findOne({ email: email })

            if (!staff) {
                return res.status(400).json({ msg: 'Invalid credentials' })
            }

            const isMatch = await bcrypt.compare(password, staff.password)

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' })
            }

            const payload = {
                staff: {
                    id: staff.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    }
)

module.exports = router