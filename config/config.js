const fs = require('fs')

module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'hh',
        host: 'localhost',
        dialect: 'postgres',
        port: 5435
    },
    // production: {
    //     dialectOptions: {
    //         ssl: {
    //             ca: fs.readFileSync('/config/ca-certificate.crt')
    //         }
    //     }
    // }
}