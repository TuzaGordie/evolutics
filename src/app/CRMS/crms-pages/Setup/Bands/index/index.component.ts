import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class BandsIndexComponent implements OnInit {
  companiesList: any[] = [];
  clientBandsList: any[] = [];
  company: any;
  clientBand: any;
  loadingClientBand = false;
  loadingCompanies = false;

  constructor(public findClientsService: FindClientsService, private router: Router) { }

  ngOnInit(): void {
    this.getCompaniesBandList();
  }

  getCompaniesBandList(){
    this.loadingCompanies = true;
    this.findClientsService.getCompaniesBandList()
      .subscribe(
        (res: any[]) => {
          this.companiesList = res;
          this.loadingCompanies = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching companies list", err)
          this.loadingCompanies = false;
        }
      )
  }

  // setCompaniesList(){
  //   this.loadingCompanies = true;
  //   this.findClientsService.getCompaniesList()
  //     .subscribe(
  //       (res: any[]) => {
  //         this.companiesList = res;
  //         this.loadingCompanies = false;
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log("Error fetching companies list", err)
  //         this.loadingCompanies = false;
  //       }
  //     )
  // }

  setClientBandsList(companyCode: string){
    this.loadingClientBand = true;
    this.findClientsService.getClientBandsList(companyCode)
      .subscribe(
        (res: any[]) => {
          this.clientBandsList = res
          this.loadingClientBand = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching client bands list", err)
          this.loadingClientBand = false;
        }
      )
  }

  onCompaniesChange(){
    this.setClientBandsList(this.company?.code)
  }

  get enableShow(){
    return this.company && this.clientBand;
  }

  show(){
    if (!this.enableShow) return;
    const company = JSON.stringify(this.company);
    const clientBand = JSON.stringify(this.clientBand);
    this.router.navigate(["crms/bands/show"], {queryParams: {company, clientBand}})
  }
}
