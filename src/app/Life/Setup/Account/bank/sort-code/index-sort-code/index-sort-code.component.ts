import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AccountExtrasService } from '../../../accounts-extras/account-extras.service';
import { AccountsService } from '../../../accounts-extras/accounts.service';

@Component({
  selector: 'app-index-sort-code',
  templateUrl: './index-sort-code.component.html',
  styleUrls: ['./index-sort-code.component.scss']
})
export class IndexSortCode implements OnInit {

  form = new FormGroup({
    country: configForms.required(),
    bank: configForms.required(),
    state: configForms.required(),
    town: configForms.required(),
    branch: configForms.required(),
    allSortCodes: configForms.required()
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


  async clone(bank: any) {
    await this.router.navigate(['../create-sort-code'], {
      relativeTo: this.route,
      queryParams: { redirect: 'clone', sortCode: bank?.code }
    });
  }


  async show(bank: any, asTable = false) {
    await this.router.navigate(['../create-sort-code'], { relativeTo : this.route,
      queryParams: { redirect: 'show',bank:bank?.code, asTable}
    });
  }


}
