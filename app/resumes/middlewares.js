const Resume = require('./models/Resume')

const validateResume = (req, res, next) => {
    let errors = {}

    if(!req.body.first_name || req.body.first_name.length == 0){
        errors.first_name = "Поле Имя обезательное"
    }
    if(!req.body.last_name || req.body.last_name.length == 0){
        errors.last_name = "Поле Фамилия обезательное"
    }
    if(!req.body.phone || req.body.phone.length == 0){
        errors.phone = "Поле Телефон обезательное"
    }
    if(!req.body.position || req.body.position.length == 0){
        errors.position = "Поле Желаемая должность обезательное"
    }
    if(!req.body.about || req.body.about.length == 0){
        errors.about = "Поле О себе обезательное"
    }
    if(!req.body.employment_types || req.body.employment_types.length == 0){
        errors.employment_types = "Поле Занятость обезательное"
    }
    if(!req.body.gender || req.body.gender.length == 0){
        errors.gender = "Поле Пол обезательное"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()
}

const isAuthorofResume = async (req, res, next) => {
    try {
        const id = req.params.id || req.body.id
    
        const resume = await Resume.findByPk(id)
    
        if(!resume) res.status(400).send({message: 'There is no such resume'})
        else if(resume && req.user.id == resume.userId) next()
        else res.status(403).send({message: "Access Forbidden"})
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    validateResume,
    isAuthorofResume
}