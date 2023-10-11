import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLoaderService } from 'src/app/Services/page-loader.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { environment } from 'src/environments/environment';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';

@Component({
  selector: 'find-policy',
  templateUrl: './find-policy.component.html',
  styleUrls: ['./find-policy.component.scss'],
})
export class FindPolicyComponent implements OnInit {
  policyNo: string;
  clientNo: any;
  quoteNo: any;
  enroleeNo: any;
  ownerName: any;
  propertyId: any;
  agentNo: any;
  insuranceType: any;
  productCode: any;
  productClass: any;
  status: any;
  createdDateFrom: any;
  createdDateTo: any;
  externalRef: any;
  quoteStatus: any;

  pageNumber: number;
  pageSize: number;
  startDate: any;
  endDate: any;

  policyNumbers2: any[] = [];
  policies: any[] = [];
  retrievedOwnerName: any = {};
  insurances: any[] = [];
  productClasses: any[] = [];
  productCodes: any[] = [];
  quoteNoValidation: any = {};
  enroleeNoValidation: any = {};
  codes: any[] = [];

  client: any = {};

  connection = {
    creating: false,
    error: false,
    searching: false,
  };

  isClientNoValid = '';
  isClientNoInValid = '';
  isPolicyNoValid = '';
  isPolicyNoInValid = '';
  isQuoteNoValid = '';
  isQuoteNoInvalid = '';
  isEnroleeNoValid = '';
  isEnroleeNoInvalid = '';

  isPolicyNo = false;
  isQuoteNo = false;
  isEnroleeNo = false;

  quoteNoString: any;
  form = new FormGroup({
    policyNo: new FormControl(null, this.validatePolicyNo.bind(this)),
  });
  verifyingPolicyNo: boolean;
  policyNumbers: string[];
  constructor(
    private policyDeskService: PolicyEndpointsService,
    public uS: UtilityService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeVariables();
    this.getInsuranctType();
    this.getPolicyNumbers();
    this.getCodes();
    if (!environment.production) {
      this.form.patchValue({ policyNo: 'lse210001' });
      this.form.updateValueAndValidity();
    }
  }
  startLoader() { 
    this.router.navigate([`../view-policy`], {
      queryParams: {
        number: this.policyNo,
        code: 1,
        suffix: 1,
      },
      relativeTo: this.route,
    });
  }
  initializeVariables() {
    this.agentNo = '';
    this.clientNo = '';
    this.quoteNo = '';
    this.enroleeNo = '';
    this.ownerName = '';
    this.propertyId = '';
    this.agentNo = '';
    this.insuranceType = '';
    this.productCode = '';
    this.productClass = '';
    this.status = '';
    this.createdDateFrom = '';
    this.createdDateTo = '';
    this.externalRef = '';
    this.quoteStatus = '';
    this.pageNumber = 1;
    this.pageSize = 10;
    this.startDate = '';
    this.endDate = '';
  }

  show() {}

  getPolicyNumbers() {
    this.connection.creating;

    this.policyDeskService.getPolicyNumbers().subscribe((data) => {
      this.policyNumbers = data.map((x) => x.policyNo.toUpperCase());
      console.log('POLICY NUMBERS', data);
    });
  }

  validatePolicyNo(control = this.form.controls.policyNo) {
    this.policyNo = null;
    if (!control?.value) return { valid: false };
    this.verifyingPolicyNo = true;
    try {
      this.policyNo = this.policyNumbers?.find(
        (x) => x == control?.value?.toUpperCase()
      );
    } catch (error) {}
    this.verifyingPolicyNo = false;
    return this.policyNo ? null : { valid: false };
  }

  validateClientNo(value) {
    this.connection.creating = true;
    this.isClientNoValid = '';
    this.isClientNoInValid = '';

    value = this.clientNo;
    this.policyDeskService.validateClientNo(value).subscribe(
      (data: any) => {
        this.client = data;
        this.checkClientNo(this.client.clientNo);
      },
      (error) => {
        this.isClientNoInValid = 'true';
      }
    );
  }

  getEnroleeNoValidity(value) {
    this.connection.creating = true;
    this.isEnroleeNoValid = '';
    this.isEnroleeNoInvalid = '';

    value = this.enroleeNo;
    this.policyDeskService
      .validate(
        this.agentNo,
        this.clientNo,
        this.createdDateFrom,
        this.createdDateTo,
        this.enroleeNo,
        this.externalRef,
        this.ownerName,
        this.policyNo,
        this.productClass,
        this.productCode,
        this.propertyId,
        this.quoteNo,
        this.quoteStatus,
        this.status
      )
      .subscribe(
        (data: any) => {
          this.enroleeNoValidation = data;
          this.validateEnroleeNo(this.enroleeNoValidation);

          this.connection.creating = false;
        },
        (error) => {
          this.isEnroleeNoInvalid = 'true';
        }
      );
  }

  getInsuranctType() {
    this.connection.creating = true;

    this.policyDeskService.getInsuranctType().subscribe((data: any) => {
      console.log('InsuranceType', data);
      this.insurances = data;
      this.connection.creating = false;
    });
  }

  getProductClass(value) {
    this.connection.creating = true;

    this.policyDeskService.getProductClass(value).subscribe((data: any) => {
      console.log('product class', data);
      this.productClasses = data;
      this.connection.creating = false;
    });
  }

  getProductCode(value) {
    this.connection.creating = true;

    this.policyDeskService.getProductCode(value).subscribe((data: any) => {
      console.log('product code', data);
      this.productCodes = data;
      this.connection.creating = false;
    });
  }

  getQuoteNoValidity(value) {
    this.connection.creating = true;
    this.isQuoteNoValid = '';
    this.isQuoteNoInvalid = '';

    this.quoteNo = value;
    this.policyDeskService
      .validate(
        this.agentNo,
        this.clientNo,
        this.createdDateFrom,
        this.createdDateTo,
        this.enroleeNo,
        this.externalRef,
        this.ownerName,
        this.policyNo,
        this.productClass,
        this.productCode,
        this.propertyId,
        this.quoteNo,
        this.quoteStatus,
        this.status
      )
      .subscribe(
        (data: any) => {
          this.quoteNoValidation = data;
          this.validateQuoteNo(this.quoteNoValidation);

          this.connection.creating = false;
        },
        (error) => {
          this.connection.creating = false;
          this.connection.error = true;
          this.isQuoteNo = false;
        }
      );
  }

  search() {
    this.connection.searching = true;

    this.createdDateFrom = this.startDate + ' 00:00:00';
    this.createdDateTo = this.endDate + ' 23:59:59';

    if (this.startDate === '') {
      this.createdDateFrom = '';
    }
    if (this.endDate === '') {
      this.createdDateTo = '';
    }

    this.policyDeskService
      .findPolicies(
        this.agentNo,
        this.clientNo,
        this.createdDateFrom,
        this.createdDateTo,
        this.enroleeNo,
        this.externalRef,
        this.ownerName,
        this.pageNumber,
        this.pageSize,
        this.policyNo,
        this.productClass,
        this.productCode,
        this.propertyId,
        this.quoteNo,
        this.quoteStatus,
        this.status
      )
      .subscribe(
        (data: any) => {
          this.policies = data;
          this.connection.searching = false;
          localStorage.setItem('searchPolicies', JSON.stringify(this.policies));
          this.router.navigate(['../search-list'], { relativeTo: this.route });
        },
        (error) => {
          this.connection.searching = false;
          this.connection.error = true;
        }
      );
  }

  getCodes() {
    this.connection.creating = true;

    this.policyDeskService.getCodes().subscribe((data: any) => {
      this.connection.creating = false;
      this.codes = data;
    });
  }

  checkQuoteNo(string: any) {
    let value = string.toUpperCase();
    if (value === false) {
      this.isQuoteNo = false;
    } else {
      this.getQuoteNoValidity(value);
    }
  }

  validateQuoteNo(value) {
    if (value === true) {
      this.isQuoteNoValid = 'true';
      this.isQuoteNo = true;
    } else if (value === false) {
      this.isQuoteNoInvalid = 'true';
      this.isQuoteNo = false;
    }
  }

  checkEnroleeNo(string: any) {
    let value = string.toUpperCase();
    if (value === false) {
      this.isEnroleeNo = false;
    } else {
      this.getEnroleeNoValidity(value);
    }
  }

  validateEnroleeNo(value) {
    if (value === true) {
      this.isEnroleeNoValid = 'true';
      this.isEnroleeNo = true;
    } else if (value === false) {
      this.isEnroleeNoInvalid = 'true';
      this.isEnroleeNo = false;
    }
  }

  checkClientNo(value: any) {
    if (value === null) {
      this.isClientNoInValid = 'true';
    } else if (value !== null) {
      this.isClientNoValid = 'true';
    }
  }
}
