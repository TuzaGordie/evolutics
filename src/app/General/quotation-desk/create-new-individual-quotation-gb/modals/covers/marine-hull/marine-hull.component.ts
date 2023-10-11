import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
declare let $;
@Component({
  selector: 'q-marine-hull',
  templateUrl: './marine-hull.component.html',
  styleUrls: ['./marine-hull.component.scss']
})
export class MarineHullComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<string>();
  marineHullForm: FormGroup
  excessOptions$ = this.quoatationService.getExcessOptions('str')
  complete = null
  description: string = ''

  constructor(private quoatationService: QuotationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.marineHullForm = this.fb.group({
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
      comp_cover: new FormControl(null, Validators.required),
      loss_cover: new FormControl(null, Validators.required),
      vessel: new FormControl(null, Validators.required),
    })
  }
  show() {
    $('#marineHullModal').modal('show')
  }
  hide() {
    $('#marineHullModal').modal('hide')
    this.saveEvent.emit(this.complete)
  }
  ngOnDestroy(): void {
    $('#marineHullModal').modal('hide')
  }
  stop() {
    this.hide()
  }
}
