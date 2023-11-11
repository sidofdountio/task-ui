import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data, DialogService } from 'src/app/service/dialog-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private dialogRef: MatDialogRef<DialogComponent>, private serviceDialog: DialogService) { }
  save(): void {
    this.data.discase = true;
    this.dialogRef.close(this.data);

  }
  cancel(): void {
    this.data.discase = false;
    this.dialogRef.close(this.data);
  }
}
