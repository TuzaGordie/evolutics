import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PDService } from '../../../policy-desk-extras/policy-desk.service';
import { PolicyEndpointsService } from '../../../policy-desk-extras/policy-endpoints.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-generate-document',
  templateUrl: './generate-document.component.html',
  styleUrls: [
    './generate-document.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class GeneratePolicyDocumentComponent implements OnInit {

  policyNo: any;
  policyCode: any;
  policyNoSuffix: any;

  cols: string[] = ['Document', 'How Delivered', 'Normal Trigger'];
  docs: any = [];

  loading: boolean =  false;

  constructor(
    public pdS: PDService,
    public policyDeskService: PolicyEndpointsService,
    public dialogRef: MatDialogRef<GeneratePolicyDocumentComponent>,
    private toasterService: UtilityService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.policyNo = this.activatedRoute.snapshot.params.number;
    this.policyCode = this.activatedRoute.snapshot.params.code;
    this.policyNoSuffix = this.activatedRoute.snapshot.params.suffix;
    this.getPolicyDocumentValues();
    console.log(this.policyCode, this.policyNo, this.policyNoSuffix)
  }

  close() {
    this.dialogRef.close();
  }

  getPolicyDocumentValues() {
    this.policyDeskService.getPolicyDocumentValues().subscribe((data) => {
      this.docs = data;
      console.log(data);
    });
  }

  generatePolicyDocument(documentCode) {

    this.loading = true;
    this.toasterService.info('Please Wait')
    this.policyDeskService.generatePolicyDocument(documentCode, this.policyCode, this.policyNo, this.policyNoSuffix).subscribe((data) => {
      this.loading = false;
      this.close();
      this.toasterService.notify('Correspondence Generated', 1, 5000, 'Success');
    });
  }

}
