const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const sequelize = require('../config/db');;

const User = require('../models/user')(sequelize, Sequelize.DataTypes, Sequelize.Model);


//@desc     user Authentication
//@route    GET /api/users
//@access   Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // get user details
    const user = await User.findOne({ where: { email } });

    // compare password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (user && comparePassword) {

        res.status(200).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            },
            message: 'User logged in',
            status: "success"
        });

    } else {

        res.status(400);

        throw new Error('Invalid Email or password');

    }

});

//@desc     Create User
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    // check email already exist
    const emailExist = await User.findOne({ where: { email: req.body.email } });

    if (emailExist) {

        res.status(400);

        throw new Error('Email Already Registered');
    }

    // password hash
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // save user on database
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if (user) {

        res.status(201).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            },
            message: 'success',
            status: "success"
        });

    } else {

        res.status(400);

        throw new Error('Invalid User details');

    }

})

//@desc     Get User Data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user);

});


const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}