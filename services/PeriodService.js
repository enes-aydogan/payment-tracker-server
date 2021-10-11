const Period = require("../models/Period");

module.exports.create = async (props) => {
  let periodName = props;

  let period = new Period({
    periodName: periodName,
    payments: [],
  });

  await period.save();

  return period;
};

module.exports.get = async (id) => {
  let period = await Period.findById(id);
  return period;
};
