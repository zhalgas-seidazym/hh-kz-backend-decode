const {Sequelize} = require('sequelize')
// const fs = require('fs')

const dbConf = require('./config');

let sequelize;
if(process.env.NODE_ENV === "production"){
    sequelize = new Sequelize(dbConf.production.database, dbConf.production.username, dbConf.production.password, {
        host: dbConf.production.host,
        dialect: dbConf.production.dialect,
        port: dbConf.production.port,
        dialectOptions: dbConf.production.dialectOptions
        // {
        //     ssl: {
        //         ca: fs.readFileSync('/config/ca-certificate.crt')
        //     }
        // }
    })
} else {
    sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
        host: dbConf.development.host,
        dialect: dbConf.development.dialect,
        port: dbConf.development.port
    })
}


sequelize
.authenticate()
.then(() => {
    console.log('Connection to the database has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
})

module.exports = sequelize
  