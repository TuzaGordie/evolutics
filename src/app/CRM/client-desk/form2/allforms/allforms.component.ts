import { Component, OnInit } from '@angular/core';
import { Form2Service } from '../form2.service';

@Component({
  selector: 'app-allforms',
  templateUrl: './allforms.component.html',
  styleUrls: ['./allforms.component.scss']
})
export class AllformsComponent implements OnInit {

  constructor(public allFormService: Form2Service) { }

  ngOnInit(): void {
  }
  changeTab(tab:any){
  this.allFormService.tabChange(tab)
  }
}
