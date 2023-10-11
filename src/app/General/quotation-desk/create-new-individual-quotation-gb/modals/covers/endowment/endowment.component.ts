import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
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
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService) { }

  ngOnInit(): void {
    this.endowmentForm = this.fb.group({
      basis: new FormControl(null, Validators.required),
      target: new FormControl(null, Validators.required),
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
