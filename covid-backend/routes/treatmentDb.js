const express = require('express');
const router = express.Router();
const db = require('../config/database');
const treatment = require('../models/Treatment');
const sqlFunctions = require('../models/sql_functions');

//Gives list of treatment
router.get('/', async (req, res) => {
    console.log(treatment.tableName);
    try {
        const treatments = await sqlFunctions.getTreatment();
        console.log(treatments);
        return res.status(200).json({
            message: `Treatments`,
            treatments
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(err.message);
    }
});

//Gives Treatment by id
router.get('/getTreatmentById', async (req, res) => {
    const body = req.query;
    console.log(body);
    console.log(treatment.tableName);
    try {
        const Treatment = await sqlFunctions.getTreatmentbyId(body);
        console.log("Treatment");
        console.log(Treatment);
        return res.status(200).json({
            // message: `Patient`
            Treatment
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

// create treatment format
// {
//     "city": "Bangalore",
//     "hospital_name": "BGS",
//     "state": "Karnataka"
// }
router.post('/createTreatment', async (req, res) => {
    console.log(treatment.tableName);
    const body = req.body;
    console.log(body);
    try {
        const Treatment = await treatment.create(body);

        return res.status(200).json({
            message: `Successfully created Treatment with patient id ${Treatment.patient_id}`,
            Treatment
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

});

router.post('/updateTreatment', async (req, res) => {
    console.log(treatment.tableName);
    const body = req.body;
    console.log(body);
    try {
        const Treatment = await treatment.update(body,{
            where: {
                hospital_id: body.hospital_id,
                patient_id: body.patient_id
            }
        });

        return res.status(200).json({
            message: `Successfully updated treatment with patient id ${body.patient_id}`,
            Treatment
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

});

//delete hospital
router.post('/removeTreatment', async (req, res) => {
    const body = req.body;
    console.log(body);
    // const id = body.hospital_id;
    // console.log(id);

    try {
        await treatment.destroy({
            where: {
                hospital_id: body.hospital_id,
                patient_id: body.patient_id
            }
        });

        return res.status(200).json({
            message: `Successfully removed treatment with patient id ${body.patient_id}`
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;