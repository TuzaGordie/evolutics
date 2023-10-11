import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { InterestRatesService } from '../../interest-rates-extras/interest-rates.service';

@Component({
  selector: 'app-index-interest-rates',
  templateUrl: './index-interest-rates.component.html',
  styleUrls: ['./index-interest-rates.component.scss'],
})
export class IndexInterestRatesComponent implements OnInit {

  get rateCode() {
    return this.form?.value?.rate;
  }

  form = new FormGroup({
    codeGroup: configForms.default(),
    rate: configForms.required(),
  });
  
  constructor(
    public iS: InterestRatesService,
    public uS: UtilityService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  getRates = (codeGroup) => {
    console.log('codeGroup', codeGroup)
    if(codeGroup) return this.iS.getInterestByGroup(codeGroup.code);
    else return this.iS.getRates();
  };

  clone(reportGroup: any) {
    console.log(reportGroup);
    this.uS.go('clone/' + reportGroup.code, { relativeTo: this.route });
  }

  open(reportGroup: any) {
    console.log(reportGroup);
    this.uS.go(
      reportGroup.generateReport ? 'show/' : 'show/' + reportGroup.code,
      { relativeTo: this.route }
    );
  }

}
