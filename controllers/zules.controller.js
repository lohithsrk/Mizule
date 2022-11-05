const { Zule } = require('../database/database')

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
            let views = results[0].views
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
    try {
        const { userID, id_zule, type } = req.body

        const zuleUpdateStatus = await Zule.update(
            {
                comments: [...reviews_zule.comments],
                likes:
                    type === 'like'
                        ? [...reviews_zule.likes, userID]
                        : reviews_zule.likes.filter((like) => like !== userID)

            }, {
            where: {
                id: id_zule
            }
        })
        return res.json('ok')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
}

exports.commentPost = async (req, res) => {
    const { user_id, name, comment, id_zule } = req.body

    await db.query('SELECT * FROM zules WHERE id_zule = ?', [id_zule], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ err })
        }
        let zule = result[0]
        let reviews_zule = zule.reviews_zule ? zule.reviews_zule : { comments: [], likes: [] }
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