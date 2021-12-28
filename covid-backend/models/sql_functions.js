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
        SELECT
            patient_id, name
        FROM patient
        where
            gender='M'
    `;

    const result = await db.query(query);
    console.log(result);
    return {data: result[0]};
}

module.exports = {getPatient};