const User = require("../models/User");
const bcrypt = require("bcryptjs");
const OrgUser = require("../models/OrgUser");

module.exports.create = async (props) => {
  let { firstName, lastName, email, password } = props;

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  let user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hash,
  });

  await user.save();

  return user;
};

module.exports.get = async (userID) => {
  let user = await User.findById(userID).select('-password');
  return user;
};

module.exports.getUserInfo = async (req) => {
  let userID = req.user._id

  let userInfo = {}
  let user = await User.findById(userID);    
  let organisations = await OrgUser.find({userID: userID}).populate('orgID');

  var paymentList = [];
  for(var orgID in organisations){
    var totalPayment = 0
    var periods = organisations[orgID]['orgID']['periods']    
    for(var perID in periods)
    {
      if(periods[perID]['status'] == true)
      {
        var payments = periods[perID]['payments']
        for(var paymentID in payments)
        {
          if(payments[paymentID]['ownerID'].toString() == userID)
          {
            totalPayment += payments[paymentID]['price'];
          }
        }
        
        break;
      }
    }
    paymentList.push({orgName:organisations[orgID]['orgID']['name'], totalPayment: totalPayment})

  }
  userInfo = {user:{firstName: user['firstName'], lastName: user['lastName']}, payments: paymentList}  
  return userInfo;
};

module.exports.getUserByMail = async(req) => {
  const {mail} = req.body;
  
  let user = await User.find({email: mail})
  
  if(user.length > 0)
    return user[0]._id
  
  return null
}