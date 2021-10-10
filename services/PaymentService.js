const Payment = require('../models/Payment')
const Period = require('../models/Period');

module.exports.create = async (periodID, body, file) => {
    let {userID, description, price, stuffIDs} = body;

    console.log(periodID);
    // find period
    let period = Period.findOne({_id:periodID});
    console.log(period.periodName)
    /*
    let stuffs = [];
    
    //stuffs
    for (var id in stuffIDs.split(',')){
        stuffs.push({id})
    }

    stuffs.push({userID});
    */
    let payment = {
        description: description,
        price: price,
        imagePath: file.path//,
        //stuff:stuffs
    };

    console.log(period.periodName);
        
    period.payments.push(payment);
    

    await period.save();

    return payment;
}