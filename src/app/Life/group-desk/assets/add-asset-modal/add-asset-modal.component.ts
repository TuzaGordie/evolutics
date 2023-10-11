import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { FindGroupService } from '../../service/find-group.service';

@Component({
  templateUrl: './add-asset-modal.component.html',
  styleUrls: ['./add-asset-modal.component.scss']
})
export class AddAssetModalComponent implements OnInit {
  file: File = null
  assetForm: FormGroup
  groupNo: any
  covers: any[]
  policyCode: any
  policyId: any
  policyNo: any
  policyGroupId: any
  quoteNo: any

  // form = new FormGroup({
  //   test: configForms.required(),
  // });
  constructor(
    public dialogRef: MatDialogRef<AddAssetModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public findGroupService: FindGroupService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupNo = this.route.snapshot.queryParams.groupNo;
    var res
    console.log('checking')
    this.findGroupService.getGroupList(this.groupNo).subscribe( data => {
      console.log(data)
      res = data
      this.covers = res.covers
      this.policyCode = res.group.policyCode
      this.policyNo= res.group.policyNo
      this.policyId = res.group.policyId
      this.quoteNo = res.group.quoteNo
      this.policyGroupId = res.group.id
    })

    this.assetForm = this.fb.group({
      staff_id: new FormControl(null, Validators.required),
      uploadMembers: new FormControl(null, Validators.required),
      client_no: new FormControl(null, Validators.required),
      rel_basis: new FormControl(null, Validators.required),
      relationship: new FormControl(null, Validators.required),
      related_to: new FormControl(null, Validators.required),
      member_name: new FormControl(null, Validators.required),
      subgroup_no: new FormControl(null, Validators.required),
      upload_member: new FormControl(null, Validators.required),

    })
    // this.form.patchValue(this.data);
  }
  close() {
    this.dialogRef.close();
  }
  private nbofMember: number = 1;
  downloadTemplate(){}
  memberCounter() {
    return new Array(this.nbofMember);
  }
  memberInc(value=1) {
    this.nbofMember = this.nbofMember + value
  }

  onChange(event) {
    this.file = event.target.files[0];
  }
  onUpload() {
    // this.loading = !this.loading;
    console.log(this.file);
    // this.fileUploadService.upload(this.file).subscribe(
    //     (event: any) => {
    //         if (typeof (event) === 'object') {

    //             // Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable
    //         }
    //     }
    // );
}

  save(file) {
    let newinput = {
      "covers": [
        {
          "agentNo": "string",
          "aggSumAssured": 0,
          "alpha": "string",
          "anniversary": "2022-01-31",
          "applYear": 0,
          "assetId": 0,
          "assetRedgNo": "string",
          "assured": "string",
          "assuredName": "string",
          "assuredRelToOwner": "string",
          "base": true,
          "benEscalRate": 0,
          "benPayBasis": "string",
          "benPayFreq": "string",
          "benPayTermDays": 0,
          "benPayTermMo": 0,
          "benSchedule": true,
          "benScheduleBasis": "string",
          "branchCode": "string",
          "busLine": "string",
          "code": "string",
          "commEarnBasis": "string",
          "commEarnPeriod": 0,
          "commRate": 0,
          "commType": "string",
          "companyCode": "string",
          "convertReason": "string",
          "coverDescription": "string",
          "coverEndDate": "2022-01-31T14:47:36.869Z",
          "coverEndOn": "2022-01-31T14:47:36.869Z",
          "coverNo": 0,
          "coverPremFreq": "string",
          "coverPremPayMeth": "string",
          "coverPremium": 0,
          "coverRenewalDueOn": "2022-01-31",
          "coverRenewedOn": "2022-01-31",
          "coverStartDate": "2022-01-31",
          "coverTermDays": 0,
          "coverTermMo": 0,
          "currency": "string",
          "deductMin": 0,
          "deductRate": 0,
          "deductible": 0,
          "definedBen": 0,
          "depAdmin": true,
          "deposit": 0,
          "description": "string",
          "discCode": "string",
          "emv": 0,
          "enroleeNo": "string",
          "enroleeNoSuffix": 0,
          "escalContinuePost": true,
          "excess": 0,
          "excessMin": 0,
          "excessRate": 0,
          "fcl": 0,
          "funded": true,
          "gmv": 0,
          "groupNo": "string",
          "groupSaBasis": "string",
          "groupSaBasisValue": "string",
          "guarYield": 0,
          "inComplete": true,
          "initialBaseCoverSa": 0,
          "initialSumAssured": 0,
          "insType": "string",
          "issueAge": 0,
          "issueAssetAge": 0,
          "issueDate": "2022-01-31",
          "issueOn": "2022-01-31T14:47:36.869Z",
          "loanIntRate": 0,
          "loanRepayFreq": "string",
          "memberNo": "string",
          "monthlyIncome": 0,
          "noPremPayInLife": 0,
          "noPremPayInYr": 0,
          "nonMedicalLimit": 0,
          "paidFromDate": "2022-01-31",
          "paidToDate": "2022-01-31",
          "payG": true,
          "policyCode": "string",
          "policyId": 0,
          "policyNo": "string",
          "policyNoSuffix": 0,
          "policyTermDays": 0,
          "premFactor": 0,
          "premPayFreq": "string",
          "premPayMeth": "string",
          "premPayTermDays": 0,
          "premPayTermMo": 0,
          "premiumDue": 0,
          "premiumPaid": 0,
          "premiumTarget": 0,
          "premiumToBen": true,
          "productClass": "string",
          "productCode": "string",
          "quoteNo": "string",
          "quoteValidBasis": "string",
          "quoteValidDays": 0,
          "relLifeAssured": "string",
          "renewalAge": 0,
          "renewalAssetAge": 0,
          "saBasis": "string",
          "saEscalRate": 0,
          "sar": 0,
          "seqNo": 0,
          "stFactor": 0,
          "subgroupName": "string",
          "subgroupNo": "string",
          "suffix": 0,
          "sumAssured": 0,
          "sumAtRisk": 0,
          "uncoveredSar": 0
        }
      ],
      "groupList": [
      ],
      "groupNo": this.groupNo,
      "policyCode": this.policyCode,
      "policyGroupId": this.policyGroupId,
      "policyId": this.policyId,
      "policyNo": this.policyNo,
      "quoteNo": this.quoteNo
    }
    let data = {
      // "covers": [
      //   {
      //     "agentNo": "string",
      //     "aggSumAssured": 0,
      //     "alpha": "string",
      //     "anniversary": "2022-01-31",
      //     "applYear": 0,
      //     "assetId": 0,
      //     "assetRedgNo": "string",
      //     "assured": "string",
      //     "assuredName": "string",
      //     "assuredRelToOwner": "string",
      //     "base": true,
      //     "benEscalRate": 0,
      //     "benPayBasis": "string",
      //     "benPayFreq": "string",
      //     "benPayTermDays": 0,
      //     "benPayTermMo": 0,
      //     "benSchedule": true,
      //     "benScheduleBasis": "string",
      //     "branchCode": "string",
      //     "busLine": "string",
      //     "code": "string",
      //     "commEarnBasis": "string",
      //     "commEarnPeriod": 0,
      //     "commRate": 0,
      //     "commType": "string",
      //     "companyCode": "string",
      //     "convertReason": "string",
      //     "coverDescription": "string",
      //     "coverEndDate": "2022-01-31T14:47:36.869Z",
      //     "coverEndOn": "2022-01-31T14:47:36.869Z",
      //     "coverNo": 0,
      //     "coverPremFreq": "string",
      //     "coverPremPayMeth": "string",
      //     "coverPremium": 0,
      //     "coverRenewalDueOn": "2022-01-31",
      //     "coverRenewedOn": "2022-01-31",
      //     "coverStartDate": "2022-01-31",
      //     "coverTermDays": 0,
      //     "coverTermMo": 0,
      //     "currency": "string",
      //     "deductMin": 0,
      //     "deductRate": 0,
      //     "deductible": 0,
      //     "definedBen": 0,
      //     "depAdmin": true,
      //     "deposit": 0,
      //     "description": "string",
      //     "discCode": "string",
      //     "emv": 0,
      //     "enroleeNo": "string",
      //     "enroleeNoSuffix": 0,
      //     "escalContinuePost": true,
      //     "excess": 0,
      //     "excessMin": 0,
      //     "excessRate": 0,
      //     "fcl": 0,
      //     "funded": true,
      //     "gmv": 0,
      //     "groupNo": "string",
      //     "groupSaBasis": "string",
      //     "groupSaBasisValue": "string",
      //     "guarYield": 0,
      //     "inComplete": true,
      //     "initialBaseCoverSa": 0,
      //     "initialSumAssured": 0,
      //     "insType": "string",
      //     "issueAge": 0,
      //     "issueAssetAge": 0,
      //     "issueDate": "2022-01-31",
      //     "issueOn": "2022-01-31T14:47:36.869Z",
      //     "loanIntRate": 0,
      //     "loanRepayFreq": "string",
      //     "memberNo": "string",
      //     "monthlyIncome": 0,
      //     "noPremPayInLife": 0,
      //     "noPremPayInYr": 0,
      //     "nonMedicalLimit": 0,
      //     "paidFromDate": "2022-01-31",
      //     "paidToDate": "2022-01-31",
      //     "payG": true,
      //     "policyCode": "string",
      //     "policyId": 0,
      //     "policyNo": "string",
      //     "policyNoSuffix": 0,
      //     "policyTermDays": 0,
      //     "premFactor": 0,
      //     "premPayFreq": "string",
      //     "premPayMeth": "string",
      //     "premPayTermDays": 0,
      //     "premPayTermMo": 0,
      //     "premiumDue": 0,
      //     "premiumPaid": 0,
      //     "premiumTarget": 0,
      //     "premiumToBen": true,
      //     "productClass": "string",
      //     "productCode": "string",
      //     "quoteNo": "string",
      //     "quoteValidBasis": "string",
      //     "quoteValidDays": 0,
      //     "relLifeAssured": "string",
      //     "renewalAge": 0,
      //     "renewalAssetAge": 0,
      //     "saBasis": "string",
      //     "saEscalRate": 0,
      //     "sar": 0,
      //     "seqNo": 0,
      //     "stFactor": 0,
      //     "subgroupName": "string",
      //     "subgroupNo": "string",
      //     "suffix": 0,
      //     "sumAssured": 0,
      //     "sumAtRisk": 0,
      //     "uncoveredSar": 0
      //   }
      // ],
      "covers": this.covers,
      "groupList": [
        // {
        //   "alpha": "string",
        //   "amortisationBasis": "string",
        //   "anniversary": "2022-01-31T14:47:36.869Z",
        //   "annualIncome": 0,
        //   "applYear": 0,
        //   "assetId": "string",
        //   "assetRedgNo": "string",
        //   "assured": "string",
        //   "assuredName": "string",
        //   "assuredRelToOwner": "string",
        //   "base": true,
        //   "benEscalRate": 0,
        //   "benPayBasis": "string",
        //   "benPayFreq": "string",
        //   "benPayTerm": 0,
        //   "benSchedule": true,
        //   "benScheduleBasis": "string",
        //   "branchCode": "string",
        //   "busLine": "string",
        //   "commEarnBasis": "string",
        //   "commEarnPeriod": 0,
        //   "commRate": 0,
        //   "commType": "string",
        //   "companyCode": "string",
        //   "coverCode": "string",
        //   "coverDescription": "string",
        //   "coverEndOn": "2022-01-31T14:47:36.869Z",
        //   "coverNo": 0,
        //   "coverPremFreq": "string",
        //   "coverPremPayMeth": "string",
        //   "coverPremium": 0,
        //   "coverRenewalDueOn": "2022-01-31T14:47:36.869Z",
        //   "coverStartOn": "2022-01-31T14:47:36.869Z",
        //   "coverTermDays": 0,
        //   "coverTermMo": 0,
        //   "currency": "string",
        //   "deductible": 0,
        //   "definedBen": true,
        //   "depAdmin": true,
        //   "deposit": 0,
        //   "discCode": "string",
        //   "emv": 0,
        //   "enroleeNo": "string",
        //   "enroleeNoSuffix": "string",
        //   "escalPostClaim": true,
        //   "excess": 0,
        //   "fcl": 0,
        //   "funded": true,
        //   "gmv": 0,
        //   "groupNo": "string",
        //   "guarYield": 0,
        //   "id": 0,
        //   "idNo": "string",
        //   "inComplete": true,
        //   "initialSumAssured": 0,
        //   "insType": "string",
        //   "issueAge": 0,
        //   "issueAssetAge": 0,
        //   "issuedOn": "2022-01-31T14:47:36.869Z",
        //   "loanIntRate": 0,
        //   "loanRepayFreq": "string",
        //   "matConvertTo": "string",
        //   "memberClientNo": "string",
        //   "mthlyIncome": 0,
        //   "noPremPayInLife": 0,
        //   "noPremPayInYr": 0,
        //   "nonMedicalLimit": 0,
        //   "paidFromDate": "2022-01-31T14:47:36.869Z",
        //   "paidToDate": "2022-01-31T14:47:36.869Z",
        //   "payg": true,
        //   "policyCode": "string",
        //   "policyGroupId": 0,
        //   "policyId": 0,
        //   "policyNo": "string",
        //   "policyNoSuffix": "string",
        //   "policyTermDays": 0,
        //   "premFactor": 0,
        //   "premPayFreq": "string",
        //   "premPayMeth": "string",
        //   "premPayTermDays": 0,
        //   "premPayTermMo": 0,
        //   "premiumDue": 0,
        //   "premiumPaid": 0,
        //   "premiumTarget": 0,
        //   "premiumToBen": true,
        //   "pricingBasis": "string",
        //   "productClass": "string",
        //   "productCode": "string",
        //   "quoteNo": "string",
        //   "relBasis": "string",
        //   "relLifeAssured": "string",
        //   "relType": "string",
        //   "relatedTo": "string",
        //   "renewalAge": 0,
        //   "renewalAssetAge": 0,
        //   "saBasis": "string",
        //   "saEscalRate": 0,
        //   "saEscalRateBefore": 0,
        //   "saEscalRatePost": 0,
        //   "sar": 0,
        //   "stFactor": 0,
        //   "staffNo": "string",
        //   "subGroupName": "string",
        //   "subGroupNo": "string",
        //   "sumAssured": 0,
        //   "uncoveredSar": 0
        // }
      ],
      "groupNo": this.groupNo,
      "policyCode": this.policyCode,
      "policyGroupId": this.policyGroupId,
      "policyId": this.policyId,
      "policyNo": this.policyNo,
      "quoteNo": this.quoteNo
    }

    console.log(data)

    this.findGroupService.submitAssets(newinput, file).subscribe(
      res => {
        console.log(res)
      }
    )

  }

}
