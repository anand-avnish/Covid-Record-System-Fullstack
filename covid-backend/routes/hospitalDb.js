const express = require('express');
const router = express.Router();
const db = require('../config/database');
const hospital = require('../models/Hospital');

//Gives list of hospital
router.get('/', async (req, res) => {
    console.log(hospital.tableName);
    try {
        const hospital = await sqlFunctions.getHospital();
        console.log(hospital);
    } catch (error) {
        console.log(error);
    }
    hospital.findAll()
        .then(hospital => {
            console.log(hospital);
            return res.status(200).json({
                message: `Hospitals`,
                hospital
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
});

// create hospital format
// {
//     "city": "Bangalore",
//     "hospital_name": "BGS",
//     "state": "Karnataka"
// }
router.post('/createHospital', async (req, res) => {
    console.log(hospital.tableName);
    const body = req.body;
    console.log(body);
    try {
        const Hospital = await hospital.create(body);

        return res.status(200).json({
            message: `Successfully created hospital with id ${Hospital.hospital_id}`,
            Hospital
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

});

module.exports = router;