const express = require('express');
const router = express.Router()

const { validateUser } = require('../middlewares/middlewares.util')
const { getRandomZules, getParticularZule, feedZule, similarZules } = require('../controllers/fetchZule.controller')

router.route('/random').get(validateUser, getRandomZules)
router.route('/particular/:id_zule').get(validateUser, getParticularZule)
router.route('/:id_channel/:user_id/:id_zule').get(validateUser, feedZule)
router.route('/random/similar').get(validateUser, similarZules)

module.exports = router