import { AccountsService } from '../../accounts-extras/accounts.service';
import { AccountExtrasService } from '../../accounts-extras/account-extras.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index-accounts',
  templateUrl: './index-accounts.component.html',
  styleUrls: ['./index-accounts.component.scss'],
})
export class IndexAccountAccounts implements OnInit {
  form = new FormGroup({
    accountGroup: configForms.default(),
    accounts: configForms.required(),
  });
  constructor(
    public accS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  show(accountCode) {
    this.router.navigate(['../show'], {
      queryParams: { code: accountCode },
      relativeTo: this.route,
    });
  }

  clone(accountCode) {
    this.router.navigate(['../clone'], {
      queryParams: { code: accountCode },
      relativeTo: this.route,
    });
  }

  create() {
    this.router.navigate(['../account-code/create'], {
      relativeTo: this.route,
    });
  }
}
