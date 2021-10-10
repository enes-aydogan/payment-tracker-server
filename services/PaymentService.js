const Period = require('../models/Period');
const User = require('../models/User');

module.exports.create = async (periodID, body, file) => {
    let {userID, description, price, stuffIDs} = body;

    console.log(periodID);
    // find period
    let period = await Period.findById(periodID);  
    //stuffs
    let stuffs = []
    try{
        stuffs = stuffIDs.split(',')
    }catch(e){

    }    
    stuffs.push(userID);
    
    let payment = {
        description: description,
        price: price,
        imagePath: file.path,
        stuff:stuffs
    };

    console.log(period.periodName);
        
    period.payments.push(payment);
    
    await period.save();

    return payment;
}