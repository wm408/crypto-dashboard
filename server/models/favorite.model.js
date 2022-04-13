const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //npm i mongoose-unique-validator in: server/, ref: https://www.npmjs.com/package/mongoose-unique-validator

const FavoritesSchema = new mongoose.Schema({
    favorite: {
        type: Boolean,
        default: false,
        // unique: [true],
    },
    // cmcId: { //crypto market cap crypto id.
    //     type: Number,
    // },
    symbol: { //crypto market cap token symbol.
        type: String,
        //our validations are defined down here.
        //most take two values: the Criteria and Message
        required: [true, "You must choose a symbol"],
        maxLength: [10, "The ticker length can be no more than 10 characters!"], // specific maxLength to a string. Alternatively: minLength for a string. max/min are for number types.
        // unique: [true],
    },
    notes: {
        type: String,
        //our validations are defined down here.
        //most take two values: the Criteria and Message
        maxLength: [1000, "Length of notes cannot exceed 1000 characters!"] // specific maxLength to a string. Alternatively: minLength for a string. max/min are for number types.
    },
    createdBy: { //direct relational connection with User collection.
        type: mongoose.Schema.Types.ObjectId, // able to find the exact user that this favorite was created by.
        ref: "User"
    },
//_id is created every time we create a new document.
}, {timestamps:true}) // include timestamps!!!

FavoritesSchema.plugin(uniqueValidator, { message: 'The symbol: {VALUE}, is already in the database.' });

//model includes collection name in singular form, e.g. 'Product' (best practice), and second part is the schema....
const Favorites = mongoose.model('Favorites', FavoritesSchema);

module.exports = Favorites; // this export will be called in the controller.