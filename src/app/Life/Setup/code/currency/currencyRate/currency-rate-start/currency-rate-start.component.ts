import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-rate-start',
  templateUrl: './currency-rate-start.component.html',
  styleUrls: ['./currency-rate-start.component.scss']
})
export class CurrencyRateStartComponent implements OnInit {
  form: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  private createForm() {
    this.form = this.fb.group({
      code: ['']
    })
  }
}
