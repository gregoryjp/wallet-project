const express = require('express');
const router = express.Router();
const validator = require('../../../validators/auth.validators');
const validate = require('../routes/middlewares/validate')
const authController = require('../controllers/auth.company.controller');



// register company
router.post('/register', [validator.registerCompany], authController.register);

// Company Register User
router.post('/register/user', [validate.rolCompany, validator.companyRegisterUser], authController.registerCompanyUser);

// login company
router.post('/login', [validator.loginUser], authController.loginCompany)


module.exports = router;