const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler') 
const User = require('../models/usersModel')
const { use } = require('../routes/routesGoals')

const registerUser = asyncHandler (async  (reg, res) => {

    const {name, email, password} = reg.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill in the detals')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user name')
    }
})

const loginUser = asyncHandler (async (reg, res) => {

    const {email, password} = reg.body

    // check by email or findByone
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const userData = asyncHandler (async  (reg, res) => {
   const {_id, name, email} = await User.findById(reg.user.id)

   res.status(200).json({
    id: _id,
    email,
    name,
   })
})

// generate jwt

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    userData
}