const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')

const SpecializationType = require('./SpecializationType')

const Specialization = sequelize.define('Specialization', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

Specialization.belongsTo(SpecializationType, {foreignKey: 'specialization_typeId',
    as: 'specialization_type'
})
SpecializationType.hasMany(Specialization, {foreignKey: 'specialization_typeId',
    as: 'specializations'
})

module.exports = Specialization