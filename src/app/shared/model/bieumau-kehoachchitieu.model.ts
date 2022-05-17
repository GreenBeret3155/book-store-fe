export class IBieumauKehoachchitieu {
  id?: number;
  prdId?: number;
  kpiId?: number;
  kpiCode?: string;
  kpiCodes?: string[];
  kpiName?: string;
  valPlan?: number;
  description?: string;
  updateTime?: string;
  updateUser?: string;
  groupKpiName?: string;
  groupKpiCode?: string;
  domainName?: string;
  domainCode?: string;
  status?: boolean;
  totalRank?: number;
  alarmPlanType?: number;
  unitName?: string;
}

export class BieumauKehoachchitieu implements IBieumauKehoachchitieu {
  constructor() {
  }

  id?: number;
  prdId?: number;
  kpiId?: number;
  kpiCode?: string;
  kpiCodes?: string[];
  kpiName?: string;
  valPlan?: number;
  description?: string;
  updateTime?: string;
  updateUser?: string;
  groupKpiName?: string;
  status?: boolean;
  groupKpiCode?: string;
  domainCode?: string;
  domainName?: string;
  totalRank?: number;
  alarmPlanType?: number;
  unitName?: string;
}
