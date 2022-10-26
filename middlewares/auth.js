const jwt = require('jsonwebtoken');

const asyncHandler = require('./async');
const UserService = require('../services/UserService');

exports.checkAuth = asyncHandler(async (req, res, next) => {
    let header = req.get('Authorization');
    
    let token = header.startsWith('Bearer') ? header.split(' ')[1] : null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await UserService.get(decoded.id);
    next();
})
