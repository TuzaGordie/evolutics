import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PDService } from 'src/app/Life/policy-desk/policy-desk-extras/policy-desk.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { BankAccountService } from '../bank-account.service';
import { BankAccount, BankSortCode } from '../bank-accounts.interface'
@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.scss']
})
export class CreateBankAccount implements OnInit {

  bankName: string
  address: string
  city: string
  country: string
  sortCode: string
  town: string

  company: string
  loadingText = ""
  loading = false

  constructor(public bankAccountService: BankAccountService, private util: UtilityService,
    public uS: PDService,
    public route: ActivatedRoute
  ) { }

  public bankCodeArray: any[] = []
  public companyArray: any[] = []
  public countryArray: any[] = []
  public bankArray: any[] = []
  public stateArray: any[] = []
  public townArray: any[] = []
  public branchArray: any[] = []
  public bankSortCodeArray: any[] = [[]]

  bankAccounts: BankAccount[] = [new BankAccount()]

  // public bankAccountFormArray: FormArray = new FormArray([
  //   new FormGroup({
  //     accountNo: configForms.required(),
  //     bankCode: configForms.required(),
  //     sortCode: configForms.required(),
  //     // ADD THE OTHER FIELDS HERE

  //     country: configForms.required(),
  //     bank: configForms.required(),
  //     state: configForms.required(),
  //     branch: configForms.required(),
  //     town: configForms.required(),
  //   })
  // ])

  // public companyForm: FormGroup = new FormGroup({
  //   company: configForms.required(),
  //   bankAccounts: this.bankAccountFormArray
  // })

  ngOnInit(): void {
    this.bankAccountService.getCompanyCodeAndDesc().subscribe(res => this.companyArray = res)
    this.bankAccountService.getBankCodeAndDes().subscribe((res: []) => this.bankCodeArray = res)
    this.bankAccountService.getCountry().subscribe((res: []) => this.countryArray = res)
    this.bankAccountService.getBranchCodeAndDes().subscribe((res: []) => this.branchArray = res)

    this.route.queryParams
      .subscribe(
        params => {
          const { redirect, company } = params
          if (redirect != null && company != null) {
            this.company = company
            this.getBankAccounts(company, redirect)
          }
        }
      )
  }

  getBankAccounts(company, redirect) {
    this.bankAccountService.getBankAccountByCompany(company)
      .subscribe((res: BankAccount[]) => {
        this.bankAccounts = []
        res.map(bank => {
          if(redirect == 'clone') delete bank.id
          bank.rowId = this.bankAccounts.length + 1
          this.bankAccounts.push(bank)
        })
      })
  }
  // get getBankAccounts() {
  //   return (this.companyForm.get('bankAccounts') as FormArray).controls;
  // }

  onCountryChange(country) {
    this.bankAccountService.getBankCodeAndDesByCountry(country).subscribe((res: []) => this.bankArray = res)
    this.bankAccountService.getStateByCountry(country).subscribe((res: []) => this.stateArray = res)
  }

  onChangeCity(city) {
    this.bankAccountService.getTownByCity(city).subscribe((res: []) => this.townArray = res)
  }

  addBankAccount() {
    this.bankAccounts.push(new BankAccount())
  }

  showBankSortCode(i) {
    var queryObj = {}

    if (this.bankName != undefined)
      queryObj['bankName'] = this.bankName

    if (this.town != undefined)
      queryObj['town'] = this.town

    if (this.country != undefined)
      queryObj['country'] = this.country

    if (this.city != undefined)
      queryObj['city'] = this.city

    if (Object.keys(queryObj).length > 0) {
      var queryString = Object.keys(queryObj).map(key => key + '=' + queryObj[key]).join('&');
      this.bankAccountService.findBankSortCode(queryString)
        .subscribe((res: any) => {
          this.bankAccounts[i].bankSortCode = res.page.content

          this.uS.$(`#exampleModal__${i}`).modal('hide')
        })
    }
  }
  deleteBankAccount(index) {
    this.bankAccounts.splice(index, 1)
  }

  findSortCode(i) {
    this.uS.$(`#exampleModal__${i}`).modal('show')
  }

  createBankAccount() {
    if (this.company == undefined || this.company == "") {
      this.util.notify("Error, Company is required", 0, 5000)
      return;
    }
    this.bankAccounts.map(bank => {
      bank.companyCode = this.company
    })
    this.loading = true
    this.loadingText = "Saving Banks Accounts...."
    this.bankAccountService.createBankAccount(this.bankAccounts).subscribe((res) => {
      // this.util.info(`Bank Account with ${res.accountNo} has been created successfully!`, 1, "Sucess!")
      this.util.notify("Bank Account has been created successfully!", 1, 5000)
    },
      () => {
        this.util.notify("Error, Please try again later!", 0, 5000)
      })
      .add(() => this.loading = false)

  }
}