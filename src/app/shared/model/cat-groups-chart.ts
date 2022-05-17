// tslint:disable-next-line:no-empty-interface
export interface ICatGroupsChart {
  id?: number;
  groupCode?: String;
  groupName?: String;
  groupKpiCode?: String;
  groupKpiName?: String;
  description?: String;
  kpiMainName?: String;
  kpiIdMain?: number;
  orderIndex?: number;
  status?: number;
  updateTime?: Date;
  updateUser?: String;
}

export class CatGroupsChart implements ICatGroupsChart {
  constructor(
    id?: number,
    groupCode?: String,
    groupName?: String,
    groupKpiCode?: String,
    groupKpiName?: String,
    description?: String,
    kpiMainName?: String,
    kpiIdMain?: number,
    orderIndex?: number,
    status?: number,
    updateTime?: Date,
    updateUser?: String
  ) {
  }
}

