const catchAsync = require("../utils/catchAsync");
const {authService} = require("../services/index")


const loginAdmin = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    const login = await authService.signinAdmin({email, password})

    res.status(200).json({data:login});
})
const createAdmin = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    const login = await authService.signupAdmin({email, password})

    res.status(200).json({data:login});
})

module.exports = {
    loginAdmin,
    createAdmin
}