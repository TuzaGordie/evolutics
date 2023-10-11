import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AccountExtrasService } from '../../../accounts-extras/account-extras.service';
import { ICreateBank, ICreateSortCode } from '../../../accounts-extras/account-model';
import { AccountsService } from '../../../accounts-extras/accounts.service';

@Component({
  selector: 'app-create-sort-code',
  templateUrl: './create-sort-code.component.html',
  styleUrls: ['./create-sort-code.component.scss']
})
export class CreateSortCode implements OnInit {
  loading: boolean;
  createSortCodeFormData: any;
  form: FormGroup;
  submitBtn: boolean;
  asTable: boolean; // whether to display data as table or as a form in the template
  constructor(
    public aS: AccountsService,
    public aeS: AccountExtrasService,
    private route: ActivatedRoute,
    private uS: UtilityService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({



      // "city": "string",
      // "code": "string",
      // "country": "string",
      // "hq": true,
      // "title": "string",
      // "town": "string"


      description: configForms.required(),

      sortCode: configForms.required(),
      bank: configForms.required(),
      country: configForms.required(),
      stateAddress: configForms.required(),
      addressTown: configForms.default(),
      address: configForms.default(),
      branchName: configForms.default(),
      isHeadOffice: configForms.default(),
    });
    this.prefillShowForm();
  }

  onSubmit() {
    this.submit();
  }

  prefillShowForm() {
    this.route.queryParamMap.subscribe(async (queryMap) => {
      // (queryMap.get('sortCode') == null) ? this.loading = false : this.loading = true;
      if (queryMap.has('sortCode')) {
        let sortCode = queryMap.get('sortCode');

        this.aeS.getBankByBankCode(sortCode).subscribe(
          res => {
            console.log(res)
            this.form.patchValue(res)
            this.loading = false
          }
        )


        let redirect = queryMap.get('redirect');
        if (redirect.toLowerCase() == "show") {

          this.form.disable();
          this.submitBtn = true;
          this.loading = false
          return
        } else {

        }


      }
      this.asTable = queryMap.get('asTable') ? true : false
    });
  }

  private async submit() {
    this.loading = true;
    let values = this.form.value
    let finalValue = {
      stateAddress: values?.stateAddress?.code,
      bank: values?.bank?.code,
      description: values?.bank?.description,
      sortCode: values?.sortCode,
      country: values?.country,
      addressTown: values?.addressTown,
      address: values?.address,
      branchName: values?.branchName,
      isHeadOffice: values?.isHeadOffice
    }
    try {
      if (this.createSortCodeFormData?.code) {
        this.aeS.modifySortCode(finalValue, this.createSortCodeFormData.brandCode)
          .subscribe(() => this.uS.notify('Successfully Submitted', 1))
          .add(() => this.loading = false)
      } else {
        this.aeS.createSortCode(finalValue)
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
