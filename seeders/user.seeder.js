const userSeeds = require('./seeds/user.seed')

const { User } = require('../database/database')

User.bulkCreate(userSeeds).then((res) => console.log(res)).catch(err => console.log(err))