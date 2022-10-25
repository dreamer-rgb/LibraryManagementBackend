const router = require("express").Router()
const Admin = require("../models/admin")
const Books = require("../models/books")
const Transactions = require("../models/transactions")
const Users = require("../models/users")

//Route to add new book
router.post('/addbooks', (req, res, next)=>{
    Books.findOne({name: req.body.name, author: req.body.author})
    .then(book => {
        if(book){
            return res.status(409).json({
                success:"false",
                error:"Book already present"
            })
        }
        else{
            const newbook = {
                name: req.body.name,
                author: req.body.author,
                availability_Status: 'Availaible',
            }
            Books.insertMany(newbook)
            .then(()=>{res.status(200).json({
                success:"true",
                message:req.body.name+" added to books"
            })
          })   
        } 
    }).catch(next)
})

//Route to remove old book
router.post('/removebooks', (req, res, next)=>{
    Books.findOne({name: req.body.name, author: req.body.author})
    .then(book => {
        if(!book){
            return res.status(409).json({
                success:"false",
                error:"Book not present"
            })
        }
        else{
            Books.deleteOne(book)
            .then(()=>{res.status(200).json({
                success:"true",
                message:req.body.name+" book deleted"
            })
          })   
        } 
    }).catch(next)
})

//Route to issue book to user
router.post('/issuebooks',(req,res,next)=>{

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    let fullDate = `${day}/${month}/${year}`;
    const newuser = {
        name: req.body.name,
        user_Name: req.body.user_Name,
        contact_Number:req.body.contact_Number,
        email:req.body.email
    }
    const newbook = {
        name: req.body.book_Name,
        author: req.body.author
    }
    const newtransaction = {
        user_Details: newuser,
        book_Details: newbook,
        transaction_Date: fullDate,
        borrow_Return: 'Borrow'
    }

    Transactions.insertMany(newtransaction)
    Books.findOneAndUpdate({name:req.body.book_Name,author:req.body.author}, {$set:{"availability_Status":'Unavailable'}},
        {new:true})
        .then(nt=>{
            return res.json({
                "success":true,
                "message":"Book status made Unavailable"
            })
        }).catch(next)
})

//Route to return book
router.post('/returnbooks',(req,res,next)=>{

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    let fullDate = `${day}/${month}/${year}.`;
    const newuser = {
        name: req.body.name,
        user_Name: req.body.user_Name,
        contact_Number:req.body.contact_Number,
        email:req.body.email
    }
    const newbook = {
        name: req.body.book_Name,
        author: req.body.author
    }
    const newtransaction = {
        user_Details: newuser,
        book_Details: newbook,
        transaction_Date: fullDate,
        borrow_Return: 'Return'
    }

    Transactions.insertMany(newtransaction)
    Books.findOneAndUpdate({name:req.body.book_Name,author:req.body.author}, {$set:{"availability_Status":'Available'}},
        {new:true})
        .then(nt=>{
            return res.json({
                "success":true,
                "message":"Book status made Available"
            })
        }).catch(next)
})

module.exports = router