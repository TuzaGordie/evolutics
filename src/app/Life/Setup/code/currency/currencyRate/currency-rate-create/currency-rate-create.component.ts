import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';

@Component({
  selector: 'app-currency-rate-create',
  templateUrl: './currency-rate-create.component.html',
  styleUrls: ['./currency-rate-create.component.scss'],
})
export class CurrencyRateCreateComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.form = this.fb.group({
      create: [''],
    });
  }
}
