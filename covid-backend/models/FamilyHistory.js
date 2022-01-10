const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');
const Patient = require('./patient');

const familyHistory = db.define('family_history', {
    member_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    member_blood_group:{
        type: DataTypes.STRING,
    },
    member_name:{
        type: DataTypes.STRING,
    },
    member_covid_history:{
        type: DataTypes.BOOLEAN,
    },
    patient_id:{
        type: DataTypes.INTEGER,
        // foreignKey: true,
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

console.log(familyHistory);

module.exports = familyHistory;

        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: JobRoleCactiModel,
        //         key: "id"
        //     }
