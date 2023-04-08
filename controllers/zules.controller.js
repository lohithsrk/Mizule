const { Op } = require('sequelize');
var uniqid = require('uniqid');


const { Zule, ZuleSpot } = require('../database/database')
const { User } = require('../database/database')

const { AppError } = require('../utils/errorHandlers.util')

exports.historyPost = async (req, res) => {
    const { id_user, id_zule, type } = req.body

    var zule = await Zule.findByPk(id_zule, { raw: true })
    var user = await User.findByPk(id_user, { raw: true })

    if (!(user && zule)) throw new AppError('Invalid request', 400)

    var history = type === 'teaser' ? user.history.teasers : user.history.zules
    history = history.filter(h => h !== id_zule)
    history.unshift(id_zule)

    await User.update(
        {
            history: type === 'teaser' ? { ...user.history, teasers: history } : { ...user.history, zules: history }
        }, {
        where: { id_user }
    })

    var views = type === 'teaser' ? zule.views.teaser : zule.views.zule

    if (!views.includes(id_user)) {
        views.unshift(id_user)
        await Zule.update(
            {
                views: type === 'teaser' ? { ...zule.views, teaser: views } : { ...zule.views, zule: views }
            }, {
            where: { id_zule }
        })
    }
    return res.json({ history, views })
}

exports.getLiked = async (req, res) => {
    const { id_user } = req.params
    var user = await User.findByPk(id_user, { raw: true })
    if (!user) throw new AppError('Invalid request', 400)

    let liked = await Zule.findAll({ raw: true })

    res.json(liked)

}

exports.likeZule = async (req, res) => {
    const { id_zule } = req.body
    console.log("🚀 ~ file: zules.controller.js:57 ~ exports.likeZule= ~ id_zule:", id_zule)
    const { id_user, } = req.params
    var zule = await Zule.findByPk(id_zule, { raw: true })
    var user = await User.findByPk(id_user, { raw: true })

    if (!(user && zule)) throw new AppError('Invalid request', 400)

    if (zule.reviews.likes.includes(id_user)) {
        zule.reviews = { comments: zule.reviews.comments, likes: [...zule.reviews.likes.filter(like => like != id_user)] }
    } else {
        zule.reviews = { comments: zule.reviews.comments, likes: [...zule.reviews.likes, id_user] }
    }
    Zule.update(
        {
            reviews: zule.reviews
        }, {
        where: { id_zule }
    })
    return res.json('ok')
}

exports.commentPost = async (req, res) => {
    const { id_user, name, comment, id_zule } = req.body
    const zule = await Zule.findByPk(id_zule)
    let reviews = zule.reviews ? zule.reviews : { comments: [], likes: [] }
    let allComments = [{ id_user, name, comment }, ...reviews.comments]
    reviews.comments = allComments
    await Zule.update({ reviews }, { where: { id_zule } })
    return res.json('ok')
}

exports.createZule = async (req, res) => {
    const { title,
        description,
        zuleSpot: zuleSpotTitle,
        id_user,
        tags,
        genre,
        CBFC_rating } = req.body
    let user = await User.findByPk(id_user, { raw: true })
    let zuleSpot = await ZuleSpot.findOne({ where: { title: zuleSpotTitle }, raw: true })

    if (!user || !zuleSpot) throw new AppError('Invalid request', 409)
    const id_zule = uniqid()
    const zule = await Zule.create({
        id_zule: id_zule,
        title: title,
        description: description,
        tags: tags.split(','),
        genre: genre.split(','),

        id_zuleSpot: zuleSpot.id_zuleSpot,
        CBFC_rating: CBFC_rating,
    })

    const otherZules = zuleSpot.zules

    ZuleSpot.update(
        {
            zules: [zule.id_zule, ...otherZules]
        }, {
        where: { title: zuleSpotTitle }
    })

    res.json('ok')
}