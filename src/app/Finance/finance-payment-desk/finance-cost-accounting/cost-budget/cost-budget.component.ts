import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-budget',
  templateUrl: './cost-budget.component.html',
  styleUrls: ['./cost-budget.component.scss']
})
export class CostBudgetComponent implements OnInit {
  thead = ['No',"Name","Jan 2015","Feb 2015","Mar 2015","Apr 2015","May 2015","Jun 2015","Jul 2015",'']
  tdata = [
      { 
        no: '---',
        name: '---',
        month1:'----',
        month2:'----',
        month3:'----',
        month4:'----',
        month5:'----',
        month6:'----',
        month7:'----',
        month8:'----',
      },
      { 
        no: '---',
        name: '---',
        month1:'----',
        month2:'----',
        month3:'----',
        month4:'----',
        month5:'----',
        month6:'----',
        month7:'----',
        month8:'----',
            },
          ]

  constructor() { }

  ngOnInit(): void {
  }

}
