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
            type: periodSchema,
            select: false
        }
    ],
    ownerID: {
        type: mongoose.Schema.Types.ObjectId
    }

})

module.exports = mongoose.model('Organization', schema)