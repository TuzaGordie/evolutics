import { configForms } from './../../../../../Shared/models/form.class';
import { UtilityService } from 'src/app/Services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-clv-create',
  templateUrl: './clv-create.component.html',
  styleUrls: ['./clv-create.component.scss']
})
export class CLVCreateComponent implements OnInit {
  clvForm: FormGroup;
  customerAttributesForm: FormArray;

  companiesList: any[];
  customerAttributesList: any[];
  conditionsList: any[];
constructor(
  public findClientsService : FindClientsService,
  public fb:FormBuilder,
  private uS:UtilityService) { }

  ngOnInit(): void {
    this.createForms()
    this.setCompaniesList();
    this.setCustomerAttributesList();
    this.setConditionsList();
  }

  createForms(){
    this.clvForm = new FormGroup({
      clvGroup: configForms.default(),
      description: configForms.default(),
      company: configForms.default(),
      customerAttribute: configForms.default(),
      condition1: configForms.default(),
      condition2: configForms.default(),
      value1: configForms.default(),
      value2: configForms.default()
    })

    this.customerAttributesForm = new FormArray([]);
    this.customerAttributesForm.push(new FormGroup({
      customerAttribute: configForms.default(),
      condition1: configForms.default(),
      condition2: configForms.default(),
      value1: configForms.default(),
      value2: configForms.default()
    }));
  }

  setCustomerAttributesList(){
    this.findClientsService.getCustomerAttributesList()
      .subscribe(
        (res: any[]) => {
          this.customerAttributesList = res;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching customer attributes list", err)
        }
      )
  }

  setConditionsList(){
    this.findClientsService.getConditionsList()
      .subscribe(
        (res: any[]) => {
          this.conditionsList = res;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching conditions list", err)
        }
      )
  }

  setCompaniesList(){
    this.findClientsService.getCompaniesList()
      .subscribe(
        (res: any[]) => {
          this.companiesList = res;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching companies' list", err)
        }
      )
  }

  onAddNewAttributesLine(){
    this.customerAttributesForm.push(new FormGroup({
      customerAttribute: configForms.default(),
      condition1: configForms.default(),
      condition2: configForms.default(),
      value1: configForms.default(),
      value2: configForms.default()
    }))
  }

  async submitClient() {
    console.log("Picking Values"+this.clvForm.controls['description'].value);
    let data = {
        clvGroup: this.clvForm.controls['clvGroup'].value,
        company: this.clvForm.controls['company'].value,
        condition1: this.clvForm.controls['condition1'].value,
        condition2: this.clvForm.controls['condition2'].value,
        description: this.clvForm.controls['description'].value,
        value1: this.clvForm.controls['value1'].value,
        value2: this.clvForm.controls['value2'].value
    };

    this.findClientsService.submitCLv(data).then((res) => {
        console.log("RESPONSE BODY FOR CLIENT CLV SEGMENT"+ JSON.stringify(res));
        if (res !== null) {
          this.uS.info(res.clvGroup, 1);
        } else {
          this.uS.info(res.status, 0);
        }
      },
      (err) => {
        this.uS.info('An Error Occured'+ JSON.stringify(err), 0);
      }
    );
  }
}
