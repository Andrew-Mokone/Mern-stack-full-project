const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Add a user name'],
    },
    email: {
        type: String,
        required: [true, 'Please Add a user email'],
    },
    password: {
        type: String,
        required: [true, 'Please Add a user password'],
    },
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)