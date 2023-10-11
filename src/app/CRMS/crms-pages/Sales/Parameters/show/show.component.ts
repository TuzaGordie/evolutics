import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ParametersShowComponent implements OnInit {

  nbofCriteria:number = 1
  nbofSort:number = 1
  nbofOutput:number = 1
  nbofTable:number = 1
  nbofCreator:number = 1

  constructor() { }

  ngOnInit(): void {
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
}
