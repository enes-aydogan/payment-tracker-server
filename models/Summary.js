const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    periodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Period'
    },
    payerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    payeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Summary', schema);