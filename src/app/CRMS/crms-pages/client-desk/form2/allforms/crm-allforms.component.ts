import { Component, OnInit } from '@angular/core';
import { Form2Service } from '../form2.service';

@Component({
  selector: 'app-crm-allforms',
  templateUrl: './crm-allforms.component.html',
  styleUrls: ['./crm-allforms.component.scss']
})
export class CRMSAllformsComponent implements OnInit {

  constructor(public allFormService: Form2Service) { }

  ngOnInit(): void {
  }
  changeTab(tab:any){
  this.allFormService.tabChange(tab)
  }
}
