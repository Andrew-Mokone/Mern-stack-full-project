const express = require('express')
const router = express.Router() 
const {registerUser, loginUser, userData} = require('../controllers/registerUserController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, userData)

module.exports = router