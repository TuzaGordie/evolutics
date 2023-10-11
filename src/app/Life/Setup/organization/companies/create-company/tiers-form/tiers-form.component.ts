import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tiers-form',
  templateUrl: './tiers-form.component.html',
  styleUrls: ['./tiers-form.component.scss']
})
export class TiersFormComponent implements OnInit {
  // "currCode": "string",
  //     "limit": 0,
  //     "matTaxBasis": "string",
  //     "matTaxTable": "string",
  //     "regLevyBasis": "string",
  //     "regLevyTable": "string",
  //     "stampDutyBasis": "string",
  //     "stampDutyTable": "string",
  //     "teirCategory": "string",
  // "tierCode": 0
  baseForm = {
    currCode: [null, Validators.required],
    limit: [null, Validators.required],
    matTaxBasis: [null, Validators.required],
    matTaxTable: [null, Validators.required],
    regLevyBasis: [null, Validators.required],
    regLevyTable: [null, Validators.required],
    stampDutyBasis: [null, Validators.required],
    stampDutyTable: [null, Validators.required],
    teirCategory: [null, Validators.required],
    tierCode: 0
  }
  private paymentAuthTier = this.fb.array([this.fb.group(this.baseForm)]);
  private quoterAuthTier = this.fb.array([this.fb.group(this.baseForm)]);
  private dischargeVoucherAuthTier = this.fb.array([this.fb.group(this.baseForm)]);
  private policyAccountAuthTier = this.fb.array([this.fb.group(this.baseForm)]);

  formGroup = this.fb.group({
    paymentAuthTier: this.paymentAuthTier,
    quoterAuthTier: this.quoterAuthTier,
    dischargeVoucherAuthTier: this.dischargeVoucherAuthTier,
    policyAccountAuthTier: this.policyAccountAuthTier,
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get paymentAuthTierArray() {
    console.log(this.formGroup.value)
    return this.formGroup.get("paymentAuthTier") as FormArray
  }
  get quoterAuthTierArray() {
    return this.formGroup.get("quoterAuthTier") as FormArray
  }
  get dischargeVoucherAuthTierArray() {
    return this.formGroup.get("dischargeVoucherAuthTier") as FormArray
  }
  get policyAccountAuthTierArray() {
    return this.formGroup.get("policyAccountAuthTier") as FormArray
  }

  addPolicyAccountAuthTier(){
    this.policyAccountAuthTierArray.push(this.fb.group(this.baseForm))
  }

  addDischargeVoucherAuthTier(){
    this.dischargeVoucherAuthTierArray.push(this.fb.group(this.baseForm))
  }

  addQuoterAuthTier(){
    this.quoterAuthTierArray.push(this.fb.group(this.baseForm))
  }

  addPaymentAuthTierArray(){
    this.paymentAuthTierArray.push(this.fb.group(this.baseForm))
  }

}
