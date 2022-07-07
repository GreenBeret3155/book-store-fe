export enum ChartType {
  AREASPLINE = 'AREASPLINE',
  BAR_TIMELINE = 'BAR_TIMELINE',
  ALARM_CHART = 'ALARM_CHART',
  MAP_CHART = 'MAP_CHART',
  RADAR_CORRELATE = 'RADAR_CORRELATE',
  LINE = 'LINE',
  BAR = 'BAR',
  PIE = 'PIE',
  CIRCLE = 'CIRCLE',
  AREA = 'AREA',
  CARD = 'CARD',
  STACK = 'STACK',
  COMBO = 'COMBINE',
  COLUMN = 'COLUMN',
  GROUP_BAR = 'GROUP_BAR',
  OVERVIEW_CHART = 'OVERVIEW_CHART',
  OVERVIEW_CHART_VERTICAL = 'OVERVIEW_CHART_VERTICAL',
  RADAR = 'RADAR',
  CORRELATE_CHART = 'CORRELATE_CHART',
  STACK_BARPLOT = 'STACK_BARPLOT',
  LINE_DASHED = 'LINE_DASHED',
  SCATTER_PLOT = 'SCATTER_PLOT',
  INFO_SUMMARY = 'INFO_SUMMARY',
  ICON_CHART = 'ICON_CHART',
  HEATMAP = 'HEATMAP',
  BUBBLE = 'BUBBLE',
  TABLE = 'TABLE'
}

export enum ChartColumn {
  ALARM_LEVEL = 'ALARM_LEVEL',
  LEGEND = 'LEGEND',
  Y_AXIS = 'Y_AXIS',
  X_AXIS = 'X_AXIS',
  VAL_DISPLAY = 'VAL_DISPLAY',
  PRD_DATE = 'PRD_DATE',
}

export enum CategoryId {
  DOMAIN_GROUP = 1,
  DOMAIN = 2,
  TIME_TYPE = 22,
  DOMAIN_TABLE = 24,
  INPUT_LEVEL = 25,
  COLUMN_VALUE_CHART = 26,
  OUTPUT_SEARCH = 27,
  TABLE_NAME_SOURCE = 41,
  TABLE_DESTINATION = 42,
  DATA_TYPE_DB = 44,
  COLUMN_DATA = 45
}

export class Constants {
  static MAX_SAFE_INTEGER: number = Math.pow(2, 31) - 1;
  static COLUMN_VALUE_CHART: String = 'COLUMN_VALUE_CHART';
  static MIN_SAFE_INTEGER: number = -(Math.pow(2, 31) - 1);
  static MAP_TIMETYPE_FORMAT_OUT = new Map()
    .set('2', 'YYYYMM01')
    .set('3', 'YYYYQ01')
    .set('4', 'YYYY');
  static MAP_TIMETYPE_FORMAT_IN = new Map()
    .set('2', 'MM/YYYY')
    .set('3', 'Q/YYYY')
    .set('4', 'YYYY');
  static TIME_TYPE_YEAR: string = '4';
  static TIME_TYPE_QUARTER: string = '3';
  static TIME_TYPE_MONTH: string = '2';
  static TYPE_STRING: string = 'TYPE_STRING';
  static TYPE_FLOAT: string = 'TYPE_FLOAT';
  static TYPE_DECIMAL: string = 'TYPE_DECIMAL';
  static TYPE_DATE_TIME: string = 'TYPE_DATE_TIME';
  static TYPE_BOOLEAN: string = 'TYPE_BOOLEAN';
  static TYPE_INTEGER: string = 'TYPE_INTEGER';
  static TYPE_DATE: string = 'TYPE_DATE';
  static TYPE_TIME: string = 'TYPE_TIME';
  static STATE_DEFAULT_ORDER_INFO: number = 2;
}

export enum CHART_MAP_CONST {
  BORER_SERIES = '#CCC',
  HOVER_SERIES_COLOR = '#BADA55',
  BORDER_WIDTH = 1,
  DATA_LABEL_COLOR = '#FFFFFF',
}

export enum KPI_VIEW_TYPE {
  KPI_INPUT = 0,
  KPI_OUTPUT = 1
}

