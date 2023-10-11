import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-email-gateway-form',
  templateUrl: './email-gateway-form.component.html',
  styleUrls: ['./email-gateway-form.component.scss']
})
export class EmailGatewayFormComponent implements OnInit {
  private emailOut: number = 1;
  private emailIn: number = 1;
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }
  

  emailOutCounter() {
    return new Array(this.emailOut);
  }
  emailOutInc() {
    this.emailOut = this.emailOut + 1
  }
  emailInCounter() {
    return new Array(this.emailIn);
  }
  emailInInc() {
    this.emailIn = this.emailIn + 1
  }
}
