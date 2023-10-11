import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-find-quotation',
  templateUrl: './find-quotation.component.html',
  styleUrls: ['./find-quotation.component.scss']
})
export class FindQuotationComponent implements OnInit {

  findQuotationForm:any = FormGroup;
  quotationList:any = []
  quotationApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public findQuotationService: FindQuotationService,public router: Router) { }

  ngOnInit(): void {
    this.findQuotationForm = new FormGroup({
      quotationNo: new FormControl(null),
      clientNo: new FormControl(null),
      agentID: new FormControl(null),
      statusID: new FormControl(null),
      productClass: new FormControl(null),
      productCode: new FormControl(null),
      createdBy: new FormControl(null),
      createdDateFrom: new FormControl(null)
      
    })
  }

  onNext(){
    console.log(this.findQuotationForm)
 this.router.navigateByUrl('/life/view-quotation')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

  onSearch(){
    if(this.findQuotationForm.value.quotationNo){
      this.findQuotationService.getQuoteNo(this.findQuotationForm.value.quotationNo).subscribe(res => {

      this.findQuotationService.searchedData = res
        this.router.navigateByUrl('/life/quotation-search')
      })
    }

   else if(this.findQuotationForm.value.phoneNo){
      this.findQuotationService.getFullName(this.findQuotationForm.value.phoneNo).subscribe(res => {

      this.findQuotationService.searchedData = res
        this.router.navigateByUrl('/life/quotation-search')
      })
    }

    else if(this.findQuotationForm.value.email){
      this.findQuotationService.getReffererNo(this.findQuotationForm.value.email).subscribe(res => {

      this.findQuotationService.searchedData = res
        this.router.navigateByUrl('/life/quotation-search')
      })
    }

    else if(this.findQuotationForm.value.createdBy){
      this.findQuotationService.getCreatedByList(this.findQuotationForm.value.createdBy).subscribe(res => {

      this.findQuotationService.searchedData = res
        this.router.navigateByUrl('/life/quotation-search')
      })
    }

  }

  


    setQuotationList(){
      console.log(this.findQuotationForm.value.quotationNo)
      this.findQuotationService.getQuotationList(this.findQuotationForm.value.quotationNo).subscribe( res => {

        this.quotationList = res;
        if(this.quotationList.length > 0){
          this.findQuotationService.quotationInfo = this.quotationList[0]
          this.validResult = "true"
         
        }
        else{
    this.validResult = "false"
        }
        console.log("quotationList",res)
      })
    }

    setQuotationData(data:any){
      console.log(this.findQuotationForm.value.quotationNo)
      this.findQuotationService.getQuotationList(this.findQuotationForm.value.quotationNo).subscribe( res => {

        this.quotationList = res;
        if(this.quotationList.length > 0){
          this.findQuotationService.quotationInfo = this.quotationList[0]
          this.validResult = "true"
         
        }
        else{
    this.validResult = "false"
        }
        console.log("quotationList",res)
      })
      
    }
    submit() {
      if (this.findQuotationForm.valid) {
        console.log(this.findQuotationForm.value);
      }
    }


}
