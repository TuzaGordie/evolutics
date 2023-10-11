import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-simple-life',
  templateUrl: './simple-life.component.html',
  styleUrls: ['./simple-life.component.scss']
})
export class SimpleLifeComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.payees = this.fb.array([
    //   new FormGroup ({
    //     method: new FormControl(null, Validators.required),
    //     payee: new FormControl(null, Validators.required),
    //     payee_no: new FormControl(null, Validators.required),
    //     payee_proportion: new FormControl(100, [Validators.required, Validators.max(100), Validators.min(1)]),
    //   })
    // ])
    this.lifeForm = this.fb.group({
      assured: new FormControl(null, Validators.required),
      loan_rate: new FormControl(null, Validators.required),
      loan_freq: new FormControl(null, Validators.required),
      lender: new FormControl(null, Validators.required),
      loan_issue: new FormControl(null, Validators.required),
      loan_amortisation: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      loanTerm: new FormControl(null, Validators.required),
      loanMonths: new FormControl(null, Validators.required),
      bank: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
    })
  }
  
  show() {
    console.log('hi')
    $('#sl_modal').modal('show')
  }
  hide() {
    $('#sl_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#sl_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
