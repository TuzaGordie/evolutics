import {Component, OnInit} from '@angular/core';
import {FCInput} from "../../../../../Shared/models/index.model";
import {configForms} from "../../../../../Shared/models/form.class";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FindQuotationService} from "../../../service/find-quotation.service";
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateAccountModalComponent } from 'src/app/Life/life-components/create-account-modal/create-account-modal.component';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
declare let $;
@Component({
  selector: 'app-quotation-desk-payment-tab',
  templateUrl: './quotation-desk-payment-tab.component.html',
  styleUrls: ['./quotation-desk-payment-tab.component.scss'],
})
export class QuotationDeskPaymentTabComponent implements OnInit {
  product: any;
  inputs1: FCInput[] = [
    new FCInput('Client Number', 'clientNo', configForms.required()),
    new FCInput('Last Name', 'lastName'),
    new FCInput('Email', 'email', configForms.required(), 'email'),
    new FCInput('Relationship', 'relationship', configForms.required(), 'select'),
    new FCInput('Preferred Day', 'prefDay', configForms.required()),
    new FCInput('First Date', 'firstPayDate', configForms.required())
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
    this.utilityService.formFieldsFromArr(this.inputs1)
  );
  beneficiayForm2 = new FormGroup(
    this.utilityService.formFieldsFromArr(this.inputs2)
  );
  quoteNo: any;
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
    this.utilityService.formFieldsFromArr(this.payInfoInputs)
  );
  paymentForm = new FormGroup({
    dda: new FormArray([]),
    pa: new FormArray([]),
  });
  pForm: FormGroup
  accounts = [];
  ddaccounts = [];
  poaccounts = [];
  pdsc: any;
  clientNo: string;
  checkdd = [];
  checkpo = [];

  constructor(
    private utilityService: UtilityService,
    private route: ActivatedRoute, 
    private qS: QuotationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.quoteNo = queryParams.get('quoteNo');
    this.pForm = this.fb.group({
      prefDay: new FormControl(null, Validators.required),
      firstPayDate: new FormControl(null, Validators.required),
    })
    this.clientNo = queryParams.get('clientNo');
    console.log('params', this.clientNo);
    this.product = {
      code: queryParams.get('productCode'),
    };
    console.log(this.product);
    this.qS
      .getProductInfo(this.product.code)
      .subscribe((data) => (this.pdsc = data.description));
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
    this.getBankAccounts();
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

  changedd(i: number) {
    this.checkdd.map((value, index) => {
      this.checkdd[index] = index == i ? !value : false
      $(`#dd_checkbox_${index}`).prop('checked', this.checkdd[index])
    })
    // this.checkdd[i] = !this.checkdd[i];
    if (this.checkdd[i]) {
      // this.ddaccounts.splice(i, 0, this.accounts[i]);
      this.ddaccounts = [this.accounts[i]]
    } else {
      this.ddaccounts = this.ddaccounts.filter(
        (e) => e.id != this.accounts[i].id
      );
    }
  }
  changepo(i) {
    this.checkpo.map((value, index) => {
      this.checkpo[index] = index == i ? !value : false
      $(`#po_checkbox_${index}`).prop('checked', this.checkpo[index])
    })
    // this.checkpo[i] = !this.checkpo[i];
    if (this.checkpo[i]) {
      this.poaccounts = [this.accounts[i]]
    } else {
      this.poaccounts = this.poaccounts.filter(
        (ele) => ele.id != this.accounts[i].id
      );
    }
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

  createNewPaymentMethod() {
    this.utilityService.dialogOpener(
      CreateAccountModalComponent,
      { position: { top: '10vh' } },
      (data) => {}, // console.log("new payment method created", data),
      () => {} // console.log("cancelled creating new payment method")
    );
  }

  async getBankAccounts() {
    let list = await this.qS.getBankAccount(this.clientNo).toPromise();
    list = list.filter((value) => value != null);
    let count = 0;
    list.forEach(async (account) => {
      await this.qS
        .getAccounts(account.no)
        .toPromise()
        .then((myaccounts) => {
          myaccounts = myaccounts.filter((value) => value != null);
          for (let index = 0; index < myaccounts.length; index++) {
            this.checkdd.push(false);
            this.checkpo.push(false);
          }
          this.accounts = [...this.accounts, ...myaccounts];
        });
    });
  }
}
