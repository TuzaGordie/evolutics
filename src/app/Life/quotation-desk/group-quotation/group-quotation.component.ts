import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateQuotationService } from '../service/create-quotation.service';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-group-quotation',
  templateUrl: './group-quotation.component.html',
  styleUrls: ['./group-quotation.component.scss'],
})
export class NewGroupQuotationComponent implements OnInit {
  findGroupQuotationForm: FormGroup;
  client: any;

  insuranceTypesList = [];
  productClassesList = [];
  productsList = [];

  constructor(
    public findQuotationService: FindQuotationService,
    public createQuotationService: CreateQuotationService,public uS: UtilityService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findGroupQuotationForm = new FormGroup({
      clientNo: new FormControl(
        null,
        Validators.required,
        this.clientNoValidator()
      ),
      insuranceType: new FormControl(null, Validators.required),
      productClass: new FormControl(null, Validators.required),
      productCode: new FormControl(null, Validators.required),
      // quotationNo: new FormControl(null),
      // agentID: new FormControl(null),
      // statusID: new FormControl(null),
      // createdBy: new FormControl(null),
      // createdDateFrom: new FormControl(null)
    });
    this.getInsuranceTypesList();
  }

  onNext() {
    console.log(this.findGroupQuotationForm);
    this.createQuotationService.groupQuotationInfo =
      this.findGroupQuotationForm.value;
    this.router.navigate(['../../create-new-group-quotation'], {
      queryParams: { clientNo: this.findGroupQuotationForm.value.clientNo },
      relativeTo: this.route,
    });
  }

  onCreate() {
    console.log(this.findGroupQuotationForm);
    this.router.navigateByUrl('/life/allform');
    /* this.findQuotationService.groupQuotationInfo(this.quotationNoForm.value); */
  }

  onSearch() {
    this.router.navigate(['/life/view-client'], {
      queryParams: { clientNo: this.findGroupQuotationForm.value.clientNo },
    });
  }

  onInsuranceTypeSelection(event) {
    this.getProductClassesList(event.target.value);
  }

  onProductClassSelection(event) {
    this.getProductsList(event.target.value);
  }

  get clientNoIsValid() {
    return this.findGroupQuotationForm.controls['clientNo'].valid;
  }

  get validatingClientNo() {
    return this.findGroupQuotationForm.controls['clientNo'].pending;
  }

  get clientNoIsInvalid() {
    return (
      this.findGroupQuotationForm.controls['clientNo'].dirty &&
      this.findGroupQuotationForm.controls['clientNo'].invalid
    );
  }

  get hideNext() {
    return !this.findGroupQuotationForm.valid;
  }

  clientNoValidator(): AsyncValidatorFn {
    this.client = this.createQuotationService.clientInfo = null;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.findQuotationService.getClient(control.value).pipe(
        tap(
          (res) => (this.client = this.createQuotationService.clientInfo = res)
        ),
        map((res) => {
          if (!res?.clientNo)
            this.client = this.createQuotationService.clientInfo = null;
          return res?.clientNo ? null : { notFound: true };
        }),
        catchError((err) => {
          this.uS.notify('No client with client number = ' + control.value, 0);
          console.log('Error validating Client Number:' + control.value, err);
          return of({ notFound: true });
        })
      );
    };
  }

  getInsuranceTypesList() {
    this.createQuotationService
      .getInsuranceTypesList()
      .subscribe((res: any[]) => {
        this.insuranceTypesList = res;
        console.log('got insuranceTypesList:', this.insuranceTypesList);
      });
  }

  getProductClassesList(insuranceType) {
    this.createQuotationService
      .getProductClassesList(insuranceType)
      .subscribe((res: any[]) => {
        this.productClassesList = res;
      });
  }

  getProductsList(productClass) {
    this.createQuotationService
      .getProductsList(productClass)
      .subscribe((res: any[]) => {
        this.productsList = res;
      });
  }
}
