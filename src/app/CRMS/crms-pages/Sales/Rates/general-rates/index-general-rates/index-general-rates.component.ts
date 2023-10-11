import { Component, OnInit } from '@angular/core';
import { FindRatesService } from '../../service/find-rates.service';

@Component({
  selector: 'app-index-general-rates',
  templateUrl: './index-general-rates.component.html',
  styleUrls: ['./index-general-rates.component.scss']
})
export class IndexGeneralRatesComponent implements OnInit {

  testList:any=[]
  rateCategoryList:any=[]
  rateGroupList:any=[]
  rateList:any=[]

  constructor(public findRatesService : FindRatesService) { }

  ngOnInit(): void {
    this.setTestList()
    this.setRateCategory()
    this.setRateGroup()
    this.setRateList()
  }

  setTestList(){
    this.findRatesService.getTestList().subscribe( res => {
      this.testList = res;
      console.log("rate category",res)
    })
  }

setRateCategory(){
  this.findRatesService.getCodeList("RATE_CATEGORY").subscribe( res => {
    this.rateCategoryList = res;
    console.log("rate category", res)
  })
}

setRateGroup(){
  this.findRatesService.getCodeList("RATE_GROUP").subscribe( res => {
    this.rateGroupList = res;
    console.log("rate group", res)
  })
}

setRateList(){
  this.findRatesService.getRateList().subscribe( res => {
    this.rateList = res;
    console.log("rate List", res)
  })
}

}
