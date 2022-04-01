const Sequelize = require('sequelize');

const dbSettings = require('./dbSettings')

const sequelize = new Sequelize(dbSettings.database, dbSettings.username, dbSettings.password, {
    dialect: dbSettings.driver,
    host: dbSettings.host,
});

module.exports = sequelize