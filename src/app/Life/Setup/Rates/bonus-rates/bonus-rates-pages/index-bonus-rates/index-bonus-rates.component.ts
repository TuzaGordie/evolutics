import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { BonusRatesService } from '../../bonus-rates-extras/bonus-rates.service';

@Component({
  selector: 'app-index-bonus-rates',
  templateUrl: './index-bonus-rates.component.html',
  styleUrls: ['./index-bonus-rates.component.scss']
})
export class IndexBonusRatesComponent implements OnInit {

  form = new FormGroup({
    group: configForms.default(),
    code: configForms.required(),
  });

  get rateCode() {
    return this.form?.value?.code;
  }

  constructor(public rS: BonusRatesService, public uS: UtilityService) {}

  ngOnInit(): void {}

  getBonus = (group) => {
    console.log('group', group)
    if(group) return this.rS.getBonusByGroup(group);
    else return this.rS.getBonus();
  };

}
