const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const TolmanSkiffSchema = new mongoose.Schema({
    // PIRATE
    ownerName: {    
        type: String,
        required: [true, "ARG! Ye pirate must be havn' a name."], 
        minLength: [2, "ARG! Ye pirate's name must be havn' more than 2 characters."],
    }, 

    pictureUrl: {    
        type: String,
        required: [true, "ARG! Ye pirate must be showin' thar photo en ye profile."], 
        minLength: [5, "ARG! Ye photo must be at least 5 characters matey!"],
    }, 
    // CATCH PHRASE
    builderName: {    
        type: String,
        required: [true, "ARG! Ye must be havn' a sayn' to share with the crew!"], 
        minLength: [2, "ARG! Ye catch phrase must be longer than 2 characters matey!"],
    }, 
    // CREW POSITION
    modelName: {    
        type: String,
        required: [true, "ARG! Please select ye role in the hardy crew."], 
        enum: ['Crew Mate', 'Cook', 'Deckhand', 'Boatswain', 'Powder Monkey', 'Quarter Master','Doctor', 'Navigator', 'First Mate', 'Captain'],
    },
    
    startDate: {    
        type: Date,
        required: [true, "ARG! Pick the day ye joined our harty crew!"], 
        min: ['2001-01-01', "ARG! Our pirate days begin no later than 1/1/2001. We be modern pirates of the digital sea."],
        max: [ new Date(), "ARG! Ye cannot join me crew in the future!"],
    }, 
    
    // TREASURE CHESTS FOUND
    customLength: {
        type: Number,
        required: [true, "ARG! Ye must be declarin' whether or not ye found booty!"],
        min: [0, "ARG! Ye cannot be in Davy Jones dept when joining me crew!"],
        max: [999, "ARG! Ye vast wealth will sink me ship! Best leave ye fortune behind! No more than 999 treasure chests."],
    },

     // CREW WAGES
     stockLength: {
        type: Float,
        required: [true, "ARG! Ye must enter ye desired wage. Each mate gets thar share!"],
        min: [100, "ARG! No member of me crew earns less than a 100 Continentals."],
        max: [999999, "ARRRGGGGG! YE GREED IS TOO MUCH. BEST BE LOWERN' YE WAGE."],
    },

    // PEG LEG
    buildComplete: {
        type: Boolean,
        required: true,
        // default: true,
    },

    eyePatch: {
        type: Boolean,
        required: true,
        // default: true,
    },

    hookHand: {
        type: Boolean,
        required: true,
        // default: true,
    },
   
    description: {    
        type: String,
    }, 

}, { timestamps: true })

module.exports = mongoose.model("Skiff", TolmanSkiffSchema);   