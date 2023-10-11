import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class CRMSClientSearchComponent implements OnInit {

  clientInfoList:any = []

  constructor(
    public findClientService: FindClientService,
    public router:Router,
    private utilityService: UtilityService,
  ) { }


  ngOnInit(): void {
console.log("client search",this.findClientService.searchedData)
this.clientInfoList = this.findClientService.searchedData;
    /* this.setClientInfo() */
  }

  viewInfo(clientNo: string){
    console.log("clicked client with Client Number:", clientNo)
    this.findClientService.getClientList(clientNo).subscribe(
      (res: any) => {
        if (!res){
          console.log("Error fetching data for the client: " + clientNo, "returned value: " + res);
          this.utilityService.notify("Error fetching data for the client you clicked: " + clientNo, 0)  
          return;
        }
        this.findClientService.clientInfo = res
        console.log("client search data", this.findClientService.clientInfo )
        this.router.navigate(['/crms/view-client'], { queryParams: {clientNo:  this.findClientService.clientInfo.clientNo}})
      },
      (err: HttpErrorResponse) => {
        console.log("Error fetching data for client with Client Number: " + clientNo, err);
        this.utilityService.notify("Error fetching data for client with Client Number: " + clientNo, 0);
      }
      )
    
  }

}
