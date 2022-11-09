const Organization = require("../models/Organization");
const Period = require("../models/Period");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const OrgUser = require("../models/OrgUser");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.create = async (orgID, req) => {
  let { description, price, stuffIDs } = req.body;
  let userID = req.user._id;

  // find organization
  let organization = await Organization.findById(orgID).select("+periods");
  let period = organization.periods.find((s) => s.status == true);

  if (!period) throw new ErrorResponse("Period cant find", 404);

  //stuffs
  let stuffs = [];
  let partnerPays = [];

  try {
    if (stuffIDs != "") stuffs = stuffIDs.split(",");
  } catch (e) {}

  if (stuffs.length > 0) {
    let partnerPrice = price / (stuffs.length + 1);
    for (var id in stuffs) {
      partnerPays.push({
        PartnerId: stuffs[id],
        PartnerPrice: partnerPrice,
      });
    }
  }

  let payment = {
    ownerID: userID,
    description: description,
    price: price,
    imagePath: "",
    partnerPays: partnerPays,
  };

  period.payments.push(payment);

  organization.periods.find((s) => s.status == true).payments = period.payments;

  await organization.save();
  await period.save();

  return payment;
};

module.exports.getInfo = async (req) => {
  let userID = req.user._id;

  var orgUsers = [];

  let orgs = await OrgUser.find({ userID: userID }).populate("orgID");

  for (var id in orgs) {
    let users = await OrgUser.find({ orgID: orgs[id].orgID["_id"] }).populate(
      "userID"
    );
    var us = [];
    for (var uid in users) {
      if (users[uid]["userID"]["_id"].toString() != userID) {
        us.push({
          userID: users[uid]["userID"]["_id"],
          firstName: users[uid]["userID"]["firstName"],
        });
      }
    }
    orgUsers.push({
      orgID: orgs[id].orgID["_id"],
      orgName: orgs[id].orgID["name"],
      users: us,
    });
  }

  return orgUsers;
};

// get all own payments
module.exports.ownPayments = async (req) => {
  let userID = req.user._id;

  let organisations = await OrgUser.find({
    userID: userID,
    orgID: req.params.orgID,
  })
    .populate("orgID")
    .lean();

  var paymentList = [];
  for (var orgID in organisations) {
    var periods = organisations[orgID]["orgID"]["periods"];
    for (var perID in periods) {
      if (periods[perID]["status"] == true) {
        var payments = periods[perID]["payments"];
        for (var paymentID in payments) {
          if (payments[paymentID]["ownerID"].toString() == userID) {
            var payment = payments[paymentID];
            for (var pID in payment["partnerPays"]) {
              var user = await User.findById(
                payment["partnerPays"][pID].PartnerId
              );

              payment["partnerPays"][pID].FullName =
                user.firstName + " " + user.lastName;
            }
            paymentList.push(payment);
          }
        }
        break;
      }
    }
  }

  var canFinalize = organisations[0]["orgID"]["ownerID"].toString() == userID;
  var finalize = {};

  if (canFinalize)
    finalize = {
      canFinalize: canFinalize,
      orgID: organisations[0]["orgID"]._id,
    };
  else finalize = { canFinalize: canFinalize };

  return { finalize: finalize, paymentList: paymentList };
};

// get all own debt
module.exports.ownDebt = async (req) => {
  let userID = req.user._id;
  let organisations = await OrgUser.find({ userID: userID })
    .populate("orgID")
    .lean();

  var debtList = [];
  for (var orgID in organisations) {
    var periods = organisations[orgID]["orgID"]["periods"];
    for (var perID in periods) {
      if (periods[perID]["status"] == true) {
        var payments = periods[perID]["payments"];
        for (var paymentID in payments) {
          var payment = payments[paymentID];
          var owner = await User.findById(
            payments[paymentID]["ownerID"].toString()
          );
          payments[paymentID].FullName = owner.firstName + " " + owner.lastName;
          for (var pID in payment["partnerPays"]) {
            var user = await User.findById(
              payment["partnerPays"][pID].PartnerId
            );

            payment["partnerPays"][pID].FullName =
              user.firstName + " " + user.lastName;

            if (payment["partnerPays"][pID].PartnerId.toString() == userID) {
              debtList.push(payment);
            }
          }
        }
        break;
      }
    }
  }
  return debtList;
};

// get all own payments
module.exports.ownPastPayments = async (req) => {
  let userID = req.user._id;

  let organisations = await OrgUser.find({ userID: userID })
    .populate("orgID")
    .lean();

  var periodList = [];
  var paymentList;

  for (var orgID in organisations) {
    var periods = organisations[orgID]["orgID"]["periods"];
    for (var perID in periods) {
      if (periods[perID]._id == req.params.perID) {
        if (!periods[perID]["status"]) {
          paymentList = [];

          var payments = periods[perID]["payments"];
          for (var paymentID in payments) {
            if (payments[paymentID]["ownerID"].toString() == userID) {
              var payment = payments[paymentID];
              for (var pID in payment["partnerPays"]) {
                var user = await User.findById(
                  payment["partnerPays"][pID].PartnerId
                );

                payment["partnerPays"][pID].FullName =
                  user.firstName + " " + user.lastName;
              }
              paymentList.push(payment);
            }
          }

          periodList.push({
            period: {
              periodName: periods[perID].periodName,
              perID: periods[perID]._id,
              createdDate: periods[perID].createdDate,
            },
            payments: paymentList,
          });
        }
      }
    }
  }

  return periodList;
};

// get all own debt
module.exports.ownPastDebt = async (req) => {
  let userID = req.user._id;
  let organisations = await OrgUser.find({ userID: userID })
    .populate("orgID")
    .lean();

  var periodList = [];
  var debtList;

  for (var orgID in organisations) {
    var periods = organisations[orgID]["orgID"]["periods"];

    for (var perID in periods) {
      if (periods[perID]._id == req.params.perID) {
        if (periods[perID]["status"] == false) {
          debtList = [];
          var payments = periods[perID]["payments"];
          for (var paymentID in payments) {
            var payment = payments[paymentID];
            var owner = await User.findById(
              payments[paymentID]["ownerID"].toString()
            );
            payments[paymentID].FullName =
              owner.firstName + " " + owner.lastName;
            for (var pID in payment["partnerPays"]) {
              var user = await User.findById(
                payment["partnerPays"][pID].PartnerId
              );

              payment["partnerPays"][pID].FullName =
                user.firstName + " " + user.lastName;

              if (payment["partnerPays"][pID].PartnerId.toString() == userID) {
                debtList.push(payment);
              }
            }

            periodList.push({
              period: {
                periodName: periods[perID].periodName,
                createdDate: periods[perID].createdDate,
              },
              debts: debtList,
            });
          }
        }
      }
    }
  }

  return periodList;
};

module.exports.getAllPastPayments = async (req) => {
  let userID = req.user._id;
  let organisations = await OrgUser.find({
    userID: userID,
    orgID: req.params.orgID,
  })
    .populate("orgID")
    .lean();

  var periods = organisations[0]["orgID"]["periods"];
  console.log("periods", periods);
  var passPeriods = periods.filter((p) => p.status == false);
  return passPeriods;
};

module.exports.getAllPastPaymentsByPerID = async (req) => {
  let userID = req.user._id;
  let organisations = await OrgUser.find({
    userID: userID,
    orgID: req.params.orgID,
  })
    .populate("orgID")
    .lean();

  var periods = organisations[0]["orgID"]["periods"];
  console.log("periods", periods);
  var passPeriods = periods.filter(
    (p) => p.status == false && p._id == req.params.perID
  );
  return passPeriods;
};
