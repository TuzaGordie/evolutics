import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { TransactionMapService } from '../trm.service';

@Component({
  selector: 'app-create-trm',
  templateUrl: './create-trm.component.html',
  styleUrls: ['./create-trm.component.scss'],
})
export class CreateTRMComponent implements OnInit {

  company: string = ""
  accFormat: string = ""
  isShow: boolean

  constructor(public trmService: TransactionMapService, private util: UtilityService, private route: ActivatedRoute, public router: Router) { }
  public tRMFormArray = new FormArray([
    new FormGroup({
      transReason: configForms.required(),
      drCr: configForms.required(),
      payinReason: configForms.required(),
      payoutReason: configForms.required(),
      accountCode: configForms.required(),
      claimType: configForms.required(),
      payinType: configForms.required(),

      accFormat: configForms.required(),
      code: configForms.required(),
      companyCode: configForms.required(),
      dn: configForms.boolean(),
      id: configForms.required(),
      productCode: configForms.required(),
      accountType: configForms.required()
      // "accFormat": configForms.required(),
      // "accountCode": configForms.required(),
      // "code": configForms.required(),
      // "companyCode": configForms.required(),
      // "dn": configForms.required(),
      // "drCr": configForms.required(),
      // "id": configForms.required(),
      // "payinReason": configForms.required(),
      // "payoutReason": configForms.required(),
      // "productCode": configForms.required(),
      // "transReason": configForms.required()
    })
  ])

  public companyArray: any[];
  public tRMForm: FormGroup = new FormGroup({
    accFormat: configForms.required(this.accFormat),
    companyCode: configForms.required(this.company),
    tRMFormArray: this.tRMFormArray
  })

  get getTRMFormArray() {
    return (this.tRMForm.get('tRMFormArray') as FormArray).controls;
  }

  description: any[] = [[]];
  changeTransReason(event, index) {
    this.description[index] = event;
  }

  ngAfterViewInit(): void {
    if (this.isShow) this.tRMForm.disable;
  }

  addTRM() {
    this.tRMFormArray.push(
      new FormGroup({
      accFormat: configForms.required(),
      accountCode: configForms.required(),
      code: configForms.required(),
      companyCode: configForms.required(),
      dn: configForms.boolean(),
      drCr: configForms.required(),
      id: configForms.required(),
      payinReason: configForms.required(),
      payoutReason: configForms.required(),
      productCode: configForms.required(),
      transReason: configForms.required(),
      claimType: configForms.required(),
      payinType: configForms.required(),
      accountType: configForms.required()
      // bankAccNo: configForms.required(),
      // bankCode: configForms.required(),
      // bankSortCode: configForms.required(),
      // claimType: configForms.required(),
      // payAccCode: configForms.required(),
      // paymentType: configForms.required(),
      // payoutBasis: configForms.required(),
      // payoutFileFormat: configForms.required()
    }))
  }
  deleteTRM(index: number) {
    this.tRMFormArray.removeAt(index);
  }

  public transReasArray: any[] = [];
  public claimTypeArray: any[] = [];
  public payinReasonArray: any[] = [];
  public payoutReasonArr: any[] = [];
  public payinTypesArr: any[] = [];
  public prodClassArr: any[] = [];
  public accountCodesArray: any[] = [];
  public accCodesArray: any[] = [];

  ngOnInit(): void {
    this.trmService.getCodeAndTitleByCodeSubGroup("TRANS_REASON").subscribe(res => { this.transReasArray = res; })
    this.trmService.getCodeAndTitleByCodeSubGroup("CLAIM_TYPE").subscribe(res => { this.claimTypeArray = res; })
    this.trmService.getCodeAndTitleByCodeSubGroup("PAYIN_REASON").subscribe(res => { this.payinReasonArray = res; })
    this.trmService.getCodeAndTitleByCodeSubGroup("PAYOUT_REASON").subscribe(res => { this.payoutReasonArr = res; })
    this.trmService.getCodeAndTitleByCodeSubGroup("PAYIN_TYPE").subscribe(res => { this.payinTypesArr = res; })
    this.trmService.getCodeAndTitleByCodeSubGroup("PROD_CLASS").subscribe(res => { this.prodClassArr = res; })

    this.trmService.getAllAccountCodesAndDes().subscribe(res => { this.accountCodesArray = res; })
    this.trmService.getAllAccountCodes().subscribe(res => { this.accCodesArray = res; })
    this.trmService.getCompanyCodeAndDesc().subscribe(res => this.companyArray = res)

    this.route.queryParams
      .subscribe(
        params => {
          const { transReason, company, action } = params
          if (action != null && company != null && transReason != null) {
            this.findAccMappingByCompanyAndTrans(company, transReason, action)
            return
          }
        }
      )
  }

  findAccMappingByCompanyAndTrans(company: string, transReason: string, action: string) {
    // FOR TESTING 
    this.trmService.getAccMappingByTransReasonAndCompany(company, transReason)
      .subscribe((data: any) => {
        this.tRMFormArray.patchValue(data)
      })
  }

  getAccType(code: string) {
    return this.accCodesArray.find(accCode => accCode.code == code)
  }

  submit() {

    this.tRMForm.value.tRMFormArray.forEach(element => {
      element.accFormat = this.accFormat
      element.companyCode = this.company

      var accCode = this.getAccType(element.accountCode)
      if (accCode != null || accCode != undefined) {
        element.accountType = accCode.accountType
      }
    });



    console.log("this.tRMForm.value.tRMFormArray", this.tRMForm.value.tRMFormArray)
    // return
    this.trmService.createTransactionMap(this.tRMForm.value.tRMFormArray)
      .subscribe(() => {
        this.util.notify("Created Transaction map successfully!", 1, 5000)
      },
        () => {
          this.util.notify('Error, Please try again later!', 0, 5000);
        }
      );
  }
}
