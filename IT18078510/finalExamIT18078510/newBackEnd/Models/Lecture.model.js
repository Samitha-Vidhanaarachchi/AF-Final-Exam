const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let adminDetails = new Schema({
    Module :{
        type :String,
        required: true
    },
    Lecture :{
        type :String,
        required: true
    },
    Incharge :{
        type: String,
        required: true
    },
    Description :{
        type: String,
        required: true
    },
    Video :{
        type :String,
        required: true
    }
});

module.exports = mongoose.model('AdminDetail',adminDetails);
