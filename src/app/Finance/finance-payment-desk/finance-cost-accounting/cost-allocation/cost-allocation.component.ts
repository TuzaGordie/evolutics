import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cost-allocation',
  templateUrl: './cost-allocation.component.html',
  styleUrls: ['./cost-allocation.component.scss']
})
export class CostAllocationComponent implements OnInit {
  styleCheck = 30
  thead = ['ID',"Level","Variant","Valid From","Valid To","Cost Center","Cost Object","Credit to Cost Type","Blocked",'Comment']
  tdata = [
      { 
        id: '---',
        level: '---',
        variant:'----',
        validFrom:'---',
        validTo:'---',
        costCenter:'---',
        costObject:'---',
        creditCostType:'---',
        block:'---',
        comment:'---',
      },
      { 
        id: '---',
        level: '---',
        variant:'----',
        validFrom:'---',
        validTo:'---',
        costCenter:'---',
        costObject:'---',
        creditCostType:'---',
        block:'---',
        comment:'---',
      },
          ]

  constructor() { }

  ngOnInit(): void {
  }

}
