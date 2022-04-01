const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a Name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an Email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a Password'],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)