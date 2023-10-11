import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/Services/utility.service';
import { PolicyFinderComponent } from 'src/app/Finance/shared/policy-finder/policy-finder.component';
import { DebitService } from 'src/app/Services/cash/debit.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
})
export class CreateCouponComponent implements OnInit {
  amountReceived = 0;
  auth: true;
  authBy: string;
  authComment: string;
  authOn = new Date();
  coinsuranceFeeDeductedAtSource = 0;
  coinsuranceUnderWritingDeductedAtSource = 0;
  commissionDeductedAtSource = 0;
  companyCode: string;
  convertToReceipt: true;
  currency: string;
  debitNote: string;
  effectiveDate: string = new Date().toISOString().split('T')[0]; // default to today's date
  narration: string;
  netAmount = 0;
  policyCode: string;
  policyNo: string;
  receiptNo: string;
  status: string = 'PENDING';
  vatDeductedAtSource = 0;
  whtDeductedAtSource = 0;

  couponNo: any;

  policyNumbers: any[] = []
  policyCodes: any[] = []
  debitNotes: any[] = []
  ownerName: any;

  pipe = new DatePipe('en-US');
  format = 'yyyy/MM/dd';
  locale = 'en-US';

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false,
  };

  coupon = {
    created: false,
  }

  // show or hide the deductions section
  hasDeductions: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentDeskService: PaymentDeskService,
    private utilityService: UtilityService,
    private debitNoteService: DebitService,
  ) {}

  ngOnInit(): void {
    this.getPolicyNo();
  }

  getPolicyNo() {
    this.connection.creating = true;

    this.paymentDeskService.getPolicyNo().subscribe((data: any) => {
      this.policyNumbers = data;
      this.connection.creating = false;
    });
  }

  getPolicyCode(value) {
    this.connection.creating = true;
    value = this.policyNo;

    this.paymentDeskService.getPolicyCode(value).subscribe((data: any) => {
      this.policyCodes = data;
      this.companyCode = data[0]?.companyCode;
      this.connection.creating = false;
    });
  }

  getCurrency() {
    this.currency = '';

    this.paymentDeskService.getPolicyCurrency(this.policyNo).subscribe((currency: string) => {
      this.currency = currency;
      this.connection.creating = false;
    });
  }

  getDebitNote() {
    this.connection.creating = true;

    this.debitNoteService
      .getDebitNotes(this.policyNo, this.policyCode)
      .subscribe((data: any) => {
        this.debitNotes = data;
        this.connection.creating = false;
      });
  }

  getOwnerName() {
    this.connection.creating = true;

    this.paymentDeskService.getOwnerName(this.policyNo).subscribe((ownerName: string) => {
      this.ownerName = ownerName;
      this.connection.creating = false;
    })
  }

  createCoupon() {
    this.connection.creating = true;

    let coupon = {
      amountReceived: this.amountReceived,
      auth: false,
      authBy: 'string',
      authComment: 'string',
      authOn: this.authOn,
      coinsuranceFeeDeductedAtSource: this.coinsuranceFeeDeductedAtSource,
      coinsuranceUnderWritingDeductedAtSource:
        this.coinsuranceUnderWritingDeductedAtSource,
      commissionDeductedAtSource: this.commissionDeductedAtSource,
      companyCode: this.companyCode,
      convertToReceipt: true,
      currency: this.currency,
      debitNote: this.debitNote,
      decline: false,
      effectiveDate: this.effectiveDate,
      narration: this.narration,
      netAmount: this.netAmount,
      policyCode: this.policyCode,
      policyNo: this.policyNo,
      receiptNo: this.receiptNo,
      status: this.status,
      vatDeductedAtSource: this.vatDeductedAtSource,
      whtDeductedAtSource: this.whtDeductedAtSource,
    };

    console.log('coupon', coupon);

    this.paymentDeskService.createCoupon(coupon).subscribe((data: any) => {
      this.couponNo = data.no;
      this.utilityService.info(`Coupon ${this.couponNo} created`, 1);
      this.connection.creating = false;
      this.coupon.created = true;
    },
    error => {
      this.utilityService.notify('Something went wrong', 0, 5000, 'Error');
    });
  }

  createNew() {
    location.reload();
  }

  viewCoupon() {
    this.router.navigate(['../authorize-coupon'], { relativeTo: this.route });
  }

  toggleDeductions(value){
    this.hasDeductions = value;
    this.sumGrossAmount()
  }
  sumGrossAmount(){
    if (!this.hasDeductions) {
      this.commissionDeductedAtSource = 0
      this.vatDeductedAtSource = 0
      this.whtDeductedAtSource = 0
      this.coinsuranceFeeDeductedAtSource = 0
      this.coinsuranceUnderWritingDeductedAtSource = 0
      this.netAmount = +this.amountReceived;
    } else {
      // preceding + are used to cast each string value to number before addition
      this.netAmount = +this.amountReceived + +this.commissionDeductedAtSource + +this.vatDeductedAtSource + +this.whtDeductedAtSource + +this.coinsuranceFeeDeductedAtSource + +this.coinsuranceUnderWritingDeductedAtSource;
    }
  }

  openPolicyFinderModal() {
    this.utilityService.dialogOpener(
      PolicyFinderComponent,
      {width: '60vw'},
      (policy) => {
        this.setPolicy(policy);
      }
    )
  }

  setPolicy(policy){
    this.policyNo = policy.policyNo;
    this.ownerName = policy.ownerName;
    this.policyCode = policy.policyCode;
    this.currency = policy.currency;
    this.getPolicyCode(this.policyNo); // get list of policy codes
    this.getDebitNote() // get list of debit notes
  }
}
