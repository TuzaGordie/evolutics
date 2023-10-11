import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/Services/app.service';
import { ClientService } from 'src/app/Services/client.service';
import { PageService } from 'src/app/Services/page.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { FindClientService } from '../../service/find-client.service';

@Component({
  selector: 'app-client-provider-create',
  templateUrl: './client-provider-create.component.html',
  styleUrls: ['./client-provider-create.component.scss'],
})
export class CreateNewProviderComponent implements OnInit {
  testList: any = [];
  viewClientForm: any = FormGroup;
  viewTestForm: any = FormGroup;
  readonlyValue: any;
  policyLength: any;
  relationshipLength: any;
  quoteList: any;
  pendingPaymentsList: any;
  paymentLength: any;
  providerTypeList: any = [];
  providerSubCategoryList: any[] = [];

  postProviderForm: any = new FormGroup({});
  providerNetworkList: any = [];
  disciplineCatList: any = [];
  disciplineList: any = [];
  providerStatusList: any = [];
  tariffCodeList: any = [];
  accountsList: any[] = [];
  qtyBasisList: any = [];
  paymentMethodList: any = [];
  paymentFreqList: any = [];

  licenseTypeList: any = [];
  licenseAuthList: any = [];
  providerJSOnList: any = [];
  statesList: any = [];
  toggleClass: boolean = false;
  toggleClass2: boolean = false;

  loadingSubProviderType = false;
  clientNo: string;
  clientData: any;
  clientProviderFormGroup: FormGroup;
  loading: boolean;
  licenseFile: File;
  facilityPhotos: File[];
  clientType: any;

  clientProvidersType: any[] = [];
  constructor(
    public findClientService: FindClientService,
    public clientS: ClientService,
    public route: ActivatedRoute,
    public uS: UtilityService,
    public appS: AppService,
    public pageS: PageService
  ) {}

  ngOnInit(): void {
    this.clientNo = this.route.snapshot.queryParams.clientNo;
    this.clientType = this.route.snapshot.queryParams.clientType;
    this.setTestList();

    this.clientProviderFormGroup = new FormGroup({
      accounts: new FormGroup({
        coinsuranceFeeClaimFrom: configForms.default(),
        coinsuranceFeeClaimTo: configForms.default(),
        coinsuranceFeeCommissionFrom: configForms.default(),
        coinsuranceFeeCommissionTo: configForms.default(),
        coinsuranceFeeDueFrom: configForms.default(),
        coinsuranceFeeDueTo: configForms.default(),
        coinsuranceFeeMedicalUwFrom: configForms.default(),
        coinsuranceFeeMedicalUwTo: configForms.default(),
        coinsuranceFeePremiumFrom: configForms.default(),
        coinsuranceFeePremiumTo: configForms.default(),
        companyCode: configForms.default(),
      }),
      license: new FormGroup({
        certNo: configForms.default(),
        licenceExpiry: configForms.default(),
        licenceLastChecked: configForms.default(),
        licenceStart: configForms.default(),
        licenceType: configForms.default(),
        licensedAuthority: configForms.default(),
        licensedCondition: configForms.default(),
        uploadLicense: configForms.default(),
      }),
      paymentDetails: new FormGroup({
        frequencyOfPayment: configForms.required(),
        payeeName: configForms.required(),
        paymentMethod: configForms.required(),
      }),
      providerInformation: new FormGroup({
        branches: new FormArray([
          new FormGroup({
            branchAddress: configForms.default(),
            branchState: configForms.default(),
          }),
        ]),
        busLine: configForms.required(
          this.appS.getCurrentSystemMetadata.busline
        ),
        clientNo: configForms.required(this.clientNo),
        disciplines: new FormArray([
          new FormGroup({
            busLine: configForms.required(
              this.appS.getCurrentSystemMetadata.busline
            ),
            discipline: configForms.default(),
            disciplineCategory: configForms.default(),
            quantity: configForms.default(),
            quantityBasis: configForms.default(),
          }),
        ]),
        facilityDescription: configForms.default(),
        network: configForms.default(),
        providerCategory: configForms.default(),
        providerSubCategory: configForms.default(),
        status: configForms.default(),
        tariffCode: configForms.default(),
        type: new FormControl('P', Validators.required),
      }),
    });
    this.setFormData(this.findClientService.clientInfo);

    this.setPolicies();
    this.setRelationship();
    this.setPendingQuotes();
    this.setPendingPayments();
    this.setStates();
    this.setAccounts();
    this.setProviderType();
    this.setProviderNetwork();
    this.setDisciplineCat();
    this.setDiscipline();
    this.setProviderStatus();
    this.setTariffCode();
    this.setQtyBasis();
    this.setPaymentMethod();
    this.setPaymentFreq();
    this.setLicenseType();
    this.setLicenseAuth();

    this.checkClientProvidersType();
  }

  async checkClientProvidersType() {
    const providerNos: string[] = (
      await this.clientS.getClientViewData(this.clientNo).toPromise()
    ).providerNo;
    if (providerNos !== null) {
      providerNos.forEach(async (p) => {
        const d = await this.clientS.getClientProviderData(p).toPromise();
        this.clientProvidersType.push(
          d.providerInformation.providerSubCategory
        );
      });
    }
  }

  get paymentInformationForm() {
    return this.clientProviderFormGroup.get('paymentDetails') as FormGroup;
  }
  get providerInformationForm() {
    return this.clientProviderFormGroup.get('providerInformation') as FormGroup;
  }
  get licenseForm() {
    return this.clientProviderFormGroup.get('license') as FormGroup;
  }
  get accountsForm() {
    return this.clientProviderFormGroup.get('accounts') as FormGroup;
  }

  get disciplines(): FormArray {
    return this.clientProviderFormGroup
      .get('providerInformation')
      .get('disciplines') as FormArray;
  }
  addNewdisciplinesRow(e?, index: number = this.disciplines?.length || 0) {
    const form = new FormGroup({
      busLine: configForms.required(this.appS.getCurrentSystemMetadata.busline),
      discipline: configForms.default(),
      disciplineCategory: configForms.default(),
      quantity: configForms.default(),
      quantityBasis: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.disciplines.insert(index, form);
  }
  removedisciplinesRow(index: number) {
    this.disciplines.removeAt(index);
  }

  get branches(): FormArray {
    return this.clientProviderFormGroup
      .get('providerInformation')
      .get('branches') as FormArray;
  }
  addNewbranchesRow(e?, index: number = this.branches?.length || 0) {
    const form = new FormGroup({
      branchAddress: configForms.default(),
      branchState: configForms.default(),
    });
    if (e) {
      form.patchValue(e);
    }
    this.branches.insert(index, form);
  }
  removebranchesRow(index: number) {
    this.branches.removeAt(index);
  }

  get isShow() {
    return this.pageS.isShow(this.route);
  }

  setTestList() {
    this.findClientService.getClientList2().subscribe((res) => {
      this.testList = res;
      //console.log('rate category', res);
    });
  }

  /** setFormData2(data: any) {
    this.viewTestForm.patchValue({
      testDescription: data?.STATUS,
    });
  }**/

  setPolicies() {
    this.findClientService.getPolicies().subscribe((res) => {
      const policyList: any = res;
      this.policyLength = policyList.length;
      //console.log('policy Info', this.policyLength);
    });
  }
  setRelationship() {
    this.findClientService.getRelationship().subscribe((res) => {
      const relationList: any = res;
      this.relationshipLength = relationList.length;
      //console.log('relationship Info', this.relationshipLength);
    });
  }
  setPendingQuotes() {
    this.findClientService.getPendingQuotes().subscribe((res) => {
      this.quoteList = res;
      this.quoteList = this.quoteList.length;
      //console.log('quotes Info', res);
    });
  }
  setPendingPayments() {
    this.findClientService.getPendingPayments().subscribe((res) => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList.length;
      //console.log('payment Info', res);
    });
  }

  setStates() {
    this.findClientService.getStatesListByCountry('NGA').subscribe((res) => {
      this.statesList = res;
    });
  }

  setAccounts() {
    this.findClientService.getAccountsList().subscribe((res) => {
      this.accountsList = res;
    });
  }

  setFormData(data: any) {}

  onEdit(value: any) {
    this.readonlyValue = value;
    //console.log('formdata', this.viewClientForm.value);
  }
  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }

  setProviderType() {
    this.findClientService.getCodeList('PROVIDER_CAT').subscribe((res) => {
      this.providerTypeList = res;
      // console.log('provider type', res);
    });
  }

  setSubProviderType(providerType) {
    this.loadingSubProviderType = true;
    this.findClientService
      .getSubProviderTypesList('PROVIDER_SUBCAT', providerType)
      .subscribe((res) => {
        this.providerSubCategoryList = res.filter((p) =>
          !this.clientProvidersType.includes(p.code)
        );
        //console.log('sub provider type', res);
        this.loadingSubProviderType = false;
      });
  }

  setProviderNetwork() {
    this.findClientService.getCodeList('NETWORK_CAT').subscribe((res) => {
      this.providerNetworkList = res;
      //console.log('provider network type', res);
    });
  }

  setDisciplineCat() {
    this.findClientService
      .getCodeList('DISCIPLINE_CATEGORY')
      .subscribe((res) => {
        this.disciplineCatList = res;
        //console.log('provider network type', res);
      });
  }

  setDiscipline() {
    this.findClientService.getCodeList('DISCIPLINE').subscribe((res) => {
      this.disciplineList = res;
      //console.log('provider network type', res);
    });
  }

  setProviderStatus() {
    this.findClientService.getCodeList('PROVIDER_STATUS').subscribe((res) => {
      this.providerStatusList = res;
      //console.log('provider network type', res);
    });
  }

  setTariffCode() {
    this.findClientService.getTariffCodesList().subscribe((res) => {
      this.tariffCodeList = res;
      // console.log('provider network type', res);
    });
  }

  setQtyBasis() {
    this.findClientService.getCodeList('QUANTITY_BASIS').subscribe((res) => {
      this.qtyBasisList = res;
      //console.log('provider network type', res);
    });
  }
  setPaymentMethod() {
    this.findClientService.getCodeList('PAYOUTWARD_METHOD').subscribe((res) => {
      this.paymentMethodList = res;
      //console.log('provider network type', res);
    });
  }

  setPaymentFreq() {
    this.findClientService.getCodeList('FREQUENCY').subscribe((res) => {
      this.paymentFreqList = res;
      //console.log('provider network type', res);
    });
  }

  setLicenseType() {
    this.findClientService.getCodeList('LICENSE_TYPE').subscribe((res) => {
      this.licenseTypeList = res;
      //console.log('provider network type', res);
    });
  }

  setLicenseAuth() {
    this.findClientService.getCodeList('LICENSE_AUTHORITY').subscribe((res) => {
      this.licenseAuthList = res;
      //console.log('provider network type', res);
    });
  }

  onProviderTypeChange(event) {
    const providerType = event.target.value;
    this.setSubProviderType(providerType);
  }
  extractLicenseFile(e) {
    this.licenseFile = this.uS.extractUpload(e)[0];
  }

  async submit() {
    this.loading = true;
    const formStr = JSON.stringify(this.clientProviderFormGroup.value);
    console.log('form', this.clientProviderFormGroup.value, formStr);
    try {
      const fd = new FormData();
      fd.append('clientProvider', formStr);
      console.log('provider', formStr);
      const docs: IDocMetadata[] = [];
      if (this.licenseFile) {
        fd.append('files', this.licenseFile);
        docs.push({
          title: this.licenseFile.name,
          boxNo: '2',
          branch: 'license',
          category: 'CLI',
          refCat: 'CLI',
          sensitivity: 'normal',
          subCategory: 'LI',
        });
      }
      if (this.facilityPhotos?.length) {
        for (const file of this.facilityPhotos) {
          fd.append('files', file);
          docs.push({
            title: file.name,
            boxNo: '2',
            branch: 'facilityPhoto',
            category: 'CLI',
            refCat: 'CLI',
            sensitivity: 'normal',
            subCategory: 'LI',
          });
        }
      }
      if (docs?.length) {
        fd.append('document', JSON.stringify(docs));
      }
      const res = await this.clientS.createProvider(fd).toPromise();
      this.loading = false;
      const providerNo = res?.providerInformation?.no;
      this.uS
        .info(`Client Provider ${providerNo} has been created successfully`, 1)
        .then((r) =>
          this.uS.router.navigate(['../view-provider'], {
            relativeTo: this.route,
            queryParams: { providerNo },
          })
        );
      console.log('post form submission', res);
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.uS.info(`An error occurred`, 0);
    }
  }
}

const testData = {
  accounts: {
    coinsuranceFeeClaimFrom: null,
    coinsuranceFeeClaimTo: null,
    coinsuranceFeeCommissionFrom: 'POLFEE',
    coinsuranceFeeCommissionTo: null,
    coinsuranceFeeDueFrom: 'SUSP',
    coinsuranceFeeDueTo: 'CASH',
    coinsuranceFeeMedicalUwFrom: null,
    coinsuranceFeeMedicalUwTo: null,
    coinsuranceFeePremiumFrom: null,
    coinsuranceFeePremiumTo: 'EPREM',
    companyCode: null,
  },
  license: {
    certNo: null,
    licenceExpiry: '2022-01-23',
    licenceLastChecked: null,
    licenceStart: '2022-01-12',
    licenceType: 'Intermerdiary',
    licensedAuthority: 'Chartered Insurance Institute Nigeria',
    licensedCondition: 'cond',
    uploadLicense: null,
  },
  paymentDetails: {
    frequencyOfPayment: 'D',
    payeeName: 'JAME WILLIAMS BOND',
    paymentMethod: 'CH',
  },
  providerInformation: {
    branches: [
      {
        branchAddress: 'gghj',
        branchState: 'KOG',
      },
    ],
    busLine: 'G',
    clientNo: '1',
    disciplines: [
      {
        busLine: 'G',
        discipline: 'Urine Investigations',
        disciplineCategory: null,
        quantity: 1,
        quantityBasis: 'No of xray machines',
      },
    ],
    facilityDescription: 'desc',
    network: 'Category C',
    providerCategory: 'MP',
    providerSubCategory: 'Medical Provider',
    status: 'Inactive',
  },
};
