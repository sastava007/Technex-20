const express= require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config()
app.get("/",(req,res)=>{
    res.send("hello world")
})

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'sg9827252555@gmail.com',
        pass: process.env.PASSWORD
    }
})
app.listen(3003,()=>{
    console.log("your server is started");
})
