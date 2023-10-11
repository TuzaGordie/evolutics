import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
declare let $;
@Component({
  selector: 'q-marine-cargo',
  templateUrl: './marine-cargo.component.html',
  styleUrls: ['./marine-cargo.component.scss']
})
export class MarineCargoComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  marineCargoForm: FormGroup
  excessOptions$ = this.quoatationService.getExcessOptions('str')
  complete = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.marineCargoForm = this.fb.group({
      dfp: new FormControl(null, Validators.required),
      dtp: new FormControl(null, Validators.required),
      medium: new FormControl(null, Validators.required),
      dfc: new FormControl(null, Validators.required),
      dtc: new FormControl(null, Validators.required),
      trips: new FormControl(null, Validators.required),
      cover_nature: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      exchange: new FormControl(null, Validators.required),
      good_nature: new FormControl(null, Validators.required),
      details: new FormControl(null, Validators.required),
      payee: new FormControl(null, Validators.required),
      invoice: new FormControl(null, Validators.required),
    })
  }
  show() {
    $('#marineCargoModal').modal('show')
  }
  hide() {
    $('#marineCargoModal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#marineCargoModal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
