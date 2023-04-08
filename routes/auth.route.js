const express = require('express')
const router = express.Router()

const { errorHandler } = require('../utils/errorHandlers.util')

const { signUp, login, resetPassword, resetPasswordVerify, verifyEmail, loginWithGoogle } = require('../controllers/auth.controller')

router.route('/signup').post(errorHandler(signUp))
router.route('/signup/verify').post(errorHandler(verifyEmail))
router.route('/login').post(errorHandler(login))
router.route('/login-with-google').post(errorHandler(loginWithGoogle))
router.route('/reset-password').post(errorHandler(resetPassword))
router.route('/reset-password/verify').post(errorHandler(resetPasswordVerify))

module.exports = router 