const asyncHandler = require("../middlewares/async");
const paymentService = require("../services/PaymentService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let periodID = req.params.id;

  let payment = await paymentService.create(periodID, req.body, req.file);
  res.status(201).json({ success: true, data: payment });
});
//get ekelencek
