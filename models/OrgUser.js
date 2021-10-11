const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    orgID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('OrgUser', schema)