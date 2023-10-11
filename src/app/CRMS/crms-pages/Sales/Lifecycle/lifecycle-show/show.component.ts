import { Component, OnInit } from '@angular/core';
import { FindClientsService } from '../service/find-clients.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class LifecycleShowComponent implements OnInit {
  reportForm:FormGroup=new FormGroup({})
  productGroupList:any=[];
  constructor(public findClientsService : FindClientsService, public fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
