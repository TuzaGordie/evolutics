import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigClientTypes, EClientType } from '../client.interface';

@Component({
  templateUrl: './select-client-creation-type.component.html',
  styleUrls: ['./select-client-creation-type.component.scss']
})
export class SelectClientCreationTypeComponent implements OnInit {

types=ConfigClientTypes
  constructor(public dialogRef:MatDialogRef<SelectClientCreationTypeComponent>) { }

  ngOnInit(): void {
  }

  close(type:EClientType){
    this.dialogRef.close(type)
  }
}
