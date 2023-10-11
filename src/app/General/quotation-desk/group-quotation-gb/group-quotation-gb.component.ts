import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { QuotationService } from '../../services/quotation-service.service';
import { IInsuranceType, IProduct } from '../../services/quotation.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-group-quotation-gb',
  templateUrl: './group-quotation-gb.component.html',
  styleUrls: ['./group-quotation-gb.component.scss'],
})
export class GroupQuotationGBComponent implements OnInit {
  clientNameFromCheck: string;
  findGroupQuotationForm: FormGroup = new FormGroup({
      groupOwnerClientNo: new FormControl(
        null,
        Validators.required,
        this.validateGroupOwnerNo.bind(this)
      ),
      insuranceType: new FormControl(null, Validators.required),
      productClass: new FormControl(null, Validators.required),
      product: new FormControl(null, Validators.required),
    });;
  insuranceTypeOptions$: IInsuranceType[];
  productClassOptions$: Observable<any[]>;
  productOptions$: Observable<IProduct[]>;
  validatingClientNo: boolean;

  constructor(
    private quotationService: QuotationService,
    public router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public clientService: ClientService
  ) {}

  ngOnInit(): void { 
    this.getInsuranceOptions();
  }

  get groupOwnerClientNo() {
    return this.findGroupQuotationForm.get('groupOwnerClientNo');
  }

  getInsuranceOptions() {
    this.quotationService.getInsuranceTypeOptions().subscribe((data) => {
      this.insuranceTypeOptions$ = data;
    });
  }

  onInitialSubmit() {
    document.getElementById('initialContainer').style.display = 'none';
  }

  onInsuranceTypeChange() {
    this.productClassOptions$ = undefined;
    this.productOptions$ = undefined;

    const insuranceType =
      this.findGroupQuotationForm.controls['insuranceType'].value;
    this.productClassOptions$ =
      this.quotationService.getProductClassOptions(insuranceType);
  }

  onProductClassChange() {
    this.productOptions$ = undefined;
    const insuranceType =
      this.findGroupQuotationForm.controls['insuranceType'].value;
    const productClass =
      this.findGroupQuotationForm.controls['productClass'].value;
    const groupBusiness = true;
    this.productOptions$ = this.quotationService.getProductOptions(
      insuranceType,
      productClass,
      groupBusiness
    );
  }

  onNextClick() {
    const clientNo =
      this.findGroupQuotationForm.get('groupOwnerClientNo').value; 
    this.router.navigate(['../create-new-group-quotation', clientNo], {
      relativeTo: this.route,
      queryParams: {
        pcd: this.findGroupQuotationForm.value?.product?.code,
        pdsc: this.findGroupQuotationForm.value?.product?.description,
      },
    });
  }

  onCreate() {
    console.log(this.findGroupQuotationForm);
    this.router.navigateByUrl('/life/allform');
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  validateGroupOwnerNo(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    this.clientNameFromCheck = '';
    this.validatingClientNo = true;
    return this.quotationService.getClientFullName(control?.value).pipe(
      tap((data) => {
        this.clientNameFromCheck = data;
        this.validatingClientNo = false;
      }),
      map((data) => {
        this.validatingClientNo = false;
        return data ? null : { valid: false };
      }),
      catchError(() => {
        this.clientNameFromCheck = '';
        this.validatingClientNo = false;
        return of({ valid: false });
      })
    );
  }
}
