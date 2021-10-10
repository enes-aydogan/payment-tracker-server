const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description:{
        type: String
    },
    price:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    }
    /*,
    stuff: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]*/
})

module.exports = schema;