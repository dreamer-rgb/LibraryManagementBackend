const mongoose = require("mongoose")
const Schema = mongoose.Schema

const transaction = new Schema({
    user_Details: {
        user_Name:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required:true
        },
        contact_Number:{
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    book_Details: {
        name:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        }
    },
    transaction_Date: {
        type: String, 
        required: true
    },
    borrow_Return: {
        type: String,
        required:true
    }
})

module.exports = Transaction = mongoose.model('transaction', transaction)