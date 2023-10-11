import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-cost-center',
  templateUrl: './add-cost-center.component.html',
  styleUrls: ['./add-cost-center.component.scss']
})
export class AddCostCenterComponent implements OnInit {
  styleCheck = 30
  faSave = faSave
  form = this.fb.group({
    code : [''],
    name : [''],
    costSubType : [''],
    totalling : [''],
    lineType : [''],
    resPerson : [''],
    balAtDate : [''],
    sortingOrder:[''],
    blankLine:[''],
    newPage:[''],
    blocked:[''],
    note:[''],
  })
  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
  }

}

