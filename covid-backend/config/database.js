
const { Sequelize } = require('sequelize');

module.exports = new Sequelize('covid_record', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    } 
});