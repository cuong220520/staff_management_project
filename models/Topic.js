const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
})

module.exports = mongoose.model('Topic', topicSchema)
