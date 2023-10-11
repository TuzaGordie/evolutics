import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ChangeStatusModalComponent } from 'src/app/Shared/components/change-status-modal/change-status-modal.component';
import {
  IBtn,
  IKVP,
  TableCol,
  KVP,
} from '../../../../Shared/models/index.model'; 
import { IPolicy } from '../../policy-desk-extras/policy-desk.model';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';
import { AdjustClaimModalComponent } from './adjust-claim-modal/adjust-claim-modal.component';
import { CreatePaymentOutwardComponent } from './create-payment-outward/create-payment-outward.component';
import { PolicyLoanComponent } from './policy-loan/policy-loan.component';
import { RegisterNewClaimComponent } from './register-new-claim/register-new-claim.component';
import { SetPayeeModalComponent } from './set-payee-modal/set-payee-modal.component';
import { ViewClaimHistoryModalComponent } from './view-claim-history-modal/view-claim-history-modal.component';

@Component({
  selector: 'app-policy-total-payments-outward',
  templateUrl: './policy-total-payments-outward.component.html',
  styleUrls: ['./policy-total-payments-outward.component.scss'],
})
export class PolicyTotalPaymentsOutwardComponent implements OnInit {
  clientNo: string;
  clientName: string;
  list = [];
  policyNo: string;
  policyCode: string;

  grossClaim: number = null;
  recoveries: number = null;
  adjustments: number = null;
  netClaim: number = null;
  pendingPaymentOutward: number = null;
  paymentOutwardProcessed: number = null;

  pendingClaims: any[] = [];
  pendingPayments: any[] = [];

  dCols: TableCol[] = [
    new TableCol('Payment ID'),
    new TableCol('Type'),
    new TableCol('Payee No'),
    new TableCol('Recoveries'),
    new TableCol('Net Payment'),
    new TableCol('Policy No'),
    new TableCol('Created By'),
    new TableCol('Authorised By'),
    new TableCol('Created On'),
    new TableCol('Auth On'),
    new TableCol('Last Update User'),
    new TableCol('Processed', null, null, null, 'checkbox'),
    new TableCol('Rejected', null, null, null, 'checkbox'),
  ];
  polLoan = () => {
    this.uS.dialogOpener(
      PolicyLoanComponent,
      { height: 'auto', width: 'calc(100vw * 0.4569)' },
      (r) => {
        if (r) {
          this.payOut();
        }
      }
    );
  };
  payOut = () => {
    this.uS.dialogOpener(
      CreatePaymentOutwardComponent,
      { height: 'auto', width: 'calc(100vw * 0.8569)', maxWidth: '100vw' },
      () => {}
    );
  };
  regClaim = () => {
    this.uS.dialogOpener(
      RegisterNewClaimComponent,
      {
        height: 'auto',
        maxHeight: '92vh',
        width: 'calc(100vw * 0.8569)',
        data: { clientNo: this.clientNo, policyNo: this.policyNo },
      },
      () => {}
    );
  };
  btns: IBtn[] = [
    {
      key: 1,
      value: 'Policy Loan',
      type: 'secondary',
      action: this.polLoan,
      cls: '2',
      icon: 'add',
    },

    {
      key: 2,
      value: 'Register New Claim',
      type: 'secondary',
      action: this.regClaim,
      cls: '2',
      icon: 'add',
    },
  ];
  lbls: IKVP[] = [
    new KVP('Gross Claim', this.grossClaim),
    // new KVP('Adjustments', 'xxxx'), removed
    new KVP('Recoveries', this.recoveries),
    new KVP('Adjustments', this.adjustments),
    new KVP('Net Claim', this.netClaim),
    new KVP('Pending Payment Outward', this.pendingPaymentOutward),
    new KVP('Payment Outward Processed', this.paymentOutwardProcessed),
  ];
  constructor(
    public uS: UtilityService,
    private route: ActivatedRoute,
    private findClientService: FindClientService,
  ) {}

  ngOnInit(): void {
    this.list = this.uS.dataGen(
      this.dCols.filter((x) => !x.type).map((x) => x.f),
      2
    );

    this.clientNo = this.route.snapshot.queryParamMap.get('clientNo')
    this.policyNo = this.route.snapshot.queryParamMap.get('policyNo')
    this.policyCode = this.route.snapshot.queryParamMap.get('policyCode')
    this.setPendingClaims(this.clientNo);
    this.setPendingPayments(this.clientNo);
    this.setClientName(this.clientNo);
  }

  openAdjustModal() {
    this.uS.dialogOpener(
      AdjustClaimModalComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'auto',
        minWidth: '40%',
        data: {},
      },
      (r) => {
        if (r == 'openHistory') {
          this.openHistoryModal();
        }
      }
    );
  }
  openStatusModal() {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'auto',
        minWidth: '40%',
        data: {},
      },
      () => {}
    );
  }
  openHistoryModal() {
    this.uS.dialogOpener(
      ViewClaimHistoryModalComponent,
      {
        height: 'auto',
        maxHeight: '90vh',
        width: 'auto',
        minWidth: '40%',
        data: {},
      },
      (r) => {
        if (r == 'openAdjust') {
          this.openAdjustModal();
        }
      }
    );
  }

  openChangeStatusModal = () => {
    this.uS.dialogOpener(
      ChangeStatusModalComponent,
      {
        data: { options: [] },
        width: 'auto',
        minWidth: '40%',
      },
      (r) => {}
    );
  };

  openSetPayeeModal() {
    this.uS.dialogOpener(SetPayeeModalComponent, {}, (r) => {});
  }

  setPendingClaims(clientNo) {
    this.findClientService.getPendingClaims(clientNo).subscribe((res) => {
      this.pendingClaims = res;
    });
  }

  setPendingPayments(clientNo) {
    this.findClientService.getPendingPayouts(clientNo).subscribe((res) => {
      this.pendingPayments = res;
    });
  }

  setClientName(clientNo){
    this.findClientService.getClientViewData(clientNo).pipe(map(client => client?.fullName)).subscribe(
      fullName => this.clientName = fullName
    )
  }
}
