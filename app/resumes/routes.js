const express = require('express')
const router = express.Router()
const passport = require('passport')

const {isEmployee} = require('../auth/middlewares')
const {validateResume, isAuthorofResume} = require('./middlewares')
const {createResume, getMyResumes, getResume, 
    deleteResume, editResume, searchResume} = require('./controllers')

router.post('/api/resume', 
    passport.authenticate('jwt', {session: false}),
    isEmployee, validateResume, createResume
)
router.get('/api/resume', 
    passport.authenticate('jwt', {session: false}),
    isEmployee, getMyResumes
)
router.get('/api/resume/search', searchResume)
router.get('/api/resume/:id', 
    passport.authenticate('jwt', {session: false}),
    getResume
)
router.delete('/api/resume/:id',
    passport.authenticate('jwt', {session: false}),
    isEmployee, isAuthorofResume, deleteResume
)
router.put('/api/resume',
    passport.authenticate('jwt', {session: false}),
    isEmployee, isAuthorofResume, validateResume, editResume
)

module.exports = router