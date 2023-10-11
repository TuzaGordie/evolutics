import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { formatDate } from '@angular/common';
declare let $;
@Component({
  selector: 'q-life-credit',
  templateUrl: './life-credit.component.html',
  styleUrls: ['./life-credit.component.scss']
})
export class LifeCreditComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  description: string = ''
  allowedPremPayTermMonths: any[] = [];
  allowedPremPayTermYears: any[] = [];
  termList: boolean;
  termDisabled: boolean;
  assured_value_disabled: boolean;
  assured_options: any[];
  amortisation_options:any[] = []
  freq_options: any[] = []
  lender_options: any[] = []
  loan_options: any[] = []


  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.quoatationService.getCodesBySubGroup('ARMOTISATION_BASIS').subscribe( data => this.amortisation_options = data )
    this.quoatationService.getCodesBySubGroup('FREQUENCY').subscribe( data => this.freq_options = data )
    this.quoatationService.getProviderBySearchParameter('providerSubCategory', 'LEN').subscribe( data => {console.log("lender", data); this.lender_options = data.page.content} )
    const todate = new Date(Date.now())
    this.lifeForm = this.fb.group({
      assured: new FormControl(null, Validators.required),
      loan_rate: new FormControl(null, Validators.required),
      loan_freq: new FormControl(null, Validators.required),
      lender: new FormControl(null, Validators.required),
      loan_issue: new FormControl(formatDate(todate, 'yyyy-MM-dd', 'en'), Validators.required),
      loan_amortisation: new FormControl(null, Validators.required),
      premTerm: new FormControl(null, Validators.required),
      premMonths: new FormControl(null, Validators.required),
      premDays: new FormControl(null, Validators.required),
      loanTerm: new FormControl(null, Validators.required),
      loanMonths: new FormControl(null, Validators.required),
      loanDays: new FormControl(null, Validators.required),
      bank: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
    })
  }
  
  show() {
    $('#lic_modal').modal('show')
  }
  hide() {
    $('#lic_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#lic_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
