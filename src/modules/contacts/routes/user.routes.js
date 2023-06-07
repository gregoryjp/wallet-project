const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../routes/middlewares/validate')
const validator = require('../../../validators/auth.validators')



router.get('/all/user', [validate.rolAdmin, validator.email], userController.allUser)

router.get('/get/users', [validate.rolAdmin], userController.getUsers)

router.get('/account', [validate.rolUser], userController.accountUser)




module.exports = router;