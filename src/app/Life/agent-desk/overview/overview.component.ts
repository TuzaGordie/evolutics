import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import { FindMainAgentService } from '../find-agent/find-main-agent/service/find-main-agent.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', 'overview.component.css']
})
export class OverviewComponent implements OnInit {
  production = {}
  agentNo: string;
  agentName: string;
  productClasses: any = [];

  public barChartData:ChartDataSets[]= [{
    data: [], label:'Total Production'
  },]  

  public barChartOptions:ChartOptions = {
    responsive:true,
    plugins: {
      datalabels: {
        display: false
      }
    }  
  }

  public barChartLabels:Label[];

  public barChartLegend = true;
  public chartColors = [{backgroundColor:['#fec55f','#7775ff', '#69cdcd', '#ff0000']}]

  public barChartType:ChartType ='bar';
  constructor(
    private agentService: FindMainAgentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParamMap.get('agentNo')
    this.agentName= this.route.snapshot.queryParamMap.get('agentName')
    this.setData()
  }

  setData(){
    this.setProductClasses()
  }

  setProductClasses(){
    this.agentService.getProductClasses().subscribe(
      res => {
        this.productClasses = res;
        this.setTotalProduction()
      }
    )
  }

  setTotalProduction(){
    this.agentService.getProduction(this.agentNo).subscribe(
      res => { 
        this.production = res
        this.barChartLabels = Object.keys(this.production).map(code => this.labelCodeToText(code))
        this.barChartData[0].data = [...Object.values(this.production)]
      }
    )
  }

  labelCodeToText(code){
    return this.productClasses.find(product => product.code == code )?.title
  }
}
