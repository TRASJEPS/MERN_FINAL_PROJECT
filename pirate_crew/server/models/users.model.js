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

    email: {    
        type: String,
        required: [true, "Please enter your email address."],
        validate:{
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),     
            message: "Please enter a valid email address.",
        },
        unique: true,
        // minLength: [5, "Please enter a valid email address."],
    }, 

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

    unit: {    
        type: String,
        required: [true, "Please enter your unique HOA unit."],
        minLength: [1, "Your unit must be at least one character."],
    },

    state: {    
        type: String,
        required: [true, "Please enter your state."],
        minLength: [2, "You must enter your state name or two character abbreviation."],
    }, //SEPARATE BY COMMAS

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

    pictureUrl: {
        type: String,
    }, 

    description: {    
        type: String,
    }, 

}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value ));
// THIS is the validator where the comparison happens
UserSchema.pre("validate",function(next){
    if(this.password !== this.confirmPassword) 
    {this.invalidate("confirmPassword","Your passwords must match.");}
    next();
});
// BCRYPT FOR PASSWORD PROTECTION
UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;