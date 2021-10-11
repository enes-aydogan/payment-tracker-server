const asyncHandler = require("../middlewares/async");
const paymentService = require("../services/PaymentService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let orgID = req.params.id;

  let payment = await paymentService.create(orgID, req);
  res.status(201).json({ success: true, data: payment });
});
//get ekelencek
