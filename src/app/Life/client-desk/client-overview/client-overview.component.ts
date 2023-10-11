import { ClientTableViewComponent } from './client-table-view/client-table-view.component';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements AfterViewInit,OnInit {
  @ViewChild('policyHolderCountSummary') policyHolderCountSummary: TemplateRef<any>;
  // @ViewChild('clientMovementSummary') clientMovementSummary: TemplateRef<any>;

  pendingClient = 10;
  activeClient = 38;

  // clientMovementSummaryTable = [
  //   {
  //     'ClientNo': 1343,
  //     'Client Name': 'James Bond',
  //     Company: 'N',
  //     Category: 'A,P',
  //     'Sub Category': 'A',
  //     'Created Date': '1-Jan-20',
  //     Segment: '',
  //     'Policy Ownership Count': 1,
  //     'Created by': 'WEBAPP'
  //   },
  //   {
  //     'ClientNo': 1343,
  //     'Client Name': 'James Bond',
  //     Company: 'N',
  //     Category: 'A,P',
  //     'Sub Category': 'A',
  //     'Created Date': '1-Jan-20',
  //     Segment: '',
  //     'Policy Ownership Count': 1,
  //     'Created by': 'WEBAPP'
  //   },
  //   {
  //     'ClientNo': 1343,
  //     'Client Name': 'James Bond',
  //     Company: 'N',
  //     Category: 'A,P',
  //     'Sub Category': 'A',
  //     'Created Date': '1-Jan-20',
  //     Segment: '',
  //     'Policy Ownership Count': 1,
  //     'Created by': 'WEBAPP'
  //   },
  //   {
  //     'ClientNo': 1343,
  //     'Client Name': 'James Bond',
  //     Company: 'N',
  //     Category: 'A,P',
  //     'Sub Category': 'A',
  //     'Created Date': '1-Jan-20',
  //     Segment: '',
  //     'Policy Ownership Count': 1,
  //     'Created by': 'WEBAPP'
  //   },
  //   {
  //     'ClientNo': 1343,
  //     'Client Name': 'James Bond',
  //     Company: 'N',
  //     Category: 'A,P',
  //     'Sub Category': 'A',
  //     'Created Date': '1-Jan-20',
  //     Segment: '',
  //     'Policy Ownership Count': 1,
  //     'Created by': 'WEBAPP'
  //   }
  // ]

  clientSummaryYTD:any;
  policyHolderCountSummaryChart:any;
  activeClientCountSummary :any;



  templateModals: {};


  constructor(private matDialog: MatDialog) {

  }
  ngOnInit(): void {
    this.clientSummaryYTDChart();
    this.policyComponent();
    this.activeClientChart();
  }



  ngAfterViewInit(): void {
    this.templateModals  = {
      policyHolderCountSummary: this.policyHolderCountSummary,
     // clientMovementSummary: this.clientMovementSummary
    }
  }

  openModal(modal){
    console.log("MODAL VALUE"+ modal);
    if(modal !== 'clientMovementSummary'){
      this.matDialog.open(this.templateModals[modal]).afterClosed().subscribe(data => {
        console.log(`closed modal ${this.templateModals[modal]} with data:`, data)
      })

    }
  }


  openDialog() {
    const dialogRef = this.matDialog.open(ClientTableViewComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  activeClientChart(){
    const that = this;
    this.activeClientCountSummary = {
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
              beginAtZero: true,
              padding: 10,

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
            ticks: {
              fontSize: 10
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    }
  }
  clientSummaryYTDChart(){
    const that = this;
    this.clientSummaryYTD = {
      type: 'bar' as ChartType,
      data: {
        labels: ['Total Clients b/f', 'Total Clients c/f'],
        datasets: [{
          data: [12500, 17500, 22500, 24500],
          backgroundColor: [
              '#B22222',
              '#00FFFF',
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 10,
            },
            scaleLabel: {
              display: true,
              labelString: 'No of Clients',
              fontStyle: 'bold'
            },
          }],
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              color: "rgba(0,0,0,0)",
            },
            ticks: {
              fontSize: 10
            }
          }]
        },
        legend: {
          display: false,
        },
        onClick: function (e) {
          that.openDialog();
        },
      }
    }
  }

  policyComponent(){
    const that = this;
    this.policyHolderCountSummaryChart = {
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
              beginAtZero: true,
              padding: 10,
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
            },
            ticks: {
              fontSize: 10
            }
          }]
        },
        legend: {
          display: false,
        },
        onClick: function (e) {
          that.openDialog();
        },
      }
    }
  }
}
