const asyncHandler = require("../middlewares/async");
const paymentService = require("../services/PaymentService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let orgID = req.params.id;

  let payment = await paymentService.create(orgID, req);
  res.status(201).json({ success: true, data: payment });
});
//get ekelencek

module.exports.getInfo = asyncHandler(async (req, res, next) => {
  // partners info
  // organization info
  let payment = await paymentService.getInfo(req);
  res.status(201).json({ success: true, data: payment });
});

module.exports.ownPayments = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.ownPayments(req);
  res.status(201).json({ success: true, data: payments });
});

module.exports.ownDebt = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.ownDebt(req);
  res.status(201).json({ success: true, data: payments });
});

module.exports.ownPastPayments = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.ownPastPayments(req);
  res.status(201).json({ success: true, data: payments });
});

module.exports.ownPastDebt = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.ownPastDebt(req);
  res.status(201).json({ success: true, data: payments });
});

module.exports.getAllPastPayments = asyncHandler(async (req,res,next) => {  
  let payments = await paymentService.getAllPastPayments(req);  
  res.status(200).json({success: true, data: payments});
})