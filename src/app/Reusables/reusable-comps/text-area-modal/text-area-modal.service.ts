import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextAreaModalComponent } from './text-area-modal.component';

@Injectable()
export class TextAreaModalService {
  constructor(public dialog: MatDialog) {}
  openTextAreaModal = (label: string, value: string) => {
  return  this.dialog.open(TextAreaModalComponent, { data: { label, value } ,height:'80vh', width:'90%'});
  };
}
