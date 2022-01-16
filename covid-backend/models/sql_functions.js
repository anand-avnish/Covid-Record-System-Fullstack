const { where } = require('sequelize');
const db = require('../config/database');

// async function getCandidatesOfRequirement(id) {
//     const query = `
//         SELECT
//             personal.id, name, email, mobile_number, location, qualification,
//             total_work_ex, salary, preferred_location, employer_name, industry, sub_domain,
//             expertise_area, preferred_work_location, engagement_type, service_type, availability,
//             BYOD, notice_period, global_experience, willing_to_relocate
//         FROM staffing_details staffing
//             inner join personal_details personal on personal.id = staffing.candidate_id
//             left outer join experience_details exp on personal.id = exp.candidate_id
//             left outer join educational_details edu on personal.id = edu.candidate_id
//             left outer join additional_candidate_details ac on personal.id = ac.candidate_id
//         where
//             (edu.isLatest = 1 or
//             edu.isLatest is null) and
//             requirement_id = @id and
//             not current_status = 'Unassociated'
//     `;
//     const pool = await db;
//     let req = await pool.request();
//     req = req.input("id", id) ;

//     const result = await req.query(query);
//     console.log(query);
//     return {data: result.recordset};
// }

async function getPatient() {
    const query = `
        SELECT *
        FROM patient p, demography d, family_history f, test t 
        where
            p.patient_id=d.patient_id and p.patient_id=f.patient_id and p.patient_id=t.patient_id
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function getPatientbyId(patientId) {
    const query = `
        SELECT *
        FROM patient p, demography d, family_history f, test t 
        where
            p.patient_id=d.patient_id and 
            p.patient_id=f.patient_id and 
            p.patient_id=t.patient_id and
            p.patient_id = ${patientId}
    `;
    
    // const pool = await db;
    // let req = await db.request();
    // req = req.input("id", patientId) ;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function deletePatientbyId(patientId) {
    const query = `
        DELETE 
        FROM patient
        where patient_id = ${patientId}
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function getHospital() {
    const query = `
        SELECT *
        FROM hospital
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function getHospitalbyId(hospitalID) {
    const query = `
        SELECT *
        FROM hospital
        where hospital_id = ${hospitalID}
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function getTreatment() {
    const query = `
        SELECT p.patient_id, h.hospital_id, p.name, h.hospital_name, t.admission_no, t.start_date, t.discharge_date, t.icu_admission, t.critical_condition, t.icu_days
        FROM treatment t, patient p, hospital h  
        where
            t.patient_id=p.patient_id and 
            t.hospital_id=h.hospital_id
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

async function getTreatmentbyId(body) {
    const query = `
        SELECT p.patient_id, h.hospital_id, p.name, h.hospital_name, t.admission_no, t.start_date, t.discharge_date, t.icu_admission, t.critical_condition, t.icu_days
        FROM treatment t, patient p, hospital h  
        where
            t.patient_id=p.patient_id and 
            t.hospital_id=h.hospital_id and
            t.hospital_id = ${body.hospital_id} and
            t.patient_id = ${body.patient_id}
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

module.exports = {getPatient, getHospital, getPatientbyId, getHospitalbyId, getTreatment, getTreatmentbyId};