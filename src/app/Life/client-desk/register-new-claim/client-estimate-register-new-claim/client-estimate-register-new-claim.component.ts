import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { couldStartTrivia } from 'typescript';
import { AdjustClaimComponent } from '../../adjust-claim/adjust-claim.component';
import { ChangeStatusComponent } from '../../change-status/change-status.component';
import { ClientAssignProviderComponent } from '../client-document-register-new-claim/client-assign-provider/client-assign-provider.component';

@Component({
  selector: 'app-client-estimate-register-new-claim',
  templateUrl: './client-estimate-register-new-claim.component.html',
  styleUrls: ['./client-estimate-register-new-claim.component.scss']
})
export class ClientEstimateRegisterNewClaimComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAssignProviderModal(){
    this.matDialog.open(ClientAssignProviderComponent).afterClosed().subscribe(res => {
      console.log('response from AssignProviderModal', res)
    })
  }

  openChangeStatusModal(){
    this.matDialog.open(ChangeStatusComponent).afterClosed().subscribe(res => {
      console.log('response from ChangeStatusModal:', res)
    })
  }

  openAdjustClaimModal(){
    this.matDialog.open(AdjustClaimComponent).afterClosed().subscribe(res => {
      console.log('response from AdjustClaimModal:', res)
    })
  }
}
