import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { configForms } from '../../../../Shared/models/form.class';
import {
  FCInput,
  IKVP,
  TableCol,
  KVP,
} from '../../../../Shared/models/index.model';
import { PDService } from '../../policy-desk-extras/policy-desk.service';
import { AddDocumentComponent } from './add-document/add-document.component';
import { GeneratePolicyDocumentComponent } from './generate-document/generate-document.component';
import { ActivatedRoute } from '@angular/router';
import { PolicyEndpointsService } from '../../policy-desk-extras/policy-endpoints.service';
import { UtilityService } from 'src/app/Services/utility.service';




@Component({
  selector: 'policy-documents',
  templateUrl: './policy-documents.component.html',
  styles: [],
})
export class PolicyDocumentsComponent implements OnInit {

  policyNo: any;
  policyCode: any;
  policySuffix: any;

  responseValue: any;

  docs: any = [];
  list = [];

  loading: boolean;


  dCols: TableCol[] = [
    new TableCol('Category'),
    new TableCol('Document Title'),
    new TableCol('Document Name'),
    new TableCol('Created By'),
    new TableCol('Created On'),
    new TableCol('Auto'),
    new TableCol('How'),
    new TableCol('Box No'),
    new TableCol('Sum At Risk'),
  ];
  name = 'Mascar Magic';
  inputs: FCInput[] = [
    new FCInput(
      'Document Category Filter',
      undefined,
      configForms.required(),
      'select'
    ),
  ];
  form = new FormGroup(this.toasterService.formFieldsFromArr(this.inputs));
  
    constructor( 
      public activatedRoute: ActivatedRoute,
      private toasterService: UtilityService,
      public policyDeskService: PolicyEndpointsService,
    ) {}

  ngOnInit(): void {
    this.inputs.forEach((x) => {
      x.form = this.form;
      x.formControl = (this.form.get as any)[x.name];
    });
    this.list = this.toasterService.dataGen(
      this.dCols.map((x) => x.f),
      2
    );
    this.getPolicyDocumentValues();
    this.policyNo = this.activatedRoute.snapshot.queryParams.number;
    this.policyCode = this.activatedRoute.snapshot.queryParams.code;
    this.policySuffix = this.activatedRoute.snapshot.queryParams.suffix;
  }
  add() {
    this.toasterService.dialogOpener(
      AddDocumentComponent,
      { height: 'calc(100vw * 0.368)', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }
  gen() {
    this.toasterService.dialogOpener(
      GeneratePolicyDocumentComponent,
      { height: 'calc(100vw * 0.4625)', width: 'calc(100vw * 0.7569)' },
      () => {}
    );
  }

  getPolicyDocumentValues() {
    this.policyDeskService.getPolicyDocumentValues().subscribe((data) => {
      this.docs = data;
      console.log('docs', data);
    });
  }

  generatePolicyDocument(documentCode) {
    this.policyDeskService.generatePolicyDocument(documentCode, this.policyCode, this.policyNo, this.policySuffix).subscribe((data) => {
      this.toasterService.info(`Correspondence ${documentCode} generated successfully`, 1);
      console.log('correspondense', data)
    },
    error => {
      this.toasterService.info('Something went wrong Generated', 0);
    });
  }
}
