import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
  selector: 'app-quotation-desk-overview',
  templateUrl: './quotation-desk-overview.component.html',
  styleUrls: ['./quotation-desk-overview.component.css']
})
export class QuotationDeskOverviewComponent implements OnInit {

  
  public barChartData1:ChartDataSets[]= [{
    
      label: 'Quotes mode' ,
      data: [600, 600, 300, 40, 80],
      
      backgroundColor:'#f3c15a',
    },
  {
    label: 'Quotes covered' ,
      data: [200, 100, 40, 20, 40],
      
      backgroundColor:'#53ad84'

  }]  
  public barChartData:ChartDataSets[]= [{
    data: [120, 340, 80, 20] 
  },]  

  public barChartOptions:ChartOptions = {
    responsive:true,
    scales: {
      yAxes: [
       {
        display: true,
        scaleLabel: {
         display: true,
         labelString: "Number of Quotes",
        },
       },
      ],
      xAxes: [
       {
        scaleLabel: {
         display: true,
         labelString: "Quote Status",
        },
       },
      ],
     },
     
     title: {
      display: true,
      text: 'YTD Quotation Summary By Status'
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
         labelString: "Number of Quotes",
        },
       },
      ],
      xAxes:[{
        ticks: {
          display: false
        }
      }]
     },
     
     title: {
      display: true,
      text: 'Quotation Summary by Product Class'
    }, 
    legend: {position: "bottom"}
  }
  

  public barChartLabels:Label[] = ['Active', 'Expired', 'Rejected', 'Converted',
 ];
public barChartLabels1:Label[] = ['M', 'H', 'S', 'S', 'A' ];

  public barChartLegend = true;
  public chartColors = [{backgroundColor: ['#f3c15a', '#e62e2d', '#000000', '#53ad84']}]



  public barChartType:ChartType ='bar';
  
  public barChartType1:ChartType ='bar';


  constructor() { }

  ngOnInit(): void {
  }

}
