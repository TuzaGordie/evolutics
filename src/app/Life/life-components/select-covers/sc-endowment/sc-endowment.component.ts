import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-endowment',
  templateUrl: './sc-endowment.component.html',
  styleUrls: ['./sc-endowment.component.scss'],
})
export class ScEndowmentComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ScEndowmentComponent>) {}

  ngOnInit(): void {}

  add() {}
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close();
  }
}
