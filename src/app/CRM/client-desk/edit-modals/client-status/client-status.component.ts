import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindClientService } from 'src/app/CRMS/crms-pages/client-desk/service/find-client.service';

@Component({
  selector: 'app-client-status',
  templateUrl: './client-status.component.html',
  styleUrls: ['./client-status.component.scss']
})
export class ClientStatusComponent implements OnInit {
  clientStatus: any;
  clientStatusesList: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ClientStatusComponent>,
    private findClientService: FindClientService,
  ) {
    console.log("data from view-client to client-status: ", data)
    this.clientStatus = data.status;
    this.clientStatusesList = data.statusesList;
  }

  ngOnInit(): void { }

  onClose(){
    this.dialogRef.close({status: this.clientStatus})
  }
  
}
