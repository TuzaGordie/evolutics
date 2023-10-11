import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { ShortTermRatesService } from '../../short-term-rates-extras/short-term-rates.service';

@Component({
  selector: 'app-index-short-term-rates',
  templateUrl: './index-short-term-rates.component.html',
  styleUrls: ['./index-short-term-rates.component.scss'],
})
export class IndexShortTermRatesComponent implements OnInit {
  form = new FormGroup({
    code: configForms.required(),
  });
  get rateCode() {
    return this.form?.value?.code;
  }
  constructor(public strS: ShortTermRatesService, public uS: UtilityService) {}

  ngOnInit(): void {}
  
}
