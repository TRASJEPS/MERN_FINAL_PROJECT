const express = require('express');
const app = express();
const cors = require('cors');
const port = 7777;  // BACKEND

app.use(express.json());  //enables req and response function
app.use(express.urlencoded({ extended: true })); //this prevents ERRORS
app.use(cors());  //local host can talk with back end but postman will still work

// THIS IS THE QEUIVALENT OF PASTING CODE FROM THE FILE RIGHT THERE

require('./config/mongoose.config'); //THIS REQUIRE STATEMENT WILL COPY 

// ADD ALL BACKEND ROUTES
require('./routes/skiffs.route')(app);  //GOES TO SKIFF ROUTES AND REQUIRES APP
require('./routes/users.route')(app);  // USE FOR BLACKBELT LATER


app.listen(port, () => console.log(`MERN EXAM. Pirate Crew Listening on port: ${port}.  ARG!`));