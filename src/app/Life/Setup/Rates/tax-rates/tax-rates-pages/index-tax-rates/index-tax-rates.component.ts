import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { TaxRatesService } from '../../tax-rates-extras/tax-rates.service';

@Component({
  selector: 'app-index-tax-rates',
  templateUrl: './index-tax-rates.component.html',
  styleUrls: ['./index-tax-rates.component.scss']
})
export class IndexTaxRatesComponent implements OnInit {

  form = new FormGroup({
    group: configForms.default(),
    code: configForms.required(),
  });

  get rateCode() {
    return this.form?.value?.code;
  }

  constructor(public tS: TaxRatesService, public uS: UtilityService) {}

  ngOnInit(): void {}

  getTax = (group) => {
    console.log('group', group)
    if(group) return this.tS.getTaxByGroup(group);
    else return this.tS.getTax();
  };
  
}
