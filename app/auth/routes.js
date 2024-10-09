const express = require('express')
const router = express.Router()
const {upload} = require('../utils/multer')

const {sendVerificationEmail, verifyCode, signUp, signIn} = require('./controllers')
const {validateSignUp} = require('./middlewares')

router.post('/api/auth/sendmail', sendVerificationEmail)
router.post('/api/auth/verifycode', verifyCode)

router.post('/api/auth/signup', upload.single('company_logo'), validateSignUp, signUp)
router.post('/api/auth/signin', signIn)

module.exports = router
