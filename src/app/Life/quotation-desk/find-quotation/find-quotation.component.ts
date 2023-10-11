import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-find-quotation',
  templateUrl: './find-quotation.component.html',
  styleUrls: ['./find-quotation.component.scss'],
})
export class FindQuotationComponent implements OnInit {
  findQuotationForm = new FormGroup({});
  // quoteNo: any;
  // clientNo: any;
  // agentNo: any;
  // status: any;
  // productClass: any;
  // productCode: any;
  // createdDateFrom: any;
  // createdDateTo: any;
  // ownerName: any;
  // propertyId: any;
  // insuranceType: any;
  // grouped: any;
  // createdBy: any;
  // startDate: any;
  // endDate: any;
  tableLoading:any;
  // pageNumber: any;
  // pageSize: any;
  validatingClientNo: boolean;
  quoteNoValidation: any = {};
  codes: any[] = [];
  quotations: any[] = [];
  createdBys: any[] = [];
  productCodes: any[] = [];
  productClasses: any[] = [];
  quoteStatus: any[] = [];
  insurances: any[] = [];

  client: any = {};

  isQuoteNoValid = '';
  isQuoteNoInvalid = '';

  isClientNoValid = '';
  isClientNoInValid = '';

  isQuoteNo = false;

  quoteNoString: any;

  connection = {
    creating: false,
    error: false,
    searching: false,
  };

  // remove
  validResult: any = '';
  validResult1: any = '';
  checkMark = false;

  constructor(public quotationService: FindQuotationService, public router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeVariables();
    this.getCodes();
    this.getCreatedBy();
    // this.getProductClass();
    this.getQuoteStatus();
    this.getInsuranctType();
  }

  initializeVariables() {
    this.findQuotationForm = new FormGroup({
      agentNo: new FormControl(null),
      clientNo: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
      createdDateTo: new FormControl(null),
      endDate: new FormControl(null),
      grouped: new FormControl(null),
      insuranceType: new FormControl(null),
      ownerName: new FormControl(null),
      pageNumber: new FormControl(1),
      pageSize: new FormControl(10),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      propertyId: new FormControl(null),
      quoteNo: new FormControl(null, null, this.getQuoteNoValidity.bind(this)),
      startDate: new FormControl(null),
      status: new FormControl(null),
    });
  }

  getCodes() {
    this.connection.creating = true;

    this.quotationService.getCodes().subscribe((data: any) => {
      this.codes = data;
      console.log('codes', data);
      this.connection.creating = false;
    });
  }



  getProductClass(value) {
    this.connection.creating = true;
    this.quotationService.getProductClass(value).subscribe((data: any) => {
      this.productClasses = data;
      console.log('product class', data);
      this.connection.creating = false;
    });
  }

  getQuoteStatus() {
    this.connection.creating = true;

    this.quotationService.getQuoteStatus().subscribe((data: any) => {
      this.quoteStatus = data;
      console.log('product class', data);
      this.connection.creating = false;
    });
  }

  getCreatedBy() {
    this.connection.creating = true;
    this.quotationService.getCreatedBy().subscribe((data: any) => {
      this.createdBys = data;
      console.log('created by', data);
      this.connection.creating = false;
    });
  }

  getProductCodes(value) {
    this.connection.creating = true;
    this.quotationService.getProductCodes(value).subscribe((data: any) => {
      this.productCodes = data;
      console.log('product codes', data);
      this.connection.creating = false;
    });
  }

  getInsuranctType() {
    this.connection.creating = true;

    this.quotationService.getInsuranctType().subscribe((data: any) => {
      console.log('InsuranceType', data);
      this.insurances = data;
      this.connection.creating = false;
    });
  }

  validateClientNo() {
    this.connection.creating = true;
    console.log("Client Number "+this.findQuotationForm?.value?.clientNo);
    this.quotationService.validate(this.findQuotationForm?.value?.clientNo).subscribe(
      (data: any) => {
        console.log(data)
        let clientNoValidation = data;
        this.validateClient(clientNoValidation);
        this.connection.creating = false;
      },
      (error) => {
        this.connection.creating = false;
        this.connection.error = true;
        this.isQuoteNo = false;
      }
    );
  }


  getQuoteNoValidity(control:AbstractControl) {
    // this.connection.creating = true;
    // console.log("QUOTE NO "+this.findQuotationForm?.value?.quoteNo);
    return new Promise<any>(resolve=>{
       this.quotationService.validate(control.value).subscribe(
         (data: any) => {
           if (data) resolve(null);
           else resolve({ notFound: true });
         },
         (error) => {
           resolve({ notFound: true });
         }
       );
    })
   
  }

  validateClient(value) {
    if (value === true) {
      this.validResult1 = 'true'
    } else if (value === false) {
      this.validResult1 = 'false'
    }
  }

  validateQuoteNo(value) {
    if (value === true) {
      this.validResult = 'true'
    } else if (value === false) {
      this.validResult = 'false'
    }
  }



  checkClientNo(value: any) {
    if (value === null) {
      this.isClientNoInValid = 'true';
    } else if (value !== null) {
      this.isClientNoValid = 'true';
    }
  }

  search() {
    // this.connection.searching = true;

    // this.findQuotationForm.value.createdDateFrom = this.findQuotationForm?.value?.startDate + ' 00:00:00';
    // this.findQuotationForm.value.createdDateTo = this.findQuotationForm?.value?.endDate + ' 23:59:59';

    this.quotationService.findQuotation(this.findQuotationForm.value).subscribe(
      (data: any) => {
        this.quotations = data;
        this.connection.searching = false;
        localStorage.setItem('searchQuotations', JSON.stringify(this.quotations));
        this.router.navigate(['../quotation-search'], { relativeTo: this.route });
      },
      (error) => {
        this.connection.searching = false;
        this.connection.error = true;
      }
    );
  }

  onNext() {
    if (this.findQuotationForm.value.quoteNo === false) {
      return;
    } else {
      this.router.navigate(['../view-quotation'], {relativeTo: this.route,queryParams: { quoteNo:this.findQuotationForm.value.quoteNo }});
    }
  }
}
