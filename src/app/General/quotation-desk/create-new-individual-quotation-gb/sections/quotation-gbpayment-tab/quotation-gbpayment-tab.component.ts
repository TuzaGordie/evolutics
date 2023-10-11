import { Component, OnInit } from '@angular/core';
import {FCInput} from "../../../../../Shared/models/index.model";
import {configForms} from "../../../../../Shared/models/form.class";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FindQuotationService} from "../../../../../Life/quotation-desk/service/find-quotation.service";
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-quotation-gbpayment-tab',
  templateUrl: './quotation-gbpayment-tab.component.html',
  styleUrls: ['./quotation-gbpayment-tab.component.scss']
})
export class QuotationGBPaymentTabComponent implements OnInit {

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

  beneficiayForm1 = new FormGroup(
    this.findQuotationService.formFieldsFromArr(this.inputs1)
  );
  beneficiayForm2 = new FormGroup(
    this.findQuotationService.formFieldsFromArr(this.inputs2)
  );

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
  payInfoForm = new FormGroup(
    this.findQuotationService.formFieldsFromArr(this.payInfoInputs)
  );
  paymentForm = new FormGroup({
    dda: new FormArray([]),
    pa: new FormArray([]),
  });
  accounts = [];
  quoteNo: any;
  product: { code: string; description: string; };

  constructor(private findQuotationService: UtilityService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;

    this.product = {
      code: queryParams.get('pcd'),
      description: queryParams.get('pdsc')
    }
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
    this.addDDA()
    this.addPA()
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
}
