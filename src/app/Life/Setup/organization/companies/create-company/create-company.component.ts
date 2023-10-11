import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { GateWayService } from 'src/app/Services/gateway.service';
import { CodeService } from 'src/app/Services/code.service';
import { CorrespondenceService } from 'src/app/Services/life/correspondence.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { LocationService } from 'src/app/Services/location.service';
import { PayinMethodService } from 'src/app/Services/life/payout-method.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProviderService } from 'src/app/Services/provider.service';
import { environment } from 'src/environments/environment';
import { CompanyAccount, CompanyEmailGatewayIn, CompanyEmailGatewayOut, CompanyFileLocation, CompanyInfo, CompanyPayoutMethod, CompanyRates, CompanySmsGateway, CompanyTiers, CompanyTolerance, CreateCompany } from './models/create-company';
import { CompanyService } from 'src/app/Services/life/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
})
export class CreateCompanyOrgComponent implements OnInit {
  private curr1: number = 1;
  private curr2: number = 1;
  private curr3: number = 1;
  private curr4: number = 1;
  private emailOut: number = 2;
  private emailIn: number = 1;
  private smsIn: number = 1;
  private tolerance: number = 1;

  @ViewChild("f") form: NgForm;

  baseUrl = environment.apiBaseUrl + "/rest"

  smsCounter: any[] = []
  emailOutCounter: any[] = []
  emailInCounter: any[] = []
  curr4Counter = []
  curr3Inc = []
  curr3Counter = []
  curr2Counter = []
  curr1Counter = []

  fakeCompanyTiers = {
    deleted: false,
    currency1: "",
    currency2: "",
    currency3: "",
    currency4: "",
    tier1: "1",
    tier2: "2",
    tier3: "3",
    tier4: "4",
    limit1: 0,
    limit2: 0,
    limit3: 0,
    limit4: 0,
    tierCat: "",
    id1: null,
    id2: null,
    id3: null,
    id4: null,
    rowId: 0,
    lineNo: 1
  }

  fakeCompanyTiersArr = [this.fakeCompanyTiers]

  companyAccount = new CompanyAccount()
  companyEmailGatewayIn = new CompanyEmailGatewayIn()
  companyEmailGatewayOut = new CompanyEmailGatewayOut()
  companyFileLocation = new CompanyFileLocation()
  companyInfo = new CompanyInfo()
  companyPayoutMethods = new CompanyPayoutMethod()
  companyRates = new CompanyRates()
  companySmsGateway = new CompanySmsGateway()
  companyTiers = new CompanyTiers()
  companyTolerance = new CompanyTolerance()

  tierCategories: any[] = []

  createCompany = new CreateCompany(
    this.companyAccount,
    this.companyEmailGatewayIn,
    [this.companyEmailGatewayOut],
    this.companyFileLocation,
    this.companyInfo,
    [this.companyPayoutMethods],
    this.companyRates,
    this.companySmsGateway,
    [this.companyTiers],
    [this.companyTolerance]
  )

  currencies: any[] = [];
  filteredCurrencies: any[] = []
  tiersCodes: any[] = []
  payinMathodCodes: any[] = []
  languages: any[] = []
  countries: any[] = []
  cities: any[] = []
  clientUniqueBasis: any[] = []
  coInsuranceIdenities: any[] = []
  commDueTermAgents: any[] = []
  premTaxBasis: any[] = []
  surrTaxBasis: any[] = []
  regLevyBasis: any[] = []
  matTaxBasis: any[] = []
  stampDutyBasis: any[] = []
  emailGatewaysOut: any[] = []
  emailGatewaysIn: any[] = []
  accCodes: any[] = []
  busLines: any[] = []
  genRates: any[] = []
  taxRates: ICodeDescription[] = [];
  smsIdAndUrls: any[] = []

  fakeTiersCat: any[] = []

  loading = false
  loadingText = ""

  pageMode: 'SHOW' | ' CLONE' | 'CREATE';
  loadingCities: boolean = false;

  editMode: boolean = false;

  constructor(
    public router: Router, private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private util: UtilityService,
    private companyService: CompanyService,
    private codeService: CodeService,
    private currencyService: CurrencyService,
    private payinService: PayinMethodService,
    private locationService: LocationService,
    private providerService: ProviderService,
    private correspondenceService: CorrespondenceService,
    private productService: ProductService,
    private gatewayService: GateWayService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getTiersCategories()
    this.getCurrencies()
    this.getTiersCodes()
    this.getPayoutMethod()
    this.getLanguages()
    this.getCountries()
    this.getClientUniqueBasis()
    this.getProvider()
    this.getCommDueTermAgents()
    this.getPremTaxBasis()
    this.getSurrTaxBasis()
    this.getMatTaxBasis()
    this.getRegLevyBasis()
    this.getStampDutyBasis()
    this.getGatewayEmailIdAndSenderEmail()
    this.getAccCodes()
    this.getBusinessLines()
    this.getTaxRates()
    this.getSmsIdAndUrls()

    this.route.queryParams
      .subscribe(
        params => {
          console.log("params", params)
          const code = params.code
          const action = params.action
          if (code != null && action != null) {
            this.fetchCompany(action, code)
          }
          switch(action){
            case 'show': this.pageMode = 'SHOW';
            break;
            case 'clone': this.pageMode = ' CLONE';
            break;
            default: this.pageMode = 'CREATE';
            this.editMode = true;
          }
        }
      )

    while (this.createCompany.companyEmailGatewayOut.length < 2) {
      let companyEmailGatewayOut = new CompanyEmailGatewayOut()
      companyEmailGatewayOut.rowId = this.createCompany.companyEmailGatewayOut.length + 1
      this.createCompany.companyEmailGatewayOut.push(companyEmailGatewayOut)
    }

    if (this.createCompany.companyTiers.length < 1) {
      this.addTiers()
    }
  }

  chunk(items, size) {
    const chunks = []
    items = [].concat(...items)

    while (items.length) {
      chunks.push(
        items.splice(0, size)
      )
    }

    return chunks
  }

  fetchCompany(action: string, code: string) {
    this.loading = true
    this.loadingText = "Fetching Company Data....."
    this.companyService.getCompanyCodeByCompanyCode(code)
      .subscribe((res: CreateCompany) => {
        this.loading = false
        this.createCompany.companyAccount = res.companyAccount
        this.createCompany.companyEmailGatewayIn = res.companyEmailGatewayIn
        this.createCompany.companyFileLocation = res.companyFileLocation
        this.createCompany.companyInfo = res.companyInfo
        this.createCompany.companyRates = res.companyRates
        this.createCompany.companySmsGateway = res.companySmsGateway

        if (action == "clone") {
          delete this.createCompany.companyAccount.id
          delete this.createCompany.companyEmailGatewayIn.id
          delete this.createCompany.companyFileLocation.id
          delete this.createCompany.companyInfo.id
          delete this.createCompany.companyRates.id
          delete this.createCompany.companySmsGateway.id
        }

        this.fakeCompanyTiersArr = []
        this.createCompany.companyPayoutMethods = []
        this.createCompany.companyTolerance = []
        this.createCompany.companyTiers = []
        this.createCompany.companyEmailGatewayOut = []

        var tiers = res.companyTiers.reduce((r, a: CompanyTiers) => {
          r[a.tierCategory] = [...r[a.tierCategory] || [], a];
          return r;
        }, {});

        this.fakeTiersCat = Object.keys(tiers)

        for (const tierCat of this.fakeTiersCat) {
          var chunks = this.chunk(tiers[tierCat], 4)

          chunks.map((tier: any) => {
            var data: any = {}

            tier.map((tierData: CompanyTiers) => {

              data['currency1'] = tierData.currCode
              data['tierCat'] = tierData.tierCategory

              console.log("tierData", tierData)

              if (tierData.tierCode == "1") {

                data['limit1'] = tierData.limit
                if (action == "clone") delete tierData.id
                else
                  data["id1"] = tierData.id
              }

              if (tierData.tierCode == "2") {

                data['limit2'] = tierData.limit
                if (action == "clone") delete tierData.id
                else
                  data["id2"] = tierData.id
              }

              if (tierData.tierCode == "3") {

                data['limit3'] = tierData.limit
                if (action == "clone") delete tierData.id
                else
                  data["id3"] = tierData.id
              }

              if (tierData.tierCode == "4") {

                data['limit4'] = tierData.limit
                if (action == "clone") delete tierData.id
                else
                  data["id4"] = tierData.id
              }

              console.log("fake data: ", data)
            })

            data["rowId"] = this.fakeCompanyTiersArr.length + 1
            this.fakeCompanyTiersArr.push(data)

            console.log("this.fakeCompanyTiersArr", this.fakeCompanyTiersArr)
          })
        }

        res.companyPayoutMethods.map((payout: CompanyPayoutMethod) => {
          if (action == "clone") delete payout.id
          payout.rowId = this.createCompany.companyPayoutMethods.length + 1
          payout.deleted = false
          this.createCompany.companyPayoutMethods.push(payout)
        })

        res.companyEmailGatewayOut.map((emailOut: CompanyEmailGatewayOut) => {
          if (action == "clone") delete emailOut.id
          emailOut.rowId = this.createCompany.companyEmailGatewayOut.length + 1
          this.createCompany.companyEmailGatewayOut.push(emailOut)
        })

        res.companyTolerance.map((tolerance: CompanyTolerance) => {
          if (action == "clone") delete tolerance.id
          tolerance.rowId = this.createCompany.companyTolerance.length + 1
          tolerance.deleted = false
          this.createCompany.companyTolerance.push(tolerance)
        })

        if (this.fakeCompanyTiersArr.length < 1) this.addTiers()
        if (this.createCompany.companyPayoutMethods.length < 1) this.addPayout()
        if (this.createCompany.companyTolerance.length < 1) this.addTolerance()


        this.getCities()
      }, () => {
        this.loading = false
        this.util.notify("Internal server error!...", 0)
      })
  }

  getTaxRates(){
    this.productService.getTaxRates().subscribe(
      data => this.taxRates = data
    )
  }

  getSmsIdAndUrls() {
    this.gatewayService.getSMSGatewayIdAndSmsUrl()
      .subscribe((data: any) => {
        this.smsIdAndUrls = data
      })
  }

  getBusinessLines() {
    this.codeService.getCodesByCodeSubGroup("BUS_LINE")
      .subscribe((data: any) => {
        this.busLines = data
      })
  }

  getAccCodes() {
    this.codeService.getAllAccCodes()
      .subscribe((data: any) => {
        this.accCodes = data
      })
  }

  getGatewayEmailIdAndSenderEmail() {
    this.correspondenceService.getGatewayEmailIdAndSenderEmail("OUT")
      .subscribe((data: any) => {
        this.emailGatewaysOut = data
      })

    this.correspondenceService.getGatewayEmailIdAndSenderEmail("IN")
      .subscribe((data: any) => {
        this.emailGatewaysIn = data
      })
  }

  getStampDutyBasis() {
    this.codeService.getCodesByCodeSubGroup("STAMP_DUTY_BASIS")
      .subscribe((data: any) => {
        this.stampDutyBasis = data
      })
  }

  getMatTaxBasis() {
    this.productService.getProductRateCat("TAX")
      .subscribe((data: any) => {
        this.matTaxBasis = data
      })
  }

  getRegLevyBasis() {
    this.codeService.getCodesByCodeSubGroup("REG_LEVY_BASIS")
      .subscribe((data: any) => {
        this.regLevyBasis = data
      })
  }

  getSurrTaxBasis() {
    this.productService.getProductRateCat("TAX")
      .subscribe((data: any) => {
        this.surrTaxBasis = data
      })
  }

  getPremTaxBasis() {
    this.codeService.getCodesByCodeSubGroup("PREM_TAX_BASIS")
      .subscribe((data: any) => {
        this.premTaxBasis = data
      })
  }

  getCommDueTermAgents() {
    this.codeService.getCodesByCodeSubGroup("COMM_DUE_TERM_AGENT_BASIS")
      .subscribe((data: any) => {
        this.commDueTermAgents = data
      })
  }

  getProvider() {
    this.providerService.getProvidersBySubCategory("CI")
      .subscribe((data: any) => {
        this.coInsuranceIdenities = data
      })
  }

  getCountries() {
    this.locationService.getCountries()
      .subscribe((data: any) => {
        this.countries = data
      })
  }

  getCities() {
    this.loadingCities = true;
    this.locationService.getStatesCountry(this.createCompany.companyInfo.hqCountry)
      .subscribe((data: any) => {
        this.cities = data
      }).add(() => this.loadingCities = false)
  }

  getClientUniqueBasis() {
    this.codeService.getCodesByCodeSubGroup("CLIENT_UNIQUE_BASIS")
      .subscribe((data: any) => {
        this.clientUniqueBasis = data
      })
  }

  getLanguages() {
    this.codeService.getCodesByCodeSubGroup("LANGUAGE")
      .subscribe((data: any) => {
        this.languages = data
      })
  }

  getPayoutMethod() {
    this.payinService.getPayOutMethodCodesAndDesc()
      .subscribe((data: any) => {
        this.payinMathodCodes = data
      })
  }

  getTiersCategories(): void {
    this.codeService.getCodesByCodeSubGroup("TIER_CATEGORY")
      .subscribe((data: any) => {
        this.tierCategories = data
      })
  }

  getTiersCodes(): void {
    this.codeService.getCodesByCodeSubGroup("AUTH_TIER")
      .subscribe((data: any) => {
        this.tiersCodes = data
      })
  }

  createNewCompany(): void {
    if (this.form.invalid) {
      // indicate all fields with errors
      this.form.form.markAllAsTouched()
      this.util.notify('Fill all required fields in all tabs', 0)
      return;
    }
    
    this.createCompany.companyTiers = []

    // console.log("this.fakeCompanyTiersArr submit", this.fakeCompanyTiersArr)

    this.fakeCompanyTiersArr.map((tier) => {
      let companyTiers1 = new CompanyTiers()
      companyTiers1.deleted = tier.deleted
      companyTiers1.currCode = tier.currency1
      companyTiers1.tierCode = "1"
      companyTiers1.limit = tier.limit1
      companyTiers1.tierCategory = tier.tierCat
      companyTiers1.id = tier.id1
      this.createCompany.companyTiers.push(companyTiers1)

      let companyTiers2 = new CompanyTiers()
      companyTiers2.deleted = tier.deleted
      companyTiers2.currCode = tier.currency1
      companyTiers2.tierCode = "2"
      companyTiers2.limit = tier.limit2
      companyTiers2.tierCategory = tier.tierCat
      companyTiers2.id = tier.id2
      this.createCompany.companyTiers.push(companyTiers2)

      let companyTiers3 = new CompanyTiers()
      companyTiers3.deleted = tier.deleted
      companyTiers3.currCode = tier.currency1
      companyTiers3.tierCode = "3"
      companyTiers3.limit = tier.limit3
      companyTiers3.tierCategory = tier.tierCat
      companyTiers3.id = tier.id3
      this.createCompany.companyTiers.push(companyTiers3)

      let companyTiers4 = new CompanyTiers()
      companyTiers4.deleted = tier.deleted
      companyTiers4.currCode = tier.currency1
      companyTiers4.tierCode = "4"
      companyTiers4.limit = tier.limit4
      companyTiers4.tierCategory = tier.tierCat
      companyTiers4.id = tier.id4
      this.createCompany.companyTiers.push(companyTiers4)
    })

    if (this.createCompany.companyEmailGatewayIn.gatewayCode != null)
      this.createCompany.companyEmailGatewayIn.createdBy = "user"
    
    this.loading = true
    this.loadingText = "Saving company....."
    this.companyService.createCompany(this.createCompany)
      .subscribe((data: any) => {
        console.log("data from creating company: ", data)
        this.loading = false
        const companyCode = data?.companyInfo?.code;
        this.util.info(
          "Company created successfully!. Company Code: " + companyCode, 1
        ).then(
          () => {
            const prepend = window.location.search ? `${window.location.search}&` : '?';
            window.location.search = `${prepend}action=show&code=${companyCode}`
          }
        )
      }, (err: any) => {
        this.loading = false
        this.util.info("Internal server error.", 0)
      })
    // } else {
    //   this.snack.open("Kindly fill all required fields.", "Close", { duration: 5000 })
    // }
  }

  getCurrencies() {
    this.currencyService.getCurrency()
      .subscribe((data: any) => {
        this.filteredCurrencies = this.currencies = data
      })
  }

  addPayout(): void {
    let payout = new CompanyPayoutMethod()
    payout.rowId = this.createCompany.companyPayoutMethods.length + 1
    payout.deleted = false
    this.createCompany.companyPayoutMethods.push(payout)
  }

  removePayout(i: number): void {
    if (this.createCompany.companyPayoutMethods[i].id != null) {
      if (confirm("Do you want to delete Company Payment Outward Methods, id: " + this.createCompany.companyPayoutMethods[i].id + " ?")) {
        this.api.delete(this.baseUrl + "/company/payout/" + this.createCompany.companyPayoutMethods[i].id)
          .subscribe(() => {
            this.createCompany.companyPayoutMethods.splice(i, 1);
            this.util.notify("Deleted successfully!.", 1)
          }, () => {
            this.util.notify("Error deleting company payment outward Method!.", 0)
          })
      }
    } else
      this.createCompany.companyPayoutMethods.splice(i, 1);
  }

  addTolerance(): void {
    let tolerance = new CompanyTolerance()
    tolerance.rowId = this.createCompany.companyTolerance.length + 1
    tolerance.deleted = false
    this.createCompany.companyTolerance.push(tolerance)
  }

  removeTolerance(i: number): void {
    if (this.createCompany.companyTolerance[i].id != null) {
      if (confirm("Do you want to delete Company Tolerance, id: " + this.createCompany.companyTolerance[i].id + " ?")) {
        this.api.delete(this.baseUrl + "/company/tolerance/" + this.createCompany.companyTolerance[i].id)
          .subscribe(() => {
            this.createCompany.companyTolerance.splice(i, 1);
            this.util.notify("Deleted successfully!.", 1)
          }, () => {
            this.util.notify("Error deleting Company Tolerance!.", 0)
          })
      }
    }
    else
      this.createCompany.companyTolerance.splice(i, 1);
  }

  addTiers(): void {
    let tiers = {
      deleted: false,
      currency1: "",
      currency2: "",
      currency3: "",
      currency4: "",
      tier1: "1",
      tier2: "2",
      tier3: "3",
      tier4: "4",
      limit1: 0,
      limit2: 0,
      limit3: 0,
      limit4: 0,
      tierCat: "",
      id1: null,
      id2: null,
      id3: null,
      id4: null,
      rowId: this.fakeCompanyTiersArr.length + 1,
      lineNo: 0
    }

    tiers.rowId = this.fakeCompanyTiersArr.length + 1
    tiers.deleted = false
    this.fakeCompanyTiersArr.push(tiers)
  }

  removeTiers(i: number): void {
    if (this.fakeCompanyTiersArr[i].id1 != null
      && this.fakeCompanyTiersArr[i].id2 != null
      && this.fakeCompanyTiersArr[i].id3 != null
      && this.fakeCompanyTiersArr[i].id4 != null) {
      if (confirm("Do you want to delete Company Tier with ids, "
        + this.fakeCompanyTiersArr[i].id1 + ", "
        + this.fakeCompanyTiersArr[i].id2 + ", "
        + this.fakeCompanyTiersArr[i].id3 + ", "
        + this.fakeCompanyTiersArr[i].id4 + " ?"
      )) {
        var ids = [
          this.fakeCompanyTiersArr[i].id1,
          this.fakeCompanyTiersArr[i].id2,
          this.fakeCompanyTiersArr[i].id3,
          this.fakeCompanyTiersArr[i].id4
        ]

        ids.forEach(id => {
          this.api.delete(this.baseUrl + "/company/tiers/" + id)
            .subscribe(() => {
              this.createCompany.companyTiers.splice(i, 1);
              this.util.notify("Company Tiers with id " + id + " deleted successfully!.", 1)
            }, () => {
              this.util.notify("Error deleting Company Tiers with id: " + id, 0)
            })
        })
      }
    } else
      this.fakeCompanyTiersArr.splice(i, 1);
  }

  convertToInteger(event){
    event.target.value = Math.floor(event.target.value)
  }

  onInternalUseChange(index){
    this.createCompany.companyEmailGatewayOut.forEach( item =>   item.internal = false)
    this.createCompany.companyEmailGatewayOut[index].internal = true
  }
}
