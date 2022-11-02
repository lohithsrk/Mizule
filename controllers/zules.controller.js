const path = require('path');
require('fs').re
const { Zule, User, Channel, sequelize } = require('../database/database')

const { Op } = require('sequelize')

exports.getRandomZules = async (req, res) => {
    try {
        const { offset } = req.query
        // let zules = await Zule.findAll({
        //     order: [sequelize.literal('RANDOM()')], limit: 50, offset, raw: true
        // })

        // let randomZules = []

        // zules.forEach(async (zule, index) => {
        //     let channel = await Channel.findByPk(zule.channel_id, { raw: true })
        //     randomZules.push({ ...zule, ...channel })
        //     if (zule.lenfth - 1 == index) return res.json(randomZules)
        // })

        const [results, metadata] = await sequelize.query(`SELECT * FROM zules INNER JOIN channels ON zules.channel_id = channels.id ORDER BY RANDOM() LIMIT 50 OFFSET ${offset}`);

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
        if (!(user && zule && channel)) return res.status(406).json({ error: 'Invalid request' })

        const zulePath = path.join(__dirname, '../zules', '/', id_channel, '/', id_zule)
        res.sendFile(zulePath);
    } catch (error) {
        console.log(error);
        res.status(406).json({ error: 'Invalid request' })
    }
}

exports.historyPost = async (req, res) => {
    const { user_id, userHistory, id_zule, type } = req.body

    await db.query('UPDATE users SET history = ? WHERE user_id = ?', [userHistory, user_id], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ err })
        }
        await db.query('SELECT * FROM zules WHERE id_zule = ?', [id_zule], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(409).json({ err })
            }
            if (!results.length) {
                return res.status(409).json({ err: 'Invalid request' })
            }
            let views = JSON.parse(results[0].views)
            if (type === 'teaser') {
                views = {
                    ...views, teaser: parseInt(views.teaser) + 1
                }

            } else {
                views = {
                    ...views, zule: parseInt(views.zule) + 1
                }
            }
            await db.query('UPDATE zules SET views = ? WHERE id_zule = ?', [JSON.stringify(views), id_zule], async (err, re) => {
                if (err) {
                    console.log(err);
                    return res.status(409).json({ err })
                }
                res.json('ok')
            })
        })
    })
}

exports.likePost = async (req, res) => {
    const { userID, id_zule, type } = req.body

    await db.query('SELECT * FROM zules WHERE id_zule = ?', [id_zule], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ err })
        }
        let reviews_zule = result[0].reviews_zule ? JSON.parse(result[0].reviews_zule) : {
            comments: [],
            likes: []
        }
        reviews_zule = {
            comments: [...reviews_zule.comments],
            likes:
                type === 'like'
                    ? [...reviews_zule.likes, userID]
                    : reviews_zule.likes.filter((like) => like !== userID)
        };
        await db.query('UPDATE zules SET reviews_zule = ? WHERE id_zule = ?', [JSON.stringify(reviews_zule), id_zule], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(409).json({ err })
            }
            return res.json('ok')
        })
    })

}

exports.commentPost = async (req, res) => {
    const { user_id, name, comment, id_zule } = req.body

    await db.query('SELECT * FROM zules WHERE id_zule = ?', [id_zule], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ err })
        }
        let zule = result[0]
        let reviews_zule = zule.reviews_zule ? JSON.parse(zule.reviews_zule) : { comments: [], likes: [] }
        let allComments = [{ user_id, name, comment }, ...reviews_zule.comments]
        reviews_zule.comments = allComments
        await db.query('UPDATE zules SET reviews_zule = ? WHERE id_zule = ?', [JSON.stringify(reviews_zule), id_zule], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(409).json({ err })
            }
            res.json('ok')
        })
    })
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
        res.status(406).json({ error: 'Invalid URI' })
    }
}