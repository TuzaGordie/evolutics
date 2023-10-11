import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-individual-life',
  templateUrl: './sc-individual-life.component.html',
  styleUrls: ['./sc-individual-life.component.scss'],
})
export class ScIndividualLifeComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ScIndividualLifeComponent>) {}

  ngOnInit(): void {}

  add() {}

  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close();
  }
}
