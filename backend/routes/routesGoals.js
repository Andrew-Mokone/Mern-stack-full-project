const express = require("express")
const { getGolas, setGoal, updateGoal, deleteGoal } = require("../controllers/goalControllers")
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getGolas).post(protect,setGoal)

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports = router;