const multer = require('multer')
const fs = require('fs');

exports.createZuleSpot = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            path = `resources/${req.body.zuleSpot}/logo`
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, title)
        },
    }), limits: { fieldSize: 25 * 1024 * 1024 }
})

exports.zuleUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            path = `resources/${req.body.zuleSpot}/zules/${req.body.title}`
            fs.mkdirSync(path, { recursive: true })
            cb(null, path)
        },
        filename: function (req, file, cb) {
            switch (file.fieldname) {
                case 'thumbnail_16_9':
                    cb(null, `${req.body.title}-zule-thumbnail${file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length)}`)
                    break;
                case 'thumbnail_9_16':
                    cb(null, `${req.body.title}-teaser-thumbnail${file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length)}`)
                    break;
                case 'teaser':
                    cb(null, `${req.body.title}-teaser${file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length)}`)
                    break;
                case 'zule':
                    cb(null, `${req.body.title}-zule${file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length)}`)
                    break;

            }
        },
    })
})
