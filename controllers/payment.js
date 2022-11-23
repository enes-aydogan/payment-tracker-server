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

module.exports.getAllPastPayments = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.getAllPastPayments(req);
  res.status(200).json({ success: true, data: payments });
});

module.exports.getAllPastPaymentsByPerID = asyncHandler(
  async (req, res, next) => {
    let payments = await paymentService.getAllPastPaymentsByPerID(req);
    res.status(200).json({ success: true, data: payments });
  }
);
module.exports.getActivePeriod = asyncHandler(async (req, res, next) => {
  let payments = await paymentService.getActivePeriod(req);
  res.status(200).json({ success: true, data: payments });
});
module.exports.deletePayment = asyncHandler(async (req, res, next) => {
  try {
    let paymentID = req.params.id;
    let orgID = req.params.orgID;
    let payments = await paymentService.deletePayment(orgID, paymentID);
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: error.message, statusCode: error.statusCode },
    });
  }
});
module.exports.updatePayment = asyncHandler(async (req, res, next) => {
  try {
    let paymentID = req.params.id;
    let orgID = req.params.orgID;
    let payments = await paymentService.updatePayment(
      orgID,
      paymentID,
      req.body
    );
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: error.message, statusCode: error.statusCode },
    });
  }
});
