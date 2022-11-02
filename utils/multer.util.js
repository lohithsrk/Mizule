const multer = require('multer')

exports.teaserUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `Zules/${file.zulist}`)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-teaser')
        },
    }), limits: { fieldSize: 25 * 1024 * 1024 }
})

exports.ZuleUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `Zules/${file.zulist}`)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-zule')
        },
    }), limits: { fieldSize: 25 * 1024 * 1024 }
})
