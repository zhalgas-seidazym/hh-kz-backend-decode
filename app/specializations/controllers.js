const Specialization = require('./models/Specialization')
const SpecializationType = require('./models/SpecializationType')

const getSpecializations = async (req, res) =>{
    try {
        const specializations = await SpecializationType.findAll({
            include: {
                model: Specialization,
                as: 'specializations'
            }
        })
    
        res.status(200).send({specializations})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getSpecializations
}