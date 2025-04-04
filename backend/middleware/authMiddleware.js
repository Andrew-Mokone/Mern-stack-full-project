const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async (reg, res, next) => {
    let token

    if(reg.headers.authorization && reg.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = reg.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GET USER from the token
            reg.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No token')
    }
})

module.exports = {protect}