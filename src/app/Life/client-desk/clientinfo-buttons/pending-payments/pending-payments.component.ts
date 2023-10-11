import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjustClaimComponent } from '../../adjust-claim/adjust-claim.component';
import { ChangeStatusComponent } from '../../change-status/change-status.component';
import { ClientRegisterNewClaimComponent } from '../../register-new-claim/register-new-claim.component';
import { FindClientService } from '../../service/find-client.service';
import { configForms } from '../../../../Shared/models/form.class';
import { ChangeStatusModalComponent as StatusModalComponent } from '../../../../Shared/components/change-status-modal/change-status-modal.component';
import { UtilityService } from '../../../../Services/utility.service';
import { ChangeStatusModalComponent } from 'src/app/Life/policy-desk/policy-desk-pages-2/policy-total-payments-outward/change-status-modal/change-status-modal.component';
import { RegisterNewClaimComponent } from 'src/app/Life/policy-desk/policy-desk-pages-2/policy-total-payments-outward/register-new-claim/register-new-claim.component';
import { AdjustClaimModalComponent } from 'src/app/Life/policy-desk/policy-desk-pages-2/policy-total-payments-outward/adjust-claim-modal/adjust-claim-modal.component';
import { HistoryModalComponent } from 'src/app/Life/policy-desk/policy-desk-pages-2/policy-total-payments-outward/history-modal/history-modal.component';
import { SetPayeeModalComponent } from 'src/app/Life/policy-desk/policy-desk-pages-2/policy-total-payments-outward/set-payee-modal/set-payee-modal.component';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.scss'],
})
export class ClientPendingPaymentsComponent implements OnInit {
  paymentList: any = [];
  pendingClaims: any[] = [];
  clientNo: string;
  loading:boolean
  constructor(
    public findClientService: FindClientService,
    private matDialog: MatDialog,
    public route: ActivatedRoute,
    public uS: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading=true
    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id1');
    this.clientNo = id;

    this.setPendingPayments(id, id2);
    this.setPendingClaims(this.clientNo);
  }
 setPendingPayments(id1, id2) {
    this.findClientService.getPendingPayouts(id1).subscribe((res) => {
      this.paymentList = res;
      console.log('payment Info', res);
    });
  }

  setPendingClaims(clientNo) {
    this.findClientService.getPendingClaims(clientNo).subscribe((res) => {
      this.pendingClaims = res;
      this.loading=false
    });
  }

  openStatusModal() {
    this.uS.dialogOpener(StatusModalComponent, {}, (r) => {});
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
 client_view() {
    return;
    this.router.navigate(['../view-client'], { relativeTo: this.route });
  }

  openAdjustModal() {
    this.uS.dialogOpener(AdjustClaimModalComponent, {}, ({ action }) => {
      if (action === 'OPEN_HISTORY') {
        this.openHistoryModal();
      }
    });
  }

  openHistoryModal() {
    this.uS.dialogOpener(HistoryModalComponent, {}, ({ action }) => {
      if (action === 'OPEN_ADJUST') {
        this.openAdjustModal();
      }
    });
  }

  openRegisterClaimModal() {
    console.log('about to open register claim modal');
    this.uS.dialogOpener(
      RegisterNewClaimComponent,
      {
        height: 'auto',
        maxHeight: '92vh',
        width: 'calc(100vw * 0.8569)',
        data: { clientNo: this.clientNo },
      },

      (r) => {
        console.log('closed register claim modal');
      },
      () => {
        console.log('cancelled register claim modal');
      }
    );
  }

  openSetPayeeModal() {
    this.uS.dialogOpener(SetPayeeModalComponent, {}, (r) => {});
  }
}
