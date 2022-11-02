const jwt = require('jsonwebtoken')

const { transporter } = require('../utils/nodemailer.util')

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
    const { email } = req.body

    const otp = Math.floor(100000 + Math.random() * 900000)
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Register your Mizule Account",
            html: `<p>${otp} is the OTP to register your Mizule account. The OTP is valid only for 2 minutes.</p>`,
        });
        return res.json({ otp })
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Cannot send email. Try again after some time.' })
    }

}