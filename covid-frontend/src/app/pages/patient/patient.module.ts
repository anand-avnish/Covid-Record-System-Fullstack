import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { RouterModule } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

const route = [
  {
    path: '',
    component: PatientComponent,
    // children: [
    //   // {
		// 	// 	path: "createPatient",
		// 	// 	loadChildren: "../create-patient/create-patient.module#CreatePatientModule"
		// 	// },
    //   { path: 'createPatient', loadChildren: () => import('./create-patient/create-patient.module').then(m => m.CreatePatientModule) }
    // ]
  },
];

@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    RouterModule.forChild(route)
  ]
})
export class PatientModule { }
