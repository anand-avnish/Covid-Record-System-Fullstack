const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');
const Patient = require('./patient');

const test = db.define('test', {
    test_no:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    test_date:{
        type: DataTypes.DATE,
    },
    result:{
        type: DataTypes.STRING,
    },
    symptoms:{
        type: DataTypes.TEXT,
    },
    patient_id:{
        type: DataTypes.INTEGER,
        // primaryKey: true,
        references: {
            model: Patient,
            key: "patient_id"
        }
    },
    }, {
    // freezeTableName: true
        // timestamps: true
    }
)

console.log(test);

module.exports = test;

        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: JobRoleCactiModel,
        //         key: "id"
        //     }
