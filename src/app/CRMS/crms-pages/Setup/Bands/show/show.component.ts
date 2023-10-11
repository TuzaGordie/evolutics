import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class BandsShowComponent implements OnInit {
  clientBandForm: FormGroup

  company: any;
  clientBand: any;

  clientBandCompaniesList: any[];
  lifeCyclesList: any[];
  clientSegmentsList: any[];
  clvGroupsList: any[]

  loadingCompanies = false;
  loadingLifeCycles = false;
  loadingSegments = false;
  loadingClvGroups = false;

  constructor(
    public findClientsService : FindClientsService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.company = JSON.parse(this.route.snapshot.queryParamMap.get("company"));
    this.clientBand = JSON.parse(this.route.snapshot.queryParamMap.get("clientBand"));

    this.setClientBandForm()
    this.setCompaniesList()
    this.setLifeCyclesList()
    this.setSegmentsList()
  }

  setClientBandForm(){
    const {description, company, clientLifeCycle, clientSegment, clvGroup, id} = this.clientBand;

    this.clientBandForm = new FormGroup({
      description: new FormControl(description),
      company: new FormControl(company),
      clientLifeCycle: new FormControl(clientLifeCycle),
      clientSegment: new FormControl(clientSegment),
      clvGroup: new FormControl(clvGroup),
      id: new FormControl(id),
    })
  }

  setCompaniesList(){
    this.loadingCompanies = true;
    this.findClientsService.getCompaniesList()
      .subscribe(
        (res: any[]) => {
          this.clientBandCompaniesList = res;
          this.loadingCompanies = false;
          this.setClvGroupsList();
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching client band companies list", err)
          this.loadingCompanies = false;
        }
      )
  }

  setLifeCyclesList(){
    this.loadingLifeCycles = true;
    this.findClientsService.getLifeCyclesList()
      .subscribe(
        (res: any[]) => {
          this.lifeCyclesList = res;
          this.loadingLifeCycles = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching lifecycles list", err)
        }
      )
  }

  setSegmentsList(){
    this.loadingSegments = true;
    this.findClientsService.getSegmentsList()
      .subscribe(
        (res: any[]) => {
          this.clientSegmentsList = res;
          this.loadingSegments = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching segments list", err);
          this.loadingSegments = false;
        }
      )
  }

  setClvGroupsList(){
    this.loadingClvGroups = true;
    this.findClientsService.getClvGroupsList(this.clientBandForm.value.company)
      .subscribe(
        (res: any[]) => {
          this.clvGroupsList = res;
          this.loadingClvGroups = false;
        },
        (err: HttpErrorResponse) => {
          console.log("Error fetching clv groups list", err);
          this.loadingClvGroups = false;
        }
      )
  }

  onCompaniesChange(){
    this.setClvGroupsList()
  }
}

