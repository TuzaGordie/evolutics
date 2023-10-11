import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-workflow-overview',
  templateUrl: './workflow-overview.component.html',
  styleUrls: ['./workflow-overview.component.css']
})
export class WorkflowOverviewComponent implements OnInit {
  largearray: any = 40;

  public barChartData1:ChartDataSets[]= [
    {
      label: 'Your Performance' ,
      data: [0.4, 0.2, 0.35, 0.15, 0.45, 0.2, 0.4, 0.15, 0.25, 0.3, 0.4, 0.5],
      lineTension: 0,
      backgroundColor:'transparent',
      borderColor: '#f3c15a'
    },
    {
    label: 'Team Performance' ,
      data: [0.2,0.15,0.35,0.05,0.15, 0.25,0.2,0.45,0.3,0.5,0.45,0.15,0.2],
      lineTension: 0,
      backgroundColor:'transparent',
      borderColor:'#53ad84'

    },
    {
      label: 'Top Performer in Team' ,
        data: [0.25,0.15,0.5,0.35,0.05,0.2,0.35,0.2,0.45,0.05,0.15,0.5,0.35],
        lineTension: 0,
        backgroundColor:'transparent',
        borderColor:'#72ffa1'
  
      }
  ] 



  public barChartData2:ChartDataSets[]= [
  {
    label: 'Average Completion Time',
    data: [800,400,750,370,290, 340,480,144,540,608],
  },
  {   
    label: 'SLA',
    data: [109,600,758,375,711,456,325,562,382,721],
  },
] 

public barChartData:ChartDataSets[]= [{
  data: [16, 54, 75, 90, 100, 0] 
},]  

public barChartData3:ChartDataSets[]= [
  {
    type: 'bar',
    label: 'Other Team Members Performance' ,
    data: [249,600,758,375],
    order: 2
  },
  {
    type: 'line',
    lineTension: 0,
    label: 'Your Performance' ,
    data: [220, 220, 220, 220],
    backgroundColor: 'transparent',
    order: 1

  }
] 

public barChartOptions:ChartOptions = {
  responsive:true,
  onClick: (event: MouseEvent, activeElements: any): any => {
    console.log('clicked')
    //this.update();
    this.largearray.firstLayer = true;
  },
  scales: {
    yAxes: [
     {
      display: true,
      scaleLabel: {
       display: true,
       labelString: "No of Workflow",
      },
      ticks: {
        stepSize: 25
      }
     },
    ],
    xAxes: [
     {
      scaleLabel: {
       display: false,
       labelString: "Status Code",
      }, 
      gridLines: {
        display:false
      }
     },
    ],
   },
   
   title: {
    display: true,
    text: 'Team SLA Tracker as at now'
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
      ticks: {
        stepSize: 0.1
      }
     },
    ],
    xAxes: [
      {
        gridLines: {
          display:false
        }
      }
    ]
    
   },
   
   title: {
    display: true,
    text: 'Performance Tracker - Last 12 Months'
  }, 
  legend: {position: "bottom"}
}

public barChartOptions3:ChartOptions = {
  responsive:true,
  scales: {
    yAxes: [
     {
      display: true,
      scaleLabel: {
       display: false,
      },
      ticks: {
        stepSize: 200,
        beginAtZero: true
      }
     },
    ],
    xAxes: [
      {
        gridLines: {
          display:false
        },
        ticks: {
          beginAtZero: false
        }
      }
    ]
    
   },
   
   title: {
    display: true,
    text: 'User SLA Tracker'
  }, 
  legend: {position: "bottom"}
}
public barChartOptions2:ChartOptions = {
  responsive:true,
  onClick: (event: MouseEvent, activeElements: any): any => {
    console.log('clicked')
    //this.update();
    this.largearray.firstLayer = true;
  },
  scales: {
    yAxes: [
     {
      display: true,
      scaleLabel: {
       display: true,
       labelString: "",
      },
      ticks: {
        stepSize: 200,
        suggestedMin: 0
      }
     },
    ],
    xAxes: [
      {
       display: true,
       scaleLabel: {
        display: true,
        labelString: "",
       }, 
       gridLines: {
        display:false
        }
      },
     ],
    
   },
   
   title: {
    display: true,
    text: 'Team SLA Analysis by Workflow Code'
  }, 
  legend: {position: "bottom"}
}


public barChartLabels:Label[] = [ 'Escalated by system', 'Outside SLA', 'Close to SLA', 'Within SLA'
];
public barChartLabels1:Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
public barChartLabels3:Label[] = ['J-Bond', 'P-Parker', 'S-Gold', 'M-Snake'];

public barChartLabels2:Label[] = ['FI', 'DU', 'AP', 'YT'];


public barChartLegend = true;
public chartColors = [{backgroundColor: ['#f3c460', '#e62e30', '#fdf4fb', '#d09edf' , '#e2c5ea', '#66ad9c', '#925cd9',
'#5f0ec7'  ]}]
public chartColors2 = [{backgroundColor: ['transparent', 'transparent'  ], borderColor:['#f3c15a', '#53ad84']}]

public chartColors3 = [{backgroundColor: ['#f3c460', '#f3c460', '#f3c460', '#f3c460']}]

public barChartType:ChartType ='bar';

public barChartType1:ChartType ='line';

public barChartType2:ChartType ='bar';

public barChartType3:ChartType = 'line';


constructor() { }

ngOnInit(): void {
  this.largearray = {
    firstLayer: false,
  }
}
open(whichLayer: any): void {
  this.largearray[whichLayer] = !this.largearray[whichLayer]
}

}





  
  
