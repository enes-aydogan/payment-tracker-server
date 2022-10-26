const User = require('../models/User');
const Summary = require('../models/Summary');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.create = async (periodID, payerID, payeeID, price) => {

    let summary = new Summary({
        periodID: periodID,
        payerID: payerID,
        payeeID: payeeID,
        price: price
    });

    await summary.save();
    
    return summary;
}

module.exports.getSummary = async (periodID) => {
    let summary = await Summary.find({periodID: periodID})    
    
    if(summary.length < 1)
        throw new ErrorResponse('Cant find summary', 404)

    let payer = await User.findById(summary[0].payerID);
    let payee = await User.findById(summary[0].payeeID);
    
    let model = {
        payer: payer['firstName'],
        payee: payee['firstName'],
        price: summary[0].price
    }


    return model
}