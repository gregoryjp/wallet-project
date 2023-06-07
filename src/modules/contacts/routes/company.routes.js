const express = require('express');
const router = express.Router();
const userController = require('../controllers/company.controller');
const validate = require('../routes/middlewares/validate')
const validator = require('../../../validators/auth.validators')


router.get('/get-users', [validate.rolCompany], userController.companyUsers)

router.get('/status', [validate.rolCompany], userController.companyStatus)

router.patch('/absorb/user', [validate.rolCompany, validator.email], userController.companyAbsorbUser)

module.exports = router;