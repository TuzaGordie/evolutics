import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AccountExtrasService } from '../../../accounts-extras/account-extras.service';
import { AccountsService } from '../../../accounts-extras/accounts.service';

@Component({
  selector: 'app-index-bank-account',
  templateUrl: './index-bank-account.component.html',
  styleUrls: ['./index-bank-account.component.scss']
})
export class IndexBankAccounts implements OnInit {

  form = new FormGroup({
    company: configForms.required(),
    bank: configForms.required()
  });
  constructor(
    public aeS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public route: ActivatedRoute,
    private uS: UtilityService
  ) { }


  ngOnInit(): void {
  }

  async clone(company: any) {
    await this.router.navigate(['../create-bank-account'], {
      relativeTo: this.route,
      queryParams: { redirect: 'clone', company: company?.code }
    });
  }


  async show(company: any) {
    await this.router.navigate(['../create-bank-account'], {
      relativeTo: this.route,
      queryParams: { redirect: 'show', company: company?.code }
    });
  }

}
