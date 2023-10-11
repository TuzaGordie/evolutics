import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { AdjustAccountMappingService } from '../adjustAccountMapping.service';

@Component({
  selector: 'app-create-adjust-account-mapping',
  templateUrl: './create-adjust-account-mapping.component.html',
  styleUrls: ['./create-adjust-account-mapping.component.scss'],
})
export class CreateAdjustAccountMappingComponent
  extends PageTemplateComponent
  implements OnInit
{
  @ViewChild('f') form: NgForm;
  loading = true;
  constructor(
    private adjustService: AdjustAccountMappingService,
    public util: UtilityService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(route, util);
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   const code = params.code;
    //   const action = params.action;
    //   if (code != null && action != null) {
    //     this.fetchProcess(code);
    //   }
    // });
    this.adjustService
      .getCodeAndTitleByCodeSubGroup('ADJUSTMENT_REASON')
      .subscribe((res) => {
        this.adjustmentReasonArray = res;
      });
    this.adjustService.getCompanyCodeAndDesc().subscribe((res) => {
      this.companyArray = res;
    });
  }

  ngAfterViewInit(): void {
    super.init(async () => {
      return this.code
        ? this.fetchProcess(this.code).then((r) => {
            if (this.isShow) this.aAMForm.disable();
          })
        : null;
    });
  }

  public aAMFormArray = new FormArray([
    new FormGroup({
      accCode: configForms.required(),
      adjReason: configForms.required(),
      companyCode: configForms.required(),
      ledgerReason: configForms.required(),
    }),
  ]);
  public aAMForm: FormGroup = new FormGroup({
    company: configForms.required(),
    aAMFormArray: this.aAMFormArray,
  });
  get getaAMFormArray() {
    return (this.aAMForm.get('aAMFormArray') as FormArray).controls;
  }

  addAAM() {
    this.aAMFormArray.push(
      new FormGroup({
        accCode: configForms.required(),
        adjReason: configForms.required(),
        companyCode: configForms.required(),
        ledgerReason: configForms.required(),
      })
    );
  }
  deleteAAM(index: number) {
    this.aAMFormArray.removeAt(index);
  }

  submit() {
    // Has an array of obj
    // if (this.aAMForm.status != 'VALID') {
    //   this.router.navigate(['../create'], { relativeTo: this.route });
    //   this.util.notify('Error, Please try again later!', 0, 3000, 'close');
    //   return;
    // }
    this.aAMForm.value.aAMFormArray.forEach((element) => {
      element.company = this.aAMForm.value.company;
    });

    this.adjustService
      .saveAdjustmentAccountMapping(this.aAMForm.value.aAMFormArray)
      .subscribe(
        () => {
          this.util.notify(
            'Adjustment Account Mapping has been Saved Successfully!',
            1,
            5000
          );
        },
        (err) => {
          this.util.notify('Error, Please try again later!', 0, 5000);
        }
      );
  }

  public adjustmentReasonArray: any[] = [];
  public defAccCodeArray: any[] = [];
  public companyArray: any[] = [];
  public ledgerCodeArray: any[] = [[]];

  changeCompany() {
    this.adjustService.getDefaultAccountCodes().subscribe((res) => {
      this.defAccCodeArray = res;
    });
  }
  changeDefAccountCode(accCode, company, i) {
    this.adjustService
      .getAccountLedgerCodeByAccountCodeAndCompanyCode(accCode, company)
      .subscribe((res) => (this.ledgerCodeArray[i] = res));
  }

  fetchProcess(code: string) {
    return this.adjustService
      .getAdjustmentAccountMappingByCompanyCode(code)
      .toPromise()
      .then((res: any) => {
        console.log(res)
        this.aAMForm.get('aAMFormArray').patchValue(res);
        this.aAMForm.get('company').patchValue(res[0]?.companyCode);
        this.changeCompany()
      })
      .catch(() => {
        this.router.navigate(['../index'], { relativeTo: this.route });
        this.util.notify('Error, Please try again later!', 0, 3000, 'close');
      });
  }
}
