import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FindClientsService } from '../service/find-clients.service';

@Component({
  selector: 'app-overview-show',
  templateUrl: './overview-show.component.html',
  styleUrls: ['./overview-show.component.scss']
})
export class OverviewShowComponent implements OnInit {

  nbofCriteria:number = 1
  nbofSort:number = 1
  nbofOutput:number = 1
  nbofTable:number = 1
  nbofCreator:number = 1
  segmentId: string;
  clientSegmentForm: FormGroup;
  clientSegmentAttributeForm: FormArray;
  conditionsList: any[];
  customerAttributesList: any[];

  constructor(
    private route: ActivatedRoute,
    private findClientsService: FindClientsService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.segmentId = this.route.snapshot.queryParamMap.get('segment');
    console.log(this.segmentId+"Segment Id");
    this.createClientSegmentForm();
    this.createClientSegmentAttributeForm();

    this.setSegmentForms();
    this.setConditionsList();
    this.setCustomerAttributesList();
  }

  criteriaCounter() {
    return new Array(this.nbofCriteria);
  }

  criteriaInc(){
    this.nbofCriteria = this.nbofCriteria + 1
  }

  sortCounter() {
    return new Array(this.nbofSort);
  }

  sortInc(){
    this.nbofSort = this.nbofSort + 1
  }
  outputCounter() {
    return new Array(this.nbofOutput);
  }

  outputInc(){
    this.nbofOutput = this.nbofOutput + 1
  }

  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc(){
    this.nbofTable = this.nbofTable + 1
  }

  creatorCounter() {
    return new Array(this.nbofCreator);
  }

  creatorInc(){
    this.nbofCreator = this.nbofCreator + 1
  }

  createClientSegmentForm(){
    this.clientSegmentForm = this.fb.group({
        id: this.fb.control(null),
        clientSegment: this.fb.control(null),
        description: this.fb.control(null),
      })
  }

  createClientSegmentAttributeForm(){
    this.clientSegmentAttributeForm = this.fb.array([])
  }

  setClientSegmentForm(clientSegmentData){
    console.log("Client Segment show data"+clientSegmentData);
    const {id, clientSegment, description} = clientSegmentData;
    this.clientSegmentForm.patchValue({
      id, clientSegment, description
    })
  }

  setClientSegmentAttributeForm(clientSegmentAttribute){
    if (Array.isArray(clientSegmentAttribute)){
      clientSegmentAttribute.forEach((csa)=>{
        this.clientSegmentAttributeForm.push(this.fb.group({
          id: this.fb.control(csa.id),
          attribute: this.fb.control(csa.attribute),
          condition1: this.fb.control(csa.condition1),
          setupClientSegmentId: this.fb.control(csa.setupClientSegmentId),
          condition2: this.fb.control(csa.condition2),
          value1: this.fb.control(csa.value1),
          value2: this.fb.control(csa.value2),
          segmentCode: this.fb.control(csa.segmentCode),
          customerAttribute: this.fb.control(csa.customerAttribute)
        }))
      })
    }
  }

  setSegmentForms(){
    this.findClientsService.getSegment(this.segmentId)
      .subscribe(
        (res: any) => {
          if (res){
            this.setClientSegmentForm(res?.clientSegment);
            this.setClientSegmentAttributeForm(res?.clientSegmentAttribute);
          }
        },
        (err: HttpErrorResponse) => console.log("Error fetching segment with segment id " + this.segmentId, err)
      )
  }

  setConditionsList(){
    this.findClientsService.getConditionsList()
      .subscribe(
        (res: any[]) => this.conditionsList = res,
        (err: HttpErrorResponse) => console.log("Error fetching conditions list", err)
      )
  }

  setCustomerAttributesList(){
    this.findClientsService.getCustomerAttributesList()
      .subscribe(
        (res: any[]) => this.customerAttributesList = res,
        (err: HttpErrorResponse) => console.log("Error fetching customer attributes list", err)
      )
  }
}
