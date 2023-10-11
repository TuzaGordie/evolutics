import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-clv-index',
  templateUrl: './clv-index.component.html',
  styleUrls: ['./clv-index.component.scss']
})
export class CLVIndexComponent implements OnInit {
  loadingClvGroupings = false;
  loadingCompanies = false;
  groupingsList:any[] = [];
  companiesList:any[] = [];
  company: any;
  group: any;
  constructor(public findClientsService: FindClientsService, private router: Router) { }

  ngOnInit(): void {
    this.setCompaniesList();
  }

  setCompaniesList(){
    this.loadingCompanies = true;
    this.findClientsService.getClvCompaniesList()
      .subscribe(
        (res: any[]) => {
          this.companiesList = res
          console.log("list of Compnanies"+JSON.stringify(this.companiesList));
          this.loadingCompanies = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching clv companies list", err)
          this.loadingCompanies = false;
        }
      )
  }

  setGroupingsList(){
    this.loadingClvGroupings = true;
    this.findClientsService.getClvGroupingsList(this.company?.company)
      .subscribe(
        (res: any[]) => {
          this.groupingsList = res
          this.loadingClvGroupings = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching clv groupings list", err)
          this.loadingClvGroupings = false;
        }
      )
  }

  onCompaniesChange(){
    this.setGroupingsList()
  }

  get enableShow(){
    return this.company && this.group;
  }

  show(){
    if (!this.enableShow) return;
    const company = JSON.stringify(this.company);
    const group = JSON.stringify(this.group);
    this.router.navigate(["crms/clv/show"], {queryParams: {company, group}})
  }
}
