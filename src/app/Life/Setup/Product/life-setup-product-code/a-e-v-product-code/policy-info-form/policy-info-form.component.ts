import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProductCode } from '../../product-code-extras/product-code.interface';
@Component({
  selector: 'app-policy-info-form',
  templateUrl: './policy-info-form.component.html',
  styleUrls: ['./policy-info-form.component.scss'],
})
export class PolicyInfoFormComponent implements OnInit {
  @Input('isShow') set _isShow(v: boolean) {
    this.isShow = v;
    if (v) {
      this.form.disable();
    }
  }
  isShow: boolean;
  @Input() isEdit: boolean;
  @Input() isClone: boolean;
  @Input() isCreate: boolean;
  @Input() prodCode: string;
  @Input() product: IProductCode;
  @Input() form: FormGroup;

  policyAndQuoteInfos = [ 
    { label: 'Agent No', name: 'agentNo' },
    { label: 'Agent', name: 'agent' },
    { label: 'Application date', name: 'applicationDate' },
    { label: 'Assured', name: 'assured' },
    { label: 'Beneficiary', name: 'beneficiary' },
    { label: 'Branch', name: 'branch' },
    { label: 'Commencement date', name: 'commencementDate' },
    { label: 'Deductible', name: 'deductible' },
    { label: 'Excess', name: 'excess' },
    { label: 'Life Assured Date of Birth', name: 'lifeAssuredDateOfBirth' },
    { label: 'Life Assured Name', name: 'lifeAssuredName' },
    { label: 'Loan Interest Rate', name: 'loanInterestRate' },
    { label: 'Next Of Kin', name: 'nextOfKin' },
    { label: 'Owner Date of Birth', name: 'ownerDateOfBirth' },
    { label: 'Owner Email', name: 'ownerEmail' },
    { label: 'Owner Name', name: 'ownerName' },
    { label: 'Owner National Insurance No', name: 'ownerNationalInsuranceNo' },
    { label: 'Owner Phone No', name: 'ownerPhoneNo' },
    { label: 'Payee Bank Account', name: 'payeeBankAccount' },
    { label: 'Pencom No', name: 'pencomNo' },
    { label: 'Policy Term', name: 'policyTerm' },
    { label: 'Premium payment freq', name: 'premiumPaymentFreq' },
    { label: 'Premium payment method', name: 'ownerNationalInsuranceNo' },
    { label: 'Premium payment term', name: 'premiumPaymentTerm' },
    { label: 'Sum assured', name: 'sumAssured' },
  ];
  constructor() {}
  ngOnInit(): void {}
}
