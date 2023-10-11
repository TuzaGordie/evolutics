import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { GeneralRatesService } from '../../general-rates-extras/general-rates.service';

@Component({
  selector: 'app-index-general-rates',
  templateUrl: './index-general-rates.component.html',
  styleUrls: ['./index-general-rates.component.scss'],
})
export class IndexGeneralRatesComponent implements OnInit { 
  get rateCode() {
    return this.form?.value?.code;
  }

  form = new FormGroup({
    category: configForms.default(),
    group: configForms.default(),
    code: configForms.default(),
  });
  constructor(public grS: GeneralRatesService, public uS: UtilityService) {}

  ngOnInit(): void {}
  getRates = (category?: string, group?: string) => {
    console.log(category, group);
    if (category && group) return this.grS.getRatesByCatGroup(category, group);
    else if (category) return this.grS.getRatesByCat(category);
    else if (group) return this.grS.getRatesByGroup(group);
    else return this.grS.getAllRates();
  };
}
