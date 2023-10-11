import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuotationService } from '../../services/quotation-service.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IProduct } from '../../services/quotation.interface';

@Component({
  selector: 'app-individual-quotation-gb',
  templateUrl: './individual-quotation-gb.component.html',
  styleUrls: ['./individual-quotation-gb.component.scss']
})

export class IndividualQuotationGBComponent implements OnInit {

  findIndividualQuotationForm: FormGroup;
  insuranceTypeOptions$ = this.quotationService.getInsuranceTypeOptions()
  productClassOptions$: Observable<any[]>
  productOptions$: Observable<IProduct[]>
  clientNameFromCheck: string
  validatingClientNo: boolean

  constructor(private quotationService: QuotationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.findIndividualQuotationForm = this.fb.group({
      clientNo: new FormControl(null, Validators.required, this.validateClientNo.bind(this)),
      insuranceType: new FormControl(null, Validators.required),
      productClass: new FormControl(null, Validators.required),
      product: new FormControl(null, Validators.required),
    })
  }

  get clientNo() {
    return this.findIndividualQuotationForm.get('clientNo')
  }

  validateClientNo(control: AbstractControl): Observable<ValidationErrors | null> {
    this.clientNameFromCheck = ''
    this.validatingClientNo=true;
    return this.quotationService.getClientFullName(control?.value).pipe(
      tap(data => {
        this.clientNameFromCheck = data
        this.validatingClientNo=false
      }),
      map(data => {
        this.validatingClientNo=false;
        return data ? null : { valid: false }
      }),
      catchError((err) => {
        this.clientNameFromCheck = ''
        this.validatingClientNo=false
        console.log("error occured fetching validating clientNo: ", err)
        return of({ valid: false })
      })
    );
  }


  onInsuranceTypeChange() {
    this.productClassOptions$ = undefined
    this.productOptions$ = undefined

    const insuranceType = this.findIndividualQuotationForm.controls['insuranceType'].value
    this.productClassOptions$ = this.quotationService.getProductClassOptions(insuranceType)

  }

  onProductClassChange() {
    this.productOptions$ = undefined
    const insuranceType = this.findIndividualQuotationForm.controls['insuranceType'].value;
    const productClass = this.findIndividualQuotationForm.controls['productClass'].value.code;
    const groupBusiness = false;
    this.productOptions$ = this.quotationService.getProductOptions(insuranceType, productClass, groupBusiness)
  }
  onNextClick() {
    const clientNo = this.findIndividualQuotationForm.get("clientNo").value
    const selectedProduct: IProduct = this.findIndividualQuotationForm.controls["product"].value
    const productClass = this.findIndividualQuotationForm.controls['productClass'].value
    const insuranceType = this.findIndividualQuotationForm.controls['insuranceType'].value
    this.router.navigate(
      ["/general/quotation-desk/create-new-individual-quotation", clientNo],
      {
        queryParams: {
          pcd: selectedProduct.code,
          pdsc: selectedProduct.description ,
          pcl: productClass.code,
          itype: insuranceType
        }
      }
    )
  }

  onCreate() {
    console.log(this.findIndividualQuotationForm)
    this.router.navigateByUrl('/life/allform')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

}
