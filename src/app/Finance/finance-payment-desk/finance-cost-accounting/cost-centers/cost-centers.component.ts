import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cost-centers',
  templateUrl: './cost-centers.component.html',
  styleUrls: ['./cost-centers.component.scss']
})
export class CostCentersComponent implements OnInit {
  styleCheck = 30
  thead = ['Code',"Name","Line Type","Totalling","Sorting Order","Net Change","Balance to Allocate","Cost SubType","Responsible Person","Block"]
  tdata = [
      { 
        code: '---',
        Name: '---',
        lineType:'----',
        totalling:'---',
        sortingOrder:'---',
        netChange:'---',
        balanceToAllocate:'---',
        costSubtype:'---',
        resPerson:'---',
        block:'---',
      },
      { 
        code: '---',
        Name: '---',
        lineType:'----',
        totalling:'---',
        sortingOrder:'---',
        netChange:'---',
        balanceToAllocate:'---',
        costSubtype:'---',
        resPerson:'---',
        block:'---',
      },
          ]
 
  constructor() { }

  ngOnInit(): void {
  }

}
