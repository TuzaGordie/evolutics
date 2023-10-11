import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/Life/services/quotation-service.service';
declare let $;
@Component({
  selector: 'q-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss']
})
export class BondComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  bondForm: FormGroup
  code: string
  excessOptions$ = this.quoatationService.getExcessOptions('str')
  complete = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bondForm = this.fb.group({
      commencement: new FormControl(null, Validators.required),
      completion: new FormControl(null, Validators.required),
      undertaken: new FormControl(null, Validators.required),
      amount_contract: new FormControl(null, Validators.required),
      amount_subcontract: new FormControl(null, Validators.required),
      subcontractor_required: new FormControl(null, Validators.required),
      bid: new FormControl(null, Validators.required),
      performance: new FormControl(null, Validators.required),
      mobilization: new FormControl(null, Validators.required),
      principal: new FormControl(null, Validators.required),
      nature: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      commencement_date: new FormControl(null, Validators.required),
      completion_date: new FormControl(null, Validators.required),
      undertaken_from: new FormControl(null, Validators.required),
      amount_1: new FormControl(null, Validators.required),
      nature_1: new FormControl(null, Validators.required),
    })
  }
  show() {
    $('#bondModal').modal('show')
  }
  hide() {
    $('#bondModal').modal('hide')
  }
  ngOnDestroy(): void {
    $('#bondModal').modal('hide')
  }
  stop() {
    this.hide()
    this.saveEvent.emit(this.complete)
  }
}
