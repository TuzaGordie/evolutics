import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ICountryData } from 'src/app/ApiModels/location.interface';
import { FindSortCodeModalComponent } from 'src/app/Reusables/reusable-comps/find-sort-code-modal/find-sort-code-modal.component';
import { AccountService } from 'src/app/Services/account.service';
import { BankService } from 'src/app/Services/bank.service';
import { DocumentService } from 'src/app/Services/document.service';
import { LocationService } from 'src/app/Services/location.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { IAccount } from 'src/app/Shared/models/account.interface';
import { configForms } from 'src/app/Shared/models/form.class';
import { environment } from 'src/environments/environment';
import { IndividualAgentService } from '../../../agent-desk/new-individual-agent/services/individual-agent.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent implements OnInit {
  form = new FormGroup({
    accountName: configForms.default(),
    accountNo: new FormControl(null, this.validateAccountNo.bind(this)),
    accountType: configForms.default(),
    bankBranch: configForms.default(),
    bankName: configForms.default(),
    country: configForms.default(),
    payeeNo: configForms.default(),
    provider: new FormControl(null),
    sortCode: configForms.default(),
  });
  @Input() accProofFile: File;
  @Input() bankModel: boolean;
  @Input() clientNo: string;
  @Input() mobileModel: boolean;
  @Input() showSubmissionBtn: boolean;
  @Output() submitted = new EventEmitter<IAccount>();
  countryData: ICountryData;
  loading: boolean;
  message: any;
  countries: ICountryData[];
  constructor(
    public uS: UtilityService,
    public individualService: IndividualAgentService,
    public locS: LocationService,
    public bankS: BankService,
    public accS: AccountService,
    public docS: DocumentService
  ) {}

  ngOnInit(): void {
    this.showBankModel();
    this.getCountries();
    this.form.controls.country.valueChanges.subscribe((r) => {
      this.countryData = this.countries?.find((x) => x.code == r);
      this.form.patchValue({ bankName: null, sortCode: null, accountNo: null });
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
  getCountries() {
    this.locS.getCountries().subscribe((r) => {
      this.countries = r;
    });
  }
  validateAccountNo(control: AbstractControl) {
    const val: string = control?.value;
    if (!val) return null;
    if (
      this.countryData?.bankAccountMaxLength &&
      val.toString().length > +this.countryData.bankAccountMaxLength
    )
      return { maxLength: true };
    if (
      this.countryData?.bankAccountMinLength &&
      val.toString().length < +this.countryData.bankAccountMinLength
    )
      return { minLength: true };
    return null;
  }
  get bankBranch() {
    return this.form.get('bankBranch')?.value;
  }
  get sortCode() {
    return this.form.get('sortCode')?.value;
  }
  openSortCodeModal() {
    this.uS.dialogOpener(
      FindSortCodeModalComponent,
      {
        maxHeight: '80vh',
        maxWidth: '90%',
        width: '80%',
      },
      (r) => {
        if (r) {
          this.form.patchValue({
            sortCode: r.sortCode,
          });
        }
      }
    );
  }
  showBankModel() {
    this.bankModel = true;
    this.mobileModel = false;
    delete this.form.value.payeeNo;
    this.form.patchValue({
      accountType: 'BK',
    });
  }

  showMobileModel() {
    this.mobileModel = true;
    this.bankModel = false;
    delete this.form.value.accountName;
    delete this.form.value.bankBranch;
    delete this.form.value.sortCode;
    this.form.patchValue({
      accountType: 'MM',
    });
  }

  async submit() {
    this.loading = true;
    this.message = null;
    try {
      const formdata: IAccount = this.form.value;
      formdata.clientNo = this.clientNo;
      const account = await this.accS.createAccount(formdata).toPromise();
      if (this.accProofFile) {
        const doc = await this.docS
          .upload(this.accProofFile, {
            boxNo: environment?.userProfile?.users.docBox,
            category: 'CLI',
            sensitivity: 'L',
            subCategory: 'RIB',
            title: 'ProofofAccount',
            refCat: 'CLI',
            refNo: this.clientNo,
          })
          .toPromise();
      }
      this.submitted.emit(account);
    } catch (e) {
      // this.uS.notify(e, 0);
      console.log(e);
      this.message = 'An error occurred';
    }
  }
}
