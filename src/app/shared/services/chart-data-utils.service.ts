import {Injectable} from '@angular/core';
import {ChartResult, ChartResultDetail} from '../../@core/model/chart-result.model';
import {ChartColumn, ChartType} from '../common.constant';
import * as moment from 'moment';
import {ChartConvertDataService} from './chart-convert-data.service';
import {NumberWithCommasPipe} from '../../@theme/pipes';
import {DecimalPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChartDataUtilsService {
  constructor(private convertDataService: ChartConvertDataService, private pipeNumber: DecimalPipe) {
  }

  getDataSingleChart(chartData: ChartResultDetail) {
    switch (chartData.chartType) {
      case ChartType.LINE: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.COLUMN: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.BAR: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.STACK: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.CIRCLE: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.COMBO: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.PIE: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      case ChartType.AREA: {
        return this.convertToLineData(chartData.data, chartData.displayConfigs);
      }
      default : {
        return chartData;
      }
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  private convertToLineData(rawData: any[], displayConfigs: any[]) {
    // Label
    const labelKey = displayConfigs.find(e => e.columnChart === ChartColumn.LEGEND).columnQuery;
    const label = rawData.map(e => e[labelKey]).filter(this.onlyUnique);
    // Data
    const dataKey = displayConfigs.find(e => e.columnChart === ChartColumn.Y_AXIS).columnQuery;
    const data = rawData.map(e => {
      return e[dataKey];
    });
    // Chart Labels (X Axis)
    const xLabelsKey = displayConfigs.find(e => e.columnChart === ChartColumn.X_AXIS).columnQuery;
    const xLabels = rawData.map(e => {
      if (xLabelsKey === 'PRD_ID') {
        return this.convertToYear(e[xLabelsKey], 'DD/MM/YYYY');
      }
      return e[xLabelsKey];
    });
    if (xLabelsKey === 'PRD_ID') {
      xLabels.sort();
    }
    // Result
    return {
      data: data,
      label: label,
      xLabels: xLabels
    };

  }

  private convertToCircle(rawData: any[], displayConfigs: any[]) {
    // Label
    const labelKey = displayConfigs.find(e => e.columnChart === ChartColumn.LEGEND).columnQuery;
    const label = rawData.map(e => e[labelKey]).filter(this.onlyUnique);
    // Data
    const dataKey = displayConfigs.find(e => e.columnChart === ChartColumn.Y_AXIS).columnQuery;
    const data = rawData.map(e => {
      return e[dataKey];
    });
    // Chart Labels (X Axis)
    const xLabelsKey = displayConfigs.find(e => e.columnChart === ChartColumn.X_AXIS).columnQuery;
    const xLabels = rawData.map(e => {
      if (xLabelsKey === 'PRD_ID') {
        return this.convertToYear(e[xLabelsKey], 'DD/MM/YYYY');
      }
      return e[xLabelsKey];
    });
    if (xLabelsKey === 'PRD_ID') {
      xLabels.sort();
    }
    // Result
    return {
      data: data,
      label: label,
      xLabels: xLabels
    };
  }

  getChartData(chartResult: ChartResult) {
    if (chartResult) {
      switch (chartResult.typeChart) {
        case ChartType.OVERVIEW_CHART: {
          const length = chartResult.details.length;
          const result = [];
          for (let i = 0 ; i < length ; i++ ) {
            let dataDetail = Object.assign({}, chartResult);
            dataDetail.details = [];
            dataDetail.details.push(chartResult.details[i]);
            dataDetail = this.convertDataService.convertData(dataDetail);
            if (dataDetail) {
              result.push(dataDetail);
            }
          }
          return result
        }
        case ChartType.OVERVIEW_CHART_VERTICAL: {
          const length = chartResult.details.length;
          const result = [];
          for (let i = 0 ; i < length ; i++ ) {
            let dataDetail = Object.assign({}, chartResult);
            dataDetail.details = [];
            dataDetail.details.push(chartResult.details[i]);
            dataDetail = this.convertDataService.convertData(dataDetail);
            if (dataDetail) {
              result.push(dataDetail);
            }
          }
          return result
        }
        case ChartType.ALARM_CHART: {
          return this.getAlarmChart(chartResult);
        }
        case ChartType.SCATTER_PLOT: {
          return this.convertDataService.getScatterChart(chartResult);
        }
        case ChartType.BUBBLE: {
          return this.convertDataService.getBubbleData(chartResult);
        }
        default: {
          return this.convertDataService.convertData(chartResult);
        }
      }
    }
  }

  private getAlarmChart(chartResult: ChartResult) {

    const lineChart = this.convertDataService.convertData(chartResult);
    const details = chartResult.details;
    let kpiInfo: any = details[0].kpiInfo || {};
    // const kpiInfo: any = details.filter(e => e.chartType === 'TEXT_KPI')[0].kpiInfo;
    const textKPI = details.find(e => e.chartType === 'TEXT_KPI');
    const textKPIResult: any = {};
    if (textKPI && textKPI.displayConfigs) {
      textKPI.displayConfigs.forEach(e => {
        textKPIResult[e.columnChart] = textKPI.data[0] ? textKPI.data[0][e.columnQuery] : '';
      });
    }
    const textPFM = details.find(e => e.chartType === 'PERFORMANCE_CHART');
    const textPFMResult: any = {};
    if (textPFM && textPFM.displayConfigs) {
      textPFM.displayConfigs.forEach(e => {
        textPFMResult[e.columnChart] = textPFM.data[0] ? textPFM.data[0][e.columnQuery] : '';
      });
    }
    // Quy
    const text_PLQ = details.find(e => e.chartType === 'TEXT_PLAN_QUAR');
    const text_PLQResult: any = {};
    if (text_PLQ && text_PLQ.displayConfigs) {
      text_PLQ.displayConfigs.forEach(e => {
        text_PLQResult[e.columnChart] = text_PLQ.data[0] ? text_PLQ.data[0][e.columnQuery] : '';
      });
    }
    // Nam
    const textPlanYear = details.find(e => e.chartType === 'TEXT_PLAN_YEAR');
    const textPlanYearResult: any = {};
    if (textPlanYear && textPlanYear.displayConfigs) {
      textPlanYear.displayConfigs.forEach(e => {
        textPlanYearResult[e.columnChart] = textPlanYear.data[0] ? textPlanYear.data[0][e.columnQuery] : '';
      });
    }
    // Thang
    const textPlanMonth = details.find(e => e.chartType === 'TEXT_PLAN_MONTH');
    const textPlanMonthResult: any = {};
    if (textPlanMonth && textPlanMonth.displayConfigs) {
      textPlanMonth.displayConfigs.forEach(e => {
        textPlanMonthResult[e.columnChart] = textPlanMonth.data[0] ? textPlanMonth.data[0][e.columnQuery] : '';
      });
    }
    const textDeltaMonth = details.find(e => e.chartType === 'TEXT_DELTA_MONTH');
    const textDeltaMonthResult: any = {};
    if (textDeltaMonth && textDeltaMonth.displayConfigs) {
      textDeltaMonth.displayConfigs.forEach(e => {
        textDeltaMonthResult[e.columnChart] = textDeltaMonth.data[0] ? textDeltaMonth.data[0][e.columnQuery] : '';
      });
    }
    const textDeltaQ = details.find(e => e.chartType === 'TEXT_DELTA_QUAR');
    const textDeltaQResult: any = {};
    if (textDeltaQ && textDeltaQ.displayConfigs) {
      textDeltaQ.displayConfigs.forEach(e => {
        textDeltaQResult[e.columnChart] = textDeltaQ.data[0] ? textDeltaQ.data[0][e.columnQuery] : '';
      });
    }
    const textDeltaYear = details.find(e => e.chartType === 'TEXT_DELTA_YEAR');
    const textDeltaYearResult: any = {};
    if (textDeltaYear && textDeltaYear.displayConfigs) {
      textDeltaYear.displayConfigs.forEach(e => {
        textDeltaYearResult[e.columnChart] = textDeltaYear.data[0] ? textDeltaYear.data[0][e.columnQuery] : '';
      });
    }
    const result: any = {};
    result.kpiValue = textKPIResult.VAL_DISPLAY;

    if (textKPI) {
      if (textKPI.kpiInfo) {
        kpiInfo = textKPI.kpiInfo;
        if (textKPI && textKPI.displayConfigs) {
          const a = textKPI.displayConfigs.find(e => e.columnChart === 'VAL_DISPLAY');
          if (a && (a.dataType === 'INT' || a.dataType === 'FLOAT' || a.dataType === 'PERCENT')) {
            if (!textKPI.kpiInfo.rate) textKPI.kpiInfo.rate = 1;
            const temp = Math.round((parseFloat(textKPIResult.VAL_DISPLAY) / parseFloat(textKPI.kpiInfo.rate) + Number.EPSILON) * 100) / 100;
            if (temp) {
              result.kpiValue = this.pipeNumber.transform(temp).toString();
            }
          } else {
            result.kpiValue = textKPIResult.VAL_DISPLAY;
          }
        }
      } else {
        const a = textKPI.displayConfigs.find(e => e.columnChart === 'VAL_DISPLAY');
        if (a && (a.dataType === 'INT' || a.dataType === 'FLOAT' || a.dataType === 'PERCENT')) {
          result.kpiValue = this.pipeNumber.transform(result.kpiValue).toString();
        } else {
          result.kpiValue = textKPIResult.VAL_DISPLAY;
        }
      }
    }

    result.kpiDisplay = textKPIResult.KPI_TITLE;
    result.kpiValueLevel = textKPIResult.ALARM_LEVEL;
    result.gaugeValue = textPFMResult.VAL_DISPLAY;
    result.gaugeValueLevel = textPFMResult.ALARM_LEVEL;

    if (textPlanMonthResult.PRD_DATE || textPlanYearResult.PRD_DATE || text_PLQResult.PRD_DATE) {
      result.planTimeText = (textPlanMonth ? 'T' : (textPlanYear ? 'Năm ' : 'Quý ')) +
        (textPlanYear ? this.convertToYear(textPlanYearResult.PRD_DATE, 'YYYY') :
          (textPlanMonth ? this.convertToYear(textPlanMonthResult.PRD_DATE, 'MM/YYYY') : this.convertToQuar(text_PLQResult.PRD_DATE)))

      if (textPlanYearResult.LAST_UPDATE_TIME && this.convertToYear(textPlanYearResult.PRD_DATE, 'YYYY') === moment().format('YYYY')) {
        result.planTimeText = this.convertToMonth(textPlanYearResult.LAST_UPDATE_TIME, 'MM/YYYY')
      } else if (textPlanMonthResult.LAST_UPDATE_TIME && this.convertToYear(textPlanMonthResult.PRD_DATE, 'YYYY') === moment().format('YYYY')) {
        result.planTimeText = this.convertToMonth(textPlanMonthResult.LAST_UPDATE_TIME, 'MM/YYYY')
      } else if (text_PLQResult.LAST_UPDATE_TIME && this.convertToYear(text_PLQResult.PRD_DATE, 'YYYY') === moment().format('YYYY')) {
        result.planTimeText = this.convertToMonth(text_PLQResult.LAST_UPDATE_TIME, 'MM/YYYY')
      }
    }

    // Chia rate planTextTarget
    if (text_PLQ ? text_PLQ.kpiInfo : (textPlanMonth ? textPlanMonth.kpiInfo : (textPlanYear ? textPlanYear.kpiInfo : null))) {
      result.planTextTarget = parseFloat(textPlanMonth ? textPlanMonthResult.VAL_DISPLAY : (textPlanYear ? textPlanYearResult.VAL_DISPLAY : text_PLQResult.VAL_DISPLAY))
        / parseFloat((text_PLQ ? text_PLQ.kpiInfo : (textPlanMonth ? textPlanMonth.kpiInfo : textPlanYear.kpiInfo)).rate);
    }
    result.src = kpiInfo.source;
    result.unitName = kpiInfo.unitName;

    // Chia rate deltaValue
    result.deltaValue = textDeltaMonth ? textDeltaMonthResult.VAL_DISPLAY : (textDeltaYear ? textDeltaYearResult.VAL_DISPLAY : textDeltaQResult.VAL_DISPLAY);
    if (textDeltaMonthResult.VAL_DISPLAY || textDeltaYearResult.VAL_DISPLAY || textDeltaQResult.VAL_DISPLAY) {
      const rateData = (textDeltaMonth ? textDeltaMonth.kpiInfo : (textDeltaYear ? textDeltaYear.kpiInfo : (textDeltaQ.kpiInfo ? textDeltaQ.kpiInfo : {rate: 1})))
      result.deltaValue = parseFloat(textDeltaMonth ? textDeltaMonthResult.VAL_DISPLAY : (textDeltaYear ? textDeltaYearResult.VAL_DISPLAY : textDeltaQResult.VAL_DISPLAY)) / parseFloat((textDeltaMonth ? textDeltaMonth.kpiInfo.rate : (rateData ? rateData.rate : 1)));
    }
    result.percentDisplay = textDeltaMonth ? textDeltaMonthResult.PERCENT_DISPLAY : (textDeltaYear ? textDeltaYearResult.PERCENT_DISPLAY : textDeltaQResult.PERCENT_DISPLAY);
    result.deltaValueLevel = textDeltaMonth ? textDeltaMonthResult.ALARM_LEVEL : (textDeltaYear ? textDeltaYearResult.ALARM_LEVEL : textDeltaQResult.ALARM_LEVEL);

    if (result.percentDisplay) {
      result.percentDisplay = Math.round((parseFloat(result.percentDisplay) + Number.EPSILON) * 100) / 100;
    }
    if (textDeltaYearResult.PRD_DATE || textDeltaMonthResult.PRD_DATE || textDeltaQResult.PRD_DATE)
    result.deltaThanText = textDeltaYear ? this.convertDeltaToYear(textDeltaYearResult, 'YYYY') : (textDeltaMonth ? this.convertDeltaToMonth(textDeltaMonthResult, 'MM/YYYY') : (textDeltaQ ? this.convertDeltaToQuar(textDeltaQResult, 'Q/YYYY') : null));

    result.lineChartData = lineChart;

    return result;
  }

  private convertToYear(eElement: any, format) {
    if (eElement) {
    eElement = eElement.toString()
  }
    return moment(eElement, 'YYYYMMDD').format(format);
  }
  private convertToMonth(eElement: any, format) {
    if (eElement) {
      eElement = eElement.toString()
    }
    return  'T' + moment(eElement, 'YYYYMMDD').format(format);
  }

  private convertDeltaToYear(eElement: any, format) {
    if (eElement && eElement.PRD_DATE) {
      eElement.PRD_DATE = eElement.PRD_DATE.toString()
    }
    return 'năm ' + moment(eElement.PRD_DATE, 'YYYYMMDD').subtract(1, 'years').format(format);
  }

  private convertDeltaToMonth(eElement: any, format) {
    if (eElement && eElement.PRD_DATE) {
      eElement.PRD_DATE = eElement.PRD_DATE.toString()
    }
    return 'T' + moment(eElement.PRD_DATE, 'YYYYMMDD').subtract(1, 'month').format(format);
  }

  private convertDeltaToQuar(eElement: any, format) {
    if (eElement && eElement.PRD_DATE) {
      eElement.PRD_DATE = eElement.PRD_DATE.toString()
    }
    return 'quý ' + moment(eElement.PRD_DATE, 'YYYYMMDD').subtract(1, 'Q').format(format);
  }

  private convertToQuar(date: any) {
    const q = moment(date, 'YYYYMMDD').quarter();
    const y = moment(date, 'YYYYMMDD').year();
    return `${q}/${y}`;
  }
}
