const Resume = require('../resumes/models/Resume')
const Apply = require('./Apply')

const validateApply = (req, res, next) => {
    let errors = {}

    if(!req.body.resumeId || req.body.resumeId.length == 0){
        errors.resumeId = 'Поле Resume обезательное'
    }
    if(!req.body.vacancyId || req.body.vacancyId.length == 0){
        errors.vacancyId = 'Поле Имя и Фамилия обезательное'
    }
    
    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(403).send(errors)
    else next()
}

const isAuthorofApply = async (req, res, next) => {
    try {
        const id = req.params.id
    
        const apply = await Apply.findByPk(id)
        
        if(!apply) res.status(400).send({message: 'There is no such apply'})
        else if(apply){
            const resume = await Resume.findByPk(apply.resumeId)
            if(resume.userId == req.user.id) next()
            else res.status(403).send({message: "Access Forbidden"})
        }    
    } catch (error) {
        res.status(500).send(error)
    }
}

const isApplyExists = async (req, res, next) => {
    try {
        const apply = await Apply.findByPk(req.body.applyId)
    
        if(!apply) res.status(400).send({message: 'Apply with this id does not exists'})
        
        req.body.id = apply.vacancyId
        next()
    } catch (error) {
        res.status(500).send(error)
    }
} 

module.exports = {
    validateApply,
    isAuthorofApply,
    isApplyExists
}