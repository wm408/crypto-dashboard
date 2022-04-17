const favoriteController  = require("../controllers/favorite.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=>{
    app.get("/api/favorites", favoriteController.findAllFavorites);
    app.post('/api/favorites', authenticate, favoriteController.addNewFavorite);  
    // app.get('/api/favorites/:id', favoriteController.findOneFavorite);
    app.get('/api/favorites/:symbol', favoriteController.findOneFavorite);
    app.get('/api/favoritesbyuser/:emailAddress', authenticate, favoriteController.findAllFavoritesByUser);
    // app.delete('/api/favorites/:id', favoriteController.deleteOneFavorite);
    app.delete('/api/favorites/:symbol', favoriteController.deleteOneFavorite);
    app.put('/api/favorites/:symbol', favoriteController.updateFavorite);
}