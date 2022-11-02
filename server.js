process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null

const express = require('express')
const morgan = require('morgan')

const db = require('./database/database')

const authRouter = require('./routers/auth.route')
const zulesRouter = require('./routers/zules.route')
const validateRouter = require('./routers/validate.route')
const userRouter = require('./routers/validate.route')
const fetchZuleRouter = require('./routers/fetchZule.router')

const app = express()
app.use(express.static('zules'))
app.use(express.json())
app.use(morgan('dev'))

// db.connect((err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('MySql Connected...');
// })

// app.post('/upload-video', upload.single('my-video'), (req, res) => {
//     console.log(`Video uploaded: ${req.file}`)
// })

app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api', validateRouter)
app.use('/api/zules', zulesRouter)
app.use('/api/zules', fetchZuleRouter)


app.listen(process.env.PORT, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`))