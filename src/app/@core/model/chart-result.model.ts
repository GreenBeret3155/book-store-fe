export class ChartResultDetail {
  chartType: string;
  data: any[];
  displayConfigs: any[];
  kpiInfo: any;
}

export interface IChartResult {
  id: number;
  chartCode: string;
  chartName: string;
  titleChart: string;
  typeChart: string;
  timeTypeDefault: number;
  relativeTime: number;
  hasTooltip: number;
  chartUrl: null;
  groupChartId: number;
  orderIndex: number;
  groupKpiCode: string;
  domainCode: string;
  status: number;
  description: string;
  updateTime: Date;
  updateUser: string;
  chartConfig: any;
  screenIdNextto: number;
  details: ChartResultDetail[];
}

export class ChartResult implements IChartResult {
  chartCode: string;
  chartConfig: any;
  chartName: string;
  chartUrl: null;
  description: string;
  details: ChartResultDetail[];
  domainCode: string;
  groupChartId: number;
  groupKpiCode: string;
  hasTooltip: number;
  id: number;
  orderIndex: number;
  relativeTime: number;
  status: number;
  timeTypeDefault: number;
  titleChart: string;
  typeChart: string;
  updateTime: Date;
  updateUser: string;
  screenIdNextto: number;
}
