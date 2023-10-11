import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lifeadminuser',
  templateUrl: './lifeadminuser.component.html',
  styleUrls: ['./lifeadminuser.component.scss']
})
export class CRMSadminuserComponent implements OnInit {

  operation: string = ''
  tab: string = 'Basics'


  templateMenu: {name: string,active: boolean} [] =  [
    {name:'Basics',active: true}, 
    {name:'Limits',active: false}, 
    {name:'Office Schedule',active: false}
  ]

  weekday: string[] = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

  companyalloweddata: string[] = ['']
  branchesalloweddata: string[] = ['']

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

  addcompanydataallowedaccess(){
    this.companyalloweddata.push('')
  }

  addbranchdatallowedaccess(){
    this.branchesalloweddata.push('')
  }

  deletebranchdatallowedaccess(){
    this.branchesalloweddata.pop()
  }

}
