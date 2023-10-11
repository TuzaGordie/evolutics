import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rates-form',
  templateUrl: './rates-form.component.html',
  styleUrls: ['./rates-form.component.scss']
})
export class RatesFormComponent implements OnInit {

  formGroup: FormArray
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }
  setupForm() {
    this.formGroup = this._formBuilder.array([{
      premTaxBasis: [null, Validators.required],
      premTaxTable: [null, Validators.required],
      surrTaxBasis: [null, Validators.required],
      surrTaxTable: [null, Validators.required]
    }])
  }

}
