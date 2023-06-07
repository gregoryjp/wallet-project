const express = require('express');
const router = express.Router();
const companyController = require('../controllers/transationsCompany.controllers');
const validate = require('./middlewares/validate');
const validator = require('../../../validators/auth.validators');


router.post('/transactions', [validate.rolCompany, validator.transaction], companyController.companyTransaction)

router.get('/get/transactions', [validate.rolCompany, validator.typeTransaction], companyController.getTransactions)

router.get('/admin/get/companys', [validate.rolAdmin], companyController.getCompanies)

router.get('/admin/get/transactions', [validate.rolAdmin, validator.type], companyController.getTransactionsCompany)

router.get('/admin/operations', [validate.rolAdmin], companyController.operations)

module.exports = router;