import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.scss']
})
export class LifeInsuranceComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$: any
  
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService) { }

  ngOnInit(): void {
    this.lifeForm = this.fb.group({
      assured: new FormControl(null, Validators.required),
      term: new FormControl(null, Validators.required),
      months: new FormControl(null, Validators.required),
      days: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
    })
    this.quoatationService.getBenefitPaymentFreqOptions().subscribe( data => {
      console.log(data.length)
      if (Array.isArray(data)){
        console.log('arrayyyy')
        data = [...new Set(data)]
        console.log(data.length)
        data.forEach(value => {
          console.log(value, data.indexOf(value))
          if (!value) {
            data.splice(data.indexOf(value), 1)
          }
        })
        console.log(data)
      }
      this.benefitPaymentFreqOptions$ = data ? data : {}
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
