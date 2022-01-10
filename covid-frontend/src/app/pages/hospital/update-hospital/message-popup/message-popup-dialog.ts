import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'message-popup-dialog',
    templateUrl: 'message-popup-dialog.html',
    styleUrls: ["./message-popup-dialog.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
  })
  export class MessagePopupDialog {

    update:any;

    constructor(
      public dialogRef: MatDialogRef<MessagePopupDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private datePipe: DatePipe
    ){
      this.update = data;
      console.log(this.update)
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
