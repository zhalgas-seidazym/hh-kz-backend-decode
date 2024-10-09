const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')

const Resume = require('./Resume')
const EmploymentType = require('../../employment-types/EmploymentType')

const ResumeEmploymentType = sequelize.define('ResumeEmploymentType', {
    
},
{
    timestamps: false
})

Resume.belongsToMany(EmploymentType, {through: ResumeEmploymentType, foreignKey: 'resumeId', as: 'employment_types'})
EmploymentType.belongsToMany(Resume, {through: ResumeEmploymentType, foreignKey: 'employment_typeId', as: 'resumes'})

module.exports = ResumeEmploymentType