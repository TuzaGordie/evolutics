import { UtilityService } from 'src/app/Services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { AccountExtrasService } from '../../../accounts-extras/account-extras.service';
import { AccountsService } from '../../../accounts-extras/accounts.service';

@Component({
  selector: 'app-index-bank',
  templateUrl: './index-bank.component.html',
  styleUrls: ['./index-bank.component.scss']
})
export class IndexBank implements OnInit {
  banksList: any[];
  isLoadingBanks: boolean = false;

  form = new FormGroup({
    country: configForms.required(),
    bank: configForms.required()
  });
  constructor(
    public aeS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public route:ActivatedRoute,
    private uS:UtilityService
  ) {}


  ngOnInit(): void {
  }


  async clone(bank: any) {
    await this.router.navigate(['../create-bank-code'],{ relativeTo : this.route,
      queryParams: { redirect: 'show',brandCode:bank?.code}
    });
}


  async show(bank: any) {
    await this.router.navigate(['../create-bank-code'], { relativeTo : this.route,
      queryParams: { redirect: 'show',brandCode:bank?.code}
    });
  }

  onCountryChange(country){
    this.isLoadingBanks = true;
    this.aeS.getBankByCountry(country.code).subscribe(
      res => this.banksList = res
    ).add(() => this.isLoadingBanks = false)
  }

}
