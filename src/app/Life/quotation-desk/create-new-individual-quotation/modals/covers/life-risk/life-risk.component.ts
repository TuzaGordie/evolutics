import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { JointOwnerModalComponent } from 'src/app/Life/life-components/joint-owner-modal/joint-owner-modal.component';
import { ICodes } from 'src/app/Life/services/quotation.interface';
declare let $;
@Component({
  selector: 'q-life-risk',
  templateUrl: './life-risk.component.html',
  styleUrls: ['./life-risk.component.scss'],
})
export class LifeRiskComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup;
  benefitPaymentFreqOptions$ =
    this.quoatationService.getBenefitPaymentFreqOptions();
  complete = null;
  assured = null;
  assured_disabled = null;
  assured_max = null;
  assured_min = null;
  description: string = '';
  allowedPremPayTermMonths: any;
  allowedPremPayTermYears: any;
  termList: boolean;
  termDisabled: boolean;
  assured_value_disabled: boolean;
  assured_options: any[];
  payees: FormArray;
  payee: string[] = [''];
  payee_no: string[] = [];
  payee_name: string[] = [];
  existingAccounts: any[] = [];
  basis_options: ICodes[] = [];
  benfreq_options: any[] = [];
  benterm_options: any[] = [];
  escal_options: any[] = [];

  constructor(
    private quoatationService: QuotationService,
    private fb: FormBuilder,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    this.quoatationService
      .getCodesBySubGroup('TARGET_BASIS')
      .subscribe((data) => (this.basis_options = data));
    this.payees = this.fb.array([
      new FormGroup({
        method: new FormControl(null, Validators.required),
        payee: new FormControl(null, Validators.required),
        payee_no: new FormControl(null, Validators.required),
        payee_proportion: new FormControl(100, [
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      }),
    ]);
    this.lifeForm = this.fb.group({
      basis: new FormControl('PB', Validators.required),
      assured: new FormControl(null, Validators.required),
      benPaymentFreq: new FormControl(null, Validators.required),
      escalation_before: new FormControl(null, Validators.required),
      escalation_after: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      premDays: new FormControl(null, Validators.required),
      benTerm: new FormControl(null, Validators.required),
      benMonths: new FormControl(null, Validators.required),
      benSchedule: new FormControl(null, Validators.required),
      bank: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
      payees: this.payees,
    });
  }
  payeeUpdate(i) {
    this.payee_no[i] = this.lifeForm.get('payees').value[i].payee_no;
    console.log(this.payee_no);
    if (this.payee_no[i] == '') {
      this.existingAccounts[i] = [];
    } else {
      this.quoatationService
        .getClientFullName(this.payee_no[i])
        .subscribe((data) => {
          this.lifeForm.patchValue({ payee: data });
          const payees = <FormArray>this.lifeForm.get('payees');
          payees.controls[i].get('payee').setValue(data);
        });
      this.quoatationService
        .getBankAccounts(this.payee_no[i])
        .subscribe((data) => {
          console.log(data);
          this.existingAccounts[i] = data;
        });
    }
  }
  payeeInc() {
    const value = 100 / (this.payees.length + 1);
    const b = new FormGroup({
      method: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
      payee_no: new FormControl(null, Validators.required),
      payee_proportion: new FormControl(value, [
        Validators.required,
        Validators.max(100),
        Validators.min(1),
      ]),
    });
    const payees = <FormArray>this.lifeForm.get('payees');
    for (let i = 0; i < this.payees.length; i++) {
      payees.controls[i].get('payee_proportion').setValue(value);
    }

    this.payee.push('');
    this.payee_name.push('');
    this.existingAccounts.push([]);
    this.payees.push(b);
    console.log(value);
  }
  removePayee(i) {
    if (this.payees.length > 1) {
      this.payees.removeAt(i);
      this.payee.splice(i, 1);
      this.payee_name.splice(i, 1);
      this.existingAccounts.splice(i, 1);

      const value = 100 / this.payees.length;
      const payees = <FormArray>this.lifeForm.get('payees');
      for (let i = 0; i < this.payees.length; i++) {
        payees.controls[i].get('payee_proportion').setValue(value);
      }
    }
  }
  openJointOwner() {
    this.us.dialogOpener(
      JointOwnerModalComponent,
      {
        data: { clientNo: this.payee_no },
        minWidth: '70%',
        minHeight: '80%',
        maxHeight: '90%',
      },
      () => {
        console.log('opened');
      }
    );
  }
  show() {
    console.log(this.benfreq_options);
    $('#lir_modal').modal('show');
  }
  hide() {
    $('#lir_modal').modal('hide');
    this.saveEvent.emit(this.complete);
  }
  ngOnDestroy(): void {
    $('#lir_modal').modal('hide');
  }
  stop() {
    this.hide();
    let limit = this.lifeForm.get('assured').value;

    if (this.assured_max || this.assured_min) {
      if (limit) {
        if (
          !(
            Number(limit) <= Number(this.assured_max) &&
            Number(limit) >= Number(this.assured_min)
          )
        ) {
          this.us.notify('Your limit value is in the wrong range.', 0);
          return false;
        }
      } else if (!limit) {
        this.us.notify('The limit value is required.', 0);
        return false;
      }
    }

    this.hide();
    return true;
  }
}
