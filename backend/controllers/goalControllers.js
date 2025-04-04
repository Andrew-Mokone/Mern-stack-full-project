const asyncHandler = require('express-async-handler') 
const Goal = require('../models/goalsModel')
const User = require('../models/usersModel')
 
const getGolas = asyncHandler (async (reg, res) => {
    const goals = await Goal.find({user: reg.user.id})
    res.json({goals})
})

const setGoal = asyncHandler (async(reg, res) => {
    if(!reg.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: reg.body.text,
        user: reg.user.id
    })

    res.json({goal})
})

const updateGoal = asyncHandler (async(reg, res) => {

    const goal = await Goal.findById(reg.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not updated')
    }

    const user = await User.findById(reg.user.id)

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(reg.params.id, reg.body, {
        new: true
    })

    res.json({updatedGoal})
})

const deleteGoal = asyncHandler (async (reg, res) => {

    const goal = await Goal.findById(reg.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal to remove not found')
    }

    const user = await User.findById(reg.user.id)

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    await goal.deleteOne()

    res.json({id: reg.params.id})
})

module.exports = {
    getGolas,
    setGoal,
    updateGoal,
    deleteGoal
}