import { Component, OnInit } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
@Component({
  selector: 'app-index-product-code',
  templateUrl: './index-product-code.component.html',
  styleUrls: ['./index-product-code.component.scss']
})
export class CRMSIndexProductCodeComponent implements OnInit {

  insuranceType:any=[];
  productClass:any=[];
  productS:any=[];
  insuranceTypeList:any=[];
  constructor(public findProductService : FindProductService) { 
    
  }

  ngOnInit(): void {
    this.setInsuranceTypeList();
    this.setInsuranceType();
    this.setProductClass()
    this.setProductS()
  }

  setInsuranceType(){
    this.findProductService.getCodeList('INS_TYPE').subscribe( res => {
      this.insuranceType = res;
      console.log("Insurance Type",res)
    })
  }

  setProductClass(){
    this.findProductService.getCodeList("PRODUCT_CLASS").subscribe( res => {
      this.productClass = res
      console.log("Product Class", res)
    })
  }

  setProductS(){
    this.findProductService.getProductClass("m").subscribe( res => {
      this.productS = res
      console.log("Product Class", res)
    })
  }

  setInsuranceTypeList(){
    this.findProductService.getCodeList('INTEREST_CALC_BASIS').subscribe( res => {
      this.insuranceTypeList = res;
      console.log("Insurance Info",res)
    })
  }

}
