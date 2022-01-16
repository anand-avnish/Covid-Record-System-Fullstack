import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';
import { PatientService } from 'src/app/services/patient.service';
import { TreatmentService } from 'src/app/services/treatment.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrls: ['./create-treatment.component.css']
})
export class CreateTreatmentComponent implements OnInit {

  isLoading = false;
  success = false;
  res;
  hospitalData;
  patient;

  treatmentForm = this.fb.group({
    patient:[''],
    hospital: ['', [Validators.required]],
    treatment: this.fb.group({
      admission_no:[''],
      start_date:[''],
      discharge_date:[''],
      icu_admission:[''],
      critical_condition:[''],
      icu_days:['']
    })
  });

  boolType:any[] = ['True', 'False'];
  hospitals:any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private treatmentService: TreatmentService,
    private hospitalService: HospitalService,
    private patientService: PatientService,
    public dialog:MatDialog
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.route.queryParams.subscribe(async val => {
        console.log(val);
        const req=await this.patientService.getPatientById(val.id);
        console.log(req);
        this.patient = req['patient']['data'][0];
        console.log(this.patient);
        this.treatmentForm.get('patient').setValue(this.patient.Name);
      });

      const data = await this.hospitalService.getHospital();
      this.hospitalData = data['hospital'];
      console.log(this.hospitalData);
      this.hospitalData.forEach(n=>{
        // console.log(n);
        this.hospitals.push(n.hospital_name);
      })
      console.log(this.hospitals);

    } catch (error) {
      console.log(error)
    }
    this.isLoading = false;
  }

  async onSubmit(){
    this.isLoading = true;
    const value = {...this.treatmentForm.value};
    const id = this.hospitalData.filter(n=> {
      if(n.hospital_name === value.hospital){
        return n.hospital_id;
      }
    })
    console.log(id);

    let backendValue: any ={};
    if(value){
      // backendValue.patient = {
      //   jd_summary: value.Summary,
      //   jd_job_role: value.JDRole,
      //   jd_requirements: value.Requirements,
      //   jd_roles_responsibilities: value.Roles,
      //   jd_benefits: value.Benefits,
      //   jd_compensation: value.Compensation
      // }
      backendValue = value.treatment;
      backendValue.patient_id = this.patient.patient_id;
      backendValue.hospital_id = id['0'].hospital_id;
      console.log('Updated backend value');

    }
    console.log("======================Treatment Values===================")
    console.log(backendValue);
    if(!this.treatmentForm.invalid){
      try {
        const resp = await this.treatmentService.createTreatment(backendValue);
        this.res = resp;
        this.isLoading = false;
        this.success = true;
        console.log(resp);
      } catch (error) {
        let dialog = this.dialog.open(MessagePopupDialog, {
          data: {
              title: "Unable to create Treatment!",
              details: `${error.error.message}`
          },
          width: '400px',
          hasBackdrop: true
        });
        this.isLoading = false;
        console.log("=================error====================")
        console.log(error);
      }
    }else{
      let dialog = this.dialog.open(MessagePopupDialog, {
        data: {
            title: "Unable to create Treatment!",
            details: `Enter all the required(*) field before submitting.`
        },
        width: '400px',
        hasBackdrop: true
      });
      console.log('No Values');
      this.isLoading = false;
    }

  }

  goBack(): void {
    this.router.navigate(['../../patient'], { relativeTo: this.route.parent });
  }
}
