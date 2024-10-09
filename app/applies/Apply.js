const {DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Resume = require('../resumes/models/Resume')
const Vacancy = require('../vacancies/models/Vacancy')

const Apply = sequelize.define('Apply', {
    status: {
        type: DataTypes.STRING,
        allowNull: false 
    }
})
Apply.belongsTo(Resume, { foreignKey: 'resumeId', as: 'resume'})
Apply.belongsTo(Vacancy, { foreignKey: 'vacancyId', as: 'vacancy'})

module.exports = Apply