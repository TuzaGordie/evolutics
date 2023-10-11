import { yAxisLabelPipe } from './../../Life/Setup/Rates/general-rates/general-rates-extras/general-rates.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { IDashboardData, ITasksSummary } from './dashboard.interface';
import { DashboardService } from './dashboard.service';
import { environment } from 'src/environments/environment';
import { NavigationComponent } from '../navigation/navigation.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { TranslationService } from 'src/app/Services/translation.service';

declare const $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [`./dashboard.component.scss`],
})
export class DashboardComponent implements OnInit {
  dashboardData: any[] = [];
  tasksSummary: ITasksSummary;
  get user() {
    return environment?.user?.userDetails.username;
  }
  slaLevel: 'Y' | 'G' | 'B' | 'R'; // used to filter the search lists for a particular type of slaLevel
  snoozedTasks: any[] = [];

  lineChartData: ChartDataSets[] = [
    // { data: [60, 57, 40, 45, 50, 60, 62, 62, 80, 0], label: 'Performance' },
    {
      data: [62, 60, 41, 48, 55, 65, 65, 90, null, null, null, null],
      pointRadius: [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
    },
    {
      data: [null, null, null, null, null, null, null, 90, 75, 65, 82, 85],
      label: '',
      pointRadius: [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
    },
  ];

  lineChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  lineChartOptions: ChartOptions = {
    tooltips: {
      filter: function (tooltipItem, data) {
        var label = data.labels[tooltipItem.index];
        if (label == 'Jan') {
          return false;
        } else {
          return true;
        }
      },
    },
    responsive: true,
    elements: {
      line: { tension: 0 },
      point: {
        radius: 7,
        borderWidth: 5,
        pointStyle: 'circle',
        hoverRadius: 4,
        rotation: 0,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(255, 255, 255)',
        hitRadius: 2,
      },
    },
    scales: {
      min: '10',
      max: '100',
      yAxes: [
        {
          ticks: {
            callback: (value, index, ticks) => {
              return value + '%';
            },
            beginAtZero: true,
            max: 100,
            stepSize: 5,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    spanGaps: true,
  };

  lineChartColors: Color[] = [
    { backgroundColor: 'rgba(81,78,245,0.38)' },
    { backgroundColor: 'rgba(227,226,222,0.38)' },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  loading: boolean;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      min: '10',
      max: '100',
      yAxes: [
        {
          ticks: {
            callback: (value, index, ticks) => {
              return value + '%';
            },
            beginAtZero: true,
            max: 100,
          },
          gridLines: {
            display: true,
          },
        },
      ],
    },
  };
  barChartLabels: Label[] = [
    'Completed',
    'Completed Outside',
    'Errors',
    'Escalated by System',
    'Overall',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [80, 80, 70, 65, 58] }];
  barChartColors: Color[] = [
    {
      backgroundColor: [
        'rgb(8, 153, 51)',
        'rgba(166,31,152)',
        'rgba(217, 37, 37)',
        'rgba(0,0,0)',
        'rgba(43, 29, 240)',
      ],
    },
  ];
  @ViewChild('dashboard') dbRef: ElementRef<HTMLDivElement>;
  @ViewChild('navigation') navigationRef: NavigationComponent;
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public uS: UtilityService,
    public tS: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadData();

    console.log('LINE CHART DATA' + this.lineChartData);
    this.uS.stopPl();
  }
  ngAfterViewInit(): void {  
    this.dbRef.nativeElement.addEventListener('click', ({ target }: any) => {
      if (!target.closest('#searchView'))
        this.navigationRef.searchRef.closeSearch();
    });
  }

  openModal(ev: any) {
    console.log('event log' + JSON.stringify(ev));
  }

  async loadData() {
    this.loading = true;
    this.dashboardService
      .getDashboardData(this.user)
      .toPromise()
      .then((r) => {
        this.dashboardData = r;
        this.setTimeOsSla();
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
      });
    this.dashboardService
      .getTasksSummary(this.user)
      .toPromise()
      .then((r) => {
        this.tasksSummary = r;
      });
    this.dashboardService
      .getSnoozedTasks(this.user)
      .toPromise()
      .then((r) => {
        this.snoozedTasks = r;
      });
  }

  setTimeOsSla() {
    this.dashboardData.forEach((task) => {
      this.dashboardService
        .getTimeOsSla(task.wfNo)
        .subscribe((timeOsSla: number) => (task.timeOsSla = timeOsSla));
    });
  }

  showTasksModal(slaLevel) {
    this.slaLevel = slaLevel;
    $('#tasksSearchListModal').modal('toggle');
  }

  showSnoozedTasksModal() {
    $('#snoozedTasksListModal').modal('toggle');
  }

  viewWorkflow(wfNo: string) {
    // if called from within a modal, close the modal
    $('#tasksSearchListModal').modal('hide');
    $('#snoozedTasksListModal').modal('hide');

    this.router.navigate(['workflow-desk/view/index'], {
      queryParams: { wfNo },
      relativeTo: this.activatedRoute,
    });
  }
}
