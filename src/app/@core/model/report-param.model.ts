export interface IReportParam {
  parameterType?: any;
  isRequired?: any;
  helpText?: string;
  concealEntry?: any;
  hidden?: any;
  displayName?: any;
  defaultValue?: any;
  dataType?: any;
  typeName?: string;
  displayFormat?: any;
  scalarParamType?: string;
  parameterGroup?: string;
  scalarOrderInGroup?: any;
  controlType?: any;
  selectionListType?: any;
  name?: string;
  selectionList?: any,
  promptText?: any
}

export class ReportParam implements IReportParam {
  constructor() {
  }

  parameterType?: any;
  isRequired?: any;
  helpText?: string;
  concealEntry?: any;
  hidden?: any;
  displayName?: any;
  defaultValue?: any;
  dataType?: any;
  typeName?: string;
  displayFormat?: any;
  scalarParamType?: string;
  parameterGroup?: string;
  scalarOrderInGroup?: any;
  controlType?: any;
  selectionListType?: any;
  name?: string;
  selectionList?: any;
  promptText?: any;
}
