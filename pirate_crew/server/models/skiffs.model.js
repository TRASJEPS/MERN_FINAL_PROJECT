const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const TolmanSkiffSchema = new mongoose.Schema({
    ownerName: {    
        type: String,
        required: [true, "ARG! Ye pirate must be havn' a name."], 
        minLength: [2, "ARG! Ye pirate's name must be havn' more than 2 characters."],
    }, 

    builderName: {    
        type: String,
        required: [true, "Please enter a builder name."], 
        minLength: [3, "Your builder name must be at least 3 characters long."],
    }, 

    modelName: {    
        type: String,
        required: [true, "ARG! Please select ye role in the crew."], 
        enum: ['Crew Mate', 'Cook', 'Deckhand', 'Doctor', 'Navigator', 'First Mate', 'Captain'],
    },
    
    //No later than today
    //No earlier than 1990
    startDate: {    
        type: Date,
        required: [true, "Please set a a start date."], 
        min: ['1990-01-01', "Sorry you cannot build a boat before the plans were created.  Please try again."],
        max: [ new Date(), "You cannot say you are starting a date in the future."], //THIS PULLS THE CURRENT DATE.
    }, 
    
    finishDate: {    
        type: Date,
        required: [true, "Please set a finish date."], 
        min: ['1990-01-01', "Sorry you cannot finish a boat before the plans were created.  Please try again."],
        // max: [ new Date(), "You cannot say you are starting in the future."], //THIS PULLS THE CURRENT DATE.
    },

    buildComplete: {
        type: Boolean,
        default: false,
    },

    stockLength: {
        type: Float,
        required: [true, "Please enter the cost in dollars and cents."],
        min: [150000, "The minimum cost of your yacht will be $150,000.00."],
    },

    customLength: {
        type: Float,
        required: [true, "Your boat must have a custom length."],
        min: [50, "Minimum length for a Tolman skiff must be at least 15 feet."],
        max: [350, "Maximum length for a Tolman skiff is 30 feet."],
    },

    pictureUrl: {    
        type: String,
    }, 

    description: {    
        type: String,
    }, 

}, { timestamps: true })

module.exports = mongoose.model("Skiff", TolmanSkiffSchema);   