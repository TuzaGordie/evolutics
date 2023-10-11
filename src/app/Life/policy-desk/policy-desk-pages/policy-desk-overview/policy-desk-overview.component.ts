
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-policy-desk-overview',
  templateUrl: './policy-desk-overview.component.html',
  styleUrls: ['./policy-desk-overview.component.scss'],
})
export class PolicyDeskOverviewComponent implements OnInit {
  public barChartData1: ChartDataSets[] = [
    { label: "Avg Lag Between Cash Payments and Activation (days)",
      data: [8, 4, 7, 3, 9, 4, 8, 4, 4, 8, 7, 8],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#ff0000',
    },
    {
      label: 'SLA',
      data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      lineTension: 0,
      backgroundColor: 'transparent',
      borderColor: '#53ad84',
    },
  ];

  public barChartData2: ChartDataSets[] = [
    {
      lineTension: 0,
      data: [8, 4, 7, 3, 9, 4, 8, 4, 4, 8],
      label: 'YTD Analysis of Activated Policies',
      backgroundColor: 'transparent',
      borderColor: '#f9e3b2',
    },
  ];

  public barChartData: ChartDataSets[] = [
    {
      data: [1500, 100, 600, 800,100,70,50,50,4000],
      barPercentage: 0.2
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    spanGaps: true,

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 10,
            stepSize: 1000,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'No of Policies',
            padding:20,
            fontSize:15,
            fontStyle:'bold'

          },
        },
      ],
      xAxes: [
        {   gridLines : {
          display : false
          },
          scaleLabel: {
            display: true,
            labelString: 'Status Code',
            padding:20,
            fontSize:15,
            fontStyle:'bold'
          },
        },
      ],
    },

    title: {
      display: false,
      text: 'Policy Status Summary at a Report Date',
    },
    legend: { position: 'bottom'
  },
  };
  public barChartOptions1: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
      }
    },
    scales: {
      max: '8',
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 10,
            stepSize: 2,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'No of Days',
            fontSize:15,
            padding:20,
            fontStyle:'bold'
          },
        },
      ],
      xAxes:[
        {
          gridLines : {
            display : false
            },
            scaleLabel: {
              display: true,
              //labelString: 'Avg Lag Between Cash Payments and Activation Date',
              padding:20,
              fontSize:15,
              fontStyle:'bold',
              lineHeight:2

            },
        }
      ]
    },

    title: {
      display: false,
      text: 'Policy Activation History',
    },
    legend: { position: 'bottom' },
  };

  public barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 0,
            stepSize: 2,
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'No of Days',
            fontSize:15,
            padding:15,
            fontStyle:'bold'
          },
        },
      ],
      xAxes: [
        {
          gridLines : {
          display : false
          },
          display: true,
          scaleLabel: {
            lineHeight:2,
            display: true,
            labelString: 'Time Inactivated (Days)',
            fontSize:15,
            padding:20,
            fontStyle:'bold'
          },
        },
      ],
    },

    // title: {
    //   display: true,
    //   text: 'YTD Analysis of Activated Policies',
    // },
    legend: { position: 'bottom' },
  };

  public barChartLabels: Label[] = ['RTI', 'CBA', 'SUR', 'M', 'MP', 'DP', 'D', 'T', 'A'];
  public barChartLabels1: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartLabels2: Label[] = [['Time Spent' ,'before', '2 days'], 'Time for 2 days', ['More than', '30 days before', 'remitting'], ['60 days', 'before', 'remitting'], ['31 days', 'after', 'collection'], ['12 days', 'after colection'], ['Time Spent', 'before 2 days'], ['Time for 2 days'], ['More than 30 days' ,'before remitting', '60 days before remitting']];
  public barChartLegend = false;
  public barChartLegend2 = true;
  public chartColors = [{ backgroundColor: ['#f3c460', '#e62e30', '#f711e0', '#d09edf', '#e2c5ea', '#66ad9c', '#925cd9','#3b07a3','#3b07a3'] }];
  public chartColors2 = [{ backgroundColor: ['transparent', 'transparent'], borderColor: ['#f3c15a', '#53ad84'] }];

  // #eb769e  #f9e3b2
  public barChartType: ChartType = 'bar';

  public barChartType1: ChartType = 'line';

  public barChartType2: ChartType = 'line';

  constructor() {}

  ngOnInit(): void {}
}
