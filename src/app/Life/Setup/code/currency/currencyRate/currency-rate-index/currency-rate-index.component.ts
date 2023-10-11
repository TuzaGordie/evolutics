import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';


@Component({
  selector: 'app-currency-rate-index',
  templateUrl: './currency-rate-index.component.html',
  styleUrls: ['./currency-rate-index.component.scss']
})
export class CurrencyRateIndexComponent implements OnInit {
form:FormGroup
  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {
    this.createForm()
  }
  private createForm() {
    this.form = this.fb.group({
      code: configForms.default()
    });
  
  } 

}
