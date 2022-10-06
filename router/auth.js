const express = require('express');
const cors = require('cors');   
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

require('../db/conn')    //importing database
const Users = require('../models/userSchema');
const Authenticate = require('../middleware/authenticate');  //for about/to fetch account info pg

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })


//  //RegistrationAPI
// router.post('/registerApi', async(req,res)=>{
//     try {
//         //Get body or Data
//         const firstname = req.body.firstname;
//         const lastname = req.body.lastname;
//         const username = req.body.username;
//         const gender = req.body.gender;
//         const email = req.body.email;
//         const password = req.body.password;

//         const  createUser = new Users({
//             firstname : firstname,
//             lastname : lastname,
//             username : username,   //this will save the username from req in the userSchema(Database) 
//             gender : gender,
//             email : email,
//             password : password
//         });

//         //Save Method is Used to Create User or Insert User
//         //But Before Saving or Inserting, Password will Hash
//         //Because of Hashing, It will save to DB
//         const created = await createUser.save();
//         console.log(created);
//         res.status(200).send("Registered");

//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// //LoginAPI User
// router.post('/loginApi', async(req,res)=>{
//     try {
//         let token;
//         const email = req.body.email;
//         const password = req.body.password;
    
//         //FInd User if Exist 
//         const user = await Users.findOne({email : email});
//         if(user){
//             //Verify Password
//             const isMatch = await bcryptjs.compare(password, user.password)
            
//             if(isMatch){
//                 // Generate Token Which is Define in User Schema
//                  token = await user.generateToken();
//                 res.cookie("jwtoken", token, {
//                     // Expires Token in 24 hrs
//                     expires : new Date(Date.now() + 86400000),
//                     httpOnly : true
//                 })
//                 res.status(200).send("LoggedIn");
//                 console.log(user);
//             }else{
//                 res.status(400).send("Invalid Credentials");
//             }
//         }else{
//             res.status(400).send("Invalid Credentials");
//         }
    
//     } catch (error) {
//         res.status(400).send(error);
//     }
//     })


//aboutapi
router.get('/about',Authenticate,(req,res)=>{
    console.log('Hello')
    res.send(req.rootUser)
})

router.get('/getdata',Authenticate,(req,res)=>{
    console.log('get Data pg')
    res.send(req.rootUser)
})

router.post('/contactus',Authenticate, async(req,res)=>{
    try {
        
        const { username, email, phone, message } = req.body;

        if (!username || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error:"plzz filled the contact form " });
        }
       
         const userContact = await Users.findOne({_id: req.userId})

        if(userContact){

            const userMessage =  await userContact.addMessage(username,email,phone, message);

            await userContact.save()

            res.status(201).json({message:"user Contact successful"})
        }
    
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;