const express = require('express');
const router = express.Router();
const db = require('../config/database');
const hospital = require('../models/Hospital');
const sqlFunctions = require('../models/sql_functions');

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

//Gives Hospital by id
router.get('/getHospitalById', async (req, res) => {
    const hospitalID = req.query.id;
    console.log(hospitalID);
    console.log(hospital.tableName);
    try {
        const hospital = await sqlFunctions.getHospitalbyId(hospitalID);
        console.log("Hospital");
        console.log(hospital);
        return res.status(200).json({
            // message: `Patient`
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
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

router.post('/updateHospital', async (req, res) => {
    console.log(hospital.tableName);
    const body = req.body;
    console.log(body);
    try {
        const Hospital = await hospital.update(body,{
            where: {
                hospital_id: body.hospital_id
            }
        });

        return res.status(200).json({
            message: `Successfully updated hospital ${body.hospital_name}`,
            Hospital
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

});

//delete hospital
router.post('/removeHospital', async (req, res) => {
    const body = req.body;
    console.log(body);
    const id = body.hospital_id;
    console.log(id);

    try {
        await hospital.destroy({
            where: {
                hospital_id: id
            }
        });

        return res.status(200).json({
            message: `Successfully removed hospital with id ${id}`
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;