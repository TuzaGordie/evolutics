import {Component, OnInit} from '@angular/core';
import {FindClientsService} from '../service/find-clients.service';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class CustomerExplorerIndexComponent implements OnInit {
  reportGroupList: any = [];
  reportList: any = [];
  individual = true;
  corporate = false;

  constructor(public findClientsService: FindClientsService) {
  }

  public barChartData1: ChartDataSets[] = [{

    label: 'Quotes mode',
    data: [600, 600, 300, 40, 80],

    backgroundColor: '#f3c15a',
  },
    {
      label: 'Quotes covered',
      data: [200, 100, 40, 20, 40],

      backgroundColor: '#53ad84'

    }]
  public barChartData: ChartDataSets[] = [{
    data: [120, 340, 80, 20]
  },]

  public barChartOptions: ChartOptions = {
    responsive: true,
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

  public barChartOptions1: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Quotes",
          },
        },
      ]
    },

    title: {
      display: true,
      text: 'Quotation Summary by Product Class'
    },
    legend: {position: "bottom"}
  }


  public barChartLabels: Label[] = ['Active', 'Expired', 'Rejected', 'Converted',
  ];
  public barChartLabels1: Label[] = ['M', 'H', 'S', 'S', 'A'];

  public barChartLegend = true;
  public chartColors = [{backgroundColor: ['#f3c15a', '#e62e2d', '#000000', '#53ad84']}]


  public barChartType: ChartType = 'bar';

  public barChartType1: ChartType = 'bar';

  ngOnInit(): void {
  }

  show(event: any) {
    alert(event);
    if (event == 1) {
      this.individual = true;
      this.corporate = false;
    }
    if (event == 2) {
      this.individual = false;
      this.corporate = false;
    }
  }
}
