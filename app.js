require('events').EventEmitter.prototype._maxListeners = 100;

//Importing ALL Dependencies
const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

//Configure ENV file & Require Connection File
dotenv.config({path : './config.env'});

//Require DBConnection& Model
require('./db/conn')
require('./db/conn2')

const Users = require('./models/userSchema')
const Topics = require('./models/topicSchema')
const port = process.env.PORT;


// This Method is Used to Get Data  and Cookies from FrontEnd
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello World")
})

//Registration
app.post('/register', async(req,res)=>{
    try {
        //Get body or Data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const  createUser = new Users({
            username : username,   //this will save the username from req in the userSchema(Database) 
            email : email,
            password : password
        });

        //Save Method is Used to Create User or Insert User
        //But Before Saving or Inserting, Password will Hash
        //Because of Hashing, It will save to DB
        const created = await createUser.save();
        console.log(created);
        res.status(200).send("Registered");

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/test', async (req,res)=>{
    try {
        //Get body or Data
        const comment = req.body.comment;

        const  createTopic = new Topics({
            comment : comment   //this will save the comment from req in the topicSchema(Database) 
        });

        //Save Method is Used to Create User or Insert User
        //But Before Saving or Inserting, Password will Hash
        //Because of Hashing, It will save to DB
        const created = await createTopic.save();
        console.log(created);
        res.status(200).send("Created");

    } catch (error) {
        res.status(400).send(error)
    }
})

//Run Server
app.listen(port,()=>{
    console.log("Server is Listening")
}) 