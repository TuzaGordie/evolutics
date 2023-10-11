import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
declare let $;
@Component({
  selector: 'q-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  savingsForm: FormGroup
  targetContributionFreqOptions$
  complete = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.savingsForm = this.fb.group({
      frequency: new FormControl(null, Validators.required),
      basis: new FormControl(null, Validators.required),
      deposit: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      convert: new FormControl(null, Validators.required),
      term: new FormControl(null, Validators.required),
      months: new FormControl(null, Validators.required),
      schedule: new FormControl(null, Validators.required),
    })

    this.quoatationService.getTargetContributionFreqOptions().subscribe(data => {
      console.log('Savings contribution  Opt.', data)
      if (Array.isArray(data)){
        data = [...new Set(data)]

        data.forEach(value => {
          // console.log(value, data.indexOf(value))
          if (!value) {
            data.splice(data.indexOf(value), 1)
          }
        })
        // console.log(data)
      }
      this.targetContributionFreqOptions$ = data ? data : {}
    })
  }
  show() {
    $('#sav_modal').modal('show')
  }
  hide() {
    $('#sav_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#sav_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
