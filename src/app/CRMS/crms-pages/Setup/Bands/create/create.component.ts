import { UtilityService } from './../../../../../Services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { configForms } from 'src/app/Shared/models/form.class';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class BandsCreateComponent implements OnInit {
  clientBandForm: FormGroup

  clientBandCompaniesList: any[];
  lifeCyclesList: any[];
  clientSegmentsList: any[];
  clvGroupsList: any[]

  loadingCompanies = false;
  loadingLifeCycles = false;
  loadingSegments = false;
  loadingClvGroups = false;

  constructor(public findClientsService : FindClientsService, public fb:FormBuilder,private uS:UtilityService) { }

  ngOnInit(): void {
    this.createClientBandForm()
    this.setCompaniesList()
    this.setLifeCyclesList()
    this.setSegmentsList()
  }

  createClientBandForm(){
    this.clientBandForm = new FormGroup({
      clientBand:configForms.default(""),
      description:configForms.default(""),
      company:configForms.default(""),
      clientLifeCycle:configForms.default(""),
      clientSegment:configForms.default(""),
      clvGroup:configForms.default(""),
      id:configForms.default(""),
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


async submitClient() {
  let data = {
    description: this.clientBandForm.controls['description'].value,
    clientBand: this.clientBandForm.controls['clientBand'].value,
    clientLifeCycle: this.clientBandForm.controls['clientLifeCycle'].value,
    clientSegment: this.clientBandForm.controls['clientSegment'].value,
    clvGroup: this.clientBandForm.controls['clvGroup'].value,
    company: this.clientBandForm.controls['company'].value,
    id: this.clientBandForm.controls['id'].value
  };

  this.findClientsService.submitClientBand(data).then((res) => {
      console.log("RESPONSE BODY FOR CLIENT BAND"+ JSON.stringify(res));
      if (res !== null) {
        this.uS.info(res.clientBand, 1);
      } else {
        this.uS.info("Submission Failed", 0);
      }
    },
    (err) => {
      this.uS.info('An Error Occured'+ JSON.stringify(err), 0);
    }
  );

}
}
