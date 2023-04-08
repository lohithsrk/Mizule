const path = require('path');
const { Op } = require('sequelize')

const { Zule, User, ZuleSpot, sequelize } = require('../database/database')
const { AppError } = require('../utils/errorHandlers.util')


exports.getRandomZules = async (req, res) => {
    const { offset } = req.query

    const [zulesRaw, metadata1] = await sequelize.query(`SELECT * FROM zules ORDER BY RANDOM() LIMIT 50`);
    if (!zulesRaw.length) return res.json([])

    const [zuleSpots, metadata2] = await sequelize.query(`SELECT * FROM zuleSpots WHERE zuleSpots."id_zuleSpot" IN (${[...new Set(zulesRaw.map(z => `'${z.id_zuleSpot}'`))]})`);
    var zules = []
    zulesRaw.forEach(zuleRaw => {
        zuleSpots.forEach(zuleSpot => {
            if (zuleRaw.id_zuleSpot === zuleSpot.id_zuleSpot) {
                zules.push({
                    ...zuleRaw, zuleSpot: {
                        ...zuleSpot
                    }
                })
            }
        })
    })

    res.json(zules)
}

exports.getParticularZule = async (req, res) => {
    try {
        const { id_zule } = req.params

        const zule = await Zule.findByPk(id_zule.split('-')[0], { raw: true })
        const zuleSpot = await ZuleSpot.findByPk(zule.id_zuleSpot, { raw: true })
        if (!(zule && zuleSpot)) throw new AppError()

        res.json({ ...zule, ...zuleSpot })

    } catch (error) {
        return next(new Error(error));
    }
}

exports.feedZule = async (req, res) => {
    const { zuleTitle, id_zuleSpot, id_user } = req.params

    const user = await User.findByPk(id_user)
    const zule = await Zule.findOne({
        where: {
            title: zuleTitle.split('-')[0]
        }, raw: true
    })
    const zuleSpot = await ZuleSpot.findByPk(id_zuleSpot)
    console.log("🚀 ~ file: fetchZule.controller.js:56 ~ exports.feedZule= ~ zuleSpot:", req.params)
    if (!(user && zule && zuleSpot)) throw new AppError()

    const zulePath = path.join(__dirname, '../resources', '/', zuleSpot.title, '/zules', '/', zule.title, '/', zuleTitle)
    res.sendFile(zulePath);
}

exports.similarZules = async (req, res) => {
    let { categories } = req.query
    categories = JSON.parse(categories)
    const data = await Zule.findAll({
        where: {
            category: {
                [Op.overlap]: categories
            }
        }
    })
    res.json(data)
}