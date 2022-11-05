const path = require('path');
const { Op } = require('sequelize')

const { Zule, User, Channel, sequelize } = require('../database/database')

exports.getRandomZules = async (req, res) => {
    try {
        const { offset } = req.query

        const [results, metadata] = await sequelize.query(`SELECT * FROM zules INNER JOIN channels ON zules.channel_id = channels.id_channel ORDER BY RANDOM() LIMIT 50 OFFSET ${offset}`);

        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Not Found" })
    }
}

exports.getParticularZule = async (req, res) => {
    try {
        const { id_zule } = req.params

        const zule = await Zule.findByPk(id_zule.split('-')[0], { raw: true })
        const channel = await Channel.findByPk(zule.channel_id, { raw: true })
        if (!(zule && channel)) return res.status(404).json({ error: "Not Found" })

        res.json({ ...zule, ...channel })

    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Not Found" })
    }
}

exports.feedZule = async (req, res) => {
    try {
        const { id_zule, id_channel, user_id } = req.params

        const user = await User.findByPk(user_id)
        const zule = await Zule.findByPk(id_zule.split('-')[0])
        const channel = await Channel.findByPk(id_channel)
        if (!(user && zule && channel)) return res.status(500).json({ error: 'Invalid request' })

        const zulePath = path.join(__dirname, '../zules', '/', id_channel, '/', id_zule)
        res.sendFile(zulePath);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Invalid request' })
    }
}


exports.similarZules = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Invalid URI' })
    }
}