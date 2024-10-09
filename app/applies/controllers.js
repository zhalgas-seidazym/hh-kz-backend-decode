const {Op, where} = require('sequelize')

const Apply = require('./Apply')
const Vacancy = require('../vacancies/models/Vacancy')
const Resume = require('../resumes/models/Resume')
const User = require('../auth/models/User')
const {NEW, INVITATION, DECLINE} = require('./utils')
const sendMail = require('../utils/sendMail')
const Company = require('../auth/models/Company')


const createApply = async (req, res) => {
    try {
        const apply = await Apply.create({
            resumeId: req.body.resumeId,
            vacancyId: req.body.vacancyId,
            status: NEW
        })

        const resume = await Resume.findByPk(req.body.resumeId)
        const vacancy = await Vacancy.findByPk(req.body.vacancyId)
        const user = await User.findByPk(vacancy.userId)
        await sendMail(user.email, `Новый отклик на вакансию ${vacancy.name}`,
            `
                Имя соискателя: ${resume.first_name}
                Фамилия соискателя: ${resume.last_name}
                Номер соискателя: ${resume.phone}
            `
        )
        
        res.status(200).send(apply)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getEmployeeApplies = async (req, res) => {
    try {
        const resumes = await Resume.findAll({
            where: {
                userId: req.user.id
            }
        })
        const ids = resumes.map(item => item.id)
    
        const applies = await Apply.findAll({
            where: {
                resumeId: { [Op.in]: ids}
            },
            include: [
                {
                    model: Vacancy,
                    as: 'vacancy'
                },
                {
                    model: Resume,
                    as: 'resume'
                }
            ]
        })
    
        res.status(200).send(applies)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteApply = async (req, res) => {
    try {
        await Apply.destroy({
            where: {
                id: req.params.id
            }
        })
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const acceptEmployee = async (req, res) => {
    try {
        await Apply.update(
            {
                status: INVITATION
            },
            {
                where: {
                    id: req.body.applyId
                }
        })
        const apply = await Apply.findByPk(req.body.applyId)
        const resume = await Resume.findByPk(apply.resumeId)
        const vacancy = await Vacancy.findByPk(apply.vacancyId)
        const user = await User.findByPk(resume.userId)
        const company = await Company.findByPk(req.user.companyId)
    
        await sendMail(user.email, `Вы были приглашены на вакансию ${vacancy.name}`,
            `
            Компания: ${company.name}, пригласила вас на вакансию ${vacancy.name}, приходите по адресу ${company.address} или свяжитесь с менеджером ${req.user.full_name} по номеру ${req.user.phone}, email ${req.user.email}
            `
        )
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const declineEmployee = async (req, res) => {
    try {
        await Apply.update(
        {
            status: DECLINE
        },
        {
            where: {
                id: req.body.applyId
            }
        })
        const apply = await Apply.findByPk(req.body.applyId)
        const vacancy = await Vacancy.findByPk(apply.vacancyId)
        const resume = await Resume.findByPk(apply.resumeId)
        const user = await User.findByPk(resume.userId)
        const company = await Company.findByPk(req.user.companyId)
    
        await sendMail(user.email, `Отказ на вакансию ${vacancy.name}`,
            `
            Компания: ${company.name}, к сожалению ваша кандидатура не подходит на вакансию ${vacancy.name}
            `
        )
    
        res.status(200).end()    
    } catch (error) {
        res.status(500).send(error)
    }
}

const getVacancyApplies = async (req, res) => {
    try {
        const options = {
            vacancyId: req.params.id,
        }
        if(req.query.status && (req.query.status == NEW || 
            req.query.status == INVITATION || req.query.status == DECLINE
        )) options['status'] = req.query.status
    
        const applies = await Apply.findAll({
            where: options,
            include: {
                model: Resume,
                as: 'resume'
            }
        })
    
        res.status(200).send(applies)    
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createApply,
    getEmployeeApplies,
    deleteApply,
    acceptEmployee,
    declineEmployee,
    getVacancyApplies
}