import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class DocumentUserComponent implements OnInit {

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
  private nbofappr: number=1;
  private nbofbd: number = 1;
  private nbofpl: number = 1;
  private nbofpal: number = 1;
  private nbofqal: number = 1;
  private nbofdva: number = 1;
  private nbofpac: number = 1;

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
    this.templateMenu.forEach(m=>{ m.active = (m.name === name)? true : false})
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

  apprCounter() {
    return new Array(this.nbofappr);
  }

  apprInc() {
    this.nbofappr = this.nbofappr + 1
  }


  bdCounter() {
    return new Array(this.nbofbd);
  }

  bdInc() {
    this.nbofbd = this.nbofbd + 1
  }

  plCounter() {
    return new Array(this.nbofpl);
  }

  plInc() {
    this.nbofpl = this.nbofpl + 1
  }

  palCounter() {
    return new Array(this.nbofpal);
  }

  palInc() {
    this.nbofpal = this.nbofpal + 1
  }
  qalCounter() {
    return new Array(this.nbofqal);
  }

  qalInc() {
    this.nbofqal = this.nbofqal + 1
  }
  dvaCounter() {
    return new Array(this.nbofdva);
  }

  dvaInc() {
    this.nbofdva = this.nbofdva + 1
  }

  pacCounter() {
    return new Array(this.nbofpac);
  }

  pacInc() {
    this.nbofpac = this.nbofpac + 1
  }

}
