import { UtilityService } from 'src/app/Services/utility.service';
import { AccountExtrasService } from './../../../accounts-extras/account-extras.service';
import { AccountsService } from './../../../accounts-extras/accounts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IVehicleBrand } from 'src/app/General/setups/codes/vehicles/vehicle-extras/vehicle.model';
import { configForms } from 'src/app/Shared/models/form.class';
import { ICreateBank } from '../../../accounts-extras/account-model';

@Component({
  selector: 'app-create-bank-code',
  templateUrl: './create-bank-code.component.html',
  styleUrls: ['./create-bank-code.component.scss']
})
export class CreateBankCode implements OnInit {
  loading: boolean;
  createBankFormData: any;
  form: FormGroup;
  submitBtn: boolean;
  constructor(
    public aS: AccountsService,
    public aeS: AccountExtrasService,
    private route: ActivatedRoute,
    private uS: UtilityService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      //   "hqTown": "string",
      // "branch": "string",
      code: configForms.required(),
      description: configForms.required(),
      country: configForms.default(),
      hqAddress: configForms.default(),
      hqCity: configForms.default(),
      hqSortCode: configForms.default(),
    });
    this.prefillShowForm();
  }

  onSubmit() {
    this.submit();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      (queryMap.get('brandCode') == null) ? this.loading = false : this.loading = true;
      if (queryMap.has('brandCode')) {
        let bc = queryMap.get('brandCode');
        let clone = queryMap.get('redirect');
        if (bc != null && (clone !== undefined || null)) {
          // this.form.patchValue({
          //   code: result[0]?.code,
          //   description: result[0]?.description,
          // });
        }
        if (clone !== null) {
          if (clone.toLowerCase() === 'show') {
            this.form.disable();
            this.submitBtn = true;
            this.loading = false

          }
        }
      }
      if (queryMap.has('brandCode')) {
        const code = queryMap.get('brandCode')
        this.aeS.getBankByBankCode(code).subscribe(
          res => {
            this.form.patchValue(res)
            this.loading = false
          }
        )
      }

    });
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value as ICreateBank;

    try {
      if (this.createBankFormData?.code) {
        this.aeS.modifyBank(values, this.createBankFormData.brandCode)
          .subscribe(() => this.uS.notify('Successfully Submitted', 1))
          .add(() => this.loading = false)
      } else {
        this.aeS.submitBank(values)
          .subscribe(() => this.uS.notify('Successfully Submitted', 1))
          .add(() => this.loading = false)
      }
    } catch (e) {
      this.uS.notify('An error occurred', 0);
      console.log(e);
      this.loading = false;
    }
  }


}
