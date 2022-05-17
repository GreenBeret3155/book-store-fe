export interface IChartModel {
  id?: number;
  chartCode?: string;
  chartName?: string;
  titleChart?: string;
  typeChart?: string;
  timeTypeDefault?: number;
  relativeTime?: number;
  department?: string;
  hasTooltip?: number;
  chartUrl?: string;
  groupChartId?: string;
  orderIndex?: number;
  groupKpiCode?: string;
  domainCode?: string;
  description?: string;
  chartConfig?: any[];
  status?: number;
  updateTime?: Date;
  updateUser?: string;
  chartIdNextTo?: number;
  items?: ChartItemModel[];
}

export class ChartModel implements IChartModel {
  id?: number;
  chartCode?: string;
  chartName?: string;
  titleChart?: string;
  typeChart?: string;
  timeTypeDefault?: number;
  relativeTime?: number;
  department?: string;
  hasTooltip?: number;
  chartUrl?: string;
  groupChartId?: string;
  orderIndex?: number;
  groupKpiCode?: string;
  domainCode?: string;
  description?: string;
  chartConfig?: any[];
  status?: number;
  updateTime?: Date;
  updateUser?: string;
  chartIdNextTo?: number;
  items?: ChartItemModel[];

  constructor(
    id?: number,
    chartCode?: string,
    chartName?: string,
    titleChart?: string,
    typeChart?: string,
    timeTypeDefault?: number,
    department?: string,
    relativeTime?: number,
    hasTooltip?: number,
    chartUrl?: string,
    groupChartId?: string,
    orderIndex?: number,
    groupKpiCode?: string,
    domainCode?: string,
    description?: string,
    chartConfig?: any[],
    status?: number,
    updateTime?: Date,
    updateUser?: string,
    chartIdNextTo?: number,
    items?: ChartItemModel[]
  ) {
    chartConfig = [];
    items = [];
  }

}

export interface IChartItemObjectModel {
  tableName?: string;
  orderBy?: string;
  limit?: number;
  columns?: any[];
  params?: any[];
}

export class ChartItemObjectModel implements IChartItemObjectModel {
  orderBy?: string;
  limit?: number;
  columns?: any[];
  params?: any[];

  constructor(
    tableName?: string,
    orderBy?: string,
    limit?: number,
    columns?: any[],
    params?: any[]
  ) {
    columns = [];
    params = [];
  }
}

export interface IChartItemModel {
  kpiIds?: string[];
  objects?: IChartItemObjectModel[];
  typeChart?: string;
}

export class ChartItemModel implements IChartItemModel {
  kpiIds?: string[];
  objects?: IChartItemObjectModel[];
  typeChart?: string;

  constructor(
    typeChart?: string,
    kpiIds?: string[],
    objects?: IChartItemObjectModel[]
  ) {
    kpiIds = [];
    objects = [];
  }
}
