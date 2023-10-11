import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBtn } from '../../models/index.model';

@Component({ 
  templateUrl: './info-dialog.component.html',
  styles: [
    `
      .bar {
        height: 5px;
      }
      .card-body {
        overflow-wrap: anywhere;
      }
    `,
  ],
})
export class InfoDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      text: string;
      heading: string;
      status: number;
      btns: IBtn[];
    },
    public dialogRef: MatDialogRef<InfoDialogComponent>
  ) {}

  ngOnInit(): void {}
  yes() {
    this.dialogRef.close(true);
  }
  no() {
    this.dialogRef.close(false);
  }
}
