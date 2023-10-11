import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-find-client-modal',
  templateUrl: './find-client-modal.component.html',
  styleUrls: ['./find-client-modal.component.scss']
})
export class FindClientModalComponent implements OnInit {
  clientInfoList:any [] = [];
  constructor(public dialogRef: MatDialogRef<FindClientModalComponent>) { }

  // <th scope="col">Full Name</th>
  // <th scope="col">Gender</th>
  // <th scope="col">Created Date</th>
  // <th scope="col">Segment</th>
  // <th scope="col">Policy Ownership Count</th>
  // <th scope="col" style="border-top-right-radius: 12px;">Created By</th>

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
