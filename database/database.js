process.env.NODE_ENV !== 'production' && require('dotenv').config()
const Sequelize = require('sequelize');

const db = {}

const sequelize = new Sequelize.Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
})

sequelize.authenticate().then(() => console.log('DATABASE CONNECTED')).catch(err => console.log('ERROR: ' + err))

db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = require('./models/user.model')(sequelize, Sequelize.DataTypes)
db.Zule = require('./models/zule.model')(sequelize, Sequelize.DataTypes)
db.ZuleSpot = require('./models/zuleSpot.model')(sequelize, Sequelize.DataTypes)

module.exports = db