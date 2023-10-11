import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label, SingleDataSet} from "ng2-charts";

@Component({
  selector: 'app-sales-conversion-report',
  templateUrl: './sales-conversion-report.component.html',
  styleUrls: ['./sales-conversion-report.component.scss']
})
export class SalesConversionReportComponent implements OnInit {

  constructor() {
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: SingleDataSet = [80,20];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = false;
  public pieChartPlugins = [];


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: false,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';


  ngOnInit(): void {
  }

}
