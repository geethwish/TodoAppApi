const express = require('express');

const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { userValidator, customValidations } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', userValidator, customValidations, registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);



module.exports = router
