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

console.log(hospital);

module.exports = hospital;
