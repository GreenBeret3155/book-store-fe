// tslint:disable-next-line:no-empty-interface
export interface IDataChartMap {
  objetCode?: string;
  objectName?: string;
  kpiId?: number;
  kpiName?: string;
  value?: number;
  prdId?: number;
  xAxis?: string;
  unitName?: string;
  color?: string;
  id?: string;
}

export class DataChartMap implements IDataChartMap {
  objetCode?: string;
  objectName?: string;
  kpiId?: number;
  kpiName?: string;
  value?: number;
  prdId?: number;
  xAxis?: string;
  color?: string;
  id?: string;
}
