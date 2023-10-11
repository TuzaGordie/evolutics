import { Component, OnInit } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
@Component({
  selector: 'app-index-cover-code',
  templateUrl: './index-cover-code.component.html',
  styleUrls: ['./index-cover-code.component.scss']
})
export class IndexCoverCodeComponent implements OnInit {
  coversList:any=[];
  insuranceTypeList:any=[];
  constructor(public findProductService : FindProductService) { }

  ngOnInit(): void {
    this.setCoversList();
    this.setInsuranceTypeList();
  }
  setCoversList(){
    this.findProductService.getCoversList().subscribe( res => {
      this.coversList = res;
      console.log("Covers list",res)
    })
  }
  setInsuranceTypeList(){
    this.findProductService.getInsuranceType('INS_TYPE').subscribe( res => {
      this.insuranceTypeList = res;
      console.log("Insurance Info",res)
    })
  }
}
