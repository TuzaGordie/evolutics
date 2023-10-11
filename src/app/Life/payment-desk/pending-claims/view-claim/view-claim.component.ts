import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { configForms } from '../../../../Shared/models/form.class';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationModalComponent } from '../authorization-modal/authorization-modal.component';
import { PayeeModalComponent } from '../payee-modal/payee-modal.component';
import { ClaimStatusModalComponent } from '../claim-status-modal/claim-status-modal.component';
import { PaymentDeskService } from '../../service/payment-desk.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { error } from 'console';
import { FKVP } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-view-claim',
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.scss'],
})
export class ViewClaimComponent implements OnInit {
  claimNo: string;
  clientNo: string;
  clientName: any = {};
  clientLossRatio = [];
  policyLossRatio = [];
  claimDetails: any = {};
  claimStatus: any[] = [];
  clam;
  peril: any[] = [];
  authorizations: any[] = [];
  tableLoading: boolean;
  connection = {
    creating: false,
    error: false,
  };
  clientRoute: any = { route: '', value: '' };
  policyRoute: any = { route: '', value: '' };
  agentRoute: any = { route: '', value: '' };
  payout: any = { route: '', value: '' };

  lbls1: FKVP[] = [
    new FKVP('claimNo', 'Claim Number'),
    new FKVP('clientNo', 'Policy Owner', this.clientRoute),
    new FKVP('policyCode', 'Policy Code'),
    new FKVP('policyNoSuffix', 'Policy Number Suffix'),
    new FKVP('coverCode', 'Cover Claimed'),
    new FKVP('claimant', 'Claimant', this.clientRoute),
  ];

  lbls2: FKVP[] = [
    new FKVP('productCode', 'Product'),
    new FKVP('perilCode', 'Peril'),
    new FKVP('proxCause', 'Proximate Cause'),
    new FKVP('eventOn', 'Claim Event On'),
    new FKVP('createdOn', 'Claim Created On'),
    new FKVP('reportOn', 'Claim Reported On'),
    new FKVP('locationCity', 'Event Location'),
    new FKVP('currency', 'Currency'),
    new FKVP('updatedOn', 'Last Modified On'),
    new FKVP('updatedBy', 'Last Modified By'),
    new FKVP('', 'Claim Pay Frequency'),
    new FKVP('', 'Next Payment On', true),
    new FKVP('claimStartDate', 'Claim Start On'),
    new FKVP('claimEndDate', 'Claim End On'),
    new FKVP('branchCode', 'Branch'),
    new FKVP('dvCreatedBy', 'Vouch Issued By'),
    new FKVP('dvExecutedOn', 'Voucher Executed On'),
    new FKVP('dvCreatedOn', 'Voucher Issued On'),
    new FKVP('valid', 'Valid'),
  ];

  loading: boolean;
  claimStat = new FKVP('status', 'Claim Status', true);
  uncoveredSar: string;
  isSetPayeeHidden: boolean = true;
  isCreatePaymentOutwardHidden: boolean = true;
  payee: any;
  constructor(
    private dialog: MatDialog,
    private paymentDeskService: PaymentDeskService,
    private router: ActivatedRoute,
    public uS: UtilityService
  ) {}

  form = new FormGroup({
    test: configForms.default(),
  });

  async init() {
    this.tableLoading = this.loading = true;
    try {
      this.claimDetails = await this.paymentDeskService
        .getClaimDetails(this.claimNo as any)
        .toPromise();
      console.log('Claim Detials' + JSON.stringify(this.claimDetails));
    } catch (error) {
      this.uS.notify(`Claim does not exist`, 0);
      this.uS.back();
    }
    this.loading = false;
    this.getUncoveredSAR();

    this.form.patchValue(this.claimDetails);
    this.lbls1.forEach((l) => {
      l.value = this.claimDetails[l.key];
      if (l.key == 'clientNo') {
        this.paymentDeskService
          .getClientName(this.claimDetails.clientNo)
          .toPromise()
          .then((r) => {
            l.value = this.claimDetails.clientNo + ' - ' + r;
            console.log(l.value + 'CLIENT INFO' + r);
          });
      }
    });
    this.lbls2.forEach((l) => {
      l.value = this.claimDetails[l.key];
      if (l.key == 'claimStartDate' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.claimStartDate);
      }
      if (l.key == 'claimEndDate' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.claimStartDate);
      }
      if (l.key == 'reportOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.reportOn);
      }
      if (l.key == 'eventOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.eventOn);
      }
      if (l.key == 'createdOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.createdOn);
      }
      if (l.key == 'updatedOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.updatedOn);
      }
      if (l.key == 'dvExecutedOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.dvexecustedOn);
      }
      if (l.key == 'dvCreatedOn' && l.value !== null) {
        l.value = this.uS.dateFormat(this.claimDetails.dvcreatedOn);
      }
      if (l.key == 'perilCode') {
        this.paymentDeskService
          .getPeril(this.claimNo)
          .subscribe((data: any) => {
            l.value =
              data[0]?.perilCode !== null || data.length !== 0
                ? data[0]?.perilCode
                : '--';
          });
      }
    });
    this.clientRoute = this.lbls1.find((x) => x.key == 'clietNo');
    this.clientRoute.route = `../view-client?clientNo='${this.clientRoute.value}`;

    this.policyRoute = this.lbls1.find((x) => x.key == 'policyNo');
    this.policyRoute.route = `../../policy-desk/view-policy?policyNo='${this.policyRoute.value}`;

    this.agentRoute = this.lbls1.find((x) => x.key == 'policyNo');
    this.agentRoute.route = `../../policy-desk/view-policy?policyNo='${this.agentRoute.value}`;

    this.claimDetails.value = this.claimDetails[this.claimDetails.key];

    this.loading = false;
  }

  ngOnInit(): void {
    this.claimNo = this.router.snapshot.queryParams.claimNo;
    this.init();
    this.getClaimDetails();
    this.getClaimStatus();
    this.getPeril();
    this.getAuthorizations();
    this.getPayee(this.claimDetails?.payeeId);
  }

  getClaimDetails() {
    this.connection.creating = true;

    this.paymentDeskService
      .getClaimDetails(this.claimNo)
      .subscribe((data: any) => {
        this.claimDetails = data;
        this.clientNo = data.clientNo;
        this.getClientName();
        this.connection.creating = false;
      });
  }

  getClaimStatus() {
    this.connection.creating = true;

    this.paymentDeskService
      .getClaimStatus2(this.claimNo)
      .subscribe((data: any) => {
        this.claimStatus = data;
        console.log('---claim status', data);
        this.connection.creating = false;
      });
  }

  async getPayee(payoutId: number) {
    this.payee = await this.paymentDeskService.getPayee(payoutId).toPromise();
    console.log('Payee' + JSON.stringify(this.payee));
  }

  createPaymentOutward() {
    this.isSetPayeeHidden = true;
    this.isCreatePaymentOutwardHidden = false;
  }

  setPayee() {
    this.isCreatePaymentOutwardHidden = true;
    this.isSetPayeeHidden = false;
  }

  getPeril() {
    this.connection.creating = true;

    this.paymentDeskService.getPeril(this.claimNo).subscribe((data: any) => {
      this.peril = data;
      console.log('---peril', data);
      this.connection.creating = false;
    });
  }

  getClientName() {
    this.connection.creating = true;

    this.paymentDeskService.getClientName(this.clientNo).subscribe(
      (data: any) => {
        this.connection.creating = false;
      },
      (error) => {
        this.clientName = error.error;
        console.log('---client name', error.error);
      }
    );
  }

  getAuthorizations() {
    this.connection.creating = true;

    this.paymentDeskService.getAuthorizations(this.claimNo).subscribe(
      (data: any) => {
        this.authorizations = data;
        console.log('getAuthorizations', data);

        this.connection.creating = false;
      },
      (error) => {}
    );
  }

  getUncoveredSAR() {
    let coverCode = this.claimDetails.coverCode;
    let policyNo = this.claimDetails.policyNo;
    let policyCode = this.claimDetails.policyCode;
    let policyNoSuffix = this.claimDetails.policyNoSuffix;
    this.paymentDeskService
      .getUncoveredSAR(coverCode, policyNo, policyCode, policyNoSuffix)
      .subscribe(
        (data: any) => {
          this.uncoveredSar = data;
        },
        (error) => {}
      );
  }

  openAuthorizeDialog() {
    this.dialog.open(AuthorizationModalComponent, {
      width: '80vw',
      data: {},
    });
  }

  openPayeeDialog() {
    this.dialog.open(PayeeModalComponent, {
      width: '80vw',
      data: {},
    });
  }

  openClaimStatusDialog() {
    this.dialog.open(ClaimStatusModalComponent, {
      width: '90%',
      data: {
        array: this.claimStatus,
      },
    });
  }
}
