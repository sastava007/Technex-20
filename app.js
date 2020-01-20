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
    },
    tls: {
        rejectUnauthorized: false
    }
})

const mailOptions={
    from:'sg98272252555@gmail.com',
    to: 'prajwal714singh@gmail.com',
    subject:'Blockchain checking',
    html: '<p>Hello world</p>'
}
transporter.sendMail(mailOptions,function(err,info){
    if(err)
    console.log(err)
    else
    console.log(info)
})

app.listen(3003,()=>{
    console.log("your server is started");
})
