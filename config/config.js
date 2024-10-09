const fs = require('fs')

module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'hh',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    },
    production: {
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync('/config/ca-certificate.crt')
            }
        }
    }
}