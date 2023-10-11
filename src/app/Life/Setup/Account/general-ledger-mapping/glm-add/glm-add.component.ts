import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { AccCode, AccCodeMapping, AccountLedger, AllAccCodes, CreateAccCode } from '../../account';
import { AccountExtrasService } from '../../accounts-extras/account-extras.service';
import { IAccountCode, IAccountCodeMapping, IAccountPost } from '../../accounts-extras/account-model';
import { AccountsService } from '../../accounts-extras/accounts.service';

@Component({
  selector: 'app-glm-add',
  templateUrl: './glm-add.component.html',
  styleUrls: ['./glm-add.component.scss']
})
export class GLMAddComponent implements OnInit {
  private nbofTable: number = 1;
  loading = false
  loadingText = ""

  accCode = new AccCode()
  accCodeMapping = new AccCodeMapping()
  allAccCode = new AllAccCodes(
    [this.accCode],
    [this.accCodeMapping]
  )
  accCodeLedger = new AccountLedger(
    this.accCode,
    this.accCodeMapping
  )

  constructor(
    public accS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public route: ActivatedRoute,
    private codeService: CodeService,
    private uS: UtilityService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        params => {
          const { accountGroup, company } = params
          const action = params.redirect
          if (action != null) {
            if (company != null) {
              this.fetchAccCodesMappingByCompany(company)
              return
            }
          }
        }
      )
  }

  fetchAccCodesMappingByCompany(company: string) {
    this.loading = true
    this.loadingText = "Fetching Account Codes by Company...."
    this.accS.getAllAccCodesByCompany(company)
      .subscribe((data: AccCodeMapping[]) => {
        this.loading = false

        this.allAccCode.accCodeMappings = []

        data.map(mapping => {
          mapping.rowId = this.allAccCode.accCodeMappings.length + 1
          this.accS.getAccountMappingByCompanyAndAccCode(company, mapping.accCode)
            .subscribe((data: AccCodeMapping) => {
              mapping.ledgerCode = data?.ledgerCode
            })
          this.allAccCode.accCodeMappings.push(mapping)
        })

        if (data.length < 1) this.allAccCode.accCodeMappings = [new AccCodeMapping()]
      }, () => {
        this.loading = false
      })
  }

  saveAccCode() {

    this.loading = true;
    this.loadingText = "Saving General Ledger Mapping...."
    this.accS.updateAccountCodesMappingLedger(this.allAccCode.accCodeMappings)
      .subscribe((data: AccCodeMapping[]) => {
        this.loading = false;

        this.allAccCode.accCodeMappings = data

        this.uS.notify("General Ledger Mapping saved successfully!.", 1)
      }, () => {
        this.loading = false
        this.uS.notify("Internal server error!.", 0)
      })
  }

  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc() {
    this.nbofTable = this.nbofTable + 1
  }
}
