import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-life-annuity',
  templateUrl: './sc-life-annuity.component.html',
  styleUrls: ['./sc-life-annuity.component.scss'],
})
export class ScLifeAnnuityComponent implements OnInit {
  @Output() changerp1 = new EventEmitter<boolean>();
  toggleClass: boolean = false;
  toggleClass2: boolean = false;
  constructor(public dialogRef: MatDialogRef<ScLifeAnnuityComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close(true);
  }
}
