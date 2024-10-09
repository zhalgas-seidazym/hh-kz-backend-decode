const {DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    timestamps: false
})

module.exports = Country