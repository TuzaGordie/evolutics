import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ClientgroupIndexComponent implements OnInit {
  loadingCompanies = false;
  loadingClientGroups = false;

  clientGroupsList: any[] = [];
  companiesList: any[] = [];

  company: any;
  clientGroup: any;
  constructor(public findClientsService: FindClientsService, private router: Router) { }

  ngOnInit(): void {
    this.setCompaniesList();
  }

  setClientGroupsList(companyCode: string){
    this.loadingClientGroups = true;
    this.findClientsService.getClientGroupsList(companyCode)
      .subscribe(
        (res: any[]) => {
          this.clientGroupsList = res;
          this.loadingClientGroups = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching client groups list", err);
          this.loadingClientGroups = false;
        }
      )
  }

  setCompaniesList(){
    this.loadingCompanies = true;
    this.findClientsService.getCompaniesList()
      .subscribe(
        (res: any[]) => {
          console.log(JSON.stringify(res));
          this.companiesList = res;
          this.loadingCompanies = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching companies list", err);
          this.loadingCompanies = false;
        }
      )
  }

  onCompaniesChange(){
    this.clientGroupsList = [];
    this.clientGroup = null;
    this.setClientGroupsList(this.company?.code)
  }

  get enableShow(){
    return this.company && this.clientGroup;
  }

  show(){
    if (!this.enableShow) return;
    const company = JSON.stringify(this.company);
    const clientGroup = JSON.stringify(this.clientGroup);
    this.router.navigate(["/crms/client-group/show"], {queryParams: {company, clientGroup}})
  }
}
