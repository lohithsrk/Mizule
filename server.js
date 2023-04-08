process.env.NODE_ENV !== 'production' && require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const db = require('./database/database')

const authRouter = require('./routes/auth.route')
const zulesRouter = require('./routes/zules.route')
const userRouter = require('./routes/user.route')
const fetchZuleRouter = require('./routes/fetchZule.route')
const zuleSpotRouter = require('./routes/zuleSpot.route')

const app = express()
app.use(express.static('zules'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/zules', zulesRouter)
app.use('/api/zules', fetchZuleRouter)
app.use('/api/zulespot', zuleSpotRouter)

app.use((req, res) => {
    res.status(404).json('NOT FOUND!')
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    console.log(err);
    res.status(status).json(message);
})

app.listen(process.env.PORT, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`))