const mongoose = require('mongoose');

module.exports.connect = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log('Connected to db...');
};