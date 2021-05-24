const TolmanSkiff = require('../models/skiffs.model');

module.exports = {
    getAll: (req,res) => {
        TolmanSkiff.find()   //FINDS EVERYTHING IN DATABASE THAT IS A SOLMAN SKIFF
            .then((allSkiffs) => {
                console.log(allSkiffs);
                res.json(allSkiffs);
            })
            .catch((err) => {
                console.log("error in getAll:" + err)
                res.json(err);  //THERE MUST BE A RESPONSE HERE OR IT WAITS INDEFINITELY
            })
    },

    create: (req,res) => {
        console.log(req.body);
        TolmanSkiff.create(req.body)
            .then((newSkiff) => {
                console.log(newSkiff);
                res.json(newSkiff);
            })
            .catch((err) => { 
                console.log("error in create:" + err);
                res.json(err);
            })
    },

    getOne: (req,res) => {
        console.log(req.params.id);
        TolmanSkiff.findById(req.params.id)  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((oneSkiff) => {
                console.log(oneSkiff);
                res.json(oneSkiff);
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
        TolmanSkiff.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((updatedSkiff) => {
                console.log(updatedSkiff);
                res.json(updatedSkiff);
            })
            .catch((err) => { 
                console.log("error in update:" + err);
                res.json(err);
            })
    },

    delete: (req,res) => {
        console.log(req.params.id);
        TolmanSkiff.findByIdAndRemove(req.params.id)  //THIS IS IN THE assigned ID in the skiffs.ROUTE
            .then((removedSkiff) => {
                console.log(removedSkiff);
                res.json(removedSkiff);
            })
            .catch((err) => { 
                console.log("error in delete:" + err);
                res.json(err);
            })
    },
}