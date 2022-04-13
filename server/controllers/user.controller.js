const User  = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = (req, res) => {
    //use the req data and the User model constructor to create a user object
    const user = new User(req.body)
    //info is already in the instance of THIS object. no need to pass anything in.
    //save is an instance method. doesn't require anything passed in.
    //create is static and takes the object as the parameter.
    user.save()
    .then((newUser)=>{
        console.log(newUser);
        console.log("Successfully Registered!")
        res.json({
            successMessage: "Thank you for registering",
            user: newUser 
        })
    })
    .catch((err)=>{
        console.log("register not successful!")
        res.status(400).json(err)
    })
};

const login = (req, res) => {
    User.findOne({email: req.body.email})
    .then((userRecord)=>{
    //check if this returned obj is null
        if(userRecord === null){
            //check if this returned obj is null
            res.status(400).json({message: "Invalid Login Attempt"})
        }
        else{
            //email is found 
            bcrypt.compare(req.body.password, userRecord.password)//salt both 10x ...return promise BOOLEAN t/f
                .then((isPasswordValid)=>{
                    if(isPasswordValid){
                        console.log("password is valid");
                        res.cookie(
                            "usertoken",
                            jwt.sign(
                                {
                                    //payload is the data we want to save/use
                                    id: userRecord._id,
                                    email: userRecord.emailAddress,
                                    // username: userRecord.username
                                },
                                //we need a key to sign and hash cookie's data
                                //Our payload needs a scret key. We will use a .env file to store such things privately. 
                                //They will not be added to your public code. This private key is one example. 
                                //Another can be our db name! these can be used throughout our app, using "process.keyName"
                                process.env.JWT_SECRET
                            ),
                                //configuration settings for this cookie (options)
                                //we will make sure these cookies are "HttpOnly". This means that the cookies are essentially 
                                //invisible to client-side JavaScript and can only be read by the server.
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 9000000)
                                }
                        ).json({
                            message: "Succesfully logged in...",
                            // userLoggedIn: userRecord.username
                            userId: userRecord._id
                        });
                    }
                    else{
                        res.status(400).json({message: "Invalid Attempt"})
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json({ message: "Invalid Attempt" });
                })
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({ message: "Invalid Attempt" });
    })
};

const logout = (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
        message: "You have successfully logged out!",
    });
};

const getLoggedInUser = (req, res) => {
    // const decodedJWT = jwt.decode(req.cookies.usertoken,{
    //     complete: true
    // })

    User.findOne({_id: req.jwtpayload.id}) //see also jwt.config.js for the jwtpayload
        .then((user)=>{
            console.log(user);
            res.json(user)
        })
        .catch((err)=>{
            console.log(err);
        })
};

const findAllUsers = (req, res) => {
    //use the model to connect to the collection and 
    //find/return all documents from our games collection  
    User.find()
        .then((allUsers) => {
            res.json(allUsers);
        })
        .catch((err) => {
            console.log("Find All Users failed");
            res.json({ message: "Something went wrong in findAll", error: err })
        })
};

module.exports = {
    register,
    login,
    logout,
    getLoggedInUser,
    findAllUsers,
}