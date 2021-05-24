const express = require('express');
const app = express();
const cors = require('cors');
const port = 7777;

app.use(express.json());  //enables req and response function
app.use(express.urlencoded({ extended: true })); //this prevents ERRORS
app.use(cors());  //local host can talk with back end but postman will still work

require('./config/mongoose.config'); //THIS REQUIRE STATEMENT WILL COPY 
require('./routes/skiffs.route')(app);  //GOES TO SKIFF ROUTES AND REQUIRES APP
require('./routes/users.route')(app);  // USE FOR BLACKBELT LATER

app.listen(port, () => console.log(`MERN EXAM. AVAST! YE BE CONNECTING TO - Pirate Crew Listening on port: ${port}.  ARG!`));