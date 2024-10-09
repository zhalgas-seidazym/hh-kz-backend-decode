const {Op} = require('sequelize')

const Resume = require('./models/Resume')
const Education = require('./models/Education')
const WorkingHistory = require('./models/WorkingHistory')
const ForeignLanguage = require('./models/ForeignLanguage')
const ResumeEmploymentType = require('./models/ResumeEmploymentType')
const EmploymentType = require('../employment-types/EmploymentType')
const City = require('../regions/City')
const Country = require('../regions/Country')

const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            position: req.body.position,
            cityId: req.body.cityId,
            citizenship: req.body.citizenship,
            about: req.body.about,
            birthday: req.body.birthday,
            gender: req.body.gender,
            salary: req.body.salary,
            salary_type: req.body.salary_type,
            main_language: req.body.main_language,
            skills: req.body.skills,
            userId: req.user.id
        })
    
        if(req.body.working_histories && 
            req.body.working_histories.length > 0){
            req.body.working_histories.forEach(async history => {
                await WorkingHistory.create({
                    resumeId: resume.id,
                    company_name: history.company_name,
                    company_description: history.company_description,
                    responsibilities: history.responsibilities,
                    start_date: history.start_date,
                    end_date: history.end_date,
                })
            })
        }
    
        
    
        if(req.body.educations && 
            req.body.educations.length > 0){
            req.body.educations.forEach(async edu => {
                await Education.create({
                    resumeId: resume.id,
                    level: edu.level,
                    university_name: edu.university_name,
                    major: edu.major,
                    faculty: edu.faculty,
                    end_date: edu.end_date
                })
            })
        }
    
        if(req.body.foreign_languages && 
            req.body.foreign_languages.length > 0){
            req.body.foreign_languages.forEach(async lang => {
                await ForeignLanguage.create({
                    resumeId: resume.id,
                    name: lang.name,
                    level: lang.level
                })
            })
        }
    
        req.body.employment_types.forEach(async type => {
            await ResumeEmploymentType.create({
                resumeId: resume.id,
                employment_typeId: type
            })
        })
    
        res.status(200).send(resume)
    } catch (error) {
        res.status(500).send(error)
    }

}

const getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll({where: {userId: req.user.id}})
    
        res.status(200).send(resumes)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findByPk(req.params.id, {
            include: [
                {
                    model: WorkingHistory,
                    as: "working_histories"
                },
                {
                    model: Education,
                    as: "educations"
                },
                {
                    model: ForeignLanguage,
                    as: "foreign_languages"
                },
                {
                    model: EmploymentType,
                    as: "employment_types"
                },
                {
                    model: City,
                    as: 'city'
                },
                {
                    model: Country,
                    as: 'citizen'
                }
            ]
        })
    
        if(!resume) res.status(400).send({message: 'There is no such resume'})
        else res.status(200).send(resume)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteResume = async (req, res) => {
    try {
        await Resume.destroy({where: {
            id: req.params.id
        }})
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const editResume = async (req, res) => {
    try {
        await Resume.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            position: req.body.position,
            cityId: req.body.cityId,
            citizenship: req.body.citizenship,
            about: req.body.about,
            birthday: req.body.birthday,
            gender: req.body.gender,
            salary: req.body.salary,
            salary_type: req.body.salary_type,
            main_language: req.body.main_language,
            skills: req.body.skills
        },{
            where: {id: req.body.id}
        })
    
        await WorkingHistory.destroy({
            where: {
                resumeId: req.body.id
            }
        })
    
        await Education.destroy({
            where: {
                resumeId: req.body.id
            }
        })
    
        await ResumeEmploymentType.destroy({
            where: {
                resumeId: req.body.id
            }
        })
    
        await ForeignLanguage.destroy({
            where: {
                resumeId: req.body.id
            }
        })
    
        if(req.body.working_histories && 
            req.body.working_histories.length > 0){
            req.body.working_histories.forEach(async history => {
                await WorkingHistory.create({
                    resumeId: req.body.id,
                    company_name: history.company_name,
                    company_description: history.company_description,
                    responsibilities: history.responsibilities,
                    start_date: history.start_date,
                    end_date: history.end_date,
                })
            })
        }
    
        
    
        if(req.body.educations && 
            req.body.educations.length > 0){
            req.body.educations.forEach(async edu => {
                await Education.create({
                    resumeId: req.body.id,
                    level: edu.level,
                    university_name: edu.university_name,
                    major: edu.major,
                    faculty: edu.faculty,
                    end_date: edu.end_date
                })
            })
        }
    
        if(req.body.foreign_languages && 
            req.body.foreign_languages.length > 0){
            req.body.foreign_languages.forEach(async lang => {
                await ForeignLanguage.create({
                    resumeId: req.body.id,
                    name: lang.name,
                    level: lang.level
                })
            })
        }
    
        req.body.employment_types.forEach(async type => {
            await ResumeEmploymentType.create({
                resumeId: req.body.id,
                employment_typeId: type
            })
        })
    
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

const searchResume = async (req, res) => {
    try {
        const options = {}
        const {q, cityId, salary_to, salary_type, citizenship} = req.query
        if(q){
            options[Op.or] = [
                {first_name: { [Op.iLike]: `%${q}%`}},
                {last_name: { [Op.iLike]: `%${q}%`}},
                {position: { [Op.iLike]: `%${q}%`}},
                {about: { [Op.iLike]: `%${q}%`}},
                {skills: { [Op.iLike]: `%${q}%`}}
            ]
        }
        if(citizenship){
            options.citizenship = citizenship
        }
        if(cityId){
            options.cityId = cityId
        }
        if(salary_type){
            options.salary_type = {[Op.iLike]: salary_type}
        }
        if(salary_to){
            options.salary = { [Op.lte]: salary_to}
        }
    
        const resumes = await Resume.findAll({
            where: options
        })
    
        res.status(200).send(resumes)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createResume,
    getMyResumes,
    getResume,
    deleteResume,
    editResume,
    searchResume
}