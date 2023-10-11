import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-life-risk',
  templateUrl: './life-risk.component.html',
  styleUrls: ['./life-risk.component.scss']
})
export class LifeRiskComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService) { }

  ngOnInit(): void {
    this.lifeForm = this.fb.group({
      basis: new FormControl(null, Validators.required),
      assured: new FormControl(null, Validators.required),
      paymentFreq: new FormControl(null, Validators.required),
      escalation_before: new FormControl(null, Validators.required),
      escalation_after: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      benTerm: new FormControl(null, Validators.required),
      benMonths: new FormControl(null, Validators.required),
      benSchedule: new FormControl(null, Validators.required),
      bank: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
    })
  }
  show() {
    console.log('hi')
    $('#lil_modal').modal('show')
  }
  hide() {
    $('#lil_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#lil_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
