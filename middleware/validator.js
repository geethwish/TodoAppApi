const { check, validationResult } = require('express-validator');

exports.todoValidator = [
    check('task')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage('Task cannot be empty and must be more than 3 characters long'),
    check('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Description cannot be empty"),
    check('status')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Status Cannot be empty'),
];

exports.userValidator = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Task cannot be empty and must be more than 3 characters long'),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage("Description cannot be empty"),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password Cannot be empty'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Confirm Password Cannot be empty')
        .custom((value, { req }) => {

            if (value !== req.body.password) {

                throw new Error('Both password must be the same')

            }

            return true
        })
    ,
]

exports.customValidations = (req, res, next) => {

    const result = validationResult(req).array();

    if (!result.length) return next();

    const error = {}

    for (let index = 0; index < result.length; index++) {

        error[result[index].param] = result[index].msg

    }

    res.json({ success: false, message: error });

}