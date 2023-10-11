import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { clone } from 'lodash-es';

@Component({
  templateUrl: './text-area-modal.component.html',
  styleUrls: ['./text-area-modal.component.scss'],
})
export class TextAreaModalComponent implements OnInit {
  _data: { label: string; value: string; };
  constructor(
    public dialogRef: MatDialogRef<TextAreaModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { label: string; value: string }
  ) {}

  ngOnInit(): void {
    this._data=clone(this.data)
  }
  close(){
    this.dialogRef.close(this.data)
  }
  save(){
    this.dialogRef.close(this._data)
  }
}
