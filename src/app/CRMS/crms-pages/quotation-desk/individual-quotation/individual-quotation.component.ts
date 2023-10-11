import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-individual-quotation',
  templateUrl: './individual-quotation.component.html',
  styleUrls: ['./individual-quotation.component.scss']
})
export class NewIndividualQuotationComponent implements OnInit {

  findIndividualQuotationForm:any = FormGroup;
  quotationList:any = []
  quotationApiNo:any
  validResult:any = ""
  checkMark = false;

  constructor(public findQuotationService: FindQuotationService,public router: Router) { }

  ngOnInit(): void {
    this.findIndividualQuotationForm = new FormGroup({
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
    console.log(this.findIndividualQuotationForm)
 this.router.navigateByUrl('/life/view-quotation')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }


  onCreate(){
    console.log(this.findIndividualQuotationForm)
 this.router.navigateByUrl('/life/allform')
    /* this.findQuotationService.quotationInfo(this.quotationNoForm.value); */
  }

 
    setQuotationList(){
      console.log(this.findIndividualQuotationForm.value.quotationNo)
      this.findQuotationService.getQuotationList(this.findIndividualQuotationForm.value.quotationNo).subscribe( res => {

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
