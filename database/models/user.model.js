
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id_user: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                min: 13, max: 13
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            },
            defaultValue: 'https://img.icons8.com/fluency/48/000000/guest-male.png'
        },
        followed_channels: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        subscription: {
            type: DataTypes.STRING,
            defaultValue: 'free'
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'standard'
        },
        history: {
            type: DataTypes.JSON,
            defaultValue:
                { teasers: [], zules: [] }
        }
    })
    // User.sync({ force: true }).then(() => console.log('USER MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return User
}

