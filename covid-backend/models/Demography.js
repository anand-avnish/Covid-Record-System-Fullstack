const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');
const Patient = require('./patient');

const demography = db.define('demography', {
    patient_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Patient,
            key: "patient_id"
        }
    },
    height:{
        type: DataTypes.FLOAT,
    },
    weight:{
        type: DataTypes.FLOAT,
    },
    qualification:{
        type: DataTypes.STRING,
    },
    job:{
        type: DataTypes.STRING,
    },
    travel:{
        type: DataTypes.STRING,
    },
    }, {
    // freezeTableName: true
        // timestamps: true
    }
)

console.log(demography);

module.exports = demography;

        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: JobRoleCactiModel,
        //         key: "id"
        //     }
