const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')

const City = require('../../regions/City')
const User = require('../../auth/models/User')
const Company = require('../../auth/models/Company')
const Specialization = require('../../specializations/models/Specialization')
const Experience = require('./Experience')
const EmploymentType = require('../../employment-types/EmploymentType')

const Vacancy = sequelize.define('Vacancy', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary_from: {
        type: DataTypes.INTEGER,
    },
    salary_to: {
        type: DataTypes.STRING,
    },
    salary_type: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about_company: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Vacancy.belongsTo(City, {foreignKey: 'cityId', as: 'location'})
Vacancy.belongsTo(User, {foreignKey: 'userId'})
Vacancy.belongsTo(Company, {foreignKey: 'companyId', as: 'company'})
Vacancy.belongsTo(Specialization, {foreignKey: 'specializationId', as: 'specialization'})
Vacancy.belongsTo(Experience, {foreignKey: 'experienceId', as: 'experience'})
Vacancy.belongsTo(EmploymentType, {foreignKey: 'employment_typeId', as: 'employment_type'})

module.exports = Vacancy