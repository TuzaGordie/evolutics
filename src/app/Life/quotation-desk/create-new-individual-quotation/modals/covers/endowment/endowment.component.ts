import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { ICodes } from 'src/app/Life/services/quotation.interface';
declare let $;
@Component({
  selector: 'q-endowment',
  templateUrl: './endowment.component.html',
  styleUrls: ['./endowment.component.scss']
})
export class EndowmentComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  endowmentForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  assured_value_disabled: boolean;
  assured_options: any[];
  allowedPremPayTermMonths: any;
  allowedPremPayTermYears: any;
  termList: boolean;
  termDisabled: boolean;
  description: string = ''
  payees: FormArray
  payee: string[] = [''];
  payee_no: string[] = []
  payee_name: string[] = []
  existingAccounts: any[] = []
  basis_options: ICodes[] = []

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService) { }

  ngOnInit(): void {
    this.quoatationService.getCodesBySubGroup('TARGET_BASIS').subscribe( data => this.basis_options = data )
    this.payees = this.fb.array([
      new FormGroup ({
        method: new FormControl(null, Validators.required),
        payee: new FormControl(null, Validators.required),
        payee_no: new FormControl(null, Validators.required),
        payee_proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
      })
    ])
    this.endowmentForm = this.fb.group({
      basis: new FormControl('PB', Validators.required),
      target: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      benTerm: new FormControl(null, Validators.required),
      benMonths: new FormControl(null, Validators.required),
      benSchedule: new FormControl(null, Validators.required),
      bank: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
      payees: this.payees
    })
  }
  payeeUpdate(i) {
    this.payee_no[i] = this.endowmentForm.get('payees').value[i].payee_no
    console.log(this.payee_no)
    if (this.payee_no[i] == ''){
      this.existingAccounts[i] = []
    } else {
      this.quoatationService.getClientFullName(this.payee_no[i]).subscribe( data => {
        this.endowmentForm.patchValue({payee: data})
        const payees = <FormArray> this.endowmentForm.get('payees')
        payees.controls[i].get('payee').setValue(data)
      } )
      this.quoatationService.getBankAccounts(this.payee_no[i]).subscribe( data => {
        console.log(data)
        this.existingAccounts[i] = data
      })
    }
  }
  payeeInc() {
    const value = 100/(this.payees.length + 1)
    const b = new FormGroup({
      method: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
      payee_no: new FormControl(null, Validators.required),
      payee_proportion: new FormControl(value, [Validators.required, Validators.max(100), Validators.min(1)]),
    })
    const payees = <FormArray> this.endowmentForm.get('payees')
    for (let i = 0; i < this.payees.length; i++) {
      payees.controls[i].get('payee_proportion').setValue(value)
    }
    
    this.payee.push('')
    this.payee_name.push('')
    this.existingAccounts.push([])
    this.payees.push(b)
    console.log(value)
  }
  removePayee(i) {
    if(this.payees.length > 1){
      this.payees.removeAt(i)
      this.payee.splice(i, 1)
      this.payee_name.splice(i, 1)
      this.existingAccounts.splice(i, 1)

      const value = 100/(this.payees.length)
      const payees = <FormArray> this.endowmentForm.get('payees')
      for (let i = 0; i < this.payees.length; i++) {
        payees.controls[i].get('payee_proportion').setValue(value)
      }
    }
  }
  show() {
    console.log('hi')
    $('#end_modal').modal('show')
  }
  hide() {
    $('#end_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#end_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
