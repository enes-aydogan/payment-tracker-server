const asyncHandler = require("../middlewares/async");
const periodService = require("../services/PeriodService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let periodName = req.body;
  let orgID = req.params.id;

  console.log(periodName)
  console.log(orgID)
  console.log("end : controller side")

  let period = await periodService.create(orgID, req.body);
  res.status(201).json({ success: true, data: period });
});

// get period
module.exports.get = asyncHandler(async (req, res, next) => {
  let periodID = req.params.id;
  let period = await periodService.get(periodID);
  res.status(200).json({ success: true, data: period });
});

// get all periods

module.exports.finalize = asyncHandler(async(req, res, next)=> {
    let orgID = req.params.id
    console.log(orgID)

    let period = await periodService.finalize(orgID);
    res.status(200).json({ success: true, data: period });
})