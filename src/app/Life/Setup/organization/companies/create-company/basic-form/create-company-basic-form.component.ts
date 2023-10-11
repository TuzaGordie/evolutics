import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-company-basic-form',
  templateUrl: './create-company-basic-form.component.html',
  styleUrls: ['./create-company-basic-form.component.scss']
})
export class CreateCompanyBasicFormComponent implements OnInit {
  public basicFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }
  setupBasicFormGroup(): FormGroup {


    return this.basicFormGroup = this._formBuilder.group({
      active:[true,Validators.required],
      authBy:[],
      businessLine:[],
      authOn:[],
      commDueTermAgent:[],
      effOn:[],
      existAgentRate:[0,],
      groupConvCurr:["",],
      standardWorkHours:[null,],
      tolerance:[0,],
      yearEndMo:[null,],
      paymentOutwardCode:[],
      ad: [null, Validators.required],
      clientUniqueBasis: [null, Validators.required],
      code: [null, Validators.required],
      coolOffPeriod: [null, Validators.required],
      country: [null, Validators.required],
      defaultCurrency: [null, Validators.required],
      defaultLanguage: [null, Validators.required],
      description: [null, Validators.required],
      directAgentNo: [null, Validators.required],
      hqAddress: [null, Validators.required],
      hqCity: [null, Validators.required],
      hqCountry: [null, Validators.required],
      hqPhone: [null, Validators.required],
      nextPolicyNo: [null, Validators.required],
      redgNo: [null, Validators.required],
      uwValidilityPeriodMo: [null, Validators.required],
      writingAgentCommTable: [null, Validators.required],
      yearEndNo: [null, Validators.required],
    })
  }
}
