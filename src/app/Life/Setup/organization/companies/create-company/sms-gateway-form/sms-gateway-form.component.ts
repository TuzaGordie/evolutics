import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sms-gateway-form',
  templateUrl: './sms-gateway-form.component.html',
  styleUrls: ['./sms-gateway-form.component.scss']
})
export class SmsGatewayFormComponent implements OnInit {
   form = {
    companyCode: [null, Validators.required],
    gateWayCode: [null, Validators.required],
    messagePar: [null, Validators.required],
    mobileNo: [null, Validators.required],
    password: [null, Validators.required],
    senderName: [null, Validators.required],
    smsUrl: [null, Validators.required],
    userName: [null, Validators.required],
  };
  emailGateway: FormGroup = this.fb.group({
    companySmsGateway: this.fb.array([this.fb.group(this.form)])
  });
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.setupForm()
  }
  setupForm(): FormArray {
    return this.fb.array([this.emailGateway])
  }

  submitForm() {
    console.log(this.emailGateway.value);
  }
  addMoreGateWay() {
    console.log(this.emailGateway.value)
    this.smsFormArray.push(this.fb.group(this.form));
  }
  get smsFormArray() {
    return this.emailGateway.get("companySmsGateway") as FormArray;
  }
}
