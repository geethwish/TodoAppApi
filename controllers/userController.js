const asyncHandler = require('express-async-handler');

const User = require('../models/user');


//@desc     user Authentication
//@route    GET /api/users
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'login success' })
});

//@desc     Create User
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {

    if (!req.body.name) {

        res.status(400);

        throw new Error('Please add a user');

    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    res.status(200).json({
        data: user,
        message: 'User Created'
    });

})

//@desc     Get User Data
//@route    GET /api/users/me
//@access   Public
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'user data retrieved' })
});


module.exports = {
    registerUser,
    loginUser,
    getMe,
}