import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FCInput, IKVP, KVP } from '../../../../../Shared/models/index.model'; 

declare const $;

@Component({
  selector: 'app-register-new-claim',
  templateUrl: './register-new-claim.component.html',
  styleUrls: [
    './register-new-claim.component.scss',
    '../../../policy-desk-comps/policy-desk-layout/policy-desk-layout.component.scss',
  ],
})
export class RegisterNewClaimComponent implements OnInit {
  clientNo: string;
  policyNo: string;
  claimNo: string;
  basicInfo: any;

  tabs: IKVP[] = [
    { key: 'Basic', value: 'bc' },
    { key: 'Document', value: 'doc' },
    { key: 'Estimate', value: 'est' },
  ];
  sTab: IKVP;
  inputs: FCInput[] = [
    new FCInput('Loan Amount'),
    new FCInput('Loan Tenor'),
    new FCInput('Repayment Basis', null, null, 'select'),
    new FCInput('Effective Date'),
    new FCInput('Narration', null, null, 'textarea'),
  ];
  form = new FormGroup(this.pdS.formFieldsFromArr(this.inputs));
  lbls: IKVP[] = [
    new KVP('Policy No:', 'LHG867998'),
    new KVP('Status:', 'Active'),
    new KVP('Currency:', 'NGN'),
  ];
  constructor(
    public pdS: UtilityService,
    public dialogRef: MatDialogRef<RegisterNewClaimComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.open();
    this.pdS.bindFormControlToInputs(this.inputs, this.form);
    this.clientNo = this.data.clientNo;
    this.policyNo = this.data.policyNo;
  }

  close() {
    this.dialogRef.close();
    // if claim was successfully generated route to view-claim after closing modal
    if (this.claimNo){
      // using absolute path here (and not relative) because this is called from within a modal.
      // The relative path to the destination url will vary depending on the url of the parent component
      this.router.navigate(['/life/payment-desk/view-claim'], {queryParams: {claimNo: this.claimNo}})
    }
  }
  save() {
    this.close();
  }
  open(tab?: IKVP) {
    this.sTab = tab || this.tabs[0];
  }

  openTab(tabName, wrapper) {
    if (!this.claimNo) return; // don't open document and estimate tabs until new claim is created

    // indicate active pill
    wrapper
      .querySelectorAll(
        '#pills-basic-tab, #pills-document-tab, #pills-estimate-tab'
      )
      .forEach((tabButton) => tabButton.classList.remove('active'));
    wrapper.querySelector(`#pills-${tabName}-tab`).classList.add('active');

    // display active panel
    wrapper
      .querySelectorAll('#pills-basic, #pills-document, #pills-estimate')
      .forEach((tab) => tab.classList.remove('show', 'active'));
    wrapper.querySelector(`#pills-${tabName}`).classList.add('show', 'active');
  }
}
