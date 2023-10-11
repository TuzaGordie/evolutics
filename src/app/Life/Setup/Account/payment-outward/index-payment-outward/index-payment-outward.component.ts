import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { PaymentOutwardService } from '../payment-outward.service';

@Component({
  selector: 'app-index-payment-outward',
  templateUrl: './index-payment-outward.component.html',
  styleUrls: ['./index-payment-outward.component.scss'],
})
export class IndexPaymentOutward implements OnInit {
  constructor(
    private pOService: PaymentOutwardService,
    private route: ActivatedRoute,
    public router: Router,
    private util: UtilityService
  ) {}
  companyCode = null;
  public companyArray: any[] = [];

  ngOnInit(): void {
    this.pOService.getCompanyCodeAndDes().subscribe((res) => {
      console.log(res);
      this.companyArray = res;
    });
  }

  // show(companyPayout) {
  //   this.localStore('show', companyPayout);
  // }
  // clone(companyPayout) {
  //   this.localStore('clone', companyPayout);
  // }

  // localStore(action: string, companyPayout) {
  //   if (!companyPayout) {
  //     this.router.navigate(['../index'], { relativeTo: this.route });
  //     this.util.notify(
  //       'Error, Please Fill all the required fields!',
  //       0,
  //       5000,
  //       'fail'
  //     );
  //     return;
  //   }
  //   this.router.navigate(['../create'], {
  //     queryParams: {
  //       action: action,
  //       code: this.companyCode,
  //     },
  //     relativeTo: this.route,
  //   });
  // }

  show(code: any) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }

  clone(code: any) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }
}
