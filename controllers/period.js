const asyncHandler = require('../middlewares/async');
const periodService = require('../services/PeriodService');

module.exports.create = asyncHandler(async (req, res, next) => {
    let periodName = req.body.periodName;
    
    let period = await periodService.create(periodName);
    res.status(201).json({success: true, data:period})
})