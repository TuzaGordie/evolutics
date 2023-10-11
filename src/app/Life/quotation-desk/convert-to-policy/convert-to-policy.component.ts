import { Component, OnInit, ViewChild } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { configForms } from 'src/app/Shared/models/form.class';
import { FCInput } from 'src/app/Shared/models/index.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AppService } from 'src/app/Services/app.service';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryComponent } from '../create-new-individual-quotation/sections/beneficiary/beneficiary.component';
import { QuotationService } from '../../services/quotation-service.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { QuotationDeskPaymentTabComponent } from '../create-new-individual-quotation/sections/quotation-desk-payment-tab/quotation-desk-payment-tab.component';
import { JointOwnerModalComponent } from '../../life-components/convert-quote-modal/convert-quote-modal.component';
declare let $;
@Component({
  selector: 'app-convert-to-policy',
  templateUrl: './convert-to-policy.component.html',
  styleUrls: ['./convert-to-policy.component.scss'],
})
export class ConvertToPolicyComponent implements OnInit {
  @ViewChild('beneficiarySection', { static: true })
  beneficiarySection: BeneficiaryComponent;
  @ViewChild('paymentSection', { static: true })
  paymentSection: QuotationDeskPaymentTabComponent;
  isCreatingClientsQuotation: boolean = false;
  isCreatingPaymentsQuotation: boolean = false;
  inputs1: FCInput[] = [
    new FCInput('Client Number', 'clientNo', configForms.required()),
    new FCInput('Last Name', 'lastName'),
    new FCInput('Email', 'email', configForms.required(), 'email'),
    new FCInput(
      'Relationship',
      'relationship',
      configForms.required(),
      'select'
    ),
    new FCInput('Client Number', 'clientNo', configForms.required()),
    new FCInput('Full Name', 'lastName'),
    new FCInput('Email', 'email', configForms.required(), 'email'),
    // new FCInput(
    //   'Created Date From',
    //   'createdDateFrom',
    //   configForms.default(),
    //   'date'
    // ),
  ];

  inputs2: FCInput[] = [
    new FCInput('First Name', 'firstName', configForms.required()),
    new FCInput('DOB', 'firstName', configForms.required()),
    new FCInput('Mobile No', 'mobileNo', configForms.required(), 'number'),
    new FCInput('Share (%)', 'share', configForms.required()),
    new FCInput(
      'Relationship',
      'relationship',
      configForms.required(),
      'select'
    ),
    new FCInput('Phone No', 'phoneNo', configForms.required(), 'number'),
  ];

  beneficiayForm1 = new FormGroup(this.uS.formFieldsFromArr(this.inputs1));
  beneficiayForm2 = new FormGroup(this.uS.formFieldsFromArr(this.inputs2));

  payInfoInputs: FCInput[] = [
    new FCInput(
      'Payment Method',
      'paymentMethod',
      configForms.default(),
      'select'
    ),
    new FCInput('Bank No', 'bankNo', configForms.default()),
    new FCInput('Payee Name', 'payeeName', configForms.default()),
  ];
  payInfoForm = new FormGroup(this.uS.formFieldsFromArr(this.payInfoInputs));
  paymentForm = new FormGroup({
    dda: new FormArray([]),
    pa: new FormArray([]),
  });
  queryParams: any;
  productInfo: any;
  accounts = [];
  constructor(
    private appS: AppService,
    private route: ActivatedRoute,
    private qS: QuotationService,
    private uS: UtilityService
  ) {}
  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParamMap;
    this.productInfo = {
      policyNo: this.queryParams.get('policyNo'),
      quoteNo: this.queryParams.get('quoteNo'),
      policyCode: this.queryParams.get('policyCode'),
      clientNo: this.queryParams.get('clientNo'),
      productCode: this.queryParams.get('productCode'),
      policyID: this.queryParams.get('policyID'),
      owner: this.queryParams.get('owner'),
      payFreq: this.queryParams.get('pfreq'),
    };
    this.inputs1.forEach((x) => {
      x.form = this.beneficiayForm1;
      x.formControl = this.beneficiayForm1.get[x.name];
    });
    this.inputs2.forEach((x) => {
      x.form = this.beneficiayForm2;
      x.formControl = this.beneficiayForm2.get[x.name];
    });
    this.payInfoInputs.forEach((x) => {
      x.form = this.payInfoForm;
      x.formControl = this.payInfoForm.get[x.name];
    });
    this.addDDA();
    this.addPA();
  }
  get dda() {
    return this.paymentForm.get('dda') as FormArray;
  }
  get pa() {
    return this.paymentForm.get('pa') as FormArray;
  }
  // segment: string = 'beneficiary';
  segment: string = 'payment';
  switchSegment(segment: string) {
    this.segment = segment;
    console.log(this.segment);
  }

  prev() {
    if (this.segment === 'med') {
      this.switchSegment('beneficiary');
    } else if (this.segment === 'payment') {
      this.switchSegment('med');
    }
  }

  next() {
    if (this.segment === 'beneficiary') {
      this.switchSegment('med');
    } else if (this.segment === 'med') {
      this.switchSegment('payment');
    }
  }

  addDDA(item?: any, index: number = this.dda?.controls?.length) {
    const form = new FormGroup({
      method: new FormControl(),
      payee_no: new FormControl(),
      payee: new FormControl(),
      payee_proportion: new FormControl(),
    });
    if (item) form.patchValue(item);
    this.dda.insert(index, form);
  }
  removeDDA(index: number) {
    this.dda.removeAt(index);
  }

  addPA(item?: any, index: number = this.pa?.controls?.length) {
    const form = new FormGroup({
      method: new FormControl(),
      payee_no: new FormControl(),
      payee: new FormControl(),
      payee_proportion: new FormControl(),
    });
    if (item) form.patchValue(item);
    this.pa.insert(index, form);
  }
  removePA(index: number) {
    this.dda.removeAt(index);
  }

  async submitBeneficiarysInfo() {
    console.log('beneficiary');
  }

  async submitBeneficiaryInfo() {
    this.isCreatingClientsQuotation = true;
    let relClients = [];
    let mydate = new Date(Date.now());
    const todate = formatDate(mydate, 'YYYY-MM-dd', 'en');
    relClients.push({
      busLine: this.appS.getCurrentSystemMetadata.busline,
      codeTitle: null,
      enroleeNo: null,
      enroleeNoSuffix: null,
      groupNo: null,
      id: null,
      policyCode: this.productInfo.policyCode,
      policyGroupId: null,
      policyId: this.productInfo.policyID,
      policyNo: this.productInfo.policyNo,
      policyNoSuffix: null,
      quoteNo: this.productInfo.quoteNo,
      relClient: this.productInfo.owner,
      relDate: todate,
      type: 'S',
    });
    this.beneficiarySection.formValue.beneficiaries.forEach(
      (beneficiary, index) => {
        if (beneficiary.clientNo != this.productInfo.owner) {
          relClients.push({
            busLine: this.appS.getCurrentSystemMetadata.busline,
            codeTitle: null,
            enroleeNo: null,
            enroleeNoSuffix: null,
            groupNo: null,
            id: null,
            policyCode: this.productInfo.policyCode,
            policyGroupId: null,
            policyId: this.productInfo.policyID,
            policyNo: this.productInfo.policyNo,
            policyNoSuffix: null,
            quoteNo: this.productInfo.quoteNo,
            relClient: beneficiary.clientNo,
            relDate: todate,
            type: beneficiary.relationship,
          });
        }
      }
    );
    let legGuard = this.beneficiarySection.formValue.legalGuardian;
    if (legGuard.clientNo != this.productInfo.owner) {
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: null,
        enroleeNo: null,
        enroleeNoSuffix: null,
        groupNo: null,
        id: null,
        policyCode: this.productInfo.policyCode,
        policyGroupId: null,
        policyId: this.productInfo.policyID,
        policyNo: this.productInfo.policyNo,
        policyNoSuffix: null,
        quoteNo: this.productInfo.quoteNo,
        relClient: legGuard.clientNo,
        relDate: todate,
        type: legGuard.relationship,
      });
    }
    let nok = this.beneficiarySection.formValue.nextOfKin;
    if (nok.clientNo != this.productInfo.owner) {
      relClients.push({
        busLine: this.appS.getCurrentSystemMetadata.busline,
        codeTitle: null,
        enroleeNo: null,
        enroleeNoSuffix: null,
        groupNo: null,
        id: null,
        policyCode: this.productInfo.policyCode,
        policyGroupId: null,
        policyId: this.productInfo.policyID,
        policyNo: this.productInfo.policyNo,
        policyNoSuffix: null,
        quoteNo: this.productInfo.quoteNo,
        relClient: nok.clientNo,
        relDate: todate,
        type: nok.relationship,
      });
    }
    const clientData = this.qS
      .submitIndividualClientsInfo(relClients)
      .toPromise();
    await clientData
      .then(() => {
        this.uS.notify('Submitted Beneficiary Details successfully', 1);
      })
      .catch(() => {
        this.uS.notify('There was an error in clients submission', 0);
      })
      .finally(() => {
        this.isCreatingClientsQuotation = false;
      });
  }
  async submitPaymentInfo() {
    console.log(this.paymentSection.pForm.value);
    let dd = this.paymentSection.ddaccounts;
    let po = this.paymentSection.poaccounts;
    console.log(dd, po);
    const clientDetails = await this.qS
      .getClientDetails(this.productInfo.owner)
      .toPromise();
    let value = {
      alpha: null,
      clientName: clientDetails.fullName,
      clientNo: this.productInfo.owner,
      clientRelOwner: null,
      ddBankNo: dd[0].id,
      ddMandateVerified: null,
      firstPayDate: this.paymentSection.pForm.value.firstPayDate,
      lastPayDate: null,
      mandateRef: null,
      nextPayDate: this.paymentSection.pForm.value.firstPayDate,
      ownerName: clientDetails.fullName,
      payFreq: this.productInfo.payFreq,
      payeeName: null,
      payeeNo: null,
      payeeRelOwner: null,
      payorName: clientDetails.fullName,
      payorNo: this.productInfo.owner,
      payorRelOwner: null,
      payoutBankNo: po[0].id,
      payoutMethod: null,
      policyCode: null,
      policyNo: null,
      policyNoSuffix: null,
      prefPayDay: this.paymentSection.pForm.value.prefDay,
      quoteNo: this.productInfo.quoteNo,
    };
    console.log(value);
    await this.qS
      .submitBankInfo(value)
      .toPromise()
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
        this.uS.info(error.message, 0);
      });
  }
  convert() {
    this.uS.dialogOpener(
      JointOwnerModalComponent,
      { position: { top: '10vh' }, width: '50%' },
      (data) => console.log('new convert modal created', data),
      () => console.log('cancelled creating new payment method')
    );
  }
}
