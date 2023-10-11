import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FindQuotationService } from '../../../Life/quotation-desk/service/find-quotation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-quotation-gb',
  templateUrl: './find-quotation-gb.component.html',
  styleUrls: ['./find-quotation-gb.component.scss'],
})
export class FindQuotationGBComponent implements OnInit {
  findQuotationForm: any = FormGroup;
  quotationList: any = [];
  quotationApiNo: any;
  validResult: any = '';
  checkMark = false;
  firstFormGroup: FormGroup = new FormGroup({});
  connection = {
    creating: false,
    error: false,
    searching: false,
  };
  isQuoteNo = false;

  constructor(
    public findQuotationService: FindQuotationService,
    public router: Router,
    public route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      productClassCtrl: ['', Validators.required],
    });

    this.findQuotationForm = new FormGroup({
      quotationNo: new FormControl(
        null,
        null,
        this.getQuoteNoValidity.bind(this)
      ),
      clientNo: new FormControl(null),
      agentID: new FormControl(null),
      statusID: new FormControl(null),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null),
    });
  }

  onNext() {
    if (this.findQuotationForm.value.quotationNo === false) {
      return;
    } else {
      this.router.navigate(['../view-quotation'], {
        relativeTo: this.route,
        queryParams: { quoteNo: this.findQuotationForm.value.quotationNo },
      });
    }
  }

  onSearch() {
    if (this.findQuotationForm.value.quotationNo) {
      this.findQuotationService
        .getQuoteNo(this.findQuotationForm.value.quotationNo)
        .subscribe((res) => {
          this.findQuotationService.searchedData = res;
          this.router.navigateByUrl('/life/quotation-search');
        });
    } else if (this.findQuotationForm.value.phoneNo) {
      this.findQuotationService
        .getFullName(this.findQuotationForm.value.phoneNo)
        .subscribe((res) => {
          this.findQuotationService.searchedData = res;
          this.router.navigateByUrl('/life/quotation-search');
        });
    } else if (this.findQuotationForm.value.email) {
      this.findQuotationService
        .getReffererNo(this.findQuotationForm.value.email)
        .subscribe((res) => {
          this.findQuotationService.searchedData = res;
          this.router.navigateByUrl('/life/quotation-search');
        });
    } else if (this.findQuotationForm.value.createdBy) {
      this.findQuotationService
        .getCreatedByList(this.findQuotationForm.value.createdBy)
        .subscribe((res) => {
          this.findQuotationService.searchedData = res;
          this.router.navigateByUrl('/life/quotation-search');
        });
    }
  }

  setQuotationList() {
    console.log(this.findQuotationForm.value.quotationNo);
    this.findQuotationService
      .getQuotationList(this.findQuotationForm.value.quotationNo)
      .subscribe((res) => {
        this.quotationList = res;
        if (this.quotationList.length > 0) {
          this.findQuotationService.quotationInfo = this.quotationList[0];
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
        console.log('quotationList', res);
      });
  }

  
  getQuoteNoValidity(control: AbstractControl) {
    // this.connection.creating = true;
    // console.log("QUOTE NO "+this.findQuotationForm?.value?.quoteNo);
    return new Promise<any>((resolve) => {
      this.findQuotationService.validate(control.value).subscribe(
        (data: any) => {
          if (data) resolve(null);
          else resolve({ notFound: true });
        },
        (error) => {
          resolve({ notFound: true });
        }
      );
    });
  }
  validateQuoteNo(value) {
    if (value === true) {
      this.validResult = 'true';
    } else if (value === false) {
      this.validResult = 'false';
    }
  }

  setQuotationData(data: any) {
    console.log(this.findQuotationForm.value.quotationNo);
    this.findQuotationService
      .getQuotationList(this.findQuotationForm.value.quotationNo)
      .subscribe((res) => {
        this.quotationList = res;
        if (this.quotationList.length > 0) {
          this.findQuotationService.quotationInfo = this.quotationList[0];
          this.validResult = 'true';
        } else {
          this.validResult = 'false';
        }
        console.log('quotationList', res);
      });
  }

  submit() {
    if (this.findQuotationForm.valid) {
      console.log(this.findQuotationForm.value);
    }
  }

  onShowingNext() {
    if (this.firstFormGroup.controls['productClassCtrl'].value) {
      if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'IM'
      ) {
        this.router.navigate(['../view-quotation-motor'], {
          relativeTo: this.route,
        });
      } else if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'GM'
      ) {
        this.router.navigate(['../view-quotation-motor'], {
          relativeTo: this.route,
        });
      } else if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'HH'
      ) {
        this.router.navigate(['../view-quotation-property'], {
          relativeTo: this.route,
        });
      } else if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'GP'
      ) {
        this.router.navigate(['../view-quotation-property'], {
          relativeTo: this.route,
        });
      } else if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'PM'
      ) {
        this.router.navigate(['../view-quotation-property'], {
          relativeTo: this.route,
        });
      } else if (
        this.firstFormGroup.controls['productClassCtrl'].value.toString() ==
        'CT'
      ) {
        this.router.navigate(['../view-quotation-property'], {
          relativeTo: this.route,
        });
      }
    } else {
      this.onNext();
    }
  }
}
