import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartType } from 'chart.js';
import { UtilityService } from 'src/app/Services/utility.service';
import { AccountsService } from '../../../accounts-extras/accounts.service';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { AccountLedgerService } from '../../account-ledger.service';

@Component({
  selector: 'app-account-ledger-search-results-chart',
  templateUrl: './account-ledger-search-results-chart.component.html',
  styleUrls: ['./account-ledger-search-results-chart.component.scss']
})
export class AccountLedgerSearchResultsChartComponent implements OnInit {
  data;
  query: any = {};
  splices: any[];
  isLoading: boolean = false;

  // chart info
  chartType: ChartType = 'bar';
  chartDatasets;
  chartLabels;
  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 10,
          userCallback: (value) => Number(value).toLocaleString() //commafy the numbers
        },
        scaleLabel: {
          display: true,
          labelString: 'Amount',
          fontStyle: 'bold'
        },
      }],
      xAxes: [{
        // barPercentage: 0.4,
        gridLines: {
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          fontSize: 10,
          autoSkip: false
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return parseInt(tooltipValue).toLocaleString();
        }
      }
    },
    legend: {
      display: false,
    },
    onClick: function (e) {

    },
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) {data, query},
    public utilityService: UtilityService,
    public accountsService: AccountsService,
    private accountLedgerService: AccountLedgerService
  ) {
    this.data = data;
    this.query = query
    this.chartLabels = this.accountLedgerService.getLabels(data, query);
    this.chartDatasets = [{
      data: this.accountLedgerService.getValues(data, query)
    }];
  }

  ngOnInit(): void {
    this.getSplices()
  } 

  showTable(){
    this.utilityService.dialogOpener(
      DataModalComponent,
      {
        minWidth: '50vw',
        data: {
          query: this.query,
        }
      },
      (r) => {}
    )
  }

  getSplices(){
    this.accountsService.getFrequencySplices().subscribe(
      res => this.splices = res
    )
  }

  onSliceChange(){
    this.isLoading = true;
    this.accountsService.getAccountTransAmount(this.query).subscribe(
      res => {
        this.data = res;

        this.chartLabels = this.accountLedgerService.getLabels(this.data, this.query)
        this.chartDatasets = [{
          data: this.accountLedgerService.getValues(this.data, this.query)
        }]
      }
    ).add(() => this.isLoading = false)
  }
}
