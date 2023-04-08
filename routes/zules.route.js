const express = require('express')
const router = express.Router()

const { getLiked,likeZule, commentZule, createZule } = require('../controllers/zules.controller')
const { validateUser } = require('../middlewares/middlewares.util')
const { errorHandler } = require('../utils/errorHandlers.util')
const { zuleUpload } = require('../utils/multer.util')


router.route('/:id_user/like').get(validateUser, errorHandler(getLiked)).post( errorHandler(likeZule))
router.route('/comment').post(validateUser, errorHandler(commentZule))
router.route('/create').post(validateUser, zuleUpload.fields([{ name: 'thumbnail_16_9', maxCount: 1 }, { name: 'thumbnail_9_16', maxCount: 1 }, { name: 'teaser', maxCount: 1 }, { name: 'zule', maxCount: 1 }]),
    errorHandler(createZule))

module.exports = router