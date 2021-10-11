const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    PartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    PartnerPrice: {
        type: Number
    }
})

const schema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    partnerPays: [
        {
            type: partnerSchema
        }
    ],

})
module.exports = schema;