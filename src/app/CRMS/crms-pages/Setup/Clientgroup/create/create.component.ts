import { configForms } from './../../../../../Shared/models/form.class';
import { UtilityService } from 'src/app/Services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ClientgroupCreateComponent implements OnInit {
  loadingClientBands = false;

  clientGroupingForm: FormGroup;
  clientGroupAttributesForm: FormArray = new FormArray([]);

  companiesList: any[];
  clientBandsList: any[];
  customerAttributesList: any[];
  conditionsList: any[];
  generalizationsList: any[];

  constructor(public findClientsService : FindClientsService, public fb:FormBuilder,public uS:UtilityService) { }

  ngOnInit(): void {
    this.createClientGroupingForm()
    this.createCustomerAttributesForm()
    this.setCompaniesList();
    this.setCustomerAttributesList();
    this.setConditionsList();
  }

  createClientGroupingForm(){
    this.clientGroupingForm = new FormGroup({
      clientGroup: configForms.default(""),
      description: configForms.default(""),
      company: configForms.required(""),
      clientBand: configForms.required(""),
      generalization: configForms.default(""),
      id: configForms.default("")
    })
  }

  createCustomerAttributesForm(){
    this.clientGroupAttributesForm = new FormArray([])
    this.clientGroupAttributesForm.controls.push(new FormGroup({
      customerAttribute:  configForms.default(""),
      condition1:  configForms.default(""),
      condition2: configForms.default(""),
      value1:  configForms.default(""),
      value2:  configForms.default(""),
    }))
  }

  addNewAttributesLine(){
    this.clientGroupAttributesForm.controls.push(new FormGroup({
      customerAttribute:  configForms.default(""),
      condition1:  configForms.default(""),
      condition2:  configForms.default(""),
      value1: configForms.default(""),
      value2: configForms.default("")
    }))
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

  setClientBandsList(){
    this.loadingClientBands = true;
    const { company } = this.clientGroupingForm.value
    this.findClientsService.getClientBands(company)
      .subscribe(
        (res: any[]) => {
          this.clientBandsList = res;
          this.loadingClientBands = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching client bands list", err)
          this.loadingClientBands = false;
        }
      )
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

  onCompaniesChange(){
    this.setClientBandsList()
  }




  // {
  //   "clientGrouping": {
  //     "clientBand": "string",
  //     "clientGroup": "string",
  //     "company": "string",
  //     "description": "string",
  //     "generalization": "string",
  //     "id": 0
  //   },
  //   "clientGroupingAttributes": [
  //     {
  //       "auth": true,
  //       "authBy": "string",
  //       "authOn": "2022-04-18T09:14:12.547Z",
  //       "clientGroupCode": "string",
  //       "condition1": "string",
  //       "condition2": "string",
  //       "customerAttribute": "string",
  //       "description": "string",
  //       "id": 0,
  //       "setupClientGroupingId": 0,
  //       "value1": "string",
  //       "value2": "string"
  //     }
  //   ]
  // }

  async submitClient() {
    console.log("Picking Values"+this.clientGroupingForm.controls['description'].value);
    let data = {
      clientGrouping: {
        description: this.clientGroupingForm.controls['description'].value,
        clientBand: this.clientGroupingForm.controls['clientBand'].value,
        clientGroup: this.clientGroupingForm.controls['clientGroup'].value,
        company: this.clientGroupingForm.controls['company'].value,
        generalization: this.clientGroupingForm.controls['generalization'].value,
        id: this.clientGroupingForm.controls['id'].value,
      },
      clientGroupingAttributes: this.clientGroupAttributesForm.value
    };

    this.findClientsService.submitClientGroupSegment(data).then((res) => {
        console.log("RESPONSE BODY FOR CLIENT GROUPING SEGMENT"+ JSON.stringify(res));
        if (res.status === 200) {
          this.uS.info(res.status, 1);
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
