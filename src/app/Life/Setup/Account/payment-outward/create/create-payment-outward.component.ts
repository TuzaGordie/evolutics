import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component';
import { configForms } from 'src/app/Shared/models/form.class';
import { PaymentOutwardService } from '../payment-outward.service';

@Component({
  selector: 'app-create-payment-outward',
  templateUrl: './create-payment-outward.component.html',
  styleUrls: ['./create-payment-outward.component.scss'],
})
export class CreatePaymentOutward
  extends PageTemplateComponent
  implements OnInit
{
  constructor(
    private pOService: PaymentOutwardService,
    public util: UtilityService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(route, util);
  }
  loading = true;
  public paymentOutwardArray: FormArray = new FormArray([
    new FormGroup({
      claimType: configForms.required(),
      paymentType: configForms.required(),
      payAccCode: configForms.required(),
      bankCode: configForms.required(),
      bankAccNo: configForms.required(),
      bankSortCode: configForms.required(),
      payoutBasis: configForms.required(),
      payoutFileFormat: configForms.required(),
    }),
  ]);

  public paymentOutwardForm: FormGroup = new FormGroup({
    companyPayout: new FormGroup({
      defaultPayoutBank: configForms.required(),
      companyCode: configForms.required(),
      encryptPayoutProcess: configForms.required(),
      defaultPayoutAccNo: configForms.required(),
      defaultPayoutSortCode: configForms.required(),
      dcBatchFile: configForms.required(),
      mmBatchFile: configForms.required(),
      chqBatchFile: configForms.required(),
      active: configForms.boolean(),
      authBy: configForms.required(),
      authOn: configForms.required(),
      dateCreated: configForms.required(),
      dcBatchName: configForms.required(),
      effOn: configForms.required(),
      payoutMethod: configForms.required(),
    }),
    companyPayoutAccTypes: this.paymentOutwardArray,
    companyPayoutRounding: new FormGroup({
      rounding: configForms.required(),
      currency: configForms.required(),
    }),
  });

  get getCompanyPayoutAccTypes() {
    return (this.paymentOutwardForm.get('companyPayoutAccTypes') as FormArray)
      .controls;
  }
  deletePaymentOutward(index: number) {
    this.paymentOutwardArray.removeAt(index);
  }

  addPaymentOutward() {
    this.paymentOutwardArray.push(
      new FormGroup({
        bankAccNo: configForms.required(),
        bankCode: configForms.required(),
        bankSortCode: configForms.required(),
        claimType: configForms.required(),
        payAccCode: configForms.required(),
        paymentType: configForms.required(),
        payoutBasis: configForms.required(),
        payoutFileFormat: configForms.required(),
      })
    );
  }

  public companyArray: any[] = [];
  public payoutBasisArray: any[] = [];
  public fileFormatArray: any[] = [];
  public currencyArray: any[] = [];
  public bankAccNoArray: any[] = [];
  public bankCodeArray: any[] = [];
  public paymentAccCodeArray: any[] = [];
  public paymentTypeArray: any[] = [];
  public claimTypeArray: any[] = [];

  ngOnInit(): void {
    this.pOService.getCompanyCodeAndDes().subscribe((res) => {
      this.companyArray = res;
    });

    this.pOService
      .getCodeTitleByCodeSubGroup('PAYOUT_BASIS')
      .subscribe((res) => {
        this.payoutBasisArray = res;
      });

    this.pOService
      .getCodeTitleByCodeSubGroup('FILE_FORMAT')
      .subscribe((res) => {
        this.fileFormatArray = res;
      });

    this.pOService.getCodeTitleByCodeSubGroup('CLAIM_TYPE').subscribe((res) => {
      this.claimTypeArray = res;
    });

    this.pOService.getCurrencyCodeAndDes().subscribe((res) => {
      this.currencyArray = res;
    });

    this.pOService.getCompanyBankAccounts().subscribe((res) => {
      this.bankAccNoArray = res;
    });

    this.pOService.getAllBankCodeAndDes().subscribe((res) => {
      this.bankCodeArray = res;
    });

    this.pOService.getAllAccCodesAndDes().subscribe((res) => {
      this.paymentAccCodeArray = res;
    });

    this.pOService.getAllPayoutCodeAndDescription().subscribe((res) => {
      this.paymentTypeArray = res;
    });
  }

  ngAfterViewInit() {
    super.init(async () => {
      return this.code
        ? this.fetchProcess(this.code).then((r) => {
            this.isShow ? this.paymentOutwardForm.disable() : null;
            this.loading = false;
          })
        : null;
    });
  }
  fetchProcess(companyCode: string) {
    return this.pOService
      .getPaymentOutwardByCompanyCode(companyCode)
      .toPromise()
      .then((res: any) => {
        // TEST DATA
        // {
        //   "companyPayout": {
        //     "active": true,
        //     "authBy": "string",
        //     "authOn": "2022-03-06T16:47:36.682Z",
        //     "chqBatchFile": "string",
        //     "dateCreated": "2022-03-06T16:47:36.682Z",
        //     "dcBatchFile": "string",
        //     "dcBatchName": "string",
        //     "defaultPayoutAccNo": "string",
        //     "defaultPayoutBank": "string",
        //     "defaultPayoutSortCode": "string",
        //     "effOn": "2022-03-06T16:47:36.682Z",
        //     "encryptPayoutProcess": "string",
        //     "mmBatchFile": "string",
        //     "payoutMethod": "string"
        //   },
        //   "companyPayoutAccTypes": [
        //     {
        //       "bankAccNo": "string",
        //       "bankCode": "string",
        //       "bankSortCode": "string",
        //       "claimType": "string",
        //       "companyCode": "string",
        //       "payAccCode": "string",
        //       "paymentType": "string",
        //       "payoutBasis": "string",
        //       "payoutFileFormat": "string"
        //     }
        //   ],
        //   "companyPayoutRounding": {
        //     "authBy": "string",
        //     "authOn": "2022-03-06",
        //     "companyCode": "string",
        //     "companyId": 0,
        //     "currCode": "string",
        //     "rounding": 0
        //   }
        // }

        this.paymentOutwardForm
          .get('companyPayout')
          .patchValue(res.companyPayout);
        this.paymentOutwardForm
          .get('companyPayoutRounding')
          .patchValue(res.companyPayoutRounding);
        this.paymentOutwardForm
          .get('companyPayoutAccTypes')
          .patchValue(res.companyPayoutAccTypes);
      })
      .catch((err) => {
        this.router.navigate(['../index'], { relativeTo: this.route });
        this.util.notify('Error, Please try again later!', 0, 3000, 'close');
      });
  }
  onSubmit(paymentOutwardForm: FormGroup) {
    // THIS IS FOR VALIDATION
    // if (paymentOutwardForm.status != 'VALID') {
    //   this.router.navigate(['../create'], { relativeTo: this.route });
    //   this.util.notify('Error, Please try again later!', 0, 3000, 'close');
    //   return;
    // }
    this.pOService.createPaymentOutward(paymentOutwardForm.value).subscribe(
      () => {
        this.util.notify(
          'Payment Outward has been created successfully!',
          1,
          5000
        );
      },
      () => {
        this.util.notify('Error, Please try again later!', 0, 5000);
      }
    );
  }
}
