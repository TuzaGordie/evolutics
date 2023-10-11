import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-cost-type',
  templateUrl: './add-cost-type.component.html',
  styleUrls: ['./add-cost-type.component.scss']
})
export class AddCostTypeComponent implements OnInit {
  styleCheck = 30
  faSave = faSave
  form = this.fb.group({
    no : [''],
    name : [''],
    type : [''],
    totalling : [''],
    combineEntries : [''],
    accountRange : [''],
    costCenter : [''],
    costObject : [''],
    searchName : [''],
    balanceToAllocate:[''],
    fixedShare:[''],
    blankLine:[''],
    newPage:[''],
    blocked:[''],
    note:[''],

  })
  constructor(public fb:FormBuilder) { }
  ngOnInit(): void {
  }
  check(){
    console.log(this.form.value);
    
  }
}
