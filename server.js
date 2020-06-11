if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

app.use(express.json({ extended: false }))
app.use(fileUpload())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/api/staff', require('./route/staff'))
app.use('/api/course', require('./route/course'))
app.use('/api/auth', require('./route/auth'))
app.use('/api/topic', require('./route/topic'))
app.use('/api/category', require('./route/category'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server start on PORT: ${PORT}`)
})