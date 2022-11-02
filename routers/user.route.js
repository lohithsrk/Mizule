const express = require('express');
const router = express.Router()

const { historyPost } = require('../controllers/zules.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/history').post(validateUser, historyPost)

module.exports = router