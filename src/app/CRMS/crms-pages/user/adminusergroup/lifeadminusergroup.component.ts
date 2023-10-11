import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lifeadminusergroup',
  templateUrl: './lifeadminusergroup.component.html',
  styleUrls: ['./lifeadminusergroup.component.scss']
})
export class CRMSadminusergroupComponent implements OnInit {

  operation: string = ''
  tab: string = 'Basic'

  templateMenu: {name: string,active: boolean} [] =  [
    {name:'Basic',active: true}, 
    {name:'Batches',active: false}, 
    {name:'Limits',active: false}, 
    {name:'Documents',active: false}
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const oper = params.get('operation')
        this.operation = oper? oper: 'actions';
      }
    )
  }

  activate(name: string) {
    this.templateMenu.forEach(m=>{
      m.active = (m.name === name)? true : false
    }
    )
    this.tab = name
  }

}
