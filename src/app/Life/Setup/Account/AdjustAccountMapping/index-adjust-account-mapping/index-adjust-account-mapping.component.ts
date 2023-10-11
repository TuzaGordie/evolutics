import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AdjustAccountMappingService } from '../adjustAccountMapping.service';

@Component({
  selector: 'app-index-adjust-account-mapping',
  templateUrl: './index-adjust-account-mapping.component.html',
  styleUrls: ['./index-adjust-account-mapping.component.scss'],
})
export class IndexAdjustAccountMappingComponent implements OnInit {
  constructor(
    private adjustService: AdjustAccountMappingService,
    private util: UtilityService,
    private route: ActivatedRoute,
    public router: Router
  ) {}
  companyCode = null;
  public companyArray: any[] = [];

  public companyForm: FormGroup = new FormGroup({
    company: configForms.required(),
  });

  ngOnInit(): void {
    this.adjustService.getCompanyCodeAndDesc().subscribe((res) => {
      this.companyArray = res;
    });
  }

  show(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }

  clone(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }

  // show(companyForm) {
  //   this.localStore("show", companyForm)

  // }
  // clone(companyForm) {
  //   this.localStore("clone", companyForm)

  // }

  // localStore(action: string, companyForm) {
  //   if (!companyForm) {
  //     this.router.navigate(['../index'], { relativeTo: this.route });
  //     this.util.notify("Error, Please Fill all the required fields!", 0, 5000, "fail")
  //     return
  //   }
  //   this.router.navigate(
  //     ["../create"],
  //     {
  //       queryParams: {
  //         action: action,
  //         code: this.companyForm.value?.company
  //       },
  //       relativeTo: this.route
  //     }
  //   )
  // }
}
