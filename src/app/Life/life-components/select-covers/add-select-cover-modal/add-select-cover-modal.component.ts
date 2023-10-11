import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-select-cover-modal',
  templateUrl: './add-select-cover-modal.component.html',
  styleUrls: ['./add-select-cover-modal.component.scss'],
})
export class AddSelectCoverModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddSelectCoverModalComponent>) {}

  ngOnInit(): void {}

  save() {
    this.dialogRef.close();
  }
}
