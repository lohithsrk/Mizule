const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var uniqid = require('uniqid');

const db = require('../database/database')
const { transporter } = require('../utils/nodemailer.util')

exports.signUpPost = async (req, res) => {
    const { email, password, otp, confirmOTP } = req.body;
    if (otp !== confirmOTP) {
        return res.status(401).json('Invalid OTP. Please enter the OTP which is sent to your mail.')
    }

    await db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err)
            return res.status(500).json({
                error: err
            });

        if (results && results.length > 0)
            return res.status(409).json({
                error: 'User already exists'
            });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user_id = uniqid()

        await db.query('INSERT INTO users (user_id, name, email, password,history) VALUES (?, ?, ?, ?,?)', [user_id, email.split('@')[0], email, hash, JSON.stringify({ teasers: [], zules: [] })], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            }

            await db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err)
                    return res.status(500).json({
                        error: err
                    });
                const user = results[0];
                const token = jwt.sign({
                    user_id: results[0].user_id,
                    name: results[0].name,
                    email: results[0].email,
                    phone: results[0].phone,
                    followed_channels: results[0].followed_channels,
                    subscription: results[0].subscription,
                    history: results[0].history,
                    created_at: results[0].created_at,
                    updated_at: results[0].updated_at,
                }, process.env.SECRET, {
                    expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
                });

                return res.json({
                    token,
                    user
                });
            })
        })
    })
}

exports.loginPost = async (req, res) => {
    //Controller to make the used logged in.

    const { email, password } = req.body;
    console.log("🚀 ~ file: auth.controller.js ~ line 71 ~ exports.loginPost= ~ email, password", email, password)

    await db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Account not found.'
            });
        }

        if (results.length === 0)
            return res.status(401).json({
                error: 'Invalid email or password'
            });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({
                error: 'Invalid email or password'
            });

        const token = jwt.sign({
            user_id: results[0].user_id,
            name: results[0].name,
            email: results[0].email,
            phone: results[0].phone,
            followed_channels: results[0].followed_channels,
            subscription: results[0].subscription,
            history: results[0].history,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at,
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            user
        });
    })
}

exports.forgotPost = async (req, res) => {
    const { email } = req.body

    await db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Account not found.'
            });
        }

        try {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Reset your Mizule Account's password",
                html: `<p><a href='${process.env.BASE_URL}/app/${results[0].user_id}'>Click here</a> to reset your Mizule Account's password</p>`,
            });
            res.json('ok')
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Cannot send email. Try again after some time.' })
        }
    })
}

exports.resetPassword = async (req, res) => {
    const { user_id, password } = req.body

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await db.query('UPDATE users SET password = ? WHERE user_id = ?', [hash, user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(409).json({ err })
        }
        res.json('ok')
    })
}