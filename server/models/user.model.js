const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    emailAddress: {
        type: String,
        required: [true, "Email address is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords MUST be at least 6 characters"]
    },
},{timestamps: true})

//Virtual field
//stores info from our req, but will not be saved to the
//collection/db (need conf pass, but not storing it)

UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=>this._confirmPassword = value)

//https://mongoosejs.com/docs/middleware.html#pre
//https://mongoosejs.com/docs/middleware.html
//middleware affects/aides in the middle of a process
//pre validate automatically runs before any save middleware ... makes this go before the next one

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!!!")
        console.log("Passwords don't match!")
    }
    next()
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
        //hash the password BEFORE it's saved to the db
        //Remember, we know they match from middleware above
        bcrypt.hash(this.password, 10) //10 is a good default value for salting/increasing complexity of the hash.
            .then((hashedPassword)=>{
                //give our password the value of the returned hash
                this.password = hashedPassword;
                next();
            })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;