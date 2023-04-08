const zuleSpots = require('./seeds/zuleSpot.seed')

const db = require('../database/database')

db.ZuleSpot.sync({ force: true }).then(async () => {
    console.log('ZULESPOT MODEL CREATED')
    await db.ZuleSpot.bulkCreate(zuleSpots)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
}).catch((err) => console.log('ERROR ' + err))
