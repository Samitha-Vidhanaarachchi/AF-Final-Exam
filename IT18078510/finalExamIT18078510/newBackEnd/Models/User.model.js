const mongoose = require('mongoose');
const Schema= mongoose.Schema;

let userdetails = new Schema({
    firstName :{
        type :String,
        required: true
    },
    lastName :{
        type :String,
        required: true
    },
    phoneNumber :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    password :{
        type :String,
        required: true
    },
    stdNumber :{
        type :String,
        required: true
    }
});

module.exports = mongoose.model('userdetails',userdetails);

