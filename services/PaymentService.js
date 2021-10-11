const Organization = require('../models/Organization');
const Period = require('../models/Period');
const User = require('../models/User');
const auth = require('../middlewares/auth')

module.exports.create = async (orgID, req) => {
    let {description, price, stuffIDs} = req.body;
    let userID = req.user._id
    //console.log(req);
    //console.log(userID);

    // find organization
    let organization = await Organization.findById(orgID).select('+periods');
    let period = organization.periods.find((s) => s.status == true);


    console.log("period")
    console.log(period)
    
    //if(!period)
        //return error
        
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
        ownerID: userID,
        description: description,
        price: price,
        imagePath: req.file.path,
        partnerPays: partnerPays
    };

    period.payments.push(payment)

        
    organization.periods.find((s) => s.status == true).payments = period.payments;
    
    await organization.save();

    return payment;
}