import {Injectable} from '@angular/core';
import {ChartType} from '../common.constant';
import {darkColorLists, lightColorLists} from '../custom-theme';
import * as moment from 'moment';
import {DecimalPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChartUntilsService {

  constructor(private decimalPipe: DecimalPipe) {


  }

  fetchConfig(config: any, chartConfig: any, themeName: any , hasCustomTooltip?: any, xAxisType?: any, results?: any) {
    const decimalPipe = this.decimalPipe;
    if (config && (config.allowDecimalsYAxis || config.allowDecimalsYAxis === false)) {
      chartConfig.yAxis.map(e => e.allowDecimals = config.allowDecimalsYAxis);
    }
    if (config && config.reverseXasis) {
      chartConfig.xAxis.opposite = true
      // chartConfig.series.forEach(e => {
      //   e.data = e.data.map(res => - res)
      // })
      chartConfig.yAxis.map(e => {
        e.reversed = true

      });
      // chartConfig.tooltip = {
      //   shared: true,
      //   formatter: function () {
      //     if (hasCustomTooltip) {
      //       return [].concat(this.points ? this.points.map((item) => {
      //         const seri = series.find(s => s.name === item.series.name);
      //         const tooltip = seri && seri.tooltips ? seri.tooltips[item.point.index] : '';
      //         return `<span style="color:${item.point.color}">●</span> ${tooltip}<br/>`;
      //       }) : []);
      //     }
      //     let headerFormat = '';
      //     if (xAxisType === 'DATE') {
      //       let timeType = results.timeTypeDefault;
      //       if (results.filterParams && results.filterParams.TIMETYPE) {
      //         timeType = parseInt(results.filterParams.TIMETYPE, 10);
      //       }
      //       if (timeType === 4) {
      //         if (series[0].lastUpdateTime && series[0].lastUpdateTime.length > 0 && this.x + '' === moment().format('YYYY')) {
      //           const lastUpdateTime = Math.max(...(series.map(s => s.lastUpdateTime).flat()).map(t => parseInt(moment(t).format('YYYYMM'), 10)));
      //           headerFormat = `<small style="font-size: 12px">Tháng ${moment(lastUpdateTime, 'YYYYMM').format('MM/YYYY')}</small><br/>`;
      //         } else {
      //           headerFormat = `<small style="font-size: 12px">Năm ${this.x}</small><br/>`;
      //         }
      //       }
      //       if (timeType === 3) {
      //         headerFormat = `<small style="font-size: 12px">${this.x}</small><br/>`;
      //       }
      //       if (timeType === 2) {
      //         headerFormat = `<small style="font-size: 12px">Tháng ${this.x}</small><br/>`;
      //       }
      //     } else {
      //       headerFormat = `<small style="font-size: 12px"> ${this.x}</small><br/>`;
      //     }
      //     return [headerFormat].concat(this.points ? this.points.map((item) => {
      //       const seri = series.find(s => s.name === item.series.name);
      //       let value = item.point.y
      //       value = decimalPipe.transform(-value);
      //       const valueSuffix = seri ? seri.tooltip.valueSuffix : '';
      //       return `<span style="color:${item.point.color}">●</span> ${item.series.name}: ${value}<br/>`;
      //     }) : []);
      //   },
      // }
      // if (config ) {
      //   // console.log(chartConfig)
      //   if (chartConfig.chart.type && chartConfig.chart.type.toLowerCase() === ChartType.PIE.toLowerCase()) {
      //     chartConfig.plotOptions.pie.dataLabels.enabled = config.dataLabels
      //   }
      //   const chartType = Array.from(new Set(chartConfig.series.map(e => e.type)));
      //   chartType.forEach(data => {
      //     if (data) {
      //       if (data === ChartType.LINE.toLowerCase()) {
      //         chartConfig.plotOptions.line.dataLabels = {
      //           enabled: true,
      //           formatter: function () {
      //             return decimalPipe.transform(-this.y)
      //           }              }
      //       }
      //       if (data === ChartType.GROUP_BAR.toLowerCase() || data === ChartType.COLUMN.toLowerCase() || data === ChartType.BAR.toLowerCase() || data === ChartType.STACK.toLowerCase()) {
      //         chartConfig.plotOptions.column.dataLabels = {
      //           enabled: true,
      //           formatter: function () {
      //             return decimalPipe.transform(-this.y)
      //           }              }
      //       }
      //       if (data === ChartType.AREA.toLowerCase() || data === ChartType.AREASPLINE.toLowerCase()) {
      //         chartConfig.plotOptions.areaspline.dataLabels = {
      //           enabled: true,
      //           formatter: function () {
      //             return decimalPipe.transform(-this.y)
      //           }              }
      //         chartConfig.plotOptions.area.dataLabels = {
      //           enabled: true,
      //           formatter: function () {
      //             return decimalPipe.transform(-this.y)
      //           }
      //         }
      //       }
      //     }
      //   })
      // }

    }
    if (config && config.legend) {
      if (config.legend.align) {
        chartConfig.legend.align = config.legend.align
      }
      if (config.legend.verticalAlign) {
        chartConfig.legend.verticalAlign = config.legend.verticalAlign
      }
    }
    if (chartConfig && chartConfig.chart && chartConfig.chart.colors) {
      if (themeName === 'dark') {
        chartConfig.colors = [...chartConfig.chart.colors, ...darkColorLists];
      } else if (themeName === 'default') {
        chartConfig.colors = [...chartConfig.chart.colors, ...lightColorLists];
      } else {
        chartConfig.colors = [...chartConfig.chart.colors, ...darkColorLists];
      }
    } else if (config && config.colors) {
      if (themeName === 'dark') {
        chartConfig.colors = [...config.colors, ...darkColorLists];
      } else if (themeName === 'default') {
        chartConfig.colors = [...config.colors, ...lightColorLists];
      } else {
        chartConfig.colors = [...config.colors, ...darkColorLists];
      }
    }// else {
    //   chartConfig.colors = darkColorLists;
    // }
    if (config && (config.dataLabels || config.dataLabels === false)) {
      // console.log(chartConfig)
      if (chartConfig.chart.type && chartConfig.chart.type.toLowerCase() === ChartType.PIE.toLowerCase()) {
        chartConfig.plotOptions.pie.dataLabels.enabled = config.dataLabels
      }
      const chartType = Array.from(new Set(chartConfig.series.map(e => e.type)));
      chartType.forEach(data => {
        if (data) {
          if (data === ChartType.LINE.toLowerCase()) {
            chartConfig.plotOptions.line.dataLabels.enabled = config.dataLabels
          }
          if (data === ChartType.GROUP_BAR.toLowerCase() || data === ChartType.COLUMN.toLowerCase() || data === ChartType.BAR.toLowerCase() || data === ChartType.STACK.toLowerCase()) {
            chartConfig.plotOptions.column.dataLabels.enabled = config.dataLabels
          }
          if (data === ChartType.AREA.toLowerCase() || data === ChartType.AREASPLINE.toLowerCase()) {
            chartConfig.plotOptions.areaspline.dataLabels.enabled = config.dataLabels
            chartConfig.plotOptions.area.dataLabels.enabled = config.dataLabels
          }
        }
      })
    }

  }
}
