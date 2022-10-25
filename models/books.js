const mongoose = require("mongoose")
const Schema = mongoose.Schema

const book = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    availability_Status: {
        type: String,
        required: true
    }
})

module.exports = Book = mongoose.model('book', book)