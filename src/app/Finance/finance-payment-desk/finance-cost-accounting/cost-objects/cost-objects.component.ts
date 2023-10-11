import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-objects',
  templateUrl: './cost-objects.component.html',
  styleUrls: ['./cost-objects.component.scss']
})
export class CostObjectsComponent implements OnInit {
  styleCheck = 30
  thead = ['Code',"Name","Line Type","Totalling","Sorting Order","Net Change","Balance to Allocate","Cost SubType","Responsible Person","Block",'New','Blank LIne']
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
        new:'---',
        blank:'---',
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
        new:'---',
        blank:'---',
      },
          ]
  constructor() { }

  ngOnInit(): void {
  }

}

