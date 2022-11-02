const express = require('express')
const router = express.Router()

const { likePost, commentPost } = require('../controllers/zules.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/like').post(validateUser, likePost)
router.route('/comment').post(validateUser, commentPost)

module.exports = router