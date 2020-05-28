const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    staffs: [
        {
            staff: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Staff'
            },
            name: {
                type: String,
                required: true
            },
            dateOfBirth: {
                type: String,
                required: true
            },
            image: {
                type: String
            }
        }
    ]
})

module.exports = mongoose.model('Course', courseSchema)