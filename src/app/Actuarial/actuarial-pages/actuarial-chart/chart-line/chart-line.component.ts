import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {
  lineChartData: ChartDataSets[] = [
    {data: [30, 27, 40, 45, 50, 60], label: 'Performance'},
    {data: [0, 57, 10, 40, 25, 60], label: 'Finance'},
  ];

  lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'transparent'
    },
    {
      borderColor: 'blue',
      backgroundColor: 'transparent'
    }
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType:ChartType = 'line';

  constructor() {
  }

  ngOnInit(): void {
  }

}
 