const fs = require('fs')

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT
    },
    // production: {
    //     dialectOptions: {
    //         ssl: {
    //             ca: fs.readFileSync('/config/ca-certificate.crt')
    //         }
    //     }
    // }
}