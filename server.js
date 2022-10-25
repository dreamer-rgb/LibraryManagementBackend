const express = require("express");
const app = express();
const port = process.env.PORT || 5678;
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require("path");
const cors = require('cors');

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("MongoDB Connected")}).catch(err => {
    console.log(err)
})

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET,PUT,POST,DELETE",
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hey there!")
})

app.use('/admin', require("./routes/admin"));

app.use((req, res, next) => {
    return res.status(404).json({
        "error": "Cannot " + req.method + " " + req.url,
        "message": "Requested page not found"
    })
})

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(500).json({"success": false, "errors": error.toString()})
})

app.listen(port, () => {console.log(`Server is running in port: ${port}`)});
