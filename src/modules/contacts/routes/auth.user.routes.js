const express = require('express');
const router = express.Router();
const validator = require('../../../validators/auth.validators');
const authController = require('../controllers/auth.user.controller');

//register user
router.post('/register', validator.registerUser, authController.register);

// login user
router.post('/login', validator.loginUser, authController.login)

module.exports = router;