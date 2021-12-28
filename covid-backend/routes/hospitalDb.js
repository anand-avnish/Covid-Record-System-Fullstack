const express = require('express');
const router = express.Router();
const db = require('../config/database');
const hospital = require('../models/Hospital');

router.get('/', (req, res) => {
    console.log(hospital.tableName);
    hospital.findAll()
        .then(det => {
            console.log(det);
            res.sendStatus(200);
        })
        .catch(err => console.log(err));
    // res.send('PATIENT');
});

module.exports = router;