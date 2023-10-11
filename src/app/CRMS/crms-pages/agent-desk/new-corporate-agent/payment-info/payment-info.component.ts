import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { CorporateAgentService } from '../service/corporate-agent.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class CRMSPaymentInfoComponent implements OnInit {
  newPaymentForm: any = FormGroup;
  bankModel: any = true;
  SortCd: any;
  mobileModel: any = false;
  countryList: any = [];
  banknameList: any = [];
  sortCodeList: any = [];
  providerList: any = [];
  fileName: any;
  faUpload = faUpload;

  constructor(public corporateService: CorporateAgentService) {}

  ngOnInit(): void {
    this.newPaymentForm = new FormGroup({
      bankCountry: new FormControl(null, Validators.required),
      bankSortCd: new FormControl(null),
      bankName: new FormControl(null),

      bankBranch: new FormControl(null),
      accName: new FormControl(null),
      bankAccNo: new FormControl(null),
      provider: new FormControl(null),
    });
    this.setCountryList();
    this.setBanknameList();
    this.setSortcodeList();
    this.setProviderList();
  }
  get validation() {
    /*  console.log("validator",this.newPaymentForm?.controls) */
    return this.newPaymentForm?.controls;
  }
  onSubmit() {
    if (this.bankModel == true && this.mobileModel == false) {
      delete this.newPaymentForm.value.provider;
      this.corporateService.bankInfo(this.newPaymentForm.value);
      this.corporateService.bankNoInfo(
        this.newPaymentForm.get('bankName')?.value
      );
      this.corporateService.tabChange('agentInfo');
      // this.corporateService.paymentInfo(this.newPaymentForm.value);
    } else if (this.mobileModel == true && this.bankModel == false) {
      delete this.newPaymentForm.value.accName;
      delete this.newPaymentForm.value.bankBranch;
      delete this.newPaymentForm.value.bankName;
      delete this.newPaymentForm.value.bankSortCd;
      this.corporateService.paymentInfo(this.newPaymentForm.value);
      this.corporateService.bankInfo(this.newPaymentForm.value);
      this.corporateService.bankNoInfo(
        this.newPaymentForm.get('bankName')?.value
      );
    } else {
      console.log('failed store data');
      // this.corporateService.paymentInfo(this.newPaymentForm.value);
    }
  }
  getImage() {
    let as = document.getElementById('filebtn')?.click();
  }

  setCountryList() {
    this.corporateService.getCountryList().subscribe((res) => {
      this.countryList = res;
      console.log('countrylists', res);
    });
  }

  setBanknameList() {
    let selectedBank = this.newPaymentForm.get('bankCountry')?.value;
    console.log('selected Bank', selectedBank);
    this.corporateService.getBanknameList(selectedBank).subscribe((res) => {
      this.banknameList = res;

      this.newPaymentForm.patchValue({ bankName: null, bankSortCd: null });
      console.log('bankNames', this.banknameList);
    });

    //("bankAccNo")?.value
    this.corporateService.bankInfo(selectedBank);
    this.corporateService.licenseInfoCountry({
      licensedCountry: this.newPaymentForm.get('bankCountry')?.value,
    });
  }

  setSortcodeList() {
    let selectedSort = this.newPaymentForm.get('bankName')?.value;
    console.log('selected Bank', selectedSort);
    this.corporateService.getSortList(selectedSort).subscribe((res) => {
      this.sortCodeList = res;
      console.log('selectedSortss', this.sortCodeList);
      this.SortCd = this.sortCodeList[0].sortCode;
      console.log('code', this.SortCd);
    });
    // debugger

    this.corporateService.bankName(this.newPaymentForm.value.bankName);
    this.corporateService.bankNoInfo(
      this.newPaymentForm.get('bankName')?.value
    );
  }

  SetBankAccNo() {
    this.corporateService.bankSorted(this.SortCd);
    this.corporateService.BankAccNo(this.newPaymentForm.value.bankAccNo);
  }
  SetBankAcc() {
    this.corporateService.AccName(this.newPaymentForm.value.AccName);
  }

  setProviderList() {
    this.corporateService.getProviderList().subscribe((res) => {
      this.providerList = res;
      console.log('providerList', res);
    });
  }
  upload(event: any) {
    let file = event.target.files[0];
    console.log('imagefile', file);
    console.log('imagepath', file.name);
    this.fileName = file.name;
  }
  showBankModel() {
    // this.corporateService.bankInfo(this.newPaymentForm.value);
    // this.corporateService.bankNoInfo(this.newPaymentForm.get("bankName")?.value)
    this.bankModel = true;
    this.mobileModel = false;
  }
  showMobileModel() {
    this.corporateService.bankInfo(this.newPaymentForm.value);
    this.corporateService.bankNoInfo(
      this.newPaymentForm.get('bankName')?.value
    );
    this.mobileModel = true;
    this.bankModel = false;
  }
  changeTab(tab: any) {
    console.log('tab');
    this.corporateService.tabChange(tab);
  }
}
