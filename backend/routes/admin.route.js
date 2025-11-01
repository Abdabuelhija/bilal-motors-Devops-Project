// admin.route.js
const express = require("express");
const adminRoute = express.Router();
const nodemailer = require('nodemailer');
let Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../services/config");


function isAuthenticated(req, res, next) {
    // token means : ID for the post request , every post have an id . 
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    // this line is decode the token for the posy request to verify the token , for example if someone try to take the token , he should know the SECRET CODE . 
    const decoded = jwt.verify(token,config.SECRET_KEY);
    req.user = decoded;
    next();
  } 
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}


adminRoute.get("/", isAuthenticated, async (req,res)=>{
    let admin = await Admin.find({});
    res.status(200).send(admin);
});


adminRoute.post('/login', async (req, res) => {
    const { password } = req.body;
    const admin = await Admin.findOne({ Password: password });
    if (admin && admin.Password === password) {
        res.status(200).send(admin);
    } 
    else {
        res.status(400).send('Invalid credentials');
        console.log('Invalid credentials');
    }
});

adminRoute.put("/", async (req, res) => {
    try {
        let admin = await Admin.findOneAndUpdate(
            {},  
            {
                $set: {
                    Password: req.body.Password
                }
            },
            {
                new: true, 
                useFindAndModify: false  
            }
        );

        if (!admin) {
            return res.status(404).send('No admin found to update');
        }

        res.status(200).send(admin);
    } 
    catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

  


adminRoute.post('/sendmail', async (req, res) => {
    let {random} = req.body;
    let admin = await Admin.findOne({});
    if(!admin) {
        return res.status(404).send('Admin not found');
    }

    let emailData = {
        from: config.EMAIL_SENDER, 
        to: admin.Email,
        subject: 'Bilal-Motors Valdiation', 
        text: `מספר הזיהוי החד פעמי הוא : \n ${random}` 
    };

    let transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user:config.EMAIL_SENDER,
            pass: config.EMAIL_SENDER_PASS
        }
    });

    transporter.sendMail(emailData, (error, info) => {
        if (error) {
            return console.log(error);
            res.status(500).send(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({message: 'Email sent!'});
    });
});





    
module.exports = adminRoute;