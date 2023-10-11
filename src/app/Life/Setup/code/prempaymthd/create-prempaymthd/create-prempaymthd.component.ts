import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { PayinMethodService } from 'src/app/Services/life/payout-method.service';
import {
  CreatePayInMethod,
  PayinMethod,
  PayinMethodCompany,
} from 'src/app/Shared/models/life/setup/pay/Payin-Method';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/Services/utility.service'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-prempaymthd',
  templateUrl: './create-prempaymthd.component.html',
  styleUrls: ['./create-prempaymthd.component.scss'],
})
export class CreateCodePremiumPaymentMethodComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  private nbofTable: number = 1;

  companyCodes: any[] = [];
  accCodes: any[] = [];

  payinMethod = new PayinMethod();
  payinCompany = new PayinMethodCompany();

  createPayinMethod = new CreatePayInMethod(this.payinMethod, [
    this.payinCompany,
  ]);

  disableCode: boolean = false

  showEditButton: boolean = false;
  editMode: boolean = true;

  isSaving: boolean = false;

  constructor(
    private payinMethodService: PayinMethodService,
    private companyServices: CompanyService,
    private codeService: CodeService,
    private snack: MatSnackBar,
    private toaster: UtilityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['action']) {
      this.showEditButton = true;
      this.editMode = false;
    }

    this.getAccCodes();
    this.getCompanyCodes();

    let premPayClone = JSON.parse(localStorage.getItem('premPayClone'));
    let premPayShow = JSON.parse(localStorage.getItem('premPayShow'));

    if (premPayClone != null) {
      this.createPayinMethod.payinMethodCompany = []
      this.createPayinMethod.payinMethod = premPayClone.payinMethod;
      delete this.createPayinMethod.payinMethod.id
      delete this.createPayinMethod.payinMethod.code

      premPayClone.payinMethodCompany.map((company: PayinMethodCompany) => {
        company.rowId = this.createPayinMethod.payinMethodCompany.length + 1;
        company.deleted = false;

        delete company.id
        this.createPayinMethod.payinMethodCompany.push(company);
      });

      if(this.createPayinMethod.payinMethodCompany.length < 1)this.addCompany()

      localStorage.removeItem('premPayClone');
    }

    if (premPayShow != null) {
      this.disableCode = true
      this.createPayinMethod.payinMethodCompany = []

      this.createPayinMethod.payinMethod = premPayShow.payinMethod;
      premPayShow.payinMethodCompany.map((company: PayinMethodCompany) => {
        company.rowId = this.createPayinMethod.payinMethodCompany.length + 1;
        company.deleted = false;
        this.createPayinMethod.payinMethodCompany.push(company);
      });

      if(this.createPayinMethod.payinMethodCompany.length < 1)this.addCompany()

      localStorage.removeItem('premPayShow');
    }
  }

  getAccCodes() {
    this.codeService.getAllAccCodes().subscribe((data: any) => {
      this.accCodes = data;
    });
  }

  getCompanyCodes() {
    this.companyServices.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companyCodes = data;
    });
  }

  createPayoutMethod() {
    if (this.form.valid) {
      this.isSaving = true
      this.payinMethodService
        .createPayinMethod(this.createPayinMethod)
        .subscribe((data: any) => {
          this.snack.dismiss()
          this.toaster.info('Payment Method has been created.', 1)
          // this.form.reset();
          this.showEditButton = true;
          this.editMode = false;
        },
          (error: any) => {
            this.snack.dismiss()
            this.snack.open(error?.error?.error, "Close", { duration: 5000 })
          }).add(() => this.isSaving = false);
    } else {
      this.form.form.markAllAsTouched()
      this.snack.dismiss()
      this.snack.open('Your entries are required!.', 'Close', {
        duration: 5000,
      });
    }
  }

  addCompany() {
    let company = new PayinMethodCompany();
    company.id = this.createPayinMethod.payinMethodCompany.length + 1;
    company.deleted = false;
    this.createPayinMethod.payinMethodCompany.push(company);
  }

  removeCompany(i: number) {
    if (this.createPayinMethod.payinMethodCompany[i].id != null) {
      this.createPayinMethod.payinMethodCompany[i].deleted = true;
    } else this.createPayinMethod.payinMethodCompany.splice(i, 1);
  }

  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc() {
    this.nbofTable = this.nbofTable + 1;
  }
}
