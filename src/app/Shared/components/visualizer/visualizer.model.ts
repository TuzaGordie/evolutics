export interface IChartConfig {
  chartType: EChartType;
  valueType: string;
  axisX: string;
  axisY: string;
  filterField: string;
}

export enum EValueType {
  sum = 'Sum',
  count = 'Count',
  real_data = 'Real data',
}

export enum EChartType {
  line = 'line',
  bar = 'bar',
  horizontalBar = 'horizontalBar',
  radar = 'radar',
  doughnut = 'doughnut',
  polarArea = 'polarArea',
  bubble = 'bubble',
  pie = 'pie',
  scatter = 'scatter',
}
