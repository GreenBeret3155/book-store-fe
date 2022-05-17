export interface IBaseRptGraphModel {
  kpiId?: string;
  kpiName?: string;
  inputLevel?: string;
  inputLevelName?: string;
  objCode?: string;
  objName?: string;
  val?: number;
  valAcc?: number;
  valTotal?: number;
  unitName?: string;
  valPlanYear?: number;
  dateTime?: string
}

export class BaseRptGraphModel implements IBaseRptGraphModel {
  constructor(public kpiId?: string,
              public kpiName?: string,
              public inputLevel?: string,
              public inputLevelName?: string,
              public objCode?: string,
              public objName?: string,
              public val?: number,
              public valAcc?: number,
              public valTotal?: number,
              public unitName?: string,
              public valPlanYear?: number,
              public dateTime?: string) {
  }
}
