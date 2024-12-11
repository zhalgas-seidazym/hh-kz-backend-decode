const fs = require('fs')

module.exports = {
    development: {
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || 'zhalgas2005',
        database: process.env.DB_NAME || "postgres",
        host: process.env.DB_HOST || "localhost",
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432
    },
    // production: {
    //     dialectOptions: {
    //         ssl: {
    //             ca: fs.readFileSync('/config/ca-certificate.crt')
    //         }
    //     }
    // }
}