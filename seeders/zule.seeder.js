const zuleSeeds = require('./seeds/zule.seed')

const db = require('../database/database')

// db.Zule.sync({ force: true }).then(async () => {
//     console.log('ZULE MODEL CREATED')
db.Zule.bulkCreate(zuleSeeds)
    .then((res) => console.log(res))
    .catch(err => console.log(err))
// }).catch((err) => console.log('ERROR ' + err))
