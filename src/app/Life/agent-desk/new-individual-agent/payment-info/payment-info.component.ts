import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndividualAgentService } from '../services/individual-agent.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { CreateAccountModalComponent } from 'src/app/Life/life-components/create-account-modal/create-account-modal.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { IAccount } from 'src/app/Shared/models/account.interface';
import { IPaymentInfo } from './payment-info.inteface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit {
  @Input() paymentForm: FormGroup = new FormGroup({
    accountName: new FormControl(null),
    accountNo: new FormControl(null),
    accountType: new FormControl(null),
    bankBranch: new FormControl(null),
    bankName: new FormControl(null),
    currency: new FormControl(null),
    country: new FormControl(null, Validators.required),
    frequency: new FormControl(null),
    payeeName: new FormControl(null),
    payoutMethod: new FormControl(null),
    sortCode: new FormControl(null),
  });
  @Input() clientNo: string;
  @Input() paymentMethodField: string = 'payoutMethod';
  @Input() frequencyField: string;
  @Input() dimensions;
  paymentInfo: IPaymentInfo;
  @Input() isModal: boolean;
  currencyList: ICodeDescription[];
  @Input('paymentInfo') set _paymentInfo(v: IPaymentInfo) {
    this.paymentForm.patchValue(v);
    this.paymentInfo = v;
  }
  newBankDetails: IAccount[] = [];
  frequency: any[] = [];
  loadingAccounts: boolean;
  selectedAccount: IAccount;
  paymentMethod: string = '';
  constructor(
    public individualService: IndividualAgentService,
    public currencyService: CurrencyService,
    public route: ActivatedRoute,
    public uS: UtilityService
  ) {}

  ngOnInit(): void {
    this.clientNo = this.clientNo || this.route.snapshot.params.id;
    this.getClientAccounts();
    this.setFrequency();
    this.paymentForm.controls[this.paymentMethodField].valueChanges.subscribe(
      (r) => {
        this.paymentMethod = r
          ? r +
            ' - ' +
            (r == 'DD'
              ? 'Direct Credit'
              : r == 'MM'
              ? 'Mobile Money'
              : r == 'CHQ'
              ? 'Cheque'
              : '')
          : '';
        this.checkPayoutMethod(r);
      }
    );
    this.currencyService.getCurrency().subscribe(r=>this.currencyList=r)
  }

  chooseAccount(acc: IAccount) {
    this.selectedAccount = acc;
    let accountType =
      acc.accountType == 'BK' ? 'DD' : acc.accountType == 'MM' ? 'MM' : 'CHQ';
    this.paymentForm.controls[this.paymentMethodField].setValue(accountType);
  }
  getClientAccounts = () => {
    this.loadingAccounts = true;
    this.individualService
      .getClientBankAccounts(this.clientNo)
      .toPromise()
      .then((res) => {
        this.newBankDetails = res;
        console.log('newBankDetails', this.newBankDetails);
        this.loadingAccounts = false;
      });
  };
  checkPayoutMethod(accountType: string) {
    console.log('PayoutMethod', accountType);
    this.paymentForm?.patchValue({ payeeName: '' });
    if (accountType == 'CHQ') {
      this.individualService.getPayeeName(this.clientNo).subscribe((r) => {
        console.log(r);
        this.paymentForm?.patchValue({ payeeName: r });
      });
    } else {
      this.paymentForm?.patchValue({
        payeeName: this.selectedAccount?.accountName,
      });
    }
  }
  changeTab(tab: any) {
    this.individualService.tabChange(tab);
  }

  setFrequency() {
    this.individualService.getFrequencyList().subscribe((res) => {
      this.frequency = res;
    });
  }

  selectbank(index) {
    //this.isAddButton = !this.isAddButton;
    let data = this.newBankDetails[index];
    this.individualService.shareNewAccount(data);
    console.log(data);
    this.paymentForm.patchValue({
      accountName: data.accountName,
      accountNo: data.accountNo,
    });
  }

  openCreateAccount() {
    this.uS.dialogOpener(
      CreateAccountModalComponent,
      {
        data: { clientNo: this.clientNo },
        minWidth: '70%',
        minHeight: '80%',
        autoFocus: false,
        maxHeight: '90%',
        ...this.dimensions,
      },
      () => {
        this.getClientAccounts();
      }
    );
  }
}
