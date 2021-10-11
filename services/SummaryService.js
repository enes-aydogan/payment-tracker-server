const Summary = require('../models/Summary');

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
