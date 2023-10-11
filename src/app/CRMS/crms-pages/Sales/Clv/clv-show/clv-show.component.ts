import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-clv-show',
  templateUrl: './clv-show.component.html',
  styleUrls: ['./clv-show.component.scss']
})
export class CLVShowComponent implements OnInit {
  reportForm:FormGroup=new FormGroup({})
  productGroupList:any=[];
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
