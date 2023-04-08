module.exports = (sequelize, DataTypes) => {
    const ZuleSpot = sequelize.define("zulespots", {
        id_zuleSpot: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            defaultValue: 'https://img.icons8.com/fluency/48/000000/guest-male.png'
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        followers_id: {
            type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
        },
        zules: {
            type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
        }
    })

    // ZuleSpot.sync({ force: true }).then(() => console.log('ZULE SPOT MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return ZuleSpot
}