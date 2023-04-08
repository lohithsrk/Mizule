var uniqid = require('uniqid');

const { User, ZuleSpot, Zule } = require('../database/database')
const { AppError } = require('../utils/errorHandlers.util')

exports.createZuleSpot = async (req, res) => {
    const { id_user, title } = req.body;

    let user = await User.findByPk(id_user, { raw: true })
    let zuleSpot = await ZuleSpot.findOne({ where: { title }, raw: true })

    if (!user) throw new AppError('Invalid request', 409)
    if (zuleSpot) throw new AppError('Invalid Zulespot title', 409)

    const id_zuleSpot = uniqid()

    zuleSpot = await ZuleSpot.create({
        id_zuleSpot,
        title,
        owner: user.id_user,
    })

    await User.update({ zuleSpot: id_zuleSpot }, { where: { id_user: user.id_user } })

    res.json({ ...user, zuleSpot })
}

exports.myZules = async (req, res) => {
    const { id_zuleSpot, id_user } = req.body;

    let user = await User.findByPk(id_user, { raw: true })
    let zuleSpot = await ZuleSpot.findByPk(id_zuleSpot, { raw: true })

    if (!user || !zuleSpot) throw new AppError('Invalid request', 409)

    const myZules = await Zule.findAll({
        where: {
            id_zuleSpot
        }, raw: true
    })

    res.json(myZules)
}