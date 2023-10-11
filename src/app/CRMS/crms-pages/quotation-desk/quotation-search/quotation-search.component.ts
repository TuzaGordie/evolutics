import { Component, OnInit } from '@angular/core';
import { FindQuotationService } from '../service/find-quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-search',
  templateUrl: './quotation-search.component.html',
  styleUrls: ['./quotation-search.component.scss']
})
export class QuotationSearchComponent implements OnInit {

  quotationInfoList:any = []

  constructor(public findQuotationService: FindQuotationService, public router:Router) { }

  ngOnInit(): void {

    this.setQuotationInfo()
  }

  setQuotationInfo(){
    this.findQuotationService.getQuotationList2().subscribe( res => {
      this.quotationInfoList = res;
      console.log("quotation Info",res)
    })
  }



  viewInfo(data:any){
    console.log(data)
    this.findQuotationService.getQuotationList(data).subscribe(res => {
      let data:any = res
      this.findQuotationService.quotationInfo = data[0]
      console.log("agesnt search data", this.findQuotationService.quotationInfo )
      this.router.navigateByUrl('/life/view-quotation')
    })
    
  }
}
