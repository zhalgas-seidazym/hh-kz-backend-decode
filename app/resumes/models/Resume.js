const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')

const City = require('../../regions/City')
const Country = require('../../regions/Country')
const User = require('../../auth/models/User')

const Resume = sequelize.define('Resume', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
    },
    salary_type: {
        type: DataTypes.STRING,
    },
    main_language: {
        type: DataTypes.STRING,
    },
    skills: {
        type: DataTypes.STRING,
    }
})

Resume.belongsTo(Country, {foreignKey: 'citizenship', as: 'citizen'})
Resume.belongsTo(City, {foreignKey: 'cityId', as: 'city'})
Resume.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Resume, {foreignKey: 'userId', as: 'resume'})

module.exports = Resume