const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');
const hospital = require('./Hospital');
const Patient = require('./patient');

const treatment = db.define('treatment', {
    patient_id:{
        type: DataTypes.INTEGER,
        // primaryKey: true,
        references: {
            model: Patient,
            key: "patient_id"
        }
    },
    hospital_id:{
        type: DataTypes.INTEGER,
        // primaryKey: true,
        references: {
            model: hospital,
            key: "hospital_id"
        }
    },
    admission_no:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    start_date:{
        type: DataTypes.DATE,
    },
    discharge_date:{
        type: DataTypes.DATE,
    },
    icu_admission:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    critical_condition:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    icu_days:{
        type: DataTypes.INTEGER,
    },
    }, {
    // freezeTableName: true
        // timestamps: true
    }
)

console.log(treatment);

module.exports = treatment;

        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: JobRoleCactiModel,
        //         key: "id"
        //     }
