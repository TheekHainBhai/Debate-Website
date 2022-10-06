require('events').EventEmitter.prototype._maxListeners = 100;

//Importing ALL Dependencies
const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');   
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const authenticate = require('./middleware/authenticate')   //middleware

const app = express();
const router = express.Router();

//Configure ENV file & Require Connection File
dotenv.config({path : './config.env'});

//Require DBConnection& Model
require('./db/conn')
require('./db/conn2')

//to fix cors error
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
//we link the router(loginAPI,registerAPI) to make our route easy
app.use(require('./router/auth'));

const Users = require('./models/userSchema')
const Topics = require('./models/topicSchema');       
const TopicPros = require('./models/topicPros')     //require topic pros
const TopicCons = require('./models/topicCons')     //require topic cons


const port = process.env.PORT;


// This Method is Used to Get Data  and Cookies from FrontEnd
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send({"username": "jod0009"})
})

//RegistrationAPI
app.post('/registerApi',cors(), async(req,res)=>{
    try {
        //Get body or Data
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const gender = req.body.gender;
        const email = req.body.email;
        const password = req.body.password;

        const  createUser = new Users({
            firstname : firstname,
            lastname : lastname,
            username : username,   //this will save the username from req in the userSchema(Database) 
            gender : gender,
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

//LoginAPI User
app.post('/loginApi', async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        //FInd User if Exist 
        const user = await Users.findOne({email : email});
        if(user){
            //Verify Password
            const isMatch = await bcryptjs.compare(password, user.password)
            
            if(isMatch){
                // Generate Token Which is Define in User Schema
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    // Expires Token in 24 hrs
                    expires : new Date(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send("LoggedIn");
                console.log(user);
            }else{
                res.status(400).send("Invalid Credentials");
            }
        }else{
            res.status(400).send("Invalid Credentials");
        }
    
    } catch (error) {
        res.status(400).send(error);
    }
    })

    
    //03.10.22
    //API to retrieve all the users
    app.get('/getusers',(req,res)=>{
        Users.find()
        .then(result=>{    //if found store the data in result var and display 
            res.status(200).json({     
                UserData:result
            });
        })
        .catch(error=>{    //if error occurs send error in res 
            console.log(error)
            res.status(500).json({
                error:error
            })
        })
        })

//Topics Insert API
app.post('/topicsApi', async (req,res)=>{
    try {
        //Get body or Data
        const title = req.body.title;

        const  createTopic = new Topics({
            title : title   //this will save the comment from req in the topicSchema(Database) 
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


// topicPros Insert API
app.post('/topicProsApi', async (req,res)=>{
    try {
        //Get body or Data
        const comment = req.body.comment;

        const  createPros = new TopicPros({
            comment : comment   //this will save the comment from req in the topicSchema(Database) 
        });

        //Save Method is Used to Create User or Insert User
        //But Before Saving or Inserting, Password will Hash
        //Because of Hashing, It will save to DB
        const created = await createPros.save();
        console.log(created);
        res.status(200).send("Created");

    } catch (error) {
        res.status(400).send(error)
    }
})

// topicCons Insert API
app.post('/topicConsApi', async (req,res)=>{
    try {
        //Get body or Data
        const comment = req.body.comment;

        const  createCons = new TopicCons({
            comment : comment   //this will save the comment from req in the topicSchema(Database) 
        });

        const created = await createCons.save();
        console.log(created);
        res.status(200).send("Created");

    } catch (error) {
        res.status(400).send(error)
    }
})
    

//SearchApi
app.get('/searchApi/:title',(req,res)=>{
        Topics.find(req.params)
        .then(result=>{    //if found store the data in result var and display 
            res.status(200).json({     
                userResult:result
            });
        })
        .catch(error=>{    //if error occurs send error in res 
            console.log(error)
            res.status(500).json({
                error:error
            })
        })
})

//Run Server
app.listen(port,()=>{
    console.log("Server is Listening")
}) 