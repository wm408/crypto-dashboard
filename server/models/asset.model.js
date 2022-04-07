const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    favorite: {
        type: Boolean,
        default: false,
    },
    ticker: {
        type: String,
        //our validations are defined down here.
        //most take two values: the Criteria and Message
        required: [true, "You must choose a ticker"],
        maxLength: [10, "The ticker length can be no more than 10 characters!"] // specific maxLength to a string. Alternatively: minLength for a string. max/min are for number types.
    },
    notes: {
        type: String,
        //our validations are defined down here.
        //most take two values: the Criteria and Message
        maxLength: [400, "Length of notes cannot exceed 400 characters!"] // specific maxLength to a string. Alternatively: minLength for a string. max/min are for number types.
    },
//_id is created every time we create a new document.
}, {timestamps:true}) // include timestamps!!!

//model includes collection name in singular form, e.g. 'Product' (best practice), and second part is the schema....
const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite; // this export will be called in the controller.