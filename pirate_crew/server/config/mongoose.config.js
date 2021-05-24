const mongoose = require('mongoose'); //connect to mongoose lib
const db_name = "skiffs"; //NAME OF DATABASE

mongoose.connect("mongodb://localhost/" + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })  
    .then(() => console.log(`You are conneted to the ADVANCED ${db_name} database!`))
    .catch((err) => console.log(`error in connecting: ${db_name} database ${err}`));
    

