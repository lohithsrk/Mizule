const jwt = require('jsonwebtoken')

const { transporter } = require('../utils/nodemailer.util')
const { User } = require('../database/database')

exports.validateUser = async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token.split('Bearer ')[1], process.env.SECRET, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: 'Failed to authenticate token'
                });
            }
            req.user = decoded;
            res.json({
                user: { ...decoded }
            })
        });
    } else {
        return res.status(401).json({
            error: 'No token provided'
        });
    }
}

exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.count({ where: { email } })
        if (user) return res.status(404).json({ error: 'User already found' })
        const otp = Math.floor(100000 + Math.random() * 900000)
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Register your Mizule Account",
            html: `<p>${otp} is the OTP to register your Mizule account. The OTP is valid only for 2 minutes.</p>`,
        });
        return res.json({ otp })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}