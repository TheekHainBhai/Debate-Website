const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


//importing databse 
const conn = require("../db/conn");


//Stored in Sample DB

//// User Schema
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        unique : false
    },
    lastname : {
        type : String,
        required : true,
        unique : false
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        required : true,
        unique :  false
    },
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        unique :  false
    },
    date : {
        type: Date,
        default:Date.now
    },
    messages : 
    [
         {
            username : {
                type : String,
                required : true,
                unique : true
            },
            email : {
                type: String,
                required : true,
                unique : true
            },
            phone:{
                type:String,
                required: true
            },
            message:{
                type: String,
                required:true
            }
         }
    ],
    tokens : [
        {
            token : {
                type  : String,
                required : true
             }
        }
    ]
});


//Hashing Password to Secure
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = bcryptjs.hashSync(this.password, 10);
    }
    next();
})

// Generate Tokens to Verify User
userSchema.methods.generateToken = async function(){
    try {
        let generatedToken = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : generatedToken});
        await this.save();
        return generatedToken;
    } catch (error) {
        console.log(error)
    }
}

// Store the message
userSchema.methods.addMessage = async function(username,email,phone,message){
    try {
        this.messages =  this.messages.concat({username,email,phone,message})
        await this.save();
        return this.messages;
    
    } catch (error) {
        console.log(error)
    }
}

//Create Model
module.exports = conn.model("Users", userSchema);

