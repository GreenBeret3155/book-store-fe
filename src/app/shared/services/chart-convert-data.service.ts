import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ChartType} from '../common.constant';
import {ChartResult} from '../../@core/model/chart-result.model';

const Constants = {
  LEGEND_COL_NAME: 'LEGEND',
  X_AXIS_COL_NAME: 'X_AXIS',
  Y_AXIS_COL_NAME: 'Y_AXIS',
  X_AXIS_COL_LABEL: 'XLABEL',
  Y_AXIS_COl_LABEL: 'YLABEL',
  TOOLTIP_COL_NAME: 'TOOLTIP',
  LAST_UPDATE_TIME: 'LAST_UPDATE_TIME',
  INT_TYPE: 'INT',
  FLOAT_TYPE: 'FLOAT',
  PERCENT_TYPE: 'PERCENT',
  BAR_TYPE: 'BAR',
  COLUMN_TYPE: 'COLUMN',
  RADAR_CORRELATE: 'RADAR_CORRELATE',
  STACKED_TYPE: 'STACK',
  PIE_TYPE: 'PIE',
  LINE_TYPE: 'LINE',
  STACK_BARPLOT: 'STACK_BARPLOT',
  BAR_TIMELINE: 'BAR_TIMELINE',
  ALARM_TYPE: 'ALARM_CHART',
  DATE_TYPE: 'DATE',
  TIME_TYPE_YEAR: 4,
  TIME_TYPE_QUARTER: 3,
  TIME_TYPE_MONTH: 2,
  IGNORE_DATA_PROCESS_CHART_TYPE: ['ALARM_TYPE']
};

@Injectable({
  providedIn: 'root'
})
export class ChartConvertDataService {

  constructor() {
  }

  first(array, n) {
    if (array == null)
      return void 0;
    if (n == null)
      return array[0];
    if (n < 0)
      return [];
    return array.slice(0, n);
  }
  getScatterChart(chart) {
    let legendConf, xAxisConf, yAxisConf, tooltipConf, lastUpdateTimeConf , xAxisLabelConf , yAxisLabelConf;
    if (!chart.details) return chart;
    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      detail.data = detail.data.map(i => {
        const newObj = {};
        for (const p in i) {
          if (!i.hasOwnProperty(p)) continue;
          newObj[p.toUpperCase()] = i[p];
        }
        return newObj;
      });
      for (const param in chart.filterParams) {
        if (!param.hasOwnProperty(chart.filterParams)) continue;
        chart.filterParams[param.toUpperCase()] = chart.filterParams[param];
      }
      if (!detail.displayConfigs) {
        detail.displayConfigs = []
      }
      detail.displayConfigs = detail.displayConfigs.map(i => {
        i.columnChart = i.columnChart ? i.columnChart.toUpperCase() : i.columnChart;
        i.dataType = i.dataType ? i.dataType.toUpperCase() : i.dataType;
        i.columnQuery = i.columnQuery ? i.columnQuery.toUpperCase() : i.columnQuery;
        return i
      });
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      xAxisLabelConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_LABEL === c.columnChart);
      yAxisLabelConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COl_LABEL === c.columnChart);
      detail.seriesData = {
        data: []
      };
      for (let dataIdx = 0; dataIdx < detail.data.length; dataIdx++) {
        const dataDetail = detail.data[dataIdx];
        for (let k = 0; k < detail.displayConfigs.length; k++) {
          if (!detail.seriesData[detail.displayConfigs[k].columnChart]) {
            detail.seriesData[detail.displayConfigs[k].columnChart] = [];
          }
          detail.seriesData[detail.displayConfigs[k].columnChart].push(dataDetail[detail.displayConfigs[k].columnQuery]);
        }
      }
      console.log(detail.seriesData)
    }
    chart.xAxis = Array.from(new Set(chart.details.map(d => d.seriesData[Constants.X_AXIS_COL_LABEL] || []).flat()));
    if (xAxisConf && yAxisConf) {
      if (!chart.xAxis) return chart;
      if (xAxisConf && (Constants.DATE_TYPE === xAxisConf.dataType || Constants.INT_TYPE === xAxisConf.dataType)) {
        chart.xAxis.sort();
      }
    }
    chart.yAxis = Array.from(new Set(chart.details.map(d => d.seriesData[Constants.Y_AXIS_COl_LABEL] || []).flat()));
    if (xAxisConf && yAxisConf) {
      if (!chart.yAxis) return chart;
      if (yAxisConf && (Constants.DATE_TYPE === yAxisConf.dataType || Constants.INT_TYPE === yAxisConf.dataType)) {
        chart.yAxis.sort();
      }
    }
    console.log(chart)
    this.prepareDataPlan(chart);
    chart.xPlans = Array.from(new Set(chart.details.map(d => d.xPlans || []).flat()));

    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      if (!detail.displayConfigs) continue;
      detail.seriesData.LEGEND = Array.from(new Set(detail.seriesData.LEGEND));
      if (detail.seriesData.LEGEND.length === 0) continue;
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      legendConf = detail.displayConfigs.find(c => Constants.LEGEND_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      tooltipConf = detail.displayConfigs.find(c => Constants.TOOLTIP_COL_NAME === c.columnChart);
      lastUpdateTimeConf = detail.displayConfigs.find(c => Constants.LAST_UPDATE_TIME === c.columnChart);

      // process data by legend
      if (Constants.STACK_BARPLOT === detail.chartType) {
        detail.seriesData.LEGEND.sort();
        chart.xAxis.sort();
      }
      const xArrayMax = Math.max(...chart.details.map(s => s.data.map(k => Number(k[xAxisConf.columnQuery])).flat()).flat())
      const yArrayMax = Math.max(...chart.details.map(s => s.data.map(k => Number(k[yAxisConf.columnQuery])).flat()).flat())
      if (xArrayMax >= yArrayMax) {
        console.log((xArrayMax + '').length)
        chart.maxAxis = xArrayMax
      } else chart.maxAxis = yArrayMax
      for (let legendIdx = 0; legendIdx < detail.seriesData.LEGEND.length; legendIdx++) {
        let legendName = detail.seriesData.LEGEND[legendIdx];
        if (Constants.DATE_TYPE === legendConf.dataType) {
          let timeType = chart.timeTypeDefault;
          if (chart.filterParams && chart.filterParams.TIMETYPE) {
            timeType = chart.filterParams.TIMETYPE;
          }
          if (timeType) timeType = parseInt(timeType, 10);
          const date = moment(legendName, 'YYYYMMDD');
          if (timeType) {
            if (Constants.TIME_TYPE_YEAR === timeType) {
              legendName = `Năm ${date.year()}`;
            } else if (Constants.TIME_TYPE_MONTH === timeType) {
              legendName = `Tháng ${date.format('MM/YYYY')}`;
            } else if (Constants.TIME_TYPE_QUARTER === timeType)
              legendName = `Quý ${date.format('Q/YYYY')}`;
          }
        }

        const seriesDetailObj: any = {
          name: legendName,
          type: detail.chartType,
          data: [],
          tooltips: [],
          tooltip: {},
          xLabel: null,
          yLabel: null,
          lastUpdateTime: [],
          xPlans: detail.xPlans,
          planData: []
        };
        for (let i = 0; i < 1; i++) {
          let valueY;
          let valueX;
          let yLabel;
          let xLabel;
          let hasValue = false;
          let lastUpdateTime;
          for (let j = 0; j < detail.data.length; j++) {
            const e = detail.data[j];
            if (e[legendConf.columnQuery] === detail.seriesData.LEGEND[legendIdx]) {
              hasValue = true;
              valueY = e[yAxisConf.columnQuery];
              valueX = e[xAxisConf.columnQuery];
              yLabel = e[yAxisLabelConf.columnQuery];
              xLabel = e[xAxisLabelConf.columnQuery];
              if (!detail.kpiInfo) detail.kpiInfo = {};
              if (!detail.kpiInfo.rate) detail.kpiInfo.rate = 1;
              valueY = this.calculateValueByRate(valueY, detail.kpiInfo.rate, yAxisConf);
              valueX = this.calculateValueByRate(valueX, detail.kpiInfo.rate, xAxisConf);
              if (detail.seriesData.TOOLTIP && tooltipConf && detail.seriesData.TOOLTIP.every(v => v)) {
                seriesDetailObj.tooltips.push(e[tooltipConf.columnQuery]);
              }
              seriesDetailObj.tooltip = {
                valueSuffix: ' ' + (detail.kpiInfo.unitName || '')
              };
            }
            if (lastUpdateTimeConf) {
              if (xAxisConf && Constants.DATE_TYPE === xAxisConf.dataType) {
                if (chart.xAxis) {
                  let timeType = chart.timeTypeDefault;
                  if (chart.filterParams && chart.filterParams.TIMETYPE) {
                    timeType = chart.filterParams.TIMETYPE;
                  }
                  if (timeType) timeType = parseInt(timeType, 10);
                  if (Constants.TIME_TYPE_YEAR === timeType && chart.xAxis[i] + '' === moment().startOf('year').format('YYYYMMDD')) {
                    lastUpdateTime = e[lastUpdateTimeConf.columnQuery];
                  }
                }
              }
            }
          }
          if (!hasValue) {
            if (detail.xPlans && detail.xPlans.indexOf(chart.xAxis[i]) !== -1 && detail.newestData && detail.maxDate && detail.delta) {
              const diffRange = moment(chart.xAxis[i], 'YYYYMMDD').diff(moment(detail.maxDate, 'YYYYMMDD'), (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q'));
              let planValue = detail.newestData[yAxisConf.columnQuery] + diffRange * detail.delta;
              planValue = this.calculateValueByRate(planValue, detail.kpiInfo.rate, yAxisConf);
              seriesDetailObj.planData.push({
                name: legendName,
                type: detail.chartType,
                data: {
                  x: chart.xAxis[i],
                  y: planValue,
                  color: '#FF0000'
                }
              })
            }
            valueY = null;
            valueX = null;
            seriesDetailObj.tooltips.push(null);
          }
          if (lastUpdateTime) {
            seriesDetailObj.lastUpdateTime.push(lastUpdateTime);
          }
          seriesDetailObj.xLabel = xLabel;
          seriesDetailObj.yLabel = yLabel;
          seriesDetailObj.data.push({
            // x: Math.round(valueX / chart.maxAxis * 100),
            // y: Math.round(valueY / chart.maxAxis * 100),
            x: valueX,
            y: valueY
          });
        }
        for (let i = 0; i < chart.xPlans.length; i++) {
          if (detail.newestData && detail.maxDate && (detail.delta || detail.delta === 0)) {
            const diffRange = moment(chart.xPlans[i], 'YYYYMMDD').diff(moment(detail.maxDate, 'YYYYMMDD'), (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q'));
            let value = detail.newestData[yAxisConf.columnQuery] + diffRange * detail.delta;
            value = this.calculateValueByRate(value, detail.kpiInfo.rate, yAxisConf);
            seriesDetailObj.planData.push({
              name: legendName,
              type: detail.chartType,
              data: {
                x: this.convertDateToLabel(chart, chart.xPlans[i]),
                y: value,
                color: '#FF0000'
              }
            })
          }
        }
        detail.seriesData.data.push(seriesDetailObj);
      }
    }
    // process xaxis
    this.mergeSeries(chart);
    console.log(chart)
    return chart;
  }
  getBubbleData(chart) {
    let legendConf, xAxisConf, yAxisConf, tooltipConf, lastUpdateTimeConf;
    if (Constants.IGNORE_DATA_PROCESS_CHART_TYPE.includes(chart.typeChart))
      return chart;
    console.log('chart:', chart);
    if (!chart.details) return chart;
    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      detail.data = detail.data.map(i => {
        const newObj = {};
        for (const p in i) {
          if (!i.hasOwnProperty(p)) continue;
          newObj[p.toUpperCase()] = i[p];
        }
        return newObj;
      });
      for (const param in chart.filterParams) {
        if (!param.hasOwnProperty(chart.filterParams)) continue;
        chart.filterParams[param.toUpperCase()] = chart.filterParams[param];
      }
      if (!detail.displayConfigs) {
        detail.displayConfigs = []
      }
      detail.displayConfigs = detail.displayConfigs.map(i => {
        i.columnChart = i.columnChart ? i.columnChart.toUpperCase() : i.columnChart;
        i.dataType = i.dataType ? i.dataType.toUpperCase() : i.dataType;
        i.columnQuery = i.columnQuery ? i.columnQuery.toUpperCase() : i.columnQuery;
        return i
      });
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      detail.seriesData = {
        data: []
      };
      for (let dataIdx = 0; dataIdx < detail.data.length; dataIdx++) {
        const dataDetail = detail.data[dataIdx];
        for (let k = 0; k < detail.displayConfigs.length; k++) {
          if (!detail.seriesData[detail.displayConfigs[k].columnChart]) {
            detail.seriesData[detail.displayConfigs[k].columnChart] = [];
          }
          detail.seriesData[detail.displayConfigs[k].columnChart].push(dataDetail[detail.displayConfigs[k].columnQuery]);
        }
      }
    }
    chart.xAxis = Array.from(new Set(chart.details.map(d => d.seriesData.X_AXIS || []).flat()));
    chart.xLabel = Array.from(new Set(chart.details.map(d => d.seriesData.XLABEL || []).flat())).filter(v => v !== undefined);
    chart.yLabel = Array.from(new Set(chart.details.map(d => d.seriesData.YLABEL || []).flat())).filter(v => v !== undefined);
    chart.zLabel = Array.from(new Set(chart.details.map(d => d.seriesData.ZLABEL || []).flat())).filter(v => v !== undefined);
    if (xAxisConf && yAxisConf) {
      if (!chart.xAxis) return chart;
      if (xAxisConf && (Constants.DATE_TYPE === xAxisConf.dataType || Constants.INT_TYPE === xAxisConf.dataType)) {
        chart.xAxis.sort();
      }
    }
    this.prepareDataPlan(chart);
    chart.xPlans = Array.from(new Set(chart.details.map(d => d.xPlans || []).flat()));
    if (!chart.xAxis) {
      this.mergeSeries(chart);
      return chart;
    }


    // let mapX = new Map();
    // let mapY = new Map();
    // let mapZ = new Map();
    const mapData = new Map();
    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      if (!detail.displayConfigs) continue;
      const seriesData_LEGEND = detail.seriesData.LEGEND;
      const seriesData_X = detail.seriesData.X_AXIS;
      const seriesData_Y = detail.seriesData.Y_AXIS;
      const seriesData_Z = detail.seriesData.Z_AXIS;
      if (seriesData_LEGEND) {
        for (let idx = 0; idx < seriesData_LEGEND.length; idx++) {
          let obj;
          if (mapData.get(seriesData_LEGEND[idx]) === undefined) {
            obj = {};
            obj['name'] = seriesData_LEGEND[idx];
          } else {
            obj = mapData.get(seriesData_LEGEND[idx]);
          }
          if (seriesData_X && seriesData_X[idx]) {
            obj['x'] = seriesData_X[idx];
          }
          if (seriesData_Y && seriesData_Y[idx]) {
            obj['y'] = seriesData_Y[idx];
          }
          if (seriesData_Z && seriesData_Z[idx]) {
            obj['z'] = seriesData_Z[idx];
          }
          mapData.set(seriesData_LEGEND[idx], obj);
        }
      }
      detail.seriesData.LEGEND = Array.from(new Set(detail.seriesData.LEGEND));
      if (detail.seriesData.LEGEND.length === 0 || chart.xAxis.length === 0) continue;
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      legendConf = detail.displayConfigs.find(c => Constants.LEGEND_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      tooltipConf = detail.displayConfigs.find(c => Constants.TOOLTIP_COL_NAME === c.columnChart);
      lastUpdateTimeConf = detail.displayConfigs.find(c => Constants.LAST_UPDATE_TIME === c.columnChart);

      // process data by legend
      if (Constants.STACK_BARPLOT === detail.chartType) {
        detail.seriesData.LEGEND.sort();
        chart.xAxis.sort();
      }
    }
    const values = Array.from(mapData.values());
    console.log('map-data:', mapData);
    // process xaxis
    if (xAxisConf && Constants.DATE_TYPE === xAxisConf.dataType) {
      chart.details.forEach(detail => {
        if (detail.seriesData.X_AXIS) {
          detail.seriesData.xAxis = [...detail.seriesData.X_AXIS];
          detail.seriesData.X_AXIS = chart.xAxis.map(x => this.convertDateToLabel(chart, x))
        }
      });
    }
    chart.series = {
      data: []
    };
      chart.series.data = chart.series.data.concat(values);
    return chart;
  }

  convertData(chart) {
    let legendConf, xAxisConf, yAxisConf, tooltipConf, lastUpdateTimeConf;
    if (Constants.IGNORE_DATA_PROCESS_CHART_TYPE.includes(chart.typeChart))
      return chart;

    if (!chart.details) return chart;
    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      detail.data = detail.data.map(i => {
        const newObj = {};
        for (const p in i) {
          if (!i.hasOwnProperty(p)) continue;
          newObj[p.toUpperCase()] = i[p];
        }
        return newObj;
      });
      for (const param in chart.filterParams) {
        if (!param.hasOwnProperty(chart.filterParams)) continue;
        chart.filterParams[param.toUpperCase()] = chart.filterParams[param];
      }
      if (!detail.displayConfigs) {
        detail.displayConfigs = []
      }
      detail.displayConfigs = detail.displayConfigs.map(i => {
        i.columnChart = i.columnChart ? i.columnChart.toUpperCase() : i.columnChart;
        i.dataType = i.dataType ? i.dataType.toUpperCase() : i.dataType;
        i.columnQuery = i.columnQuery ? i.columnQuery.toUpperCase() : i.columnQuery;
        return i
      });
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      detail.seriesData = {
        data: []
      };
      for (let dataIdx = 0; dataIdx < detail.data.length; dataIdx++) {
        const dataDetail = detail.data[dataIdx];
        for (let k = 0; k < detail.displayConfigs.length; k++) {
          if (!detail.seriesData[detail.displayConfigs[k].columnChart]) {
            detail.seriesData[detail.displayConfigs[k].columnChart] = [];
          }
          detail.seriesData[detail.displayConfigs[k].columnChart].push(dataDetail[detail.displayConfigs[k].columnQuery]);
        }
      }
    }
    chart.xAxis = Array.from(new Set(chart.details.map(d => d.seriesData.X_AXIS || []).flat()));
    if (xAxisConf && yAxisConf) {
      if (!chart.xAxis) return chart;
      if (xAxisConf && (Constants.DATE_TYPE === xAxisConf.dataType || Constants.INT_TYPE === xAxisConf.dataType)) {
        chart.xAxis.sort();
      }
    }
    this.prepareDataPlan(chart);
    chart.xPlans = Array.from(new Set(chart.details.map(d => d.xPlans || []).flat()));
    if (!chart.xAxis) {
      this.mergeSeries(chart);
      return chart;
    }

    for (let detailIdx = 0; detailIdx < chart.details.length; detailIdx++) {
      const detail = chart.details[detailIdx];
      if (!detail.displayConfigs) continue;
      detail.seriesData.LEGEND = Array.from(new Set(detail.seriesData.LEGEND));
      if (detail.seriesData.LEGEND.length === 0 || chart.xAxis.length === 0) continue;
      xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      legendConf = detail.displayConfigs.find(c => Constants.LEGEND_COL_NAME === c.columnChart);
      yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      tooltipConf = detail.displayConfigs.find(c => Constants.TOOLTIP_COL_NAME === c.columnChart);
      lastUpdateTimeConf = detail.displayConfigs.find(c => Constants.LAST_UPDATE_TIME === c.columnChart);

      // process data by legend
      if (Constants.STACK_BARPLOT === detail.chartType) {
        detail.seriesData.LEGEND.sort();
        chart.xAxis.sort();
      }
      for (let legendIdx = 0; legendIdx < detail.seriesData.LEGEND.length; legendIdx++) {
        let legendName = detail.seriesData.LEGEND[legendIdx];
        if (Constants.DATE_TYPE === legendConf.dataType) {
          let timeType = chart.timeTypeDefault;
          if (chart.filterParams && chart.filterParams.TIMETYPE) {
            timeType = chart.filterParams.TIMETYPE;
          }
          if (timeType) timeType = parseInt(timeType, 10);
          const date = moment(legendName, 'YYYYMMDD');
          if (timeType) {
            if (Constants.TIME_TYPE_YEAR === timeType) {
              legendName = `Năm ${date.year()}`;
            } else if (Constants.TIME_TYPE_MONTH === timeType) {
              legendName = `Tháng ${date.format('MM/YYYY')}`;
            } else if (Constants.TIME_TYPE_QUARTER === timeType)
              legendName = `Quý ${date.format('Q/YYYY')}`;
          }
        }
        const seriesDetailObj: any = {
          name: legendName,
          type: detail.chartType,
          data: [],
          tooltips: [],
          tooltip: {},
          lastUpdateTime: [],
          xPlans: detail.xPlans,
          planData: []
        };
        for (let i = 0; i < chart.xAxis.length; i++) {
          let value;
          let hasValue = false;
          let lastUpdateTime;
          for (let j = 0; j < detail.data.length; j++) {
            const e = detail.data[j];
            if (e[legendConf.columnQuery] === detail.seriesData.LEGEND[legendIdx] && e[xAxisConf.columnQuery] === chart.xAxis[i]) {
              hasValue = true;
              value = e[yAxisConf.columnQuery];
              if (!detail.kpiInfo) detail.kpiInfo = {};
              if (!detail.kpiInfo.rate) detail.kpiInfo.rate = 1;
              value = this.calculateValueByRate(value, detail.kpiInfo.rate, yAxisConf);

              if (Constants.PIE_TYPE === detail.chartType) {
                seriesDetailObj.y = value;
              }
              if (detail.seriesData.TOOLTIP && tooltipConf && detail.seriesData.TOOLTIP.every(v => v)) {
                seriesDetailObj.tooltips.push(e[tooltipConf.columnQuery]);
              }
              seriesDetailObj.tooltip = {
                valueSuffix: ' ' + (detail.kpiInfo.unitName || '')
              };
            }
            if (lastUpdateTimeConf) {
              if (xAxisConf && Constants.DATE_TYPE === xAxisConf.dataType) {
                if (chart.xAxis) {
                  let timeType = chart.timeTypeDefault;
                  if (chart.filterParams && chart.filterParams.TIMETYPE) {
                    timeType = chart.filterParams.TIMETYPE;
                  }
                  if (timeType) timeType = parseInt(timeType, 10);
                  if (Constants.TIME_TYPE_YEAR === timeType && chart.xAxis[i] + '' === moment().startOf('year').format('YYYYMMDD')) {
                    lastUpdateTime = e[lastUpdateTimeConf.columnQuery];
                  }
                }
              }
            }
          }
          if (!hasValue) {
            if (detail.xPlans && detail.xPlans.indexOf(chart.xAxis[i]) !== -1 && detail.newestData && detail.maxDate && detail.delta) {
              const diffRange = moment(chart.xAxis[i], 'YYYYMMDD').diff(moment(detail.maxDate, 'YYYYMMDD'), (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q'));
              let planValue = detail.newestData[yAxisConf.columnQuery] + diffRange * detail.delta;
              planValue = this.calculateValueByRate(planValue, detail.kpiInfo.rate, yAxisConf);
              seriesDetailObj.planData.push({
                name: legendName,
                type: detail.chartType,
                data: {
                  x: chart.xAxis[i],
                  y: planValue,
                  color: '#FF0000'
                }
              })
            }
            value = null;
            seriesDetailObj.tooltips.push(null);
          }
          if (lastUpdateTime) {
            seriesDetailObj.lastUpdateTime.push(lastUpdateTime);
          }
          seriesDetailObj.data.push(value);
        }
        for (let i = 0; i < chart.xPlans.length; i++) {
          if (detail.newestData && detail.maxDate && (detail.delta || detail.delta === 0)) {
            const diffRange = moment(chart.xPlans[i], 'YYYYMMDD').diff(moment(detail.maxDate, 'YYYYMMDD'), (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q'));
            let value = detail.newestData[yAxisConf.columnQuery] + diffRange * detail.delta;
            value = this.calculateValueByRate(value, detail.kpiInfo.rate, yAxisConf);
            seriesDetailObj.planData.push({
              name: legendName,
              type: detail.chartType,
              data: {
                x: this.convertDateToLabel(chart, chart.xPlans[i]),
                y: value,
                color: '#FF0000'
              }
            })
          }
        }
        detail.seriesData.data.push(seriesDetailObj);
      }
    }
    // process xaxis
    if (xAxisConf && Constants.DATE_TYPE === xAxisConf.dataType) {
      chart.details.forEach(detail => {
        if (detail.seriesData.X_AXIS) {
          detail.seriesData.xAxis = [...detail.seriesData.X_AXIS];
          detail.seriesData.X_AXIS = chart.xAxis.map(x => this.convertDateToLabel(chart, x))
        }
      });
    }
    this.mergeSeries(chart);
    return chart;
  }

  mergeSeries(chart) {
    chart.series = {
      data: []
    };
    chart.details.forEach(function (detail) {
      chart.series.data = chart.series.data.concat(detail.seriesData.data);
    });
  }

  convertIntDateToStr(x, timeType) {
    const date = moment(x, 'YYYYMMDD');
    let label = x + '';
    if (timeType) timeType = parseInt(timeType, 10);
    switch (timeType) {
      case Constants.TIME_TYPE_YEAR:
        label = `Năm ${date.year()}`;
        break;
      case Constants.TIME_TYPE_MONTH:
        label = `Tháng ${date.format('MM/YYYY')}`;
        break;
      case Constants.TIME_TYPE_QUARTER:
        label = `Quý ${date.format('Q/YYYY')}`;
        break;
    }
    return label;
  }

  prepareDataPlan(chart) {
    if (chart.timeTypeDefault !== Constants.TIME_TYPE_MONTH && chart.timeTypeDefault !== Constants.TIME_TYPE_QUARTER
      || (chart.filterParams && chart.timeTypeDefault + '' !== chart.filterParams.TIMETYPE)) return;
    const firstDayOfYear = moment(new Date(), 'YYYYMMDD').startOf('y').format('YYYYMMDD');
    for (let idx = 0; idx < chart.details.length; idx++) {
      const detail = chart.details[idx];
      if (detail.kpiInfo && !detail.kpiInfo.plan) continue;
      if (detail.kpiInfo && detail.kpiInfo.plan && detail.kpiInfo.plan.prdId + '' !== firstDayOfYear) continue;
      if (detail.chartType === ChartType.LINE_DASHED) {
        // detail.delta = 0;
        continue;
      }
      const xAxisConf = detail.displayConfigs.find(c => Constants.X_AXIS_COL_NAME === c.columnChart);
      const yAxisConf = detail.displayConfigs.find(c => Constants.Y_AXIS_COL_NAME === c.columnChart);
      if (!xAxisConf || !yAxisConf) continue;
      const currentPoint = parseInt(this.toStartOfPeriod(new Date(), chart.timeTypeDefault), 10);
      const maxDate = Math.max.apply([], detail.data.map(m => m[xAxisConf.columnQuery]));
      const newestData = detail.data.find(d => d[xAxisConf.columnQuery] === maxDate);
      detail.xPlans = [];
      if (newestData && maxDate) {
        detail.maxDate = maxDate;
        detail.newestData = newestData;
        detail.valInHeadOfYear = detail.data.find(d => d[xAxisConf.columnQuery] + '' === firstDayOfYear);
        if (!detail.valInHeadOfYear) continue;
        if (detail.kpiInfo && detail.kpiInfo.plan)
        detail.delta = (detail.kpiInfo.plan.valPlan - detail.valInHeadOfYear[yAxisConf.columnQuery]) / (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 12 : 4);
        if (!detail.delta) return;
        const numPointPlan = moment(currentPoint, 'YYYYMMDD').diff(moment(maxDate, 'YYYYMMDD'), (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q'));
        for (let i = 0; i < numPointPlan; i++) {
          const xValue = moment(maxDate, 'YYYYMMDD').add(i + 1, (chart.timeTypeDefault === Constants.TIME_TYPE_MONTH ? 'M' : 'Q')).format('YYYYMMDD');
          detail.xPlans.push(parseInt(xValue , 10));
        }
      }
    }
  }

  toStartOfPeriod(date, timeType) {
    switch (timeType) {
      case Constants.TIME_TYPE_MONTH :
        return moment(date).startOf('M').format('YYYYMMDD');
      case Constants.TIME_TYPE_QUARTER:
        return moment(date).startOf('Q').format('YYYYMMDD');
      case Constants.TIME_TYPE_YEAR:
        return moment(date).startOf('y').format('YYYYMMDD');
      default:
        return moment(date).startOf('d').format('YYYYMMDD');
    }
  }

  calculateValueByRate(value,  rate, yAxisConf) {
    if ([Constants.INT_TYPE, Constants.FLOAT_TYPE].includes(yAxisConf.dataType)) {
      if (value && value !== 0) {
        value = parseFloat(value) / parseFloat(rate);
      }
      if (Constants.INT_TYPE === yAxisConf.dataType && value)
        value = Math.round(value);
      if (Constants.FLOAT_TYPE === yAxisConf.dataType && value)
        value = Math.round((value + Number.EPSILON) * 100) / 100;
      if (Constants.PERCENT_TYPE === yAxisConf.dataType && value)
        value = Math.round((value + Number.EPSILON) * 100) / 100;
    }
    return value;
  }


  convertDateToLabel(chart, x) {
    const date = moment(x, 'YYYYMMDD');
    let label = x;
    let timeType = chart.timeTypeDefault;
    if (chart.filterParams && chart.filterParams.TIMETYPE) {
      timeType = chart.filterParams.TIMETYPE;
    }
    if (timeType) timeType = parseInt(timeType, 10);
    switch (timeType ) {
      case Constants.TIME_TYPE_YEAR:
        label = date.year();
        break;
      case Constants.TIME_TYPE_MONTH:
        label = date.format('MM/YYYY');
        break;
      case Constants.TIME_TYPE_QUARTER:
        label = `Q${date.format('Q/YYYY')}`;
        break;
    }
    return label;
  }
}
