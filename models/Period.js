const mongoose = require("mongoose");
const Payment = require("./Payment");

const schema = new mongoose.Schema({
    periodName:  {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    payments:[
        {
            type: Payment
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = schema