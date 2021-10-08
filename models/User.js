const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName:  {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

modules.exports = mongoose.module("User", schema);