import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  isLoading = false;
  success = false;
  res;
  data;

  patientForm = this.fb.group({
    patient: this.fb.group({
      patient_id:[''],
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
      member_id:[''],
      member_name:[''],
      member_blood_group:[''],
      member_covid_history:[''],
    }),
    test:this.fb.group({
      test_no:[''],
      test_date:[''],
      result:[''],
      symptoms:['']
    })
  });

  genders:any[] = ['M', 'F'];
  results:any[] = ['Positive', 'Negative'];
  bloodGroups:any[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog:MatDialog,
  ) { }

  async ngOnInit() {
    this.isLoading=true;
    this.route.queryParams.subscribe(async val => {
      console.log(val);
      const req=await this.patientService.getPatientById(val.id);
      console.log(req);
      this.data = req['patient']['data'][0];
      console.log(this.data);
      this.formFill();
    });
    this.isLoading=false;
  }

  formFill(){
    if(this.data!=undefined){

      this.patientForm.get('patient.patient_id').setValue(this.data.Patient_id);
      this.patientForm.get('patient.name').setValue(this.data.Name);
      this.patientForm.get('patient.age').setValue(this.data.Age);
      this.patientForm.get('patient.gender').setValue(this.data.Gender);
      this.patientForm.get('patient.blood_group').setValue(this.data.Blood_group);
      this.patientForm.get('demography.height').setValue(this.data.Height);
      this.patientForm.get('demography.weight').setValue(this.data.Weight);
      this.patientForm.get('demography.qualification').setValue(this.data.Qualification);
      this.patientForm.get('demography.job').setValue(this.data.Job);
      this.patientForm.get('demography.travel').setValue(this.data.Travel);
      this.patientForm.get('family.member_id').setValue(this.data.Member_id);
      this.patientForm.get('family.member_name').setValue(this.data.Member_name);
      this.patientForm.get('family.member_blood_group').setValue(this.data.Member_blood_group);
      this.patientForm.get('family.member_covid_history').setValue(this.data.Member_covid_history);
      this.patientForm.get('test.test_no').setValue(this.data.test_no);
      this.patientForm.get('test.test_date').setValue(this.data.test_date);
      this.patientForm.get('test.result').setValue(this.data.result);
      this.patientForm.get('test.symptoms').setValue(this.data.symptoms);

    }
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
    console.log("======================Patient Values===================")
    console.log(backendValue);
    if(!this.patientForm.invalid){
      try {
        const resp = await this.patientService.updatePatient(backendValue);
        this.res = resp;
        this.isLoading = false;
        this.success = true;
        console.log(resp);
      } catch (error) {
        let dialog = this.dialog.open(MessagePopupDialog, {
          data: {
              title: "Unable to update patient!",
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
            title: "Unable to update patient!",
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
