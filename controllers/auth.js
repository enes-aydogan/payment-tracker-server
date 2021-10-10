const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const asyncHandler = require('../middlewares/async');

module.exports.login = asyncHandler(async (req, res, next) => {
    let {email, password} = req.body

    let result = await AuthService.login(email, password);

    res.status(200).json({
        success: true,
        data: {
            token: result.token,
            id: result.user._id,
        }
    })

})