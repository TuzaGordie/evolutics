import { HttpErrorResponse } from '@angular/common/http';
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
import { catchError, find, map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { QuotationService } from '../../services/quotation-service.service';
import { IProduct } from '../../services/quotation.interface';
import { CreateQuotationService } from '../service/create-quotation.service';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-individual-quotation',
  templateUrl: './individual-quotation.component.html',
  styleUrls: ['./individual-quotation.component.scss'],
})
export class NewIndividualQuotationComponent implements OnInit {
  findIndividualQuotationForm: FormGroup;
  client: any;
  quotationApiNo: any;
  checkMark = false;
  verifyingClientNo = false;
  insranceType: any;
  productClass: any;
  productCode: any;
  productOptions$: Observable<IProduct[]>
  
  insuranceTypesList = [];
  productClassesList = [];
  productsList = [];
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(
    private findQuotationService: FindQuotationService,
    public createQuotationService: CreateQuotationService,
    public router: Router,
    private api: ApiService,
    public utilityService: UtilityService,public route:ActivatedRoute, 
    private quotationService: QuotationService
    ) { }

  ngOnInit(): void {
    this.findIndividualQuotationForm = new FormGroup({
      insuranceType: new FormControl(null, Validators.required),
      clientNo: new FormControl(
        null,
        Validators.required,
        this.clientNoValidator.bind(this)
      ),
      productClass: new FormControl(null, Validators.required),
      productCode: new FormControl(null, Validators.required),
    });
    this.getInsuranceTypesList();
  }

  onChange() {

  }

  onNext(){
    const clientNo = this.findIndividualQuotationForm.get("clientNo").value
    this.createQuotationService.individualQuotationInfo = this.findIndividualQuotationForm.value;
    const selectedProduct: IProduct = this.findIndividualQuotationForm.controls["productCode"].value
    const insuranceType = this.findIndividualQuotationForm.controls["insuranceType"].value
    const productClass = this.findIndividualQuotationForm.controls['productClass'].value

    this.router.navigate(
      [`../../create-new-individual-quotation/${clientNo}`],
      {relativeTo:this.route,
        queryParams: {
          is: insuranceType,
          pcd: selectedProduct.code,
          pdsc: selectedProduct.description ,
          pcl: productClass,
          clientNo
        }
      }
    )
  }

  onSearch(){
    this.router.navigate(
      ['../../create-new-individual-quotation'],
      {
        queryParams: {
          clientNo: this.findIndividualQuotationForm.value.clientNo,
        },
        relativeTo:this.route
      }
    );
  }
 

  onCreate() {

    this.router.navigateByUrl('/life/allform');
    /* this.createQuotationService.individualQuotationInfo(this.quotationNoForm.value); */
  }

  onInsuranceTypeSelection(event) {
    this.getProductClassesList(event.target.value);
  }

  onProductClassSelection(event) {
    this.getProductsList(event.target.value);
    this.productOptions$ = undefined
    const insuranceType = this.findIndividualQuotationForm.controls['insuranceType'].value;
    const productClass = this.findIndividualQuotationForm.controls['productClass'].value;
    const groupBusiness = false;
    this.productOptions$ = this.quotationService.getProductOptions(productClass)
  }

  get clientNoIsValid() {
    return this.findIndividualQuotationForm.controls['clientNo'].valid;
  }

  get validatingClientNo() {
    return this.findIndividualQuotationForm.controls['clientNo'].pending;
  }

  get clientNoIsInvalid() {
    return (
      this.findIndividualQuotationForm.controls['clientNo'].dirty &&
      this.findIndividualQuotationForm.controls['clientNo'].invalid
    );
  }

  get hideNext() {
    return !this.findIndividualQuotationForm.valid;
  }

  async clientNoValidator(control: AbstractControl) {
    this.verifyingClientNo = true;
   this.client= this.createQuotationService.clientInfo = null;
    try {
      this.client= this.createQuotationService.clientInfo = await this.findQuotationService
        .getClient(control.value)
        .toPromise();
    } catch (error) {
      console.error(error)
      return { notFound: true };
    }
    this.verifyingClientNo = false;
    return this.createQuotationService.clientInfo?.clientNo ? null : { notFound: true };
  }

  getInsuranceTypesList() {
    this.quotationService.getInsuranceTypeOptions()
      .subscribe((res) => {
        this.insuranceTypesList = res;
        console.log('got insuranceTypesList:', this.insuranceTypesList);
      });
  }

  getProductClassesList(insuranceType) {
    this.quotationService.getProductClassOptions(insuranceType)
      .subscribe((res) => {
        this.productClassesList = res;
      });
  }

  getProductsList(productClass) {
    this.quotationService.getProductOptions(productClass)
      .subscribe((res) => {
        this.productsList = res;
      });
  }
}
