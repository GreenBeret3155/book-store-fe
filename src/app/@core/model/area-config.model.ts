export interface IAreaConfig {
  id?: any;
  mapGroupCharts?: any;
  updateUser?: any;
  updateTime?: any;
  status?: any;
  screenId?: any;
  mapCharts?: any[];
  mapScreens?: any[];
  areaCode?: string;
  areaName?: string;
  description?: string;
  orderIndex?: number;
  positionJson?: string;
  timeRefresh?: number;
}

export class AreaConfig implements IAreaConfig {
  constructor(
  id?: any,
  mapGroupCharts?: any,
  updateUser?: any,
  updateTime?: any,
  status?: any,
  screenId?: any,
  mapCharts?: any[],
  mapScreens?: any[],
  areaCode?: string,
  areaName?: string,
  description?: string,
  orderIndex?: number,
  positionJson?: string,
  timeRefresh?: number,
  ) {
  }
}
