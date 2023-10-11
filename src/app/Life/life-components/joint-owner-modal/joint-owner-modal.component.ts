import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/Services/account.service';
import { BankService } from 'src/app/Services/bank.service';
import { LocationService } from 'src/app/Services/location.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IAccount } from 'src/app/Shared/models/account.interface';
import { configForms } from 'src/app/Shared/models/form.class';
import { IndividualAgentService } from '../../agent-desk/new-individual-agent/services/individual-agent.service';

@Component({
  templateUrl: './joint-owner-modal.component.html',
  styleUrls: ['./joint-owner-modal.component.scss'],
})
export class JointOwnerModalComponent implements OnInit {
  form = new FormGroup({
    accountName: configForms.required(),
    accountNo: configForms.required(),
    bankBranch: configForms.required(),
    bankName: configForms.required(),
    country: configForms.required(),
    payeeNo: configForms.required(), 
    sortCode: configForms.required(),
  });
  file: File;
  clientNo: string;
  bankModel: boolean;
  mobileModel: boolean;
  loading: boolean;
  constructor(
    public uS: UtilityService,
    public individualService: IndividualAgentService,
    public locS: LocationService,
    public bankS: BankService,
    public accS: AccountService,
    public dialogRef: MatDialogRef<JointOwnerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientNo: string }
  ) {}

  ngOnInit(): void {
    this.clientNo = this.data.clientNo;

    this.showBankModel();
    this.form.controls.country.valueChanges.subscribe((r) => {
      this.form.patchValue({ bankName: null, sortCode: null });
    });
    this.form.controls.bankName.valueChanges.subscribe(async (r) => {
      this.form.patchValue({
        sortCode: r
          ? await this.bankS.getSortCodeByBankCode(r).toPromise()
          : null,
        bankBranch: r
          ? await this.bankS.getBankBranchByBankCode(r).toPromise()
          : null,
      });
    });
  }

  upload(event: any) {
    this.file = event.target.files[0];
    console.log('imagefile', this.file);
    console.log('imagepath', this.file.name);
  }

  getImage() {
    document.getElementById('filebtn')?.click();
  }

  showBankModel() {
    this.bankModel = true;
    this.mobileModel = false;
    this.form.patchValue({
      accountType: 'BK',
    });
  }

  showMobileModel() {
    this.mobileModel = true;
    this.bankModel = false;
    this.form.patchValue({
      accountType: 'MM',
    });
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    this.loading = true;
    try {
      const formdata: IAccount = this.form.value;
      formdata.clientNo = this.clientNo;
      if (this.bankModel == true && this.mobileModel == false) {
        delete this.form.value.payeeNo;
      } else if (this.mobileModel == true && this.bankModel == false) {
        delete this.form.value.accountName;
        delete this.form.value.bankBranch;
        delete this.form.value.bankName;
        delete this.form.value.sortCode;
      }
     
      this.dialogRef.close(  await this.accS.createAccount(formdata).toPromise()); 
    } catch (e) {
      this.uS.notify(e, 0);
    }
  }
}