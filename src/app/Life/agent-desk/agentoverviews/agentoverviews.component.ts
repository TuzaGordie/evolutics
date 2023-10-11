import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.pluginService.register(ChartDataLabels);
import { Context } from 'chartjs-plugin-datalabels';



// OLD BEHAVIOR: NOT RECOMMENDED!
declare module 'chartjs-plugin-datalabels' {
  interface Context {
    [key: string]: any;
  }
}
@Component({
  selector: 'app-agentoverviews',
  templateUrl: './agentoverviews.component.html',
  styleUrls: ['./agentoverviews.component.css']
})
export class AgentoverviewsComponent implements OnInit {

  hi: any;
  largearray: any = 40;

  public barChartData: ChartDataSets[] = [{
    data: [20, 14, 24, 44, 64, 84, 92, 124, 210],
    //steppedLine: true,
    lineTension: 0,
    //minBarLength: 20,

  },]
  public barChartData2: ChartDataSets[] = [{
    data: [15, 10, 12, 8, 9, 11, 13, 3, 5, 8, 9, 13],
    //steppedLine: true,
    //lineTension:0,
    minBarLength: 30,

  }]
  public barChartData1: ChartDataSets[] = [{
    data: [120, 340, 70, 40],
    lineTension: 0,
    //    minBarLength: 20,
    barThickness: 20,
    barPercentage: 200,
    hoverBackgroundColor: "black"



  },]

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "black",
        align: "end",
        anchor: 'end',
        padding: 0,
        listeners: {
          leave: function (context: any) {
            context.chart.options.plugins!.datalabels!.display = true;
            context.chart.update();
            //alert ("hi"); //chart.update()
          },
          enter: function (context: any) {
            context.chart.options.plugins!.datalabels!.display = false;
            context.chart.update();
          },
        }
      }
    },

    /*onHover:function(this: Chart, event: MouseEvent, activeElements: Array<{}>):any{
      this.options.plugins!.datalabels!.display = false;  this.update()},*/
    onClick: (event: MouseEvent, activeElements: any): any => {

      //this.update();
      this.largearray.firstLayer = true;
    },
    tooltips: {
      axis: 'x',
      mode: 'nearest',
      enabled: true,
      intersect: true,
    },
    legend: { display: false },
    scales: {


      yAxes: [
        {
          display: true,
          scaleLabel: {
            
            display: true,
            labelString: "No of Agents",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            fontStyle: 'bold',

          },
          ticks: {
            min: 0,
            max: 220,
            stepSize: 10,
          },
          gridLines: {
            tickMarkLength: 10,
            drawTicks: true,
          },


        },

      ],
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            //fontFamily: "'Raleway', arial",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            fontStyle: 'bold',
            labelString: 'Avg Policy Production per Month',

          },
          //distribution:'series',
          gridLines: {
            //tickMarkLength: 20,
            display: false,

          },
          ticks: {
            fontSize: 8,
            maxRotation: 0,
            minRotation: 0,
            labelOffset: 50,
          }
        }]

    },



    title: {
      fullWidth: true,
      fontSize: 18,
      fontFamily: "'Raleway', arial",
      //fontColor | undefined;
      //fontStyle?: string | undefined;
      padding: 20,

      //lineHeight?: number | string | undefined;

      display: false,
      text: 'YTD Quotation Summary By Status'
    }

  }



  public barChartOptions2: ChartOptions = {

    //aspectRatio: 1.2,
    responsive: true,
    // aspectRatio: 0.8,
    // maintainAspectRatio: true,
    plugins: {
      datalabels: {
        display: false
      }
    },

    // onHover: function (event: MouseEvent, activeElements: any): any {
    //   this.data.datasets![0].data![activeElements[0]._index]
    //   this.update()
    // },
    onClick: (event: MouseEvent, activeElements: any) => {

      this.largearray.secondLayer = true
        ;
    },
    legend: { display: false },
    scales: {
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "No of Agents with more than 20 policies achieved",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 12
          },
          ticks: {
            min: 0,
            max: 15,
            stepSize: 5,
          },
        },

      ],
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            //fontFamily: "'Raleway', arial",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            labelString: 'Month',

          },
          //distribution:'series',
          gridLines: {
            tickMarkLength: 20,
            display: false,

          },
          ticks: {
            fontSize: 10,
            maxRotation: 0,
            minRotation: 0,
          }
        }]

    },



    title: {
      fullWidth: true,
      fontSize: 18,
      fontFamily: "'Raleway', arial",
      //fontColor?: ChartColor | undefined;
      //fontStyle?: string | undefined;
      padding: 20,

      //lineHeight?: number | string | undefined;

      display: false,
      text: 'YTD Quotation Summary By Status'
    }

  }

  public barChartOptions1: ChartOptions = {
    responsive: true,
    aspectRatio: 0.8,
    elements: {

    },

    plugins: {
      datalabels: {
        color: "black",
        align: "left",
        padding: 230,
        display: false,
        listeners: {
          leave: function (context: any) {
            console.log(context.dataIndex);
            console.log(context.chart.data.datasets[0].backgroundColor[context.dataIndex]);
            //alert(context.datasetIndex);
            context.chart.update();
            //alert ("hi"); //chart.update()
          },
          enter: function (context: any) {
            context.chart.options.plugins!.datalabels!.display = false;
            context.chart.update();
          },
        }
      }
    },
    onHover: (event: MouseEvent, activeElements: any): any => {

    },

    onClick: (event: MouseEvent, activeElements: any): any => {

      //this.update();
      this.largearray.secondLayer = true;
    },
    tooltips: {
      axis: 'x',
      mode: 'nearest',
      enabled: true,
      intersect: true,
    },
    legend: { display: false },
    scales: {


      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "No of Agents",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14

          },

          ticks: {
            min: 0,
            max: 400,
            stepSize: 100,





          },
          gridLines: {
            tickMarkLength: 10,
            drawTicks: true,
          },


        },

      ],
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            //fontFamily: "'Raleway', arial",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            labelString: 'Avg Policy Production per Month',

          },
          //distribution:'series',
          gridLines: {
            //tickMarkLength: 20,
            display: false,

          },
          ticks: {

            fontSize: 14,
            maxRotation: 0,
            minRotation: 0,
            fontFamily: "'Roboto', sans-ser"
            //labelOffset: 50,






          }
        }]

    },



    title: {
      fullWidth: true,
      fontSize: 18,
      fontFamily: "'Raleway', arial",
      //fontColor?: ChartColor | undefined;
      //fontStyle?: string | undefined;
      padding: 20,

      //lineHeight?: number | string | undefined;

      display: false,
      text: 'YTD Quotation Summary By Status'
    }

  }

  public barChartLabels: Label[] = ['More than 20 policies activated', 'More than 10 but less than 20', 'More than 6 but less than 10',
    'More than 20 policies activated','Exactly 4', 'Exactly 3', 'Exactly 2', 'Exactly 1', 'Exactly 0'];
  public barChartLabels1: Label[] = ['BRD', 'FND', 'AGV', 'BK'];
  public barChartLabels2: Label[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartLegend = true;
  public chartColors1 = [{ backgroundColor: ['#f3bf59', '#787afe', '#e62e2d', '#67d0cf'] }]
  public chartColors2 = [{
    backgroundColor: ['#f3c25d', '#e62e2d', '#e72e9f', '#ec87cd', '#cd98dd',
      '#4f9bcc', '#8d6037', '#3c8064', '#e96471', '#eb8524',
      '#808080', '#8182fe']
  }]

  public chartColors = [{ backgroundColor: ['transparent'], borderColor: ['#e62e61'] }]

  public barChartType: ChartType = 'line';

  public barChartType1: ChartType = 'bar';
  constructor() { }

  ngOnInit(): void {
    this.largearray = {
      firstLayer: false,
      secondLayer: false

    }
  }

  open(whichLayer: any): void {
    this.largearray[whichLayer] = !this.largearray[whichLayer]
  }

}



