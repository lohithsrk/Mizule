const express = require('express');
const router = express.Router()

const { validateUser } = require('../middlewares/middlewares.util')
const { getRandomZules, getParticularZule, feedZule, similarZules } = require('../controllers/fetchZule.controller')

const { errorHandler } = require('../utils/errorHandlers.util')


router.route('/random').get( errorHandler(getRandomZules))
router.route('/particular/:id_zule').get(validateUser, errorHandler(getParticularZule))
router.route('/:id_zuleSpot/:id_user/:zuleTitle').get(errorHandler(feedZule))
router.route('/random/similar').get(validateUser, errorHandler(similarZules))

module.exports = router