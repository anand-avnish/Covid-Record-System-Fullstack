const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Patient = db.define('patient', {
    patient_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    age:{
        type: DataTypes.INTEGER,
    },
    gender:{
        type: DataTypes.STRING,
    },
    blood_group:{
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    }
    }, {
    // freezeTableName: true
        timestamps: true
    }
)

console.log(Patient);

module.exports = Patient;

        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: JobRoleCactiModel,
        //         key: "id"
        //     }
