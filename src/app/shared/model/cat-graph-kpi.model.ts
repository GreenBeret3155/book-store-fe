// tslint:disable-next-line:no-empty-interface
export interface ICatGraphKpi {
  id?: number;
  kpiId?: number;
  kpiCode?: String;
  kpiName?: String;
  kpiDisplay?: String;
  unitKpi?: String;
  unitViewCode?: String;
  unitViewName?: String;
  rate?: number;
  unitName?: String;
  status?: number;
  isAlarm?: number;
  groupKpiCode?: String;
  groupKpiName?: String;
  domainCode?: String;
  domainName?: String;
  source?: String;
  description?: String;
  updateTime?: Date;
  updateUser?: String;
  formulaLevel?: String;
  formulaQuar?: String;
  formulaYear?: String;
  formulaAcc?: String;
  alarmPlanType?: number;
  alarmThresholdType?: number;
  kpiType?: number;
  position?: number;
  orderIndex?: number;
  showOnMap?: number;
}

export class CatGraphKpi implements ICatGraphKpi {
  constructor(
    id?: number,
    kpiId?: number,
    kpiCode?: String,
    kpiName?: String,
    kpiDisplay?: String,
    unitKpi?: String,
    unitViewCode?: String,
    unitViewName?: String,
    rate?: number,
    unitName?: String,
    status?: number,
    isAlarm?: number,
    groupKpiCode?: String,
    groupKpiName?: String,
    domainCode?: String,
    domainName?: String,
    source?: String,
    description?: String,
    updateTime?: Date,
    updateUser?: String,
    formulaLevel?: String,
    formulaQuar?: String,
    formulaYear?: String,
    formulaAcc?: String,
    alarmPlanType?: number,
    alarmThresholdType?: number,
    kpiType?: number,
    position?: number,
    orderIndex?: number,
    showOnMap?: number,
  ) {
  }
}
