const express = require('express');
const transationsUserRoutes = require('./transationsUser.routes');
const transationsCompanyRoute = require('./transationsCompany.routes')
const router = express.Router();


router.use('/company', transationsCompanyRoute);
router.use('/user', transationsUserRoutes);


module.exports = router