import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-annuity-certain',
  templateUrl: './sc-annuity-certain.component.html',
  styleUrls: ['./sc-annuity-certain.component.scss'],
})
export class ScAnnuityCertainComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ScAnnuityCertainComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close();
  }
}
