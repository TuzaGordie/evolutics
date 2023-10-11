import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from '../../models/form.class';
import { EChartType, EValueType, IChartConfig } from './visualizer.model';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizerComponent implements OnInit {
  table: Map<string, number[]>;
  data: any[];
  @Input('data') set _data(v: any[]) {
    this.data = v;
  }

  @Input('fields') fields: string[];

  @Input('config') config: IChartConfig;

  chartTypes: EChartType[] = this.uS
    .objectToArray<EChartType>(EChartType)
    .sort();
  @Input('chartTypes') set _chartTypes(v: EChartType[]) {
    this.chartTypes = v || this.uS.objectToArray(EChartType);
    this.chartTypes.sort();
  }

  valueTypes: EValueType[] = this.uS
    .objectToArray<EValueType>(EValueType)
    .sort();
  @Input('valueTypes') set _valueTypes(v: EValueType[]) {
    this.valueTypes = v || this.uS.objectToArray(EValueType);
    this.valueTypes.sort();
  }

  @Input() chartOptions: ChartOptions = {
    responsive: true,
  };

  chartLabels: Label[] = [];
  public chartLegend = true;
  public chartPlugins = [];
  chartData: SingleDataSet = [];
  chartDataSets: ChartDataSets[] = [];

  loading: boolean;

  form = new FormGroup({
    chartType: configForms.required(EChartType.line),
    valueType: configForms.default(EValueType.count),
    axisX: configForms.required(),
    axisY: configForms.default(),
    filterField: configForms.default(),
  });

  get chartType(): EChartType {
    return this.form?.value?.chartType as EChartType;
  }
  get valueType(): EValueType {
    return this.form?.value?.valueType as EValueType;
  }
  get isCount(): boolean {
    return this.valueType == EValueType.count;
  }
  get isRealData(): boolean {
    return this.valueType == EValueType.real_data;
  }
  get isSum(): boolean {
    return this.valueType == EValueType.sum;
  }
  get showValueType() {
    return this.isBar || this.isPie || this.isLine || this.isHorizontalBar;
  }
  get fieldsToPlot() {
    return [this.form.value?.axisX, this.form.value?.axisY];
  }
  showFiller = false;
  constructor(public uS: UtilityService) {}

  ngOnInit(): void {
    this.table = new Map<string, number[]>();
    if (this.data?.length) {
      this.fields = this.fields || Object.keys(this.data[0]);
      for (const field of this.fields) {
        this.table.set(
          field,
          this.data.map((x) => x[field])
        );
      }
      console.log(this.table);
    }
    this.form.controls.chartType.valueChanges.subscribe((r) => {
      this.showChart()
    });
    // this.form.controls.valueType.valueChanges.subscribe((r) => {});
    // this.form.controls.axisX.valueChanges.subscribe((r) => {
    //   if (this.chartType == EChartType.bar) {
    //     this.chartData = [
    //       { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //       { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //     ];
    //   }
    // });
    // this.form.controls.axisY.valueChanges.subscribe((r) => {});
  }

  filterFields = (type: 'y' | 'f' | 'x', list: string[], updater) => {
    // console.log(type, list);
    if (type == 'y') return list?.filter((x) => x != this.form.value?.axisX);
    else if (type == 'f')
      return list || list?.filter((x) => x != this.form.value?.axisX);
    else if (type == 'x')
      return list?.filter((x) => x != this.form.value?.axisY);
    else return null;
  };

  //#region CHART TYPE
  get isBar() {
    return this.chartType == EChartType.bar;
  }
  get isPie() {
    return this.chartType == EChartType.pie;
  }
  get isHorizontalBar() {
    return this.chartType == EChartType.horizontalBar;
  }
  get isLine() {
    return this.chartType == EChartType.line;
  }
  get isScatter() {
    return this.chartType == EChartType.scatter;
  }
  //#endregion
  showChart() {
    if(this.form.invalid)return
    new Promise((res) => {
      this.loading = true;
      this.chartData = [];
      this.chartDataSets = [];
      this.chartLabels = [];
      const fieldsToPlot = this.fieldsToPlot.filter((x) => x);
      if (this.isBar) {
        this.chartData = null;
        if (!this.valueType) {
          this.uS.notify(`You need to specify the Value Type`, 0);
          this.loading = false;
          return;
        }
        for (const field of fieldsToPlot) {
          this.chartDataSets.push({
            data: this.table.get(field),
            label: field,
          });
          // this.chartLabels.push()
        }
      } else if (this.isLine) {
        this.chartData = null;
        if (!this.valueType) {
          this.uS.notify(`You need to specify the Value Type`, 0);
          this.loading = false;
          return;
        }
        for (const field of fieldsToPlot) {
          this.chartDataSets.push({
            data: this.table.get(field),
            label: this.fieldFormatter(field),
          });
          // this.chartLabels.push()
        }
      } else if (this.isPie) {
        // this.chartDataSets = null; 
        if (!this.valueType) {
          this.uS.notify(`You need to specify the Value Type`, 0);
          this.loading = false;
          return;
        }
        if (this.isSum) {
          for (const field of fieldsToPlot) {
            this.chartData.push(
              this.table.get(field).reduce((sum, item) => sum + (item || 0), 0)
            );
            this.chartLabels.push(this.fieldFormatter(field))
          }
        }
      }
      this.loading = false;
      res(true);
    }).then((r) => {
      console.log('chartData', this.chartData);
      console.log('chartDataSets', this.chartDataSets);
      console.log('chartLabels', this.chartLabels);
    });
  }
  fieldFormatter=(field:string)=>{
   return field.split('_').filter(x=>x!=null && x!=undefined). join(' ')
  }
}
