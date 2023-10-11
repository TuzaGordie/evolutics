import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
 /*  tabs:any = "companyInfo"; */
  constructor(public formService: ServiceService) { }

  ngOnInit(): void {
    
  }
changeTab(tab:any){
  /* this.tabs = tab; */
this.formService.tabChange(tab)
}
}
