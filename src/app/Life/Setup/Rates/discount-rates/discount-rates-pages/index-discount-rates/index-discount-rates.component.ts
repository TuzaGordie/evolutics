import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { DiscountRatesService } from '../../discount-rates-extras/discount-rates.service';

@Component({
  selector: 'app-index-discount-rates',
  templateUrl: './index-discount-rates.component.html',
  styleUrls: ['./index-discount-rates.component.scss']
})
export class IndexDiscountRatesComponent implements OnInit {

  form = new FormGroup({
    group: configForms.default(),
    code: configForms.required(),
  });

  get rateCode() {
    return this.form?.value?.code;
  }

  constructor(public dS: DiscountRatesService, public uS: UtilityService) {}

  ngOnInit(): void {}

  getDiscount = (group) => {
    console.log('codeGroup', group)
    if(group) return this.dS.getRateListByGroup(group);
    else return this.dS.getRateList();
  };

}


