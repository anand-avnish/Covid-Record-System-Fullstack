import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from './hospital.component';
import { RouterModule } from '@angular/router';

const route = [
  { path: '', component: HospitalComponent },
];

@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class HospitalModule { }
