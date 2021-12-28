const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');
// const Patient = require('./patient');

const hospital = db.define('hospital', {
    hospital_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    city:{
        type: DataTypes.STRING,
    },
    hospital_name:{
        type: DataTypes.STRING,
    },
    state:{
        type: DataTypes.STRING,
    },
    }, {
    // freezeTableName: true
        timestamps: true
    }
)

console.log(hospital);

module.exports = hospital;
