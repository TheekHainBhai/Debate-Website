const jwt = require('jsonwebtoken');
const Users = require('./models/userSchema')

const Authenticate = async (req,res,next)=>{
    try {
        
        const token = req.cookies.jwtoken;   //getting token from db
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY )   //verifying token
   
        //the data/info of the logged in user 
        const rootUser =  await Users.findOne({ _id: verifyToken._id, "tokens.token": token })   //getting data from db using token

        if(!rootUser){ throw new Error('User not found')}

        req.token = token;        //to get and diplay user info
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorized: No token provided")
        console.logg(error)
    }
}

module.exports = Authenticate;