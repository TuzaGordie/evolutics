import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  viewClientForm: FormGroup;
  clientDetailsForm: FormGroup;
  TITLES: string[];

  constructor(
    private dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.viewClientForm = data.viewClientForm;
    this.clientDetailsForm = data.clientDetailsForm;
    this.TITLES = data.TITLES;
  }

  ngOnInit(): void {
    this.TITLES = this.TITLES;
  }

  onClose(){
    this.dialogRef.close()
  }
}
