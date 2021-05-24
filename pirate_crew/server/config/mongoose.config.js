const mongoose = require('mongoose'); //connect to mongoose lib
const db_name = "PIRATE_CREW"; //NAME OF DATABASE

mongoose.connect("mongodb://localhost/" + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })  
    .then(() => console.log(`You are conneted to the Pirate Crew Exam! Along with the ${db_name} database!  Yoo Hoo!`))
    .catch((err) => console.log(`error in connecting to the: ${db_name} database ${err}`));
    

