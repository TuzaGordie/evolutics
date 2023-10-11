import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-workflows-overview',
  templateUrl: './workflows-overview.component.html',
  styleUrls: ['./workflows-overview.component.scss']
})
export class WorkflowsOverviewComponent implements OnInit {
  public barChartData1:ChartDataSets[]= [{
    
    label: 'Avg Lag Between Cash Payments and Activation Date' ,
    data: [8,4,7,3,9, 4,8,4,4,8, 7, 8],
    lineTension:0,
    backgroundColor:'transparent',
    borderColor: '#f3c15a'
  },
  {
    label: 'SLA' ,
      data: [4,4,4,4,4, 4,4,4,4,4,4,4,4],
      lineTension:0,
      backgroundColor:'transparent',
      borderColor:'#53ad84'
  
  }] 
  
  
  
    public barChartData2:ChartDataSets[]= [{
      lineTension:0,
      data: [8,4,7,3,9, 4,8,4,4,8],
      label: 'YTD Analysis of Activated Policies',
      backgroundColor:'transparent',
      borderColor: '#f9e3b2'
    },
  ] 
  
  public barChartData:ChartDataSets[]= [{
    data: [2500, 500, 1400, 1800, 1200, 100, 100, 5000
    ],
    label: 'Group Status Summary at a Report Date' 
  },]  
  
  public barChartOptions:ChartOptions = {
    responsive:true,
    scales: {
      yAxes: [
       {
        display: true,
        scaleLabel: {
         display: true,
         labelString: "No of Groups",
        },
       },
      ],
      xAxes: [
       {
        scaleLabel: {
         display: true,
         labelString: "Status Code",
        },
       },
      ],
     },
     
     title: {
      display: true,
      text: 'Groups Status Summary at a Report Date'
    }, 
    legend: {position: "bottom"}
  }
  
  public barChartOptions1:ChartOptions = {
    responsive:true,
    scales: {
      yAxes: [
       {
        display: true,
        scaleLabel: {
         display: true,
         labelString: "No of Days",
        },
       },
      ],
      
     },
     
     title: {
      display: true,
      text: 'Groups Activation History'
    }, 
    legend: {position: "bottom"}
  }
  
  public barChartOptions2:ChartOptions = {
    responsive:true,
    scales: {
      yAxes: [
       {
        display: true,
        scaleLabel: {
         display: true,
         labelString: "No of Days",
        },
       },
      ],
      xAxes: [
        {
         display: true,
         scaleLabel: {
          display: true,
          labelString: "Time Inactivated (Days)",
         },
        },
       ],
      
     },
     
     title: {
      display: true,
      text: 'YTD Analysis of Activated Groups'
    }, 
    legend: {position: "bottom"}
  }
  
  
  public barChartLabels:Label[] = [ 'HMN', 'HGN', 'CMA', 'UBA', 'FBN', 'MMM', 'UNB', 'BTN', 'JZN'
  ];
  public barChartLabels1:Label[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  
  public barChartLabels2:Label[] = ['Time Spent before 2 days', 'Time for 2 days', 'More than 30 days before remitting', 
  '60 days before remitting', '31 days after collection', '12 days after colection',
  'Time Spent before 2 days', 'Time for 2 days', 'More than 30 days before remitting', 
  '60 days before remitting',];
  
  
  public barChartLegend = true;
  public chartColors = [{backgroundColor: ['#f3c460', '#e62e30', '#fdf4fb', '#d09edf' , '#e2c5ea', '#66ad9c', '#925cd9',
  '#5f0ec7'  ]}]
  public chartColors2 = [{backgroundColor: ['transparent', 'transparent'  ], borderColor:['#f3c15a', '#53ad84']}]
  
  
                                                                            // #eb769e  #f9e3b2
  public barChartType:ChartType ='bar';
  
  public barChartType1:ChartType ='line';
  
  public barChartType2:ChartType ='line';

  constructor() { }

  ngOnInit(): void {
  }

}
