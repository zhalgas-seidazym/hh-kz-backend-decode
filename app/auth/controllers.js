const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const sendMail = require('../utils/sendMail')
const AuthCode = require('./models/AuthCode')
const User = require('./models/User')
const Role = require('./models/Role')
const Company = require('./models/Company')

const {jwtOptions} = require('./passport')

const sendVerificationEmail = async (req, res) => {
    try {
        const code = 'HH' + Date.now()
        await sendMail(req.body.email, 'Authorization code', code)
        await AuthCode.create({
            email:req.body.email,
            code: code,
            valid_till: Date.now() + 120000
        })
    
        res.status(200).end()    
    } catch (error) {
        res.status(500).send(error)
    }
}

const verifyCode = async (req, res) =>{
    try {
        const authCode = await AuthCode.findOne({
            where: {email: req.body.email},
            order: [['valid_till', 'desc']]
        })
        if (!authCode) {
            return res.status(401).send({error: 'Code is invalid'})
        }
        else if (authCode.valid_till < Date.now()) {
            deleteAuthCodes(req.body.email)
            return res.status(401).send({error: 'Time for entering code is expired'})
        }
        else if(authCode.code != req.body.code){
            return res.status(401).send({error: 'Code is invalid'})
        }
        else {
            deleteAuthCodes(req.body.email)
            let user = await User.findOne({where: {email: req.body.email}})
            const role = await Role.findOne({where: {
                name: 'employee'
            }})
            if(!user){
                user = await User.create({
                    roleId: role.id,
                    email: req.body.email
                })
            }
    
            const token = jwt.sign({
                id: user.id, 
                email: user.email,
                full_name: user.full_name,
                role: {
                    id: role.id,
                    name: role.name
                }
            }, jwtOptions.secretOrKey, {
                expiresIn: 24 * 60 * 60 * 7
            })
    
            res.status(200).send({token})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteAuthCodes = async (email) => {
    try {
        await AuthCode.destroy({where: {email: email}})
    } catch (error) {
        res.status(500).send(error)
    }
}

const signUp = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: {
                name: 'manager'
            }
        })
    
        const company = await Company.create({
            name: req.body.company_name,
            description: req.body.company_description,
            address: req.body.company_address,
            logo: '/company/' + req.file.filename 
        })
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        await User.create({
            email: req.body.email,
            password: hashedPassword,
            full_name: req.body.full_name,
            companyId: company.id,
            roleId: role.id
        })
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const signIn = async (req, res) => {
    try {
        if(!req.body.email || req.body.email.length == 0 ||
            !req.body.password || req.body.password.length == 0){
            res.status(401).send({message: 'Bad Credentials'})
        }
        else {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
    
            if(!user) return res.status(401).send({message: 'User with this email does not exist'})
            
            const isMatch = await bcrypt.compare(req.body.password, user.password)
    
            if(isMatch){
                const role = await Role.findByPk(user.roleId)
                const token = jwt.sign({
                    id: user.id, 
                    email: user.email,
                    full_name: user.full_name,
                    role: {
                        id: role.id,
                        name: role.name
                    }
                }, jwtOptions.secretOrKey, {
                    expiresIn: 24 * 60 * 60 * 7
                })
        
                res.status(200).send({token})
            }
            else {
                res.status(401).send({message: 'Incorrect password'})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    sendVerificationEmail,
    verifyCode,
    signUp,
    signIn
}