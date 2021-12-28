const express = require('express');
const {customAlphabet} = require('nanoid');
const router = express.Router();
const db = require('../config/database');
const demography = require('../models/Demography');
const familyHistory = require('../models/FamilyHistory');
const Patient = require('../models/Patient');
const sqlFunctions = require('../models/sql_functions');
const test = require('../models/Test');

const nanoid = customAlphabet('1234567890', 5)

//Gives list of patient
router.get('/', async (req, res) => {
    console.log(Patient.tableName);
    try {
        const patient = await sqlFunctions.getPatient();
        console.log(patient);
    } catch (error) {
        console.log(error);
    }
    Patient.findAll()
        .then(patient => {
            console.log(patient);
            return res.status(200).json({
                // message: `Patient`
                patient
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
});

//create patient format
// {
//     "name": "Ravi",
//     "age": 20,
//     "gender": "M",
//     "blood_group": "O+"
// }
router.post('/createPatient', async (req, res) => {
    console.log(Patient.tableName);
    const body = req.body;
    console.log(body);
    try {
        const patient = await Patient.create(body);

        return res.status(200).json({
            message: `Successfully created patient with id ${patient.patient_id}`,
            patient
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
        // const patient = await Patient.findOne({
        //     where: {
        //         Patient_id: body.patient_id
        //     }
        // });
        // console.log(patient);
        // if (patient == null) {
            
        // } else {
        //     return res.status(500).json({
        //         message: `Patient already exist with id ${body.patient_id}`
        //     });
        // }

});

router.post('/createFullPatient', async (req, res) => {
    // console.log(Patient.tableName);
    // const patient_id = nanoid();
    const body = req.body;
    console.log(body);

    const patientDetails = body.patient;
    console.log(patientDetails);
    // patientDetails.patient_id = patient_id;

    // const member_id = nanoid();
    // familyDetails.member_id = member_id;
    const familyDetails = body.family;
    console.log(familyDetails);
    
    const demographyDetails = body.demography;
    console.log(demographyDetails);
    // demographyDetails.patient_id = patient_id;
    
    const testDetails = body.test;
    console.log(testDetails);
    // const test_no = nanoid();
    // testDetails.patient_id = patient_id;
    // testDetails.test_no = test_no;
    
    try {
        const patient = await Patient.create(patientDetails);
        console.log(patient);
        
        familyDetails.patient_id = patient.patient_id;
        const family = await familyHistory.create(familyDetails);
        console.log(family);
        
        demographyDetails.patient_id = patient.patient_id;
        console.log(demographyDetails);
        const demograph = await demography.create(demographyDetails);
        console.log(demograph);

        testDetails.patient_id = patient.patient_id;
        console.log(testDetails);
        const testDet = await test.create(testDetails);
        console.log(testDet);
        
        return res.status(200).json({
            message: `Successfully created patient with id ${patient.patient_id}, member with member id ${family.member_id}, demography, test with test no ${testDet.test_no}`
        });
        // const patient = await Patient.findOne({
        //     where: {
        //         Patient_id: body.patient_id
        //     }
        // });
        // console.log(patient);
        // if (patient == null) {
        //     await Patient.create(body);

        // } else {
        //     return res.status(500).json({
        //         message: `Patient already exist with id ${body.patient_id}`
        //     });
        // }

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;