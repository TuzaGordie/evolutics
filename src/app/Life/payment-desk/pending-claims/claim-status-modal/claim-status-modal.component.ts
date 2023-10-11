import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import {FormGroup} from "@angular/forms";
// import {configForms} from "../../../../Shared/models/form.class";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';





@Component({
  selector: 'app-claim-status-modal',
  templateUrl: './claim-status-modal.component.html',
  styleUrls: ['./claim-status-modal.component.scss']
})
export class ClaimStatusModalComponent implements OnInit {

  claimStatus: any[] = [];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ClaimStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any,
    ) { }

  // form = new FormGroup({
  //   test: configForms.default(),
  // });

  ngOnInit(): void {
    this.claimStatus = this.data.array
    console.log('init', this.claimStatus)
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
