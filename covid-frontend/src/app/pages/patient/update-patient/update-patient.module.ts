import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePatientComponent } from './update-patient.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const route = [
  { path: '', component: UpdatePatientComponent },
];


@NgModule({
  entryComponents: [
    MessagePopupDialog
  ],
  declarations: [
    UpdatePatientComponent,
    MessagePopupDialog
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(route)
  ]
})
export class UpdatePatientModule { }
