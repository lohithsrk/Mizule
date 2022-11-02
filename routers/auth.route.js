const express = require('express')
const router = express.Router()

const { signUpPost, loginPost, forgotPost } = require('../controllers/auth.controller')

router.route('/signup').post(signUpPost)
router.route('/login').post(loginPost)
router.route('/forgot-password').post(forgotPost)

module.exports = router 