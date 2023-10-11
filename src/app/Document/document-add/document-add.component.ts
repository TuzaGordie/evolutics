import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../Services/document.service';
import { Document } from '../../models/document';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {

  document!: Document ;

  REF_NO: any;
  REF_CATEGORY!: any;
  REF_CATEGORY_CODE!: any;
  REF_CATEGORY_STRING!: any;
  COMPANY: any;
  CATEGORY: any;
  SUB_CATEGORY: any;
  FILE: any;
  TITLE: any;
  BRANCH: any;
  SENSITIVITY!: string;
  READONLY!: string;
  BOX_NO: any
  POLICY_CODE: any
  POLICY_NO_SUFFIX: any
  CATEGORY_CODE: any
  DEFAULT_SLA: number = 0;
  MODIFIED_SLA: number = 0;
  REVISED_SLA: number = 0;

  readOnly: any;

  D_DAY!: number;
  D_HOUR!: number;
  D_MIN!: number;

  M_DAY!: number;
  M_HOUR!: number;
  M_MIN!: number;

  private baseURL = environment.apiBaseUrl;

  refCategories: any[] = [];
  refNoValues;
  companies: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];
  branches: any[] = [];
  sensitivities: any[] = [];
  policyCodes: any[] = [];
  
  isCategoryCode = false;
  isFile = false;

  routeParams: any;

  isPolicyNo = false;
  isPolicyNoInvalid = false;
  isRefCatValid = false;
  isRefNo = false;
  isRefNoValid = false;
  isBoxed = false;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };

  fileName?: any;
  file?: any;

  constructor(
    private documentService: DocumentService,
    private http: HttpClient,
    private apiService: ApiService,
    private toaster: UtilityService
    ) { }

  ngOnInit(): void {
    this.getRefCategory();
    this.getCompany();
    this.getCategory();
    this.getBranch();
    this.getSensitivity();
    this.initializeVariables();
  }

  initializeVariables() {
    this.REF_NO = '';
    this.REF_CATEGORY = '';
    this.REF_CATEGORY_CODE = '';
    this.COMPANY = '';
    this.CATEGORY = '';
    this.SUB_CATEGORY = '';
    this.TITLE = '';
    this.BRANCH = '';
    this.BOX_NO = '';
    this.POLICY_CODE = '';
    this.POLICY_NO_SUFFIX = '';
    this.SENSITIVITY = '';
    this.READONLY = '';
    this.fileName = '';
    this.readOnly = '';
  }

  boxVisibility() {
    this.isBoxed = !this.isBoxed;
  }

  getRefCategory() {
    
    this.connection.creating = true;

    this.documentService.getRefCategory().subscribe((data: any) => {
      this.refCategories = data;
      this.connection.creating = false;
    })
  }


  getRefNo() {
    
    this.connection.creating = true;

    this.documentService.getRefNo(this.REF_CATEGORY_CODE, this.REF_NO).subscribe((data: any) => {
      this.refNoValues = data;
      this.readOnly = this.refNoValues;
      this.validateRefNo(this.readOnly);
      this.connection.creating = false;
    },
    error => {
      this.connection.creating = false;
      this.connection.error = true;
      this.readOnly = 'Ref no is not valid'
      this.isRefNoValid = true;
    })
  }

  validateRefNo(value) {
    this.isRefNoValid = false;
    if(value === '') {
      this.isRefNoValid = true;
      this.readOnly = 'Ref no is not valid'
    }
  }


  getCategory() {    
    this.connection.creating = true;

    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
      this.connection.creating = false;
    })
  }


  getCompany() {    
    this.connection.creating = true;

    this.documentService.getCompany().subscribe((data: any) => {
      this.companies = data;
      this.connection.creating = false;
    })
  }


  getCategoryCode(categoryCode: any) {
    this.isCategoryCode = true;
    this.CATEGORY_CODE = categoryCode;

     if (this.isCategoryCode) {
       this.getSubCategory();
     }
  }


  getSubCategory() {    
    this.connection.creating = true;

    this.documentService.getSubCategory(this.CATEGORY_CODE).subscribe((data: any) => {
      this.subCategories = data;
      this.connection.creating = false;
      this.isCategoryCode = false;
    })
  }


  getBranch() {    
    this.connection.creating = true;

    this.documentService.getBranch().subscribe((data: any) => {
      this.branches = data;
      this.connection.creating = false;
    })
  }

  getSensitivity() {    
    this.connection.creating = true;

    this.documentService.getSensitivity().subscribe((data: any) => {
      this.sensitivities = data;
      this.connection.creating = false;
    })
  }

  getPolicyCode() {    
    this.connection.creating = true;

    this.apiService.get(this.baseURL + `/rest/policy/code/policy/no/${this.REF_NO}`).subscribe((data: any) => {
      this.policyCodes = data;
      this.connection.creating = false;
    })
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }


  onChange(file: any) {
    this.FILE = file.files[0];
    this.fileName = file.files[0].name;
    this.isFile = false;
  }
  

  uploadDocument() {

    this.connection.creating = true;

    if(this.FILE === undefined) {
      this.isFile = true;
      return;
    }

    if(this.REF_CATEGORY_CODE === '') {
      this.isRefCatValid = true;
      return;
    }

    if(this.REF_NO === '') {
      this.isRefNo = true;
      return;
    }

    if(this.isRefNoValid) {
      return
    }

    if(this.isPolicyNo) {
      if(this.POLICY_CODE === '') {
        this.isPolicyNoInvalid = true;
        return;
      }
    }

    this.document = new Document();
    this.document.boxNo = this.BOX_NO;
    this.document.branch = this.BRANCH;
    this.document.category = this.CATEGORY;
    this.document.company = this.COMPANY;
    this.document.defaultSLA = this.DEFAULT_SLA;
    this.document.modifySLA = this.MODIFIED_SLA;
    this.document.refCat = this.REF_CATEGORY_CODE;
    this.document.revisedSLA = this.REVISED_SLA;
    this.document.sensitivity = this.SENSITIVITY;
    this.document.subCategory = this.SUB_CATEGORY;
    this.document.title = this.TITLE;
    this.document.refNo = this.REF_NO;
    this.document.policyCode = this.POLICY_CODE;

    let document = JSON.stringify(this.document);
    console.log(this.document)

    this.documentService.uploadDocument(document, this.FILE).subscribe((data: any) => {
      this.connection.creating = false;
      this.toaster.notify('Document uploaded successfully', 1, 5000, 'Success');
      this.initializeVariables();
    });
  }

  findRouteParameter(param: string) {
    console.log(param)
    
    param = this.REF_CATEGORY

    if(param === 'Policy No') {
      this.routeParams = 'find-policy';
      this.REF_CATEGORY_CODE = 'POL'
    }
    else if(param === 'Enrolee No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'ENR'
    }
    else if(param === 'Client Number') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'CLI'
    }
    else if(param === 'Provider No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'PRO'
    }
    else if(param === 'Claim No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'CLA'
    }
    else if(param === 'Asset No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'ASS'
    }
    else if(param === 'Quote No') {
      this.routeParams = 'quotation-desk/find-quotation';
      this.REF_CATEGORY_CODE = 'QUO'
    }
    else if(param === 'Payment ID') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'PAY'
    }
    else if(param === 'Transaction No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'TRA'
    }
    else if(param === 'Agent No') {
      this.routeParams = 'agent-desk/find-main-agent';
      this.REF_CATEGORY_CODE = 'AGT'
    }
    else if(param === 'User') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'USR'
    }
    else if(param === 'Group No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'GRO'
    }
    else if(param === 'Satetement No') {
      this.routeParams = 'find-client';
      this.REF_CATEGORY_CODE = 'SN'
    }

    if(this.REF_CATEGORY_CODE === 'POL'){
      this.isPolicyNo = true;
    } else {
      this.isPolicyNo = false;
    }

    if(this.REF_CATEGORY_CODE !== '') {
      this.isRefCatValid = false;
    }
  }


}
