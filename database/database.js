// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });
// module.exports = db;
require('dotenv').config()
const Sequelize = require('sequelize');

const db = {}

const sequelize = new Sequelize.Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false
})

sequelize.authenticate().then(() => console.log('DATABASE CONNECTED')).catch(err => console.log('ERROR: ' + err))

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Zule = require('./models/zule.model')(sequelize, Sequelize.DataTypes)
db.User = require('./models/user.model')(sequelize, Sequelize.DataTypes)
db.Channel = require('./models/channel.model')(sequelize, Sequelize.DataTypes)

module.exports = db