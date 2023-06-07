const { Router } = require('express');


const userRoutes = require('./modules/contacts/routes');
const companyRoutes = require('./modules/contacts/routes');
const transationsRoutes = require('./modules/transations/routes')


const router = Router();

router.use(companyRoutes);
router.use(userRoutes);
router.use(transationsRoutes);


module.exports = router;



