import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
declare let $;
@Component({
  selector: 'q-life-annuity',
  templateUrl: './life-annuity.component.html',
  styleUrls: ['./life-annuity.component.scss']
})
export class LifeAnnuityComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  lifeForm: FormGroup
  benefitPaymentFreqOptions$ = this.quoatationService.getBenefitPaymentFreqOptions()
  complete = null
  assured = null
  assured_disabled = null
  assured_max = null
  assured_min = null
  toggleClass2 = false
  toggleClass = false
  description: string = ''
  basis_options: any[] = []
  defaultPremFreq: any
  freq_options: any[] = []

  constructor(private quoatationService: QuotationService, private fb: FormBuilder, private us: UtilityService) { }

  ngOnInit(): void {
    this.quoatationService.getCodesBySubGroup('TARGET_BASIS').subscribe( data => this.basis_options = data )
    this.quoatationService.getCodesBySubGroup('FREQUENCY').subscribe( data => this.freq_options = data )
    this.lifeForm = this.fb.group({
      basis: new FormControl(null, Validators.required),
      target: new FormControl(null, Validators.required),
      annSource: new FormControl(null, Validators.required),
      annFreq: new FormControl(null, Validators.required),
      period: new FormControl(null, Validators.required),
      proportion: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required),
      admin: new FormControl(null, Validators.required),
      escBasis: new FormControl(null, Validators.required),
      escValue: new FormControl(null, Validators.required),
      method: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
    })
  }
  show() {
    console.log('hi la')
    $('#la_modal').modal('show')
  }
  hide() {
    $('#la_modal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#la_modal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
