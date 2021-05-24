//THIS IS THE VALIDATOR/MANAGER EQV
const mongoose = require('mongoose');

//USE THIS FOR CURRENCY and or EACH MODEL TO ENABLE FLOATS as type
var Float = require('mongoose-float').loadType(mongoose);

// TOLMAN SKIFFS
const TolmanSkiffSchema = new mongoose.Schema({
    ownerName: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
        required: [true, "Please enter the owner's name."], //shows user they must have a user name
        minLength: [3, "Your owner name must be at least 3 characters long."],
    }, //SEPARATE BY COMMAS

    builderName: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
        required: [true, "Please enter a builder name."], //shows user they must have a builder name
        minLength: [3, "Your builder name must be at least 3 characters long."],
    }, //SEPARATE BY COMMAS

    //STANDARD IS DEFAULT.
    modelName: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
        required: [true, "Please select a model name."], //shows user they must have a builder name
        enum: ['Standard', 'Wide Body', 'Jumbo', 'Flat Bottom'],  // Dont need "Please make a selection."  Seabright Trawler
        //ENUM is short for enumeration.  YOU CAN SET IT LOWERCASE
        //IT ONLY ACCEPTS THESE VALUES, IT MATCHES PERFECTLY.  ITS CASE SENSITIVE.  
    }, //SEPARATE BY COMMAS
    
    //No later than today
    //No earlier than 1990
    startDate: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: Date,
        required: [true, "Please set a a start date."], //shows user they must have a builder name
        min: ['1990-01-01', "Sorry you cannot build a boat before the plans were created.  Please try again."],
        max: [ new Date(), "You cannot say you are starting a date in the future."], //THIS PULLS THE CURRENT DATE.
    }, //SEPARATE BY COMMAS
    
    finishDate: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: Date,
        required: [true, "Please set a finish date."], //shows user they must have a builder name
        min: ['1990-01-01', "Sorry you cannot finish a boat before the plans were created.  Please try again."],
        // max: [ new Date(), "You cannot say you are starting in the future."], //THIS PULLS THE CURRENT DATE.
    }, //SEPARATE BY COMMAS

    buildComplete: {
        type: Boolean,
        default: false,
    },

    // OG TYPE: number now its    --   CURRENCY  --   this makes data save as ...0.00
    // FRONT END NOW SEES THIS AS BOAT COST
    // NEED TO CONVERT THIS ON BACKEND TO WHOLE NUMBER BUT INCLUDE .00 etc
    stockLength: {
        type: Float,
        required: [true, "Please enter the cost in dollars and cents."],
        min: [150000, "The minimum cost of your yacht will be $150,000.00."],
    },

    // stockLength: {  //THIS WAS THE FIRST TYPE SETUP
    //     type: Float,
    //     required: [true, "Your boat must have a stock length."],
    //     min: [15, "Minimum length for a Tolman skiff must be at least 15 feet."],
    //     max: [30, "Maximum length for a Tolman skiff is 30 feet."],
    // },

    // OG TYPE: number now its...
    //  this makes data save as ...0.00
    customLength: {
        type: Float,
        required: [true, "Your boat must have a custom length."],
        min: [50, "Minimum length for a Tolman skiff must be at least 15 feet."],
        max: [350, "Maximum length for a Tolman skiff is 30 feet."],
    },

    pictureUrl: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
    }, //SEPARATE BY COMMAS

    description: {    //CHANGE THIS TO OWNER FIRST NAME AND LAST NAME LATER
        type: String,
    }, //SEPARATE BY COMMAS

}, { timestamps: true })   //THE TIMESTAMPS MAKES THE CREATED AND UPDATED AUTOMATICALLY

//THIS MAKES A COLLECTION THAT IS ALL LOWERCSE AND PLURAL BASED ON THIS STRING "Skiff"
module.exports = mongoose.model("Skiff", TolmanSkiffSchema);   