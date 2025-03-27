const asyncHandler = require('express-async-handler') 
const Goal = require('../models/goalsModel')

const getGolas = asyncHandler (async (reg, res) => {
    const goals = await Goal.find()
    res.json({goals})
})

const setGoal = asyncHandler (async(reg, res) => {
    if(!reg.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: reg.body.text,
    })

    res.json({goal})
})

const updateGoal = asyncHandler (async(reg, res) => {

    const goal = await Goal.findById(reg.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not updated')
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
        throw new Error('Goa to remove not found')
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