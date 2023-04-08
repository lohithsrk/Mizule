
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
        password: {
            type: DataTypes.STRING,
        },
        icon: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            },
            defaultValue: 'https://img.icons8.com/fluency/48/000000/guest-male.png'
        },
        zuleSpot: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        followed_zuleSpots: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        // liked: {
        //     type: DataTypes.JSON,
        //     defaultValue: { teasers: [], zules: [] }
        // },
        watchLater: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        subscription: {
            type: DataTypes.STRING,
            defaultValue: 'free'
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

