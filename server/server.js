//This order is necessary! Don't move things around.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const fs = require('fs')
const path = require('path')

//This parses incoming requests with JSON payloads.
//Allows us to recongnize Request Object as a JSON Object.
app.use(express.json())
//This parses incoming requests with JSON payloads consisting of STRINGS OR ARRAYS.
    //Allows us to recongnize Request Object as a strings or arrays.
app.use(express.urlencoded({extended:true}));

//This lets our front-end at port 3000 make calls to our back-end at port 8000.
//Taking it away will result in "cors errors" when attemptnig your axios calls!
//This security feature is built into the browser. That's why we don't experience it in Postman.
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true // when someone is on the front-end, we need to add: 'withCredentials: true,' to the axios request to ensure they're authenticated.
}))

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/chart', function(req, res){
    res.render('index')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

require("./config/mongoose.config")

require("./routes/favorite.routes")(app)
// Longhand:
// const movieRoutes = require("./routes/movie.routes");
// movieRoutes(app);
require("./routes/user.routes")(app)

require('./middlewares/publicapi.middleware')(app);

//After connecting to our port (8000), this console.log lets us know we're connected to our server.
app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`))