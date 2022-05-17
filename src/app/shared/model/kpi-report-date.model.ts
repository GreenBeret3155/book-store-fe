export interface IKpiReportDateModel {
  fromDate?: any;
  toDate?: any;
}

export class KpiReportDateModel implements IKpiReportDateModel {
  constructor(public fromDate?: any,
              public toDate?: any) {
  }
}

export class KpiForm {
  constructor(public lstKpi?: any[]) {
  }
}
