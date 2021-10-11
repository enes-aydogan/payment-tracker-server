const Period = require("../models/Period");
const Organization = require('../models/Organization')
const SummaryService = require('../services/SummaryService')

module.exports.create = async (orgID, body) => {
    let {periodName, status} = body;
    
    let period = {
        periodName: periodName,
        status: status,
        payments: [],
    };

    let organization = await Organization.findById(orgID)

    organization.periods.push(period)

    await organization.save()

    return period;
};

module.exports.get = async (id) => {
  let period = await Period.findById(id);
  return period;
};

// organization id
module.exports.finalize = async (id) => {
    let organization = await Organization.findById(id).select('+periods');
    let period = organization.periods.find((s) => s.status == true);
    let loan = {}

    for(var id in period.payments) {
        var pPays = period.payments[id].partnerPays;
        for( var pId in pPays)
        {
            if(!loan[pPays[pId].PartnerId])
                loan[pPays[pId].PartnerId] = {}

            if(loan[pPays[pId].PartnerId][period.payments[id].ownerID])
                loan[pPays[pId].PartnerId][period.payments[id].ownerID] += pPays[pId].PartnerPrice
            else
                loan[pPays[pId].PartnerId][period.payments[id].ownerID] = pPays[pId].PartnerPrice

            if(loan[pPays[pId].PartnerId] && loan[period.payments[id].ownerID])
                if(loan[pPays[pId].PartnerId][period.payments[id].ownerID] > 0 && loan[period.payments[id].ownerID][pPays[pId].PartnerId] > 0)
                    if(loan[pPays[pId].PartnerId][period.payments[id].ownerID] - loan[period.payments[id].ownerID][pPays[pId].PartnerId] > 0){

                        loan[pPays[pId].PartnerId][period.payments[id].ownerID] -= loan[period.payments[id].ownerID][pPays[pId].PartnerId]
                        loan[period.payments[id].ownerID][pPays[pId].PartnerId] = 0
                    }
                    else{
                        loan[period.payments[id].ownerID][pPays[pId].PartnerId] -= loan[pPays[pId].PartnerId][period.payments[id].ownerID]
                        loan[pPays[pId].PartnerId][period.payments[id].ownerID] = 0
                    }
        }
    }
    let summary
    // save summary
    for(var payerID in loan){
        for(var payeeID in loan[payerID]){
            if(loan[payerID][payeeID] != 0)
                summary = await SummaryService.create(period._id, payerID, payeeID, loan[payerID][payeeID])
        }
    }

    // set status of period
    //period.status = false;
    console.log('test')
    organization.periods.find((s) => s.status == true).status = false;

    await organization.save()

    return period
};