const mongoose = require('mongoose')
const periodSchema = require('../models/Period')

const schema = new mongoose.Schema({
    name :{
        type: String,
        require: true
    },
    adress:{
        type: String
    },
    periods: [
        {
            type: periodSchema 
        }
    ]

})

module.exports = mongoose.model('Organization', schema)