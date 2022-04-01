const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController')


router.post('/', registerUser);
router.post('/login', registerUser);
router.post('/me', getMe);



module.exports = router
