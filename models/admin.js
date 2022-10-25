const mongoose = require("mongoose")
const Schema = mongoose.Schema

const admin = new Schema({
    user_Name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    contact_Num: {
        type: Number,
        required:true
    }
})

module.exports = Admin = mongoose.model('admin', admin)