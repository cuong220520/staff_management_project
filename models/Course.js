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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff'
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Course', courseSchema)