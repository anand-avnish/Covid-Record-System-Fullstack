import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-update-hospital',
  templateUrl: './update-hospital.component.html',
  styleUrls: ['./update-hospital.component.css']
})
export class UpdateHospitalComponent implements OnInit {

  isLoading = false;
  success = false;
  res;
  data;

  hospitalForm = this.fb.group({
    hospital_id: [''],
    hospital_name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
    this.isLoading=true;
    this.route.queryParams.subscribe(async val => {
      console.log(val);
      const req=await this.hospitalService.getHospitalById(val.id);
      console.log(req);
      this.data = req['hospital']['data'][0];
      console.log(this.data);
      this.formFill();
    });
    this.isLoading=false;
  }

  formFill(){
    if(this.data!=undefined){

      this.hospitalForm.get('hospital_id').setValue(this.data.hospital_id);
      this.hospitalForm.get('hospital_name').setValue(this.data.hospital_name);
      this.hospitalForm.get('state').setValue(this.data.state);
      this.hospitalForm.get('city').setValue(this.data.city);
    }
  }

  async onSubmit(){
    this.isLoading = true;
    const value = {...this.hospitalForm.value};
    let backendValue: any ={};
    if(value.hospital_name !== ''){
      backendValue = value;
      console.log('Updated backend value');

    }
    console.log("======================Hospital Values===================")
    console.log(backendValue);
    if(!this.hospitalForm.invalid){
      try {
        const resp = await this.hospitalService.updateHospital(backendValue);
        this.res = resp;
        this.isLoading = false;
        this.success = true;
        console.log(resp);
      } catch (error) {
        let dialog = this.dialog.open(MessagePopupDialog, {
          data: {
              title: "Unable to update hospital!",
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
            title: "Unable to update hospital!",
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
