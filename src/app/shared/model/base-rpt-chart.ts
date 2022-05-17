export interface IBaseRptChart {
  xAxis?: string[];
  series?: any;
  chartType?: any;
  title?: any;
}


export class BaseRptChart implements IBaseRptChart {
  constructor(public xAxis?: string[],
              public series?: any, public chartType?: any, public title?: any
  ) {
  }
}
