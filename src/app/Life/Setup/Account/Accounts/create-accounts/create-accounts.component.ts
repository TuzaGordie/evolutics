import { UtilityService } from 'src/app/Services/utility.service';
import { IAccountPost } from '../../accounts-extras/account-model';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { configForms } from 'src/app/Shared/models/form.class';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountExtrasService } from '../../accounts-extras/account-extras.service';
import { AccountsService } from '../../accounts-extras/accounts.service';
import { EPageType } from 'src/app/Shared/models/index.model';
import { AccCode, AccCodeMapping, CreateAccCode } from '../../account';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { PaymentOutwardService } from '../../payment-outward/payment-outward.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';

@Component({
  selector: 'app-create-accounts',
  templateUrl: './create-accounts.component.html',
  styleUrls: ['./create-accounts.component.scss'],
})
export class CreateAccountAccounts
  extends PageTemplateComponent
  implements OnInit {
  @ViewChild('f') form: NgForm;

  private nbofLedger: number = 1;
  // form: FormGroup;
  // childForm: FormGroup;
  errorMessage: any[] = [];
  loading: boolean = true;
  loadingText = '';
  submitBtn: boolean;
  accountFormData: IAccountPost;
  pageType: EPageType;
  acc: any = {};
  showMode: boolean;
  accCode = new AccCode();
  accCodeMapping = new AccCodeMapping();
  createAccCode = new CreateAccCode(this.accCode, [this.accCodeMapping]);
  accountTypes: any[] = [];
  accountGroups: any[] = [];
  transReasons: any[] = [];
  companies: any[] = [];

  constructor(
    public accS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private codeService: CodeService,
    public uS: UtilityService,
    private companyService: CompanyService,
    private pOService: PaymentOutwardService
  ) {
    super(activatedRoute, uS);
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getAccTypes();
    this.getAccGroups();
    this.getTransReasons();

    /* this.activatedRoute.queryParams
      .subscribe(
        params => {
          const code = params.accountCode
          if (code != null) {
            this.loading = true
            this.loadingText = "Fetching Account Code....."
            this.fetchAccounts(code)
          }
        }
      ) */
  }

  ngAfterViewInit(): void {
    super.init(async () => {
      this.loading = true;
      return this.code ? this.fetchAccounts(this.code) : null;
    });
  }

  checkCompany(k: number) {
    var comp = this.createAccCode.accCodeMapping.filter(
      (acc) =>
        this.createAccCode.accCodeMapping[k].companyCode == acc.companyCode
    );

    if (comp.length < 2)
      this.pOService
        .getAccCodeMappingByCompany(
          this.createAccCode.accCode.code,
          this.createAccCode.accCodeMapping[k].companyCode
        )
        .subscribe((data: any[]) => {
          if (data.length > 0) {
            this.createAccCode.accCodeMapping[k].companyCode = null;
            this.errorMessage[k] = 'Already Taken!.';
          } else {
            this.errorMessage[k] = '';
          }
        });
    else {
      this.createAccCode.accCodeMapping[k].companyCode = null;
      this.errorMessage[k] = 'Already Taken!.';
    }
  }

  getCompanies() {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getAccTypes() {
    this.codeService
      .getCodesByCodeSubGroup('ACC_TYPE')
      .subscribe((data: any) => {
        this.accountTypes = data;
      });
  }

  getAccGroups() {
    this.codeService
      .getCodesByCodeSubGroup('ACC_GROUP')
      .subscribe((data: any) => {
        this.accountGroups = data;
      });
  }

  getTransReasons() {
    this.codeService
      .getCodesByCodeSubGroup('TRANS_REASON')
      .subscribe((data: any) => {
        this.transReasons = data;
      });
  }

  fetchAccounts(code: string) {
    return this.accS
      .getAccountbyAccountCode(code)
      .subscribe((res: CreateAccCode) => {
        this.createAccCode.accCode = res.accCode;
        if (this.isClone) {
          delete this.createAccCode.accCode.id;
          delete this.createAccCode.accCode.code;
        }

        this.createAccCode.accCodeMapping = [];

        res.accCodeMapping.map((mapping) => {
          if (this.isClone) delete mapping.id;
          mapping.rowId = this.createAccCode.accCodeMapping.length + 1;
          this.createAccCode.accCodeMapping.push(mapping);
        });

        if (this.createAccCode.accCodeMapping.length < 1)
          this.createAccCode.accCodeMapping = [new AccCodeMapping()];

        if (this.isShow) this.form.form.disable();
        this.loading = false;
      });
  }

  onSubmit() {
    this.loading = true;
    this.loadingText = 'Saving Acc Code....';
    this.accS.submitAccountPost(this.createAccCode).subscribe(
      (res: CreateAccCode) => {
        this.loading = false;

        this.createAccCode.accCode = res.accCode;

        this.createAccCode.accCodeMapping = [];

        res.accCodeMapping.map((mapping) => {
          mapping.rowId = this.createAccCode.accCodeMapping.length + 1;
          this.createAccCode.accCodeMapping.push(mapping);
        });

        this.uS.notify('Acc Codes saved successfully!.', 1);
      },
      () => {
        this.loading = false;
        this.uS.notify('Unable to save accounts!.', 0);
      }
    );
  }

  addCompanyLedgerGroup() {
    var accCodeMapping = new AccCodeMapping();
    accCodeMapping.rowId = this.createAccCode.accCodeMapping.length + 1;
    this.createAccCode.accCodeMapping.push(accCodeMapping);
  }

  removeCompanyLedgerGroup(index: number) {
    this.createAccCode.accCodeMapping.splice(index, 1);
  }
}
