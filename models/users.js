const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    user_Name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_Number: {
        type: Number,
        required: true
    }
})

module.exports = User = mongoose.model('user', user)