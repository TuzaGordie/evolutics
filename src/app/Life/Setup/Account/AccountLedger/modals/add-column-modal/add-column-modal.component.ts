import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-column-modal',
  templateUrl: './add-column-modal.component.html',
  styleUrls: ['./add-column-modal.component.scss']
})
export class AddColumnModalComponent implements OnInit {
  columns;

  constructor(
    @Inject(MAT_DIALOG_DATA) {columns}
  ) {
    this.columns = columns
   }

  ngOnInit(): void {
  }

}
