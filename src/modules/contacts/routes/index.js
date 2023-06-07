const authCompanyRoutes = require('./auth.company.routes');
const companyRoute = require('./company.routes');
const authUserRoutes = require('./auth.user.routes');
const userRoutes = require('./user.routes');
const express = require('express');
const router = express.Router();

router.use('/company', authCompanyRoutes);
router.use('/company', companyRoute);
router.use('/user', userRoutes);
router.use('/user', authUserRoutes);

module.exports = router