

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindRatesService } from '../../service/find-rates.service';

@Component({
  selector: 'app-create-interest-rates',
  templateUrl: './create-interest-rates.component.html',
  styleUrls: ['./create-interest-rates.component.scss']
})
export class CreateInterestRateComponent implements OnInit {

  testList:any=[]
  intRateGroup:any
  CreateIntRateForm: any = new FormGroup({})
  postGenList:any
  errorMessage: any;
  code:any
  postIntRate:any
  tableFormatList: any=[]
  rateGroupList: any;
  tableDataList:any
 





  constructor(public findRatesService : FindRatesService) { }

  ngOnInit(): void {

    this.CreateIntRateForm = new FormGroup({
      code: new FormControl( null),
      dateFrom: new FormControl(null),
      description: new FormControl(null),
      id: new FormControl(0),
      interestGroup: new FormControl(null),
      rate: new FormControl(null),
      table: new FormControl(null),
      tableFormat: new FormControl(null)
     
      
      
      
    })

   
    // "code": "string",
    // "dateFrom": "string",
    // "description": "string",
    // "id": 0,
    // "interestGroup": 0,
    // "rate": "string",
    // "table": "string",
    // "tableFormat": "string"
    
    this.setIntRateGroup();
    this.setTableFormat();
    this.setRateGroup();
    this.setTableData();

    // this.setFormData(this.findRatesService.getCodeList)
    // console.log("formdata", this.CreateIntRateForm.value)
  }


  onKey(event:any) {const inputValue = event.target.value;}

  onSubmit(){
    
    this.findRatesService.submitIntRate(this.CreateIntRateForm.value).subscribe( res => {
      this.postIntRate = res;
      console.log("post", res)
    })

  }



 setIntRateGroup(){
   this.findRatesService.getCodeList("INTRATE_GROUP").subscribe( res => {
     this.intRateGroup = res;
     console.log("interest rate group", res)
   })
 }

 setTableFormat(){
  this.findRatesService.getCodeList("TABLE_FORMAT").subscribe( res => {
    this.tableFormatList = res;
    console.log("interest rate group", res)
  })
}

setRateGroup(){
  this.findRatesService.getCodeList("RATE_GROUP").subscribe( res => {
    this.rateGroupList = res;
    console.log("rate group", res)
  })
}

setTableData(){
  this.findRatesService.getGenRateCategory("Premium").subscribe( res => {
    this.tableDataList = res;
    console.log("interest rate group", res)
  })

}

  // setDurationBasis(){
  //   this.findRatesService.getCodeList("DURATION_CALC_BASIS").subscribe( res => {
  //     this.durationBasisCalc = res;
  //     console.log("Duration Basis ", res)
  //   })
  // }

}
