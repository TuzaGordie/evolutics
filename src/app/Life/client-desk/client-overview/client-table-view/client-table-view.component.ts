import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-table-view',
  templateUrl: './client-table-view.component.html',
  styleUrls: ['./client-table-view.component.scss']
})
export class ClientTableViewComponent implements OnInit {


  clientInfoList:any [] = [];
  constructor(public dialogRef: MatDialogRef<ClientTableViewComponent>) { }

  ngOnInit(): void {
    this.clientInfoList = [
      {
        "clientNo":"1",
        "fullName":"Shile Roland",
        "gender":"M",
        "createdDate":"1 Jan 2022",
        "segment":"A",
        "policyOwnershipCount":"1",
        "createdBy":"Web App"
      },
      {
        "clientNo":"2",
        "fullName":"Miller KingsLey",
        "gender":"M",
        "createdDate":"1 Jan 2022",
        "segment":"A",
        "policyOwnershipCount":"1",
        "createdBy":"Web App"
      }
    ]
  }



  viewInfo(item){

  }

  closeModal(){
    this.dialogRef.close();
  }
}
