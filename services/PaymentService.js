const Period = require('../models/Period');
const User = require('../models/User');

module.exports.create = async (periodID, body, file) => {
    let {userID, description, price, stuffIDs} = body;

    console.log(stuffIDs);
    // find period
    let period = await Period.findById(periodID);  
    //stuffs
    let stuffs = []
    let partnerPays = []
    try{
        stuffs = stuffIDs.split(',')
    }catch(e){

    }

    if(stuffs.length > 0)
    {
        let partnerPrice = price / (stuffs.length + 1);
        for(var id in stuffs)
        {
            partnerPays.push(
                {
                    PartnerId: stuffs[id],
                    PartnerPrice: partnerPrice
                }
            )
        }
    }
    
    let payment = {
        description: description,
        price: price,
        imagePath: file.path,
        partnerPays: partnerPays
    };

    console.log(period.periodName);
        
    period.payments.push(payment);
    
    await period.save();

    return payment;
}