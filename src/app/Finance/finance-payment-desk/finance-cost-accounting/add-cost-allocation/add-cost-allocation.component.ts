import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-cost-allocation',
  templateUrl: './add-cost-allocation.component.html',
  styleUrls: ['./add-cost-allocation.component.scss']
})
export class AddCostAllocationComponent implements OnInit {
  styleCheck = 30
  faSave = faSave
  form = this.fb.group({
    id : [''],
    level : [''],
    validFrom : [''],
    validTo : [''],
    variant : [''],
    costTypeRange : [''],
    costCenter : [''],
    costObject:[''],
    creditCost:[''],
    blocked:[''],
    note:[''],
  })
  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
  }


  

}