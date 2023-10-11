import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-savings',
  templateUrl: './sc-savings.component.html',
  styleUrls: ['./sc-savings.component.scss'],
})
export class ScSavingsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ScSavingsComponent>) {}

  ngOnInit(): void {}
  add() {}
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close();
  }
}
