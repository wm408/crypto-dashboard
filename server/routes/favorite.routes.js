const favoriteController  = require("../controllers/favorite.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    // if data is only being read, we can use a GET HTTP Verb
    app.get("/api/favorites", favoriteController.findAllFavorites);
    //if data is being sent to my server to create a new document, we use a POST HTTP Verb
    app.post('/api/favorites', authenticate, favoriteController.addNewFavorite);
    //Make sure calls with params go after the previous calls!    
    app.get('/api/favorites/:id', favoriteController.findOneFavorite);
    app.get('/api/favoritesbyuser/:emailAddress', authenticate, favoriteController.findAllFavoritesByUser); //pass in the email address as the request params.
    //The parameter id, as defined in the controller MUST MATCH
    //what we defined it as in the controller!
    // app.delete('/api/favorites/:id', favoriteController.deleteOneFavorite);
    app.delete('/api/favorites/:symbol', favoriteController.deleteOneFavorite);
    app.put('/api/favorites/:id', favoriteController.updateFavorite);
}