import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-individual-credit',
  templateUrl: './sc-individual-credit.component.html',
  styleUrls: ['./sc-individual-credit.component.scss'],
})
export class ScIndividualCreditComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ScIndividualCreditComponent>) {}

  ngOnInit(): void {}

  add() {}
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close();
  }
}
