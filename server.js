const express = require('express')
const logger = require('morgan')
const passport = require('passport')

const app = express()

app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(passport.initialize())

require('./app/auth/passport')

app.use(require('./app/auth/routes'))
app.use(require('./app/regions/routes'))
app.use(require('./app/skills/routes'))
app.use(require('./app/employment-types/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resumes/routes'))
app.use(require('./app/specializations/routes'))
app.use(require('./app/vacancies/routes'))
app.use(require('./app/applies/routes'))

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT + '\n'
        + 'http://localhost:' + PORT)
})