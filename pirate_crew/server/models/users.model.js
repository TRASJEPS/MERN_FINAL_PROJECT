const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    firstName: {    
        type: String,
        required: [true, "Please enter your first name."],
        minLength: [2, "Your name must be at least 2 characters long."],
    },
    lastName: {    
        type: String,
        required: [true, "Please enter your last name."],
        minLength: [2, "Your last name must be at least 2 characters long."],
    }, 

    // THIS WILL BE USED TO VALIDATE YOUR ACCOUNT AND SEND YOU important HOA updates
    // HURRR IS THIS RIGHT>>>>>>
    email: {    
        type: String,
        required: [true, "Please enter your email address."],
        validate:{
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),     //// DID I DO THIS RIGHT CHECK IT
                            //  (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))
                            //  /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)
                            // MY OLD, NEEDS TO BE FIXED (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+(?:\.[a-zA-Z]+)? $/.test(val))
            message: "Please enter a valid email address.",
        },
        unique: true,
        // minLength: [5, "Please enter a valid email address."],
    }, 


    // INCLUDE THE FRONT END PRETTY (strong, weak etc)
    password: {    
        type: String,
        required: [true, "You must make a password to keep your account secure."],
        minLength: [8, "Please enter a password that is at least 8 characters or longer."],
    }, 

    // AUTOFILL based on link(s)
    // POINTS to a document to an HOA COLLECTION
    associatedHOAs: {    
        type: Array,
        required: [true, "Please enter your HOA name."],
        min: [1, "Your HOA name must be at least one character long."],
    },

    streetNumber: {   
        type: Number,
        required: [true, "Please enter your street number."], 
        minLength: [1, "Please enter the number of your street."],
    }, 

    streetName: {   
        type: String,
        required: [true, "Please enter the name of your street."], 
        minLength: [1, "Please enter your full street name."],
    }, 

    //TRY WITH SEPARATION?? try the top first
    // streetAddress: {   
    //     type: String,
    //     required: [true, "Please enter your street address."],
    //     minLength: [6, "Please enter your full street address, include the street number and name."],
    // }, 
    
    // THIS CAN BE CUSTOMIZED LATER TO SPECIFICALLY NUMBERS or LETTERS set TYPE
    // can be set in description or under type / string / number etc
    unit: {    
        type: String,
        required: [true, "Please enter your unique HOA unit."],
        minLength: [1, "Your unit must be at least one character."],
    },

    // MAKE ENUM?????
    // SET TO AUTO FILL
    state: {    
        type: String,
        required: [true, "Please enter your state."],
        minLength: [2, "You must enter your state name or two character abbreviation."],
    }, //SEPARATE BY COMMAS

    // SET TO AUTO FILL
    zipCode: {    
        type: Number,
        required: [true, "Please enter your zip code."],
        minLength: [5, "Please include the full zip code of your HOA."],
        maxLength: [9, "Your zip code cannot be longer than 9 numbers."]
    },

    residentSince: {    
        type: Date,
        required: [true, "Please select the date you began living in your home."], //shows user they must have a builder name
        min: ['1920-01-01', "Sorry you cannot finish a boat before the plans were created.  Please try again."],
        // max: [ new Date(), "You cannot say you are starting in the future."], //THIS PULLS THE CURRENT DATE.
    },

    userTotalVehicles: {
        type: Number,
        max: [30, "The maximum number of vehicles is 30 per owner."],
    },

    // SETUP NPM
    pictureUrl: {
        type: String,
    }, 

    // Any additional details you would like to share?
    description: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
    }, 

}, { timestamps: true });

// THIS IS FOR SETTING UP THE CONFIRM PASSWORD
// FIRST is the virtual field that can be compared and validated
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value ));
// THIS is the validator where the comparison happens
UserSchema.pre("validate",function(next){
    if(this.password !== this.confirmPassword) 
    {this.invalidate("confirmPassword","Your passwords must match.");}
    next();
});
// BCRYPT FOR PASSWORD PROTECTION this saves it!
UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

// REMEMBER THIS BECOMES "users" ot becomes plural and a lower case string automatically
const User = mongoose.model("User", UserSchema);
module.exports = User;