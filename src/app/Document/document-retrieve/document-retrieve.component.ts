import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../Services/document.service';
import { Document } from '../../models/document';
import { CsvDocument } from '../../models/document';
import { Router } from '@angular/router';
import { ViewportScroller } from "@angular/common";
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-document-retrieve',
  templateUrl: './document-retrieve.component.html',
  styleUrls: ['./document-retrieve.component.scss']
})
export class DocumentRetrieveComponent implements OnInit {

  document!: Document;
  csvDocument!: CsvDocument[];

  REF_NO!: string | '';
  POLICY_CODE!: string | '';
  POLICY_NO_SUFFIX!: string | '';
  REF_CATEGORY!: string | '';
  REF_CATEGORY_CODE!: string | '';
  COMPANY!: string | '';
  CATEGORY!: string | '';
  SUB_CATEGORY!: string | '';
  FILE: any;
  TITLE: string | '';
  BRANCH: any;
  SENSITIVITY!: string | '';
  BOX_NO!: string | '';
  BUS_LINE!: string | '';
  CATEGORY_CODE: any;

  readOnly: any;

  refCategories: any[] = [];
  refNoValues: any[] = [];
  companies: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];
  branches: any[] = [];
  sensitivities: any[] = [];
  policyCodes: any[] = [];
  busLines: any[] = [];
  documents: any[] = [];
  docs: any[] = [];
  csvDocuments: any[] = [];
  csvData: any[]= [];


  routeParams: any;

  isCategoryCode = false;
  isPolicyNo = false;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };

  connectionRetrieve = {
    creating: false,
    error: false
  };

  fileName = 'Retrieved-document.xlsx';

  constructor(private documentService: DocumentService, public router: Router, private scroller: ViewportScroller,) {
    this.TITLE = '';
  }

  ngOnInit(): void {
    this.getRefCategory();
    this.getCompany();
    this.getCategory();
    this.getBranch();
    this.getSensitivity();
    this.getBusLine();
    this.initializeVariables();
  }

  initializeVariables() {
    this.REF_NO = '';
    this.POLICY_CODE = '';
    this.POLICY_NO_SUFFIX = '';
    this.REF_CATEGORY = '';
    this.REF_CATEGORY_CODE = '';
    this.COMPANY = '';
    this.CATEGORY = '';
    this.SUB_CATEGORY = '';
    this.TITLE = '';
    this.BRANCH = '';
    this.BOX_NO = '';
    this.SENSITIVITY = '';
    this.BUS_LINE = '';
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
      this.readOnly = data;
      this.connection.creating = false;
    })
  }


  getCategory() {
    this.connection.creating = true;

    this.documentService.getCategory().subscribe((data: any) => {
      this.categories = data;
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

  getCompany() {
    this.connection.creating = true;

    this.documentService.getCompany().subscribe((data: any) => {
      this.companies = data;
      this.connection.creating = false;
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


  getBusLine() {
    this.connection.creating = true;
    
    this.documentService.getBusLine().subscribe((data: any) => {
      this.busLines = data;
      this.connection.creating = false;
    })
  }

  getPolicyCode() {    
    this.connection.creating = true;

    this.documentService.getPolicyCode(this.REF_NO).subscribe((data: any) => {
      this.policyCodes = data;
      this.connection.creating = false;
    })
  }

  retrieveDocument() {
    this.connectionRetrieve.creating = true;
    this.documentService.retrieveDocument(
      this.REF_CATEGORY_CODE, this.CATEGORY, this.SUB_CATEGORY, this.COMPANY,
      this.BRANCH, this.BUS_LINE, this.SENSITIVITY, this.BOX_NO, this.REF_NO, this.TITLE
    );
  }

  findRouteParameter(param: string) {

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
  }

}