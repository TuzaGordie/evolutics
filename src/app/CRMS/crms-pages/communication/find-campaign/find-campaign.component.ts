import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-find-campaign',
  templateUrl: './find-campaign.component.html',
  styleUrls: ['./find-campaign.component.scss']
})
export class FindCampaignComponent implements OnInit {
  reportForm:FormGroup=new FormGroup({})
  productGroupList:any=[];
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
