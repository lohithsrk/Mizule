const userSeeds = require('./seeds/user.seed')

const db = require('../database/database')


db.User.sync({ force: true }).then(async () => {
    console.log('USER MODEL CREATED')
    await db.User.bulkCreate(userSeeds)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
}).catch((err) => console.log('ERROR ' + err))
