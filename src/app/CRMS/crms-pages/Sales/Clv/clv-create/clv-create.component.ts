import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-clv-create',
  templateUrl: './clv-create.component.html',
  styleUrls: ['./clv-create.component.scss']
})
export class CLVCreateComponent implements OnInit {
  reportForm:FormGroup=new FormGroup({})
  productGroupList:any=[];
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
