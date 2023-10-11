import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ClientgroupShowComponent implements OnInit {
  loadingClientBands = false;

  company: any;
  clientGroup: any;

  clientGroupingForm: FormGroup;
  customerAttributesForm: FormArray;

  companiesList: any[];
  clientBandsList: any[];
  customerAttributesList: any[];
  conditionsList: any[];

  constructor(private findClientsService: FindClientsService) { }

  ngOnInit(): void {
    this.company = history.state.company
    // this.clientGroup = history.state.clientGroup;
    console.log("UPDATE ALL"+this.company);

    this.createForms()
    this.setForms()
    this.setCompaniesList();
    this.setCustomerAttributesList();
    this.setConditionsList();
  }

  createForms(){
    this.clientGroupingForm = new FormGroup({
      clientGroup: new FormControl(null),
      description: new FormControl(null),
      company: new FormControl(null),
      clientBand: new FormControl(null)
    })
    this.customerAttributesForm = new FormArray([])
  }

  setClientGroupingForm({clientGroup, description, company, clientBand}){
    this.clientGroupingForm.patchValue({
      clientGroup, description, company, clientBand
    })
    console.log('this.clientGroupingForm', this.clientGroupingForm)
    this.setClientBandsList();
  }

  setCustomerAttributesForm(attributes){
    attributes.forEach(attr => {
      this.customerAttributesForm.push(new FormGroup({
        customerAttribute: new FormControl(attr.customerAttribute),
        condition1: new FormControl(attr.condition1),
        condition2: new FormControl(attr.condition2),
        value1: new FormControl(attr.value1),
        value2: new FormControl(attr.value2),
      }))
    })
  }

  setForms(){
    //const {id, company} = this.company;

    console.log(this.company+"COMPNAY OBJECT");
    // this.findClientsService.getClientGrouping(id, company)
    //   .subscribe(
    //     (res: any) => {
    //       this.setClientGroupingForm(res?.clientGrouping);
    //       this.setCustomerAttributesForm(res?.clientGroupingAttributes)
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log("Error fetching client grouping with id:" + id + " and companyCode:" + company, err)
    //     }
    //   )
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
}
