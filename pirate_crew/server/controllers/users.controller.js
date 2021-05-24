const User = require('../models/users.model');
// MAKE SURE TO LINK THE MODEL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// MONGO DB compass 
// JSON and CSV

module.exports = {
    // BECAUSE THIS IS AN OBJECT, EVERYTHING NEEDS TO BE A KEY VALUE PAIR
    // THIS ALLOWS for SAVING all righin the register method
    register: (req, res) => {
        const user = new User(req.body);  //CREATION OF USER OBJECT
        // DONT NEED THIS ANYMORE BECUASE ITS UNIQUE check - TRUE ON THE USERS.MODEL
        // if (user.email === null ) {      //MAKE SURE TO REFERENCE THIS FIRST!!! BECAUSE THIS GOES before its created... 
            // MAKE SURE TO USE user.email, as this CHECKS THAT ONE KEY ARRTIBUTE.....
            //     // EMAIL IS NOT IN SYSTEM/
            //     // ADD THESE YOURSELF VIA COMPASS
            //     res.status(400).json({ msg: "Please enter your registered email address."})
            // }
        user
            .save()
            .then(() => {
                res.json({ msg: "Your new profile has been created.", user:user });
            })
            .catch(err => res.status(400).json(err));
    },
    // THIS ALLOWS FOR VALIDATION
    // CHECKS AGAINST BACKEND


    // ASK ABOUT THISSSSS
    // for login, etc do I need a SEMI and then a PHAT ARROW for each!?!?!?!? 

    login: (req, res) => {
        User.findOne( {email: req.body.email} )
            .then(user => {
                // SET FLAG FOR FORGET PASSWORD and FIRST TIME LOGIN
                if (user === null ) {
                    // EMAIL IS NOT IN SYSTEM
                    res.status(400).json({ msg: "Please enter your registered email address or contact your HOA management company for access."})
                }
                else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(validPassword => {
                            if (validPassword) {
                                res.cookie("usertoken", jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                                    {
                                        httpOnly: true,
                                        // USER that has expired // CHANGE TO INACTIVITY // if (activity) then restart the clock 15-10MIN
                                        // expires: new Date(Date.now() + 99999),   // IF YOU WANT IT TO EXPIRE!  IN SECONDS
                                                //IF expires then trigger pop up warning OR popup you will be signed out in X mins 
                                                //  QUESTION: do I link a file here???
                                    })
                                    .json({
                                        // THIS PART OF THE RESPONSE IS CLIENT FACING, you can display this message
                                        msg: "Success!  You passed the security check.  Welcome!",
                                        userLogged: { username: `${user.firstName} ${user.lastName} has logged in.`,}
                                    });
                                } else {
                                res.status(400).json({ msg: "Invalid login attempt." });
                                }
                        })
                    // THIS DISPLAYS IF THEY ENTER THE WRONG PASSWORD.
                    // SETUP BLOCK!!  mistake counter!
                    // TIME BETWEEN EACH GUESS 
                    // IF 3 invalid attempts 5 min lock.
                    // If 3 more invalid attempts 1 hour lock.  Prompt contacting HOA message
                    // If 3 more invalid, lock account???  WAY LATER FEATURE***
                    // TIME AFTER SUCCESSFUL LOGIN RESET
                    // DISPLAY TO USER THE TIME LOCKED
                    // COUNTER TOO
                    // THE CURLY BRACKETS after the PHAT arrow are for the if statements etc
                    // the IF statement chain will begin below
                .catch(err => {
                    // IF STATEMENT WILL LIVE HERE TO SETUP PARAMS OF VALIDATION
                    res.status(400).json( (err),{ msg: "Your account or password is incorrect." })
                    }
                );
                }
            })
            .catch(err => res.json(err));
    },
    // This makes the cookie useless removing the JWT 
    logout:(req, res) => {
        res.clearCookie("usertoken");
        res.json( {msg: "User Token cookie cleared."});
    },

    // remove the id from the token so it is invalid
    // our validation is done looking for the existence of the key, so this will
    // not log you out completely
    logout2: (req, res) => {
        res.cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
        httpOnly: true,
        maxAge: 0   // TIME???
        // expires: new Date(Date.now() + 99999),   // IF YOU WANT IT TO EXPIRE!  IN SECONDS
        });
        res.json({ msg: "ID has been cleared!" });
  },
  getLoggedInUser: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        // THE DECODET JWT is carried in PAYLOAD - this is an object
        // USES the _id as a part of login so we can use it for many
        
        User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    },

    // NUKE ALL BELOW OR KEEP FOR LATER?
    getAll: (req,res) => {
        User.find()   //FINDS EVERYTHING IN DATABASE THAT IS A SOLMAN SKIFF
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("error in getAll:" + err)
                res.json(err);  //THERE MUST BE A RESPONSE HERE OR IT WAITS INDEFINITELY
            })
    },

   

// CREATE AN INVITATION FOR A USER TO JOIN - THIS CAN BE THE INTRO OR START TO SEND OFF EMAIL. 
// THIS WILLBE USED TO MAKE ALL USERS??

    create: (req,res) => {
        console.log(req.body);
        User.create(req.body)
            .then((newUser) => {
                console.log(newUser);
                res.json(newUser);
            })
            .catch((err) => { 
                console.log("error in create:" + err);
                res.json(err);
            })
    },

    getOne: (req,res) => {
        console.log(req.params.id);
        User.findById(req.params.id)  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => { 
                console.log("error in getOne:" + err);
                res.json(err);
            })
    },

    //USE UPDATE INSTEAD OF EDIT
    update: (req,res) => {
        console.log(req.params.id);
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json(updatedUser);
            })
            .catch((err) => { 
                console.log("error in update:" + err);
                res.json(err);
            })
    },

    delete: (req,res) => {
        console.log(req.params.id);
        User.findByIdAndRemove(req.params.id)  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((removedUser) => {
                console.log(removedUser + "has been deleted from your database.");
                res.json(removedUser);
            })
            .catch((err) => { 
                console.log("error in delete:" + err);
                res.json(err);
            })
    },
};