import { FindClientModalComponent } from './find-client-modal/find-client-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-group-desk-overview',
  templateUrl: './group-desk-overview.component.html',
  styleUrls: ['./group-desk-overview.component.scss'],
})
export class GroupDeskOverviewComponent implements OnInit {
  public barChartData: ChartDataSets[] = [
    {
      data: [2500, 500, 1400, 1800, 1200, 100, 100, 4000],
      barPercentage: 0.6,
    },
  ];

  public barChartData2: ChartDataSets[] = [
    {
      data: [3500, 3000, 2500, 1000, 2100],
      barPercentage: 0.6,
    },
  ];

  public barChartType: ChartType = 'bar';
  public barChartType2: ChartType = 'bar';
  public barChartLegend = false;
  public barChartLegend2 = false;

  public barChartOptions: ChartOptions;
  public barChartOptions2: ChartOptions;

  public barChartLabels: Label[] = [
    'Active',
    'Terminated',
    'Expired',
    'Pending',
  ];
  public barChartLabels2: Label[] = ['M', 'H', 'S', 'T', 'A'];

  public chartColors = [
    { backgroundColor: ['#056941', '#000000', '#ff0000', '#c98d00'] },
  ];
  public chartColors2 = [
    {
      backgroundColor: ['#e114ae', '#3953ba', '#6e4637', '#ff6803', '#03e2ea'],
    },
  ];

  constructor(private dialog: MatDialog) {
    this.barChartOptions1();
    this.barChartOption2();
  }

  barChartOptions1() {
    const that = this;
    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
              padding: 10,
              stepSize: 1000,
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'No of Groups',
              padding: 20,
              fontSize: 15,
              fontStyle: 'bold',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Status Code',
              padding: 20,
              fontSize: 15,
              fontStyle: 'bold',
            },
          },
        ],
      },
      onClick: function (e) {
        that.openDialog();
      },
    };
  }

  barChartOption2() {
    const that = this;
    this.barChartOptions2 = {
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
              padding: 10,
              stepSize: 1000,
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'No of groups',
              padding: 20,
              fontSize: 15,
              fontStyle: 'bold',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Product Class',
              padding: 20,
              fontSize: 15,
              fontStyle: 'bold',
            },
          },
        ],
      },
      onClick: function (e) {
        that.openDialog();
      },
    };
  }

  openDialog() {
    const dialogRef = this.dialog.open(FindClientModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}






