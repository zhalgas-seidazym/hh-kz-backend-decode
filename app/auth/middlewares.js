const Role = require('./models/Role')
const User = require('./models/User')

const isEmployee = async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.user.roleId)
    
        if(role.name == 'employee') next()
        else res.status(403).send({message: 'Access denied'})
    } catch (error) {
        res.status(500).send(error)
    }
}

const isManager = async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.user.roleId)
    
        if(role.name == 'manager') next()
        else res.status(403).send({message: 'Access denied'})
    } catch (error) {
        res.status(500).send(error)
    }
}

const validateSignUp = async (req, res, next) => {
    try {
        let errors = {}
    
        if(!req.body.email || req.body.email.length == 0){
            errors.email = 'Поле Email обезательное'
        }
        if(!req.body.full_name || req.body.full_name.length == 0){
            errors.full_name = 'Поле Имя и Фамилия обезательное'
        }
        if(!req.body.company_name || req.body.company_name.length == 0){
            errors.company_name = 'Поле Имя компании обезательное'
        }
        if(!req.body.password || req.body.password.length == 0){
            errors.password = 'Поле Пароль обезательное'
        }
        if(!req.body.password2 || req.body.password2.length == 0){
            errors.password2 = 'Поле Подтвердить пароль обезательное'
        }
        
        if(req.body.password != req.body.password2){
            errors.repassword = 'Пароли не совпадают'
        }
        
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if(user){
            errors.email = 'Пользователь с таким email уже существует'
        }
    
        if(JSON.stringify(errors) !== JSON.stringify({})) res.status(403).send(errors)
        else next()
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    isEmployee,
    isManager,
    validateSignUp
}