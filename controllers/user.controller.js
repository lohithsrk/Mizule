const { Op } = require("sequelize");

const { Zule } = require('../database/database')
const { User } = require('../database/database')

const { AppError } = require('../utils/errorHandlers.util')

exports.historyGet = async (req, res) => {
    const { id_user } = req.params;
    var user = await User.findByPk(id_user, { raw: true })
    if (!user) throw new AppError('Invalid request', 400)
    const zules = await Zule.findAll({
        where: {
            id_zule: {
                [Op.in]: user.history.teasers
            }
        }, raw: true
    })
    res.json(zules)
}