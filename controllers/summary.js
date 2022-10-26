const asyncHandler = require("../middlewares/async");
const SummaryService = require("../services/SummaryService");

module.exports.getSummary = asyncHandler(async(req, res, next) => {
    let periodID = req.params.perID;
    let summary = await SummaryService.getSummary(periodID)
    res.status(201).json({ success: true, data: summary });
})