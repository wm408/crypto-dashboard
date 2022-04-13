const Favorites = require("../models/favorite.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const findAllFavorites = (req, res) => {
    Favorites.find()
        .populate("createdBy", "emailAddress firstName lastName") //to populate an object inside of createdBy with email, first/last names.
        .then((allFavorites)=>{
            console.log(allFavorites);
            res.json(allFavorites);
        })
        .catch((err)=>{
            console.log("findAllFavorites has failed!");
            res.json({ message: "Something went wrong in findAllMovies", error: err})
        })
}

const addNewFavorite = (req, res) => { //Like create new, we establish a new favorite.
    const newFavoriteObject = new Favorites(req.body);
    const decodedJWT = jwt.decode(req.cookies.usertoken,{
        complete:true
    })
    newFavoriteObject.createdBy = decodedJWT.payload.id; //createdBy from favorite.model.js
    newFavoriteObject.save()
    .then((newFavorite)=>{
        console.log(newFavorite);
        res.json(newFavorite);
    })
    .catch((err)=>{
        console.log("Something went wrong in addNewFavorite");
        //We set the response status of 400 to 
        //display our err, which is the rejection of our promise.

    //A 400 status means our client is talking 
        //to our server just fine, but the client isn't sending good info.

    //This is how we will eventually display 
        //our validations from the server in react!

    //A 404 status error means the client's 
        //request isn't to the right place or your server is not set up properly

    //On the flip-side, a status of 200 means we are looking good!
        res.status(400).json(err);
    })
}

const findOneFavorite = (req, res) => {
    //We use the paramater's (params) or the client's request to search for a
    //specific document by the field (here _id) specified
    Favorites.findOne({ _id: req.params.id })//the params id MUST MATCH how we write it in our routes!!!
        .then((oneFavorite)=>{
            console.log(oneFavorite);
            res.json(oneFavorite);
        })
        .catch((err)=>{
            console.log("Find One Favorite failed");
            res.json({ message: "Something went wrong in findOneFavorite", error: err })
        })
}

const deleteOneFavorite = (req, res) => {
    Favorites.deleteOne({_id: req.params.id})
    .then((deletedFavorite)=>{
        console.log(deletedFavorite);
        res.json(deletedFavorite);
    })
    .catch((err)=>{
        console.log("delete One Favorite failed");
        res.json({ message: "Something went wrong in deleteOneFavorite", error: err })
    })
}

const updateFavorite = (req, res) => {
//This Mongoose query requires both a parameter AND body from the request!
    Favorites.findOneAndUpdate({_id: req.params.id},
    req.body,
    //These options return a new doc and allow schema valids to run on PUT req
    {new: true, runValidators: true}
    )
    .then((updatedFavorite)=>{
        console.log(updatedFavorite)
        res.json(updatedFavorite)
    })
    .catch((err)=>{
        console.log("Something went wrong in updateFavorite");
        res.status(400).json(err) //See above (explained in create)
    })
}

const findAllFavoritesByUser = (req, res) => {
    if(req.jwtpayload.emailAddress !== req.params.emailAddress){
        console.log("not the email address");

        User.findOne({emailAddress: req.params.emailAddress})
            .then((userNotLoggedIn)=>{ //check this 'userNotLoggedIn'... I think it's fine as is. But be sure.
                Favorites.find({createdBy: userNotLoggedIn._id})
                    .populate("createdBy", "emailAddress firstName lastName")
                    .then((allFavoritesFromUser)=>{
                        console.log(allFavoritesFromUser);
                        res.json(allFavoritesFromUser);
                    })
            })
            .catch((err)=>{
                console.log("Something went wrong in findAllFavoritesByUser");
                res.status(400).json({ message: "Something went wrong in findAllFavoritesByUser", error: err });
            })
    } else {
        console.log("current user id")
        console.log("req.jwtpayload.id:", req.jwtpayload.id);
        Favorites.find({ createdBy: req.jwtpayload.id })
            .populate("createdBy", "emailAddress firstName lastName")
            .then((allFavoritesFromLoggedInUser) => {
                console.log(allFavoritesFromLoggedInUser);
                res.json(allFavoritesFromLoggedInUser);
            })
            .catch((err) => {
                console.log("Something went wrong in findAllFavoritesByUser");
                res.status(400).json({ message: "Something went wrong in findAllFavoritesByUser", error: err });
            })
    }
}

module.exports = {
    findAllFavorites,
    addNewFavorite,
    findOneFavorite,
    deleteOneFavorite,
    updateFavorite,
    findAllFavoritesByUser,
}
