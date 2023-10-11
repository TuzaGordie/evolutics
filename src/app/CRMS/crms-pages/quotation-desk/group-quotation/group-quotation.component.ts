import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-group-quotation',
  templateUrl: './group-quotation.component.html',
  styleUrls: ['./group-quotation.component.scss']
})
export class NewGroupQuotationComponent implements OnInit {

  findGroupQuotationForm:any = FormGroup;
  quotationList:any = []
  quotationApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public findQuotationService: FindQuotationService,public router: Router) { }

  ngOnInit(): void {
    this.findGroupQuotationForm = new FormGroup({
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
    console.log(this.findGroupQuotationForm)
 this.router.navigateByUrl('/life/view-quotation')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }


  onCreate(){
    console.log(this.findGroupQuotationForm)
 this.router.navigateByUrl('/life/allform')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

 
    setQuotationList(){
      console.log(this.findGroupQuotationForm.value.quotationNo)
      this.findQuotationService.getQuotationList(this.findGroupQuotationForm.value.quotationNo).subscribe( res => {

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

}
