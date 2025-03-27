const express = require("express")
const { getGolas, setGoal, updateGoal, deleteGoal } = require("../controllers/goalControllers")
const router = express.Router()

router.route('/').get(getGolas).post(setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router;