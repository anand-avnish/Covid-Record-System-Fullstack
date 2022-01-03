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
        return res.status(200).json({
            // message: `Patient`
            patient
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);

    }
    // Patient.findAll()
    //     .then(patient => {
    //         console.log(patient);
    //         return res.status(200).json({
    //             // message: `Patient`
    //             patient
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).send(err.message);
    //     });
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

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// update patient with
router.post('/updatePatient', async (req, res) => {
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

        const patient = await Patient.update(patientDetails, {
            where: {
                patient_id: patientDetails.patient_id
            }
        });
        console.log(patient);
        
        familyDetails.patient_id = patient.patient_id;
        const family = await familyHistory.update(familyDetails, {
            where: {
                member_id: familyDetails.member_id
            }
        });
        console.log(family);
        
        demographyDetails.patient_id = patient.patient_id;
        console.log(demographyDetails);
        const demograph = await demography.update(demographyDetails, {
            where: {
                patient_id: patientDetails.patient_id
            }
        });
        console.log(demograph);

        testDetails.patient_id = patient.patient_id;
        console.log(testDetails);
        const testDet = await test.update(testDetails, {
            where: {
                test_no: test_no.test_no
            }
        });
        console.log(testDet);
        
        return res.status(200).json({
            message: `Successfully updated patient with id ${patient.patient_id}, member with member id ${family.member_id}, demography, test with test no ${testDet.test_no}`
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

//delete patient
router.post('/removePatient', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        await Patient.destroy({
            where: {
                patient_id: body.patient_id
            }
        });
        await familyHistory.destroy({
            where: {
                member_id: body.member_id
            }
        });
        await demography.destroy({
            where: {
                patient_id: body.patient_id
            }
        });
        await test.destroy({
            where: {
                test_no: body.test_no
            }
        });

        return res.status(200).json({
            message: `Successfully removed patient with id ${body.patient_id}, member with member id ${body.member_id}, demography, test with test no ${body.test_no}`
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;