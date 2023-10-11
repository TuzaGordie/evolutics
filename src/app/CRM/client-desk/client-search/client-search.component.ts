import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {

  clientInfoList:any = []

  constructor(public findClientService: FindClientService,public router:Router) { }


  ngOnInit(): void {
console.log("client search",this.findClientService.searchedData)
this.clientInfoList = this.findClientService.searchedData;
    /* this.setClientInfo() */
  }

  viewInfo(data:any){
    console.log(data)
    this.findClientService.getClientList(data).subscribe(res => {
      let data:any = res
      this.findClientService.clientInfo = data[0]
      console.log("client search data", this.findClientService.clientInfo )
      this.router.navigateByUrl('/life/view-client')
    })
    
  }
}
