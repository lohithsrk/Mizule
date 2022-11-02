const channelSeeds = require('./seeds/channel.seed')

const { Channel } = require('../database/database')

Channel.bulkCreate(channelSeeds).then((res) => console.log(res)).catch(err => console.log(err))