import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { IShortTermRate } from '../../Setup/Rates/short-term-rates/short-term-rates-extras/short-term-rates.interface';
import { FindGroupService } from '../service/find-group.service';
import { AddAssetModalComponent } from './add-asset-modal/add-asset-modal.component';
import { BatchAssetModalComponent } from './batch-asset-modal/batch-asset-modal.component';
import { AssetFinderComponent } from 'src/app/General/quotation-desk/shared/asset-finder/asset-finder.component';
import { formatDate } from '@angular/common';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AssetCreateComponent } from 'src/app/General/quotation-desk/shared/asset-create-index/asset-create.component';
import { CreateAssetComponent } from 'src/app/General/asset-desk/create-asset/create-asset.component';
import { CreateAssetIndexComponent } from 'src/app/General/asset-desk/create-asset-index/create-asset-index.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  form = new FormGroup({
    test: configForms.required(),
  });
  uploaded: any[];
  showAddManually: boolean;
  showUpload: boolean;
  loading: boolean;
  rate: IShortTermRate;
  manualAssetForm: FormGroup;
  manualAssetFormArray: FormArray;
  manualAssets: string[] = [''];
  assetForm: FormGroup;
  file: File;
  groupNo: any;
  covers: any[];
  groupList: any[] = [];
  policyCode: any;
  policyId: any;
  policyNo: any;
  policyGroupId: any;
  quoteNo: any;
  subGroups: any[] = [];
  private nbofMember: number = 1;
  constructor(
    public uS: UtilityService,
    private fb: FormBuilder,
    public findGroupService: FindGroupService,
    private route: ActivatedRoute,
    private qS: QuotationService
  ) {}

  async ngOnInit(): Promise<void> {
    const todate = new Date(Date.now());
    this.manualAssetFormArray = this.fb.array([
      new FormGroup({
        assetNo: new FormControl(null, Validators.required),
        assetRedgNo: new FormControl(null, [Validators.required]),
        assured: new FormControl(null, [Validators.required]),
        coverValue: new FormControl(null, [Validators.required]),
        subGroup: new FormControl(null, [Validators.required]),
        joinDate: new FormControl(formatDate(todate, 'yyyy-MM-dd', 'en-US'), [
          Validators.required,
        ]),
      }),
    ]);

    this.groupNo = this.route.snapshot.queryParams.groupNo;
    const data = await this.findGroupService
      .getGroupList(this.groupNo)
      .toPromise();
    const [covers, group] = [data.covers, data.group];
    this.subGroups = covers.map(({ subgroupNo }) =>
      subgroupNo ? subgroupNo : group.subGroupNo
    );

    this.subGroups = [...new Set(this.subGroups)];

    this.manualAssetForm = this.fb.group({
      manualAssetFormArray: this.manualAssetFormArray,
    });

    console.log(
      'UPDATE to MANUAL UPLOAD' + JSON.stringify(this.manualAssetForm.value)
    );
    var res;
    console.log('checking');
    this.findGroupService.getGroupList(this.groupNo).subscribe((data) => {
      console.log(data);
      res = data;
      this.covers = res.covers;
      this.policyCode = res.group.policyCode;
      this.policyNo = res.group.policyNo;
      this.policyId = res.group.policyId;
      this.quoteNo = res.group.quoteNo;
      this.policyGroupId = res.group.id;
    });
  }

  async validateAssetId(i: number) {
    const data = await this.qS
      .getAssetDetails(
        this.manualAssetFormArray.controls[i].get('assetNo').value
      )
      .toPromise();
    this.manualAssetFormArray.controls[i].patchValue({
      assetRedgNo: data ? data.registrationNo : '',
    });
  }

  findAsset(i: number) {
    this.uS.dialogOpener(AssetFinderComponent, { width: '90vw' }, (asset) =>
      this.manualAssetFormArray.controls[i].patchValue({
        assetNo: asset.assetNo,
        assetRedgNo: asset.registrationNo,
      })
    );
  }

  createAsset(i: number) {
    this.uS.dialogOpener(AssetCreateComponent, { width: '60vw' }, (asset) =>
      console.log(asset)
    );
  }

  export(rate: IShortTermRate = this.rate || this.form.value) {
    const csvArray =
      `S/NO,Asset ID,Brand Code,Make Code,Asset Redg No,Year Manufactured,Engine No,Chasis NO,VIN,Location City,Vehicle Cat,Vehicle Genre,Mv Client,Cover Value,Subgroup,Assured,Join Date (yyyy-MM-dd),Leave Date (yyyy-MM-dd),Change Date (yyyy-MM-dd)\r\n` +
      rate.shortTermRateValuesList
        .map((x) => x.days + ',' + x.factor)
        .join('\r\n');
    console.log(csvArray);

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'Group Motor Upload ' + rate.code + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadTemplate() {
    const rate: any = {
      code: 'template',
      shortTermRateValuesList: [{ days: 1, factor: 0.1 }],
    };
    this.export(rate);
  }

  assetCounter() {
    return new Array(this.nbofMember);
  }
  assetInci(value = 1) {
    this.nbofMember = this.nbofMember + value;
  }

  assetInc() {
    const todate = new Date(Date.now());
    const b = new FormGroup({
      assetNo: new FormControl(null, Validators.required),
      assetRedgNo: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(1),
      ]),
      assured: new FormControl(null, [Validators.required]),
      coverValue: new FormControl(null, [Validators.required]),
      subGroup: new FormControl(null, [Validators.required]),
      joinDate: new FormControl(formatDate(todate, 'yyyy-MM-dd', 'en-US'), [
        Validators.required,
      ]),
    });
    this.manualAssets.push('');
    this.manualAssetFormArray.push(b);
  }

  removeAsset(i) {
    this.manualAssetFormArray.removeAt(i);
    this.manualAssets.splice(i, 1);
  }

  openAddAsset() {
    this.showUpload = false;
    this.showAddManually = true;
  }
  openUpload() {
    this.showUpload = true;
    this.showAddManually = false;
  }

  async import() {
    this.openBatchAssetModal('UPLOAD');
  }

  openBatchAssetModal(mode: 'UPLOAD' | 'MANUAL') {
    console.log(this.uploaded);
    this.uS.dialogOpener(
      BatchAssetModalComponent,
      {
        data: {
          mode,
          asset: this.uploaded,
          receiptBatch: this.uploaded,
          createBatchReceipt: {},
          receiptUpload: {},
        },
        width: '95vw',
        maxWidth: '95vw',
      },
      (r) => {}
    );
  }

  save() {
    let groupUpload = this.manualAssetForm?.value?.manualAssetFormArray;

    for (let index = 0; index < groupUpload.length; index++) {
      const element = groupUpload[index];
      console.log('Print Out' + element.assetNo);
      this.groupList.push({
        alpha: 'string',
        amortisationBasis: 'string',
        anniversary: '2022-01-31T14:47:36.869Z',
        annualIncome: 0,
        applYear: 0,
        assetId: element?.assetNo,
        assetRedgNo: element?.assetRedgNo,
        assured: element?.assured,
        assuredName: 'string',
        assuredRelToOwner: 'string',
        base: true,
        benEscalRate: 0,
        benPayBasis: 'string',
        benPayFreq: 'string',
        benPayTerm: 0,
        benSchedule: true,
        benScheduleBasis: 'string',
        branchCode: 'string',
        busLine: 'string',
        commEarnBasis: 'string',
        commEarnPeriod: 0,
        commRate: 0,
        commType: 'string',
        companyCode: 'string',
        coverCode: element?.coverValue,
        coverDescription: 'string',
        coverEndOn: '2022-01-31T14:47:36.869Z',
        coverNo: 0,
        coverPremFreq: 'string',
        coverPremPayMeth: 'string',
        coverPremium: 0,
        coverRenewalDueOn: '2022-01-31T14:47:36.869Z',
        coverStartOn: element?.joinDate,
        coverTermDays: 0,
        coverTermMo: 0,
        currency: 'string',
        deductible: 0,
        definedBen: true,
        depAdmin: true,
        deposit: 0,
        discCode: 'string',
        emv: 0,
        enroleeNo: 'string',
        enroleeNoSuffix: 'string',
        escalPostClaim: true,
        excess: 0,
        fcl: 0,
        funded: true,
        gmv: 0,
        groupNo: 'string',
        guarYield: 0,
        id: 0,
        idNo: 'string',
        inComplete: true,
        initialSumAssured: 0,
        insType: 'string',
        issueAge: 0,
        issueAssetAge: 0,
        issuedOn: '2022-01-31T14:47:36.869Z',
        loanIntRate: 0,
        loanRepayFreq: 'string',
        matConvertTo: 'string',
        memberClientNo: 'string',
        mthlyIncome: 0,
        noPremPayInLife: 0,
        noPremPayInYr: 0,
        nonMedicalLimit: 0,
        paidFromDate: '2022-01-31T14:47:36.869Z',
        paidToDate: '2022-01-31T14:47:36.869Z',
        payg: true,
        policyCode: 'string',
        policyGroupId: 0,
        policyId: 0,
        policyNo: 'string',
        policyNoSuffix: 'string',
        policyTermDays: 0,
        premFactor: 0,
        premPayFreq: 'string',
        premPayMeth: 'string',
        premPayTermDays: 0,
        premPayTermMo: 0,
        premiumDue: 0,
        premiumPaid: 0,
        premiumTarget: 0,
        premiumToBen: true,
        pricingBasis: 'string',
        productClass: 'string',
        productCode: 'string',
        quoteNo: 'string',
        relBasis: 'string',
        relLifeAssured: 'string',
        relType: 'string',
        relatedTo: 'string',
        renewalAge: 0,
        renewalAssetAge: 0,
        saBasis: 'string',
        saEscalRate: 0,
        saEscalRateBefore: 0,
        saEscalRatePost: 0,
        sar: 0,
        stFactor: 0,
        staffNo: 'string',
        subGroupName: 'string',
        subGroupNo: element?.subGroup,
        sumAssured: 0,
        uncoveredSar: 0,
      });
    }
    let file = '';
    let newinput = {
      groupList: this.groupList,
      groupNo: this.groupNo,
      policyCode: this.policyCode,
      policyGroupId: this.policyGroupId,
      policyId: this.policyId,
      policyNo: this.policyNo,
      quoteNo: this.quoteNo,
    };
    console.log('GROUP LIST' + JSON.stringify(this.groupList));
    console.log('GROUP FILE UPLAOD REQUEST INFO' + JSON.stringify(newinput));
    this.findGroupService.submitAssets(newinput, file).subscribe(
      (res) => {
        console.log('GROUP FILE UPLOAD RESPONSE INFO' + JSON.stringify(res));
        this.uS.notify('Uploaded successfully', 1);
      },
      (err) => {
        console.error(err);
        this.uS.notify('Server could not handle this request', 0);
      }
    );
  }
}
