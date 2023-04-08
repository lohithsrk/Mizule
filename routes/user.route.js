const express = require('express');
const router = express.Router()

const { errorHandler } = require('../utils/errorHandlers.util')

const { historyPost } = require('../controllers/zules.controller')
const { historyGet } = require('../controllers/user.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/:id_user/history').get( errorHandler(historyGet)).post( errorHandler(historyPost))

module.exports = router