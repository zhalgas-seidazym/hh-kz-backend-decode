const Vacancy = require('./models/Vacancy')

const validateVacancy = (req, res, next) => {
    let errors = {}

    if(!req.body.name || req.body.name.length == 0){
        errors.name = "Поле Название обезательное"
    }
    if(!req.body.specializationId || typeof (req.body.specializationId) === 'number'){
        errors.specializationId = "Поле Специализации обезательное"
    }
    if(!req.body.cityId || typeof (req.body.cityId) === 'number'){
        errors.cityId = "Поле Где искать сотрудника обезательное"
    }
    if(!req.body.description || req.body.description.length == 0){
        errors.description = "Поле Расскажите про вакансию обезательное"
    }
    if(!req.body.employment_typeId || typeof (req.body.employment_typeId) === 'number'){
        errors.employment_typeId = "Поле Тип занятости обезательное"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()
}

const isAuthorOfVacancy = async (req, res, next) => {
    try {
        const id = req.params.id || req.body.id
        const vacancy = await Vacancy.findByPk(id)
    
        if(!vacancy) res.status(400).send({message: 'Vacancy with this id does not exist'})
        else if(vacancy.userId == req.user.id) next() 
        else res.status(401).send({message: 'Access Forbidden'})
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    validateVacancy,
    isAuthorOfVacancy
}