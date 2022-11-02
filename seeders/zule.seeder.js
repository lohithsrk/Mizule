const zuleSeeds = require('./seeds/zule.seed')

const { Zule } = require('../database/database')

Zule.bulkCreate(zuleSeeds).then((res) => console.log(res)).catch(err => console.log(err))