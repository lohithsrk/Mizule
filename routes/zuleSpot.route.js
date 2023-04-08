const express = require('express');
const router = express.Router();

const { validateUser } = require('../middlewares/middlewares.util');
const { errorHandler } = require('../utils/errorHandlers.util');
const { createZuleSpot, myZules } = require('../controllers/zuleSpot.controller')

router.route('/create').post(validateUser, errorHandler(createZuleSpot));
router.route('/myzules').post(errorHandler(myZules));

module.exports = router;
