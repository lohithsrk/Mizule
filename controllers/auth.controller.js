const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var uniqid = require('uniqid');

const { User, ZuleSpot } = require('../database/database')
const { transporter } = require('../utils/nodemailer.util')
const { AppError } = require('../utils/errorHandlers.util')


exports.signUp = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email }, raw: true })

    if (user) throw new AppError('User already exists', 409)

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const id_user = uniqid()

    user = await User.create({
        id_user,
        name: email.split('@')[0],
        email,
        password: hash
    })

    const token = jwt.sign({
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        phone: user.phone,
        icon: user.icon,
        followed_zuleSpots: user.followed_zuleSpots,
        subscription: user.subscription,
        history: user.history,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }, process.env.SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
    });

    return res.json({
        token,
        ...user
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, raw: true })

    if (!user) throw new AppError('User does not exist', 400)
    const zuleSpot = await ZuleSpot.findOne({ where: { owner: user.zuleSpot }, raw: true })
    if (!bcrypt.compareSync(password, user.password)) throw new AppError('Invalid email or password', 400)

    const token = jwt.sign({
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        phone: user.phone,
        icon: user.icon,
        zuleSpot,
        followed_zuleSpots: user.followed_zuleSpots,
        subscription: user.subscription,
        history: user.history,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7 * 30
    });

    return res.json({
        token,
        ...user, zuleSpot
    });
}

exports.loginWithGoogle = async (req, res) => {
    const { email, name, photo } = req.body;

    let user = await User.findOne({ where: { email }, raw: true })


    if (user) {
        const zuleSpot = await ZuleSpot.findOne({ where: { owner: user.zuleSpot }, raw: true })
        const token = jwt.sign({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            phone: user.phone,
            icon: user.icon,
            zuleSpot,
            followed_zuleSpots: user.followed_zuleSpots,
            subscription: user.subscription,
            history: user.history,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7 * 30
        });
        return res.json({
            token,
            ...user, zuleSpot
        });
    } else {
        const id_user = uniqid()

        user = await User.create({
            id_user,
            name,
            email,
            icon: photo,
            password: null
        }).then((resultEntity) => {
            const user = resultEntity.get({ plain: true })
            const token = jwt.sign({
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                phone: user.phone,
                icon: user.icon,
                followed_zuleSpots: user.followed_zuleSpots,
                subscription: user.subscription,
                history: user.history,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }, process.env.SECRET, {
                expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
            });

            return res.json({
                token,
                ...user
            });
        })

    }
}


exports.verifyEmail = async (req, res) => {
    const { email } = req.body;

    let user = await User.findOne({ where: { email }, raw: true })

    if (user) throw new AppError('User already exists', 400);

    await transporter
        .sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: `Click the link to create your account.`,
            html: `<div>
            <a href="https://mizule/verify">Click here to create your account</a>
            </div>`,
        })
        .then(async () => {
            res.json("ok");
        })
}

exports.resetPasswordVerify = async (req, res) => {
    const { email } = req.body

    const user = await User.count({ where: { email } })

    if (!user) throw new AppError('User does not exist', 400)
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Reset your Mizule Account's password",
        html: `<a href='https://mizule/reset-password'>Click here to reset your Mizule Account's password</a>`,
    }).then(() => {
        res.json('ok')
    })

}


exports.resetPassword = async (req, res) => {
    const { email, password } = req.body

    const user = await User.count({ where: { email } })
    if (!user) throw new AppError('User does not exist', 400)

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);


    await User.update({ password: hash }, { where: { email } })
    res.json('ok')
}

exports.updatePassword = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ where: { email }, raw: true })
    if (!user) throw new AppError('User does not exist.', 400);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await User.update(
        { password: hash },
        { where: { email } }
    )

    return res.json('ok')
}