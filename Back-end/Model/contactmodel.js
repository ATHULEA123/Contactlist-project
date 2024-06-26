const mongoose = require('mongoose');

const contactModel = mongoose.Schema({

    salutation : {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
},{

    timestamps:true
}


)

module.exports = mongoose.model("contactlist",contactModel);