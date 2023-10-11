import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProviderModalComponent } from '../../add-provider-modal/add-provider-modal.component';
import { AdjustClaimModalComponent } from '../../adjust-claim-modal/adjust-claim-modal.component';
import { ChangeStatusModalComponent } from '../../change-status-modal/change-status-modal.component';

@Component({
  selector: 'estimate-register-new-claim',
  templateUrl: './estimate-register-new-claim.component.html',
  styleUrls: ['./estimate-register-new-claim.component.scss'],
})
export class EstimateRegisterNewClaimComponent implements OnInit {
  @Input() claimNo;
  @Input() coverName;
  @Input() claimEstimate;

  modals = {
    adjustClaim: AdjustClaimModalComponent,
    addProvider: AddProviderModalComponent,
    changeStatus: ChangeStatusModalComponent,
  }

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}
  
  openModal(name){
    this.matDialog.open(this.modals[name])
  }
  save() {
    // console.log(this.form.value);
  }
}
