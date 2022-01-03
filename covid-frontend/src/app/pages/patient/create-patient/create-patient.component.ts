import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  isLoading = false;
  success = false;
  res;

  patientForm = this.fb.group({
    patient: this.fb.group({
      name:['', [Validators.required]],
      age:[''],
      gender:[''],
      blood_group:[''],
    }),
    demography:this.fb.group({
      height:[''],
      weight:[''],
      qualification:[''],
      job:[''],
      travel:[''],
    }),
    family:this.fb.group({
      member_name:[''],
      member_covid_history:[''],
    }),
    test:this.fb.group({
      test_date:[''],
      result:[''],
      symptoms:['']
    })
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
  }

  async onSubmit(){
    this.isLoading = true;
    const value = {...this.patientForm.value};
    const backendValue: any ={};
    if(value.patient.Name !== ''){
      // backendValue.patient = {
      //   jd_summary: value.Summary,
      //   jd_job_role: value.JDRole,
      //   jd_requirements: value.Requirements,
      //   jd_roles_responsibilities: value.Roles,
      //   jd_benefits: value.Benefits,
      //   jd_compensation: value.Compensation
      // }
      backendValue.patient = value.patient;
      backendValue.demography = value.demography;
      backendValue.test = value.test;
      backendValue.family = value.family;
      console.log('Updated backend value');

    }
    console.log("======================JD Values===================")
    console.log(backendValue);
    if(!this.patientForm.invalid){
      try {
        const resp = await this.patientService.createPatient(backendValue);
        this.res = resp;
        this.isLoading = false;
        this.success = true;
        console.log(resp);
      } catch (error) {
        let dialog = this.dialog.open(MessagePopupDialog, {
          data: {
              title: "Unable to create patient!",
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
            title: "Unable to create patient!",
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
    this.router.navigate(['../'], { relativeTo: this.route.parent });
  }
}
