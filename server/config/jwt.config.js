const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => { //this authenticate function works as middleware. The 'next' direcive allows us to move from one piece of middleware to another. 
    jwt.verify(req.cookies.usertoken, //this is how we access our 'jsonwebtoken' called 'usertoken'.
        process.env.JWT_SECRET,
        (err, payload)=>{
            if(err){
                console.log(err);
                res.status(401).json({verified: false})
            }
            else{
                console.log(payload);
                req.jwtpayload = payload
                next()
            }
        }
    )
}

module.exports = {
    authenticate,
}
