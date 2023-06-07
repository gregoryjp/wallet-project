const express = require('express');
const router = express.Router();
const userController = require('../controllers/transationsUser.controllers');
const validate = require('./middlewares/validate')
const validator = require('../../../validators/auth.validators')

// patch transfer:localhost:3001/api/user/transaction?type=transfer&to="slider.2@gmail.com
//patch deposit:localhost:3001/api/user/transaction?type=deposit
router.post('/transaction', [validate.rolUser, validator.transaction], userController.transaction)

router.get('/get/transaction', [validate.rolUser, validator.type], userController.getTransaction)

router.post('/invoice', [validate.rolUser, validator.invoice], userController.invoice)

router.get('/invoice/search', [validate.rolUser, validator.searchInvoice], userController.invoiceSearch)

router.get('/admin/get/transaction', [validate.rolAdmin, validator.email_type], userController.adminGetTransaction)

router.get('/admin/get/invoices', [validate.rolAdmin], userController.admingGetInvoice)


module.exports = router;
