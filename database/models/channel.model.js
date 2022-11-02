module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define("channels", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        followers_id: {
            type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []
        },
    })

    // Channel.sync({ force: true }).then(() => console.log('CHANNEL MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return Channel
}