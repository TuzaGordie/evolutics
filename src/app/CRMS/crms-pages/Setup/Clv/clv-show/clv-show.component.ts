import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clv-show',
  templateUrl: './clv-show.component.html',
  styleUrls: ['./clv-show.component.scss']
})
export class CLVShowComponent implements OnInit {
  clvForm: FormGroup;
  customerAttributesForm: FormArray;


  company: any;
  clvGroup: any;

  companiesList: any[];
  customerAttributesList: any[];
  conditionsList: any[];

  constructor(
    public findClientsService : FindClientsService,
    public fb:FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.company = JSON.parse(this.route.snapshot.queryParamMap.get("company"))
    console.log("COMPANY"+JSON.stringify(this.company));

    this.clvGroup = JSON.parse(this.route.snapshot.queryParamMap.get("group"));
    this.createForms()
    this.setAllClvGroupsForm()
    this.setClientClvGroupingForm()
    this.setCompaniesList();
    this.setCustomerAttributesList();
    this.setConditionsList();
  }

  createForms(){
    this.clvForm = new FormGroup({
      clvGroup: new FormControl(null),
      description: new FormControl(null),
      company: new FormControl(null),
    })
    this.customerAttributesForm = new FormArray([])
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
    this.findClientsService.getClvCompaniesList()
      .subscribe(
        (res: any[]) => {
          this.companiesList = res;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching companies' list", err)
        }
      )
  }

  setAllClvGroupsForm(){
    this.findClientsService.getClvGroupingsList(this.company.company)
      .subscribe(
        (res: any[]) => {
          console.log("result for"+ JSON.stringify(res));
          if(Array.isArray(res)) {
            res.forEach(attr => {
              this.customerAttributesForm.push(new FormGroup({
                customerAttribute: new FormControl(attr.customerAttribute),
                condition1: new FormControl(attr.condition1),
                condition2: new FormControl(attr.condition2),
                value1: new FormControl(attr.value1),
                value2: new FormControl(attr.value2),
              }))
            })
            this.clvForm.controls['customerAttributesForm'].disable();
          }
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching client grouping  with companyCode:" + this.company.company, err)
        }
      )
  }

  setClientClvGroupingForm(){
    console.log("result for clv group");


    const {id} = this.company;
    const {clvGroup} = this.clvGroup;

    this.findClientsService.getClientClvGrouping(id, clvGroup)
      .subscribe(
        (res: any) => {
          console.log("result for clv group"+ JSON.stringify(res));
          this.clvForm.patchValue({
            clvGroup: res?.clvGroup,
            company: res?.company,
            description: res?.description
          })
        }
      )
  }
}
