const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')
const Role = require('./Role')
const Company = require('./Company')

const User = sequelize.define('User', {
    full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true, 
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
})

User.belongsTo(Role, {foreignKey: 'roleId'})
Role.hasMany(User, {foreignKey: 'roleId'})

User.belongsTo(Company, {foreignKey: 'companyId'})
Company.hasMany(User, {foreignKey: 'companyId'})

module.exports = User