import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-client-crms-overview',
  templateUrl: './client-crms-overview.component.html',
  styleUrls: ['./client-crms-overview.component.scss']
})

export class ClientCRMSOverviewComponent implements AfterViewInit {
  @ViewChild('policyHolderCountSummary') policyHolderCountSummary: TemplateRef<any>;
  @ViewChild('clientMovementSummary') clientMovementSummary: TemplateRef<any>;

  pendingClient = 10;
  activeClient = 38;

  clientMovementSummaryTable = [
    {
      'ClientNo': 1343,
      'Client Name': 'James Bond',
      Company: 'N',
      Category: 'A,P',
      'Sub Category': 'A',
      'Created Date': '1-Jan-20',
      Segment: '',
      'Policy Ownership Count': 1,
      'Created by': 'WEBAPP'
    },
    {
      'ClientNo': 1343,
      'Client Name': 'James Bond',
      Company: 'N',
      Category: 'A,P',
      'Sub Category': 'A',
      'Created Date': '1-Jan-20',
      Segment: '',
      'Policy Ownership Count': 1,
      'Created by': 'WEBAPP'
    },
    {
      'ClientNo': 1343,
      'Client Name': 'James Bond',
      Company: 'N',
      Category: 'A,P',
      'Sub Category': 'A',
      'Created Date': '1-Jan-20',
      Segment: '',
      'Policy Ownership Count': 1,
      'Created by': 'WEBAPP'
    },
    {
      'ClientNo': 1343,
      'Client Name': 'James Bond',
      Company: 'N',
      Category: 'A,P',
      'Sub Category': 'A',
      'Created Date': '1-Jan-20',
      Segment: '',
      'Policy Ownership Count': 1,
      'Created by': 'WEBAPP'
    },
    {
      'ClientNo': 1343,
      'Client Name': 'James Bond',
      Company: 'N',
      Category: 'A,P',
      'Sub Category': 'A',
      'Created Date': '1-Jan-20',
      Segment: '',
      'Policy Ownership Count': 1,
      'Created by': 'WEBAPP'
    }
  ]

  clientSummaryYTD = {
    type: 'bar' as ChartType,
    data: {
      labels: ['Prospects b/f', 'Prospects c/f', 'Total Clients b/f', 'Total Clients c/f'],
      datasets: [{
        data: [12500, 17500, 22500, 24500],
        backgroundColor: [
            '#FFFF00',
            '#BF40BF',
            '#B22222',
            '#00FFFF',
        ],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'No of Clients',
            fontStyle: 'bold'
          },
        }],
        xAxes: [{
          gridLines: {
            color: "rgba(0,0,0,0)",
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  }

  activeClientCountSummary = {
    type: 'bar' as ChartType,
    data: {
      labels: ['Agents', 'Policyholders', 'Medical Providers', 'Other providers'],
      datasets: [{
        data: [1000, 6700, 200, 400],
        backgroundColor: [
            '#FFFF00',
            '#BF40BF',
            '#B22222',
            '#00FFFF',
        ],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'No of Clients',
            fontStyle: 'bold'
          },
        }],
        xAxes: [{
          gridLines: {
            color: "rgba(0,0,0,0)",
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  }

  policyHolderCountSummaryChart = {
    type: 'bar' as ChartType,
    data: {
      labels: ['Corporate', 'Individual'],
      datasets: [{
        data: [800, 6000],
        backgroundColor: [
            '#BF40BF',
            '#00ee11',
        ],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'No of Clients',
            fontStyle: 'bold'
          },
        }],
        xAxes: [{
          gridLines: {
            color: "rgba(0,0,0,0)",
          },
          scaleLabel: {
            display: true,
            labelString: 'Client Type',
            fontStyle: 'bold'
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  }
  
  templateModals: {};
  
  constructor(private matDialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.templateModals  = {
      policyHolderCountSummary: this.policyHolderCountSummary,
      clientMovementSummary: this.clientMovementSummary
    }
  }

  openModal(modal){
    this.matDialog.open(this.templateModals[modal]).afterClosed().subscribe(data => {
      console.log(`closed modal ${this.templateModals[modal]} with data:`, data)
    })
  }
}

