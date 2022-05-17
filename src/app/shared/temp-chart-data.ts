export const tempChartData = {
  'column': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 863,
      'height': 186
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': 'Tỷ đồng'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019
      ],
      'lineWidth': 1
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': false
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Tổng doanh thu',
        'type': 'column',
        'data': [
          6435,
          7847,
          9232,
          12822,
          18317,
          29590,
          38600,
          47100
        ],
        'tooltips': [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        'tooltip': {
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'line': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 411,
      'height': 178
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': 'Thuê bao'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
      ],
      'lineWidth': 1,
      'crosshair': {
        'width': 1
      },
      'gridLineDashStyle': 'Dash'
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': true
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'TB Asia & Pacific',
        'type': 'line',
        'data': [
          37.8,
          46.5,
          60.3,
          70.9,
          89,
          89
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Thuê bao',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      },
      {
        'name': 'TB thế giới',
        'type': 'line',
        'data': [
          45.1,
          52.2,
          62,
          70.1,
          83,
          83
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Thuê bao',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      },
      {
        'name': 'Việt Nam',
        'type': 'line',
        'data': [
          34.8,
          39,
          47.9,
          55.27,
          62.55,
          63.96
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Thuê bao',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'pie': {
    'chart': {
      'type': 'pie',
      'backgroundColor': null,
      'plotBackgroundColor': null,
      'plotBorderWidth': null,
      'plotShadow': false,
      'width': 411,
      'height': 186
    },
    'title': {
      'text': 'Tháng 03/2020',
      'align': 'center',
      'verticalAlign': 'bottom',
      'style': {
        'fontSize': '13px',
        'fontWeight': 'normal'
      }
    },
    'legend': {
      'enabled': false,
      'layout': 'vertical',
      'align': 'right',
      'verticalAlign': 'middle'
    },
    'plotOptions': {
      'pie': {
        'allowPointSelect': true,
        'cursor': 'pointer',
        'dataLabels': {
          'enabled': true,
          'useHTML': true,
          'style': {
            'textOverflow': 'ellipsis'
          }
        },
        'showInLegend': true
      }
    },
    'tooltip': {
      'useHTML': true,
      'headerFormat': '<table>',
      'pointFormat': '<span style=\'color: {point.color}\'>●</span> {point.name}: <b>{point.y}</b> Triệu TB ({point.percentage:.2f} %)',
      'footerFormat': '</table>'
    },
    'exporting': {
      'enabled': true,
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'series': [
      {
        'name': 'Thị phần thuê bao điện thoại cố định',
        'innerSize': '30%',
        'data': [
          {
            'y': 2.34,
            'name': 'vnpt',
            'tooltipLabel': null
          },
          {
            'y': 1.11,
            'name': 'viettel',
            'tooltipLabel': null
          },
          {
            'y': 0.05,
            'name': 'spt',
            'tooltipLabel': null
          },
          {
            'y': 0.03,
            'name': 'fpt\n  telecom',
            'tooltipLabel': null
          },
          {
            'y': 0.01,
            'name': 'itelecom',
            'tooltipLabel': null
          }
        ]
      }
    ],
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'area': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 411,
      'height': 154
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': '%'
        },
        'max': 100,
        'showEmpty': false,
        'opposite': false,
        'gridLineDashStyle': 'Dash',
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        '03/2019',
        '04/2019',
        '05/2019',
        '06/2019',
        '07/2019',
        '08/2019',
        '09/2019',
        '10/2019',
        '11/2019',
        '12/2019',
        '01/2020',
        '02/2020',
        '03/2020'
      ],
      'lineWidth': 1,
      'crosshair': {
        'width': 1
      },
      'gridLineDashStyle': 'Dash'
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': false
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Tỷ lệ thuê bao ĐTDĐ chỉ sử dụng thoại, tin nhắn trên tổng thuê bao ĐTDĐ của Việt Nam',
        'type': 'areaspline',
        'data': [
          56.74,
          56.6,
          56.18,
          55.35,
          54.58,
          53.81,
          52.5,
          51.22,
          50.78,
          50.39,
          48.5,
          48.67,
          48.14
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' %',
          'headerFormat': '<small style=\'font-size:12px\'>Tháng {point.key}</small><br><table>'
        }
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'combo': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 411,
      'height': 186
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': 'GBPS'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      },
      {
        'lineWidth': 1,
        'title': {
          'text': 'GBPS'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': true,
        'gridLineWidth': 1,
        'index': 1
      }
    ],
    'xAxis': {
      'categories': [
        2014,
        2015,
        2016,
        2017,
        2018,
        2019
      ],
      'lineWidth': 1,
      'crosshair': {
        'width': 1
      },
      'gridLineDashStyle': 'Dash'
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': true
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Việt Nam',
        'type': 'column',
        'data': [
          705,
          944,
          1715,
          2314,
          2692,
          3988
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' GBPS',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        },
        'yAxis': 0
      },
      {
        'name': 'TB thế giới',
        'type': 'line',
        'data': [
          905.94,
          1638.45,
          3111.35,
          5450.86,
          7613.8,
          13313
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' GBPS',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        },
        'yAxis': 1
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'radar': {
    'chart': {
      'backgroundColor': null,
      'polar': true,
      'width': 565,
      'height': 276
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'gridLineInterpolation': 'polygon',
        'gridLineDashStyle': 'LongDash',
        'gridLineWidth': 0.9,
        'showEmpty': false,
        'lineWidth': 0,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        'Điểm GCI - Hợp tác của Việt Nam',
        'Điểm GCI - Kỹ thuật của Việt Nam',
        'Điểm GCI - Nâng cao năng lực của Việt Nam',
        'Điểm GCI - Pháp lý của Việt Nam',
        'Điểm GCI - Tổ chức của Việt Nam'
      ],
      'tickmarkPlacement': 'on',
      'lineWidth': 0
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': false
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 20180101,
        'type': 'area',
        'data': [
          0.12,
          0.13,
          0.1,
          0.17,
          0.18
        ],
        'tooltips': [
          'Điểm GCI - Hợp tác của Việt Nam0.117',
          'Điểm GCI - Kỹ thuật của Việt Nam0.125',
          'Điểm GCI - Nâng cao năng lực của Việt Nam0.104',
          'Điểm GCI - Pháp lý của Việt Nam0.165',
          'Điểm GCI - Tổ chức của Việt Nam0.183'
        ],
        'tooltip': {},
        'pointPlacement': 'on'
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'stack': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 411,
      'height': 186
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': 'Địa chỉ IPv6'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
      ],
      'lineWidth': 1
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': true
    },
    'plotOptions': {
      'column': {
        'stacking': 'normal',
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Tổng số địa chỉ IPv6 - Số khối /32',
        'type': 'column',
        'data': [
          10,
          12,
          15,
          17,
          18,
          20,
          21,
          28,
          44,
          53,
          87,
          95
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Địa chỉ IPv6',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      },
      {
        'name': 'Tổng số địa chỉ IPv6 - Số khối /48',
        'type': 'column',
        'data': [
          17,
          18,
          19,
          21,
          23,
          24,
          30,
          52,
          62,
          88,
          119,
          123
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Địa chỉ IPv6',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'bar': {
    'chart': {
      'backgroundColor': null,
      'type': 'bar',
      'width': 863,
      'height': 299
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'reverse': true,
        'min': 2012,
        'title': {
          'text': 'Năm'
        },
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'type': 'category',
      'lineWidth': 1,
      'gridLineDashStyle': 'Dash'
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': false
    },
    'plotOptions': {
      'bar': {
        'dataLabels': {
          'enabled': false
        }
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'exporting': {
      'enabled': true,
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'series': [
      {
        'name': 'Năm hoàn thành',
        'type': 'column',
        'zoneAxis': 'x',
        'dataLabels': {
          'enabled': true,
          'format': '{y}'
        },
        'dataSorting': {
          'enabled': true,
          'sortKey': 'y'
        },
        'data': [
          {
            'name': 'Brunei Darussalam',
            'y': 2017,
            'index': 0,
            'x': 9
          },
          {
            'name': 'Cambodia',
            'y': 2023,
            'index': 1,
            'x': 1
          },
          {
            'name': 'Indonesia',
            'y': 2020,
            'index': 2,
            'x': 3
          },
          {
            'name': 'Lao People Dem. Rep.',
            'y': 2025,
            'index': 3,
            'x': 0
          },
          {
            'name': 'Malaysia',
            'y': 2019,
            'index': 4,
            'x': 7
          },
          {
            'name': 'Myanmar',
            'y': 2020,
            'index': 5,
            'x': 4
          },
          {
            'name': 'Philippines',
            'y': 2023,
            'index': 6,
            'x': 2
          },
          {
            'name': 'Singapore',
            'y': 2019,
            'index': 7,
            'x': 8
          },
          {
            'name': 'Thailand',
            'y': 2020,
            'index': 8,
            'x': 5
          },
          {
            'name': 'Viet Nam',
            'y': 2020,
            'index': 9,
            'x': 6
          }
        ]
      }
    ],
    'responsive': {
      'rules': [
        {
          'condition': {},
          'chartOptions': {
            'legend': {
              'layout': 'horizontal',
              'align': 'center',
              'verticalAlign': 'top'
            }
          },
          '_id': 'highcharts-gf43v3f-12'
        }
      ]
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ],
    'isResponsiveOptions': true
  },
  'multiColumn': {
    'chart': {
      'backgroundColor': null,
      'polar': false,
      'width': 411,
      'height': 186
    },
    'exporting': {
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'title': {
      'text': ''
    },
    'yAxis': [
      {
        'lineWidth': 1,
        'title': {
          'text': 'Tỷ đồng'
        },
        'gridLineDashStyle': 'Dash',
        'showEmpty': false,
        'opposite': false,
        'gridLineWidth': 1,
        'index': 0
      }
    ],
    'xAxis': {
      'categories': [
        2018,
        2019
      ],
      'lineWidth': 1
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': true
    },
    'plotOptions': {
      'column': {
        'stacking': null,
        'dataLabels': {
          'enabled': false
        }
      },
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'areaspline': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'area': {
        'dataLabels': {
          'enabled': false
        },
        'fillOpacity': 0.2
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Doanh thu bưu chính',
        'type': 'column',
        'data': [
          4916,
          5700
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Tỷ đồng',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      },
      {
        'name': 'Tổng doanh thu',
        'type': 'column',
        'data': [
          6175,
          9700
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Tỷ đồng',
          'headerFormat': '<small style=\'font-size:12px\'>Năm {point.key}</small><br><table>'
        }
      }
    ],
    'tooltip': {
      'shared': true
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ]
  },
  'correlate': {
    'chart': {
      'backgroundColor': null,
      'type': '',
      'width': 539,
      'height': 400
    },
    'title': {
      'text': ''
    },
    'exporting': {
      'enabled': true,
      'buttons': {
        'contextButton': {
          'menuItems': [
            'downloadPNG',
            'downloadSVG',
            'downloadJPEG',
            'downloadPDF',
            'downloadXLS'
          ]
        }
      }
    },
    'yAxis': {
      'visible': false,
      'title': {
        'text': ''
      },
      'gridLineWidth': 1
    },
    'xAxis': {
      'categories': [
        2014,
        2015,
        2016,
        2017,
        2018,
        2019
      ],
      'lineWidth': 1,
      'crosshair': {
        'width': 1
      },
      'gridLineDashStyle': 'Dash'
    },
    'legend': {
      'layout': 'horizontal',
      'align': 'center',
      'verticalAlign': 'top',
      'enabled': true
    },
    'plotOptions': {
      'line': {
        'dataLabels': {
          'enabled': false
        }
      },
      'series': {
        'label': {
          'connectorAllowed': false
        }
      }
    },
    'series': [
      {
        'name': 'Doanh thu dịch vụ viễn thông',
        'type': 'line',
        'data': [
          null,
          97.6,
          100,
          97.09,
          95.25,
          95.1
        ],
        'tooltips': [
          null
        ],
        'tooltip': {
          'valueSuffix': ' Nghìn tỷ VNĐ'
        },
        'fillColor': {
          'linearGradient': [
            0,
            0,
            0,
            300
          ],
          'stops': [
            [
              0,
              '#3366ff'
            ],
            [
              1,
              'rgba(51,102,255,0)'
            ]
          ]
        },
        'orgData': [
          null,
          132.7,
          135.96,
          132,
          129.5,
          129.3
        ]
      },
      {
        'name': 'Doanh thu dịch vụ viễn thông cố định',
        'type': 'line',
        'data': [
          72.86,
          77.14,
          79.41,
          91.59,
          100,
          27.19
        ],
        'tooltips': [],
        'tooltip': {
          'valueSuffix': ' Nghìn tỷ VNĐ'
        },
        'fillColor': {
          'linearGradient': [
            0,
            0,
            0,
            300
          ],
          'stops': [
            [
              0,
              '#00d68f'
            ],
            [
              1,
              'rgba(0,214,143,0)'
            ]
          ]
        },
        'orgData': [
          14.47,
          15.32,
          15.77,
          18.19,
          19.86,
          5.4
        ]
      },
      {
        'name': 'Doanh thu toàn ngành',
        'type': 'line',
        'data': [
          null,
          71.32,
          81.26,
          80.9,
          84.27,
          100
        ],
        'tooltips': [
          null
        ],
        'tooltip': {
          'valueSuffix': ' Nghìn tỷ VNĐ'
        },
        'fillColor': {
          'linearGradient': [
            0,
            0,
            0,
            300
          ],
          'stops': [
            [
              0,
              '#f45b5b'
            ],
            [
              1,
              'rgba(244,91,91,0)'
            ]
          ]
        },
        'orgData': [
          null,
          335,
          381.7,
          380,
          395.8,
          469.7
        ]
      }
    ],
    'tooltip': {
      'shared': true
    },
    'responsive': {
      'rules': [
        {
          'condition': {},
          'chartOptions': {
            'legend': {
              'layout': 'horizontal',
              'align': 'center',
              'verticalAlign': 'top',
              'enabled': true
            }
          },
          '_id': 'highcharts-qc5xs99-156'
        }
      ]
    },
    'colors': [
      '#3366ff',
      '#00d68f',
      '#f45b5b',
      '#7798BF',
      '#aaeeee',
      '#ff0066',
      '#eeaaee',
      '#55BF3B',
      '#DF5353',
      '#7798BF',
      '#aaeeee'
    ],
    'isResponsiveOptions': true
  },
  'kpi': {
    'options': {
      'series': [
        {
          'type': 'gauge',
          'detail': {
            'fontSize': 20,
            'offsetCenter': [
              0,
              '100%'
            ]
          },
          'min': 0,
          'max': 100,
          'data': [
            {
              'value': 94
            }
          ],
          'splitLine': {
            'show': false,
            'length': 5,
            'lineStyle': {}
          },
          'axisTick': {
            'splitNumber': [
              0,
              25,
              50,
              100
            ]
          },
          'axisLabel': {
            'show': false
          },
          'axisLine': {
            'lineStyle': {
              'color': [
                [
                  0.94,
                  '#28a745'
                ],
                [
                  1,
                  '#fffbff'
                ]
              ],
              'width': 10
            }
          },
          'markLine': {
            'show': false
          },
          'pointer': {
            'width': 3
          }
        }
      ]
    },
    'results': {
      'kpiValue': '47.100',
      'kpiDisplay': 'Tổng doanh thu',
      'kpiValueLevel': 0,
      'gaugeValue': 94,
      'gaugeValueLevel': 0,
      'planTimeText': 'Năm 2019',
      'planTextTarget': 50000,
      'src': 'Vụ Bưu chính',
      'unitName': 'Tỷ đồng',
      'deltaValue': 8500,
      'percentDisplay': 22.02,
      'deltaValueLevel': 0,
      'deltaThanText': 'năm 2018'
    }
  },
  'overView': [
    {
      'id': 343,
      'chartCode': 'TONG_QUAN',
      'chartName': 'Tổng quan',
      'titleChart': 'Tổng quan tháng 04/2020',
      'typeChart': 'OVERVIEW_CHART',
      'timeTypeDefault': 2,
      'relativeTime': null,
      'chartUrl': null,
      'groupChartId': null,
      'chartIdNextto': null,
      'orderIndex': 1,
      'groupKpiCode': '',
      'domainCode': 'TONG_QUAN icon-chart-pie',
      'status': 1,
      'description': null,
      'updateTime': '2020-03-31T00:00:00Z',
      'updateUser': 'LANT1',
      'chartConfig': null,
      'filterParams': {
        'TIMETYPE': '2',
        'TODATE': '20200401'
      },
      'details': [
        {
          'chartType': 'PIE',
          'orderIndex': 3,
          'kpiInfo': {
            'id': 465,
            'kpiId': 14000,
            'kpiCode': 'ALL_CT_DAT_KH',
            'kpiName': 'Chỉ tiêu đạt, vượt mục tiêu',
            'kpiDisplay': 'Đạt, vượt mục tiêu',
            'unitKpi': 'CHITIEU',
            'unitViewCode': 'CHITIEU',
            'unitViewName': null,
            'rate': 1,
            'unitName': 'Chỉ tiêu',
            'tableName': null,
            'status': 1,
            'groupKpiCode': 'NHOM_CT_TONG_QUAN',
            'groupKpiName': null,
            'domainCode': 'TONG_QUAN',
            'domainName': null,
            'source': 'MIC',
            'description': 'Chỉ tiêu đạt, vượt mục tiêu',
            'updateTime': '2020-03-23T00:00:00Z',
            'updateUser': 'nhungkt',
            'formulaLevel': 'SUM',
            'formulaQuar': null,
            'formulaYear': null,
            'alarmThresholdType': 1,
            'alarmThresholdTypeName': null,
            'alarmPlanType': 1,
            'alarmPlanTypeName': null,
            'formulaAcc': '',
            'kpiType': 1,
            'kpiTypeName': null
          },
          'data': [
            {
              'VAL': 26,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'VN',
              'OBJ_NAME': 'Việt Nam',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 11,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'VN',
              'OBJ_NAME': 'Việt Nam',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 266,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'VN',
              'OBJ_NAME': 'Việt Nam',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'VN',
              'OBJ_NAME': 'Việt Nam',
              'PRD_ID': '20200401'
            }
          ],
          'displayConfigs': [
            {
              'id': 1627,
              'itemChartId': 557,
              'columnQuery': 'OBJ_NAME',
              'dataType': 'TEXT',
              'columnChart': 'X_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1628,
              'itemChartId': 557,
              'columnQuery': 'VAL',
              'dataType': 'FLOAT',
              'columnChart': 'Y_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1629,
              'itemChartId': 557,
              'columnQuery': 'KPI_DISPLAY',
              'dataType': 'TEXT',
              'columnChart': 'LEGEND',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            }
          ],
          'seriesData': {
            'data': [
              {
                'name': 'Đạt, vượt mục tiêu',
                'type': 'PIE',
                'data': [
                  26
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                },
                'y': 26
              },
              {
                'name': 'Chưa đạt mục tiêu',
                'type': 'PIE',
                'data': [
                  11
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                },
                'y': 11
              },
              {
                'name': 'Chưa xác định mục tiêu',
                'type': 'PIE',
                'data': [
                  266
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                },
                'y': 266
              },
              {
                'name': 'Chưa được cập nhật số liệu',
                'type': 'PIE',
                'data': [
                  0
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                },
                'y': 0
              }
            ],
            'X_AXIS': [
              'Việt Nam'
            ],
            'Y_AXIS': [
              26,
              11,
              266
            ],
            'LEGEND': [
              'Đạt, vượt mục tiêu',
              'Chưa đạt mục tiêu',
              'Chưa xác định mục tiêu',
              'Chưa được cập nhật số liệu'
            ]
          }
        }
      ],
      'xAxis': [
        'Việt Nam'
      ],
      'series': {
        'data': [
          {
            'name': 'Đạt, vượt mục tiêu',
            'type': 'PIE',
            'data': [
              26
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            },
            'y': 26
          },
          {
            'name': 'Chưa đạt mục tiêu',
            'type': 'PIE',
            'data': [
              11
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            },
            'y': 11
          },
          {
            'name': 'Chưa xác định mục tiêu',
            'type': 'PIE',
            'data': [
              266
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            },
            'y': 266
          },
          {
            'name': 'Chưa được cập nhật số liệu',
            'type': 'PIE',
            'data': [
              0
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            },
            'y': 0
          }
        ]
      }
    },
    {
      'id': 343,
      'chartCode': 'TONG_QUAN',
      'chartName': 'Tổng quan',
      'titleChart': 'Tổng quan tháng 04/2020',
      'typeChart': 'OVERVIEW_CHART',
      'timeTypeDefault': 2,
      'relativeTime': null,
      'chartUrl': null,
      'groupChartId': null,
      'chartIdNextto': null,
      'orderIndex': 1,
      'groupKpiCode': '',
      'domainCode': '',
      'status': 1,
      'description': null,
      'updateTime': '2020-03-31T00:00:00Z',
      'updateUser': 'LANT1',
      'chartConfig': null,
      'filterParams': {
        'TIMETYPE': '2',
        'TODATE': '20200401'
      },
      'details': [
        {
          'chartType': 'STACK_BARPLOT',
          'orderIndex': 2,
          'kpiInfo': {
            'id': 465,
            'kpiId': 14000,
            'kpiCode': 'ALL_CT_DAT_KH',
            'kpiName': 'Chỉ tiêu đạt, vượt mục tiêu',
            'kpiDisplay': 'Đạt, vượt mục tiêu',
            'unitKpi': 'CHITIEU',
            'unitViewCode': 'CHITIEU',
            'unitViewName': null,
            'rate': 1,
            'unitName': 'Chỉ tiêu',
            'tableName': null,
            'status': 1,
            'groupKpiCode': 'NHOM_CT_TONG_QUAN',
            'groupKpiName': null,
            'domainCode': 'TONG_QUAN',
            'domainName': null,
            'source': 'MIC',
            'description': 'Chỉ tiêu đạt, vượt mục tiêu',
            'updateTime': '2020-03-23T00:00:00Z',
            'updateUser': 'nhungkt',
            'formulaLevel': 'SUM',
            'formulaQuar': null,
            'formulaYear': null,
            'alarmThresholdType': 1,
            'alarmThresholdTypeName': null,
            'alarmPlanType': 1,
            'alarmPlanTypeName': null,
            'formulaAcc': '',
            'kpiType': 1,
            'kpiTypeName': null
          },
          'data': [
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'CHUNG_THUC_DIEN_TU',
              'OBJ_NAME': 'Chứng thực điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 3,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'BAO_CHI',
              'OBJ_NAME': 'Báo chí',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'PHAT_THANH_TH_TTDT',
              'OBJ_NAME': 'Phát thanh truyền hình & Thông tin điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'THONG_TIN_CO_SO',
              'OBJ_NAME': 'Thông tin cơ sở',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'THONG_TIN_DOI_NGOAI',
              'OBJ_NAME': 'Thông tin đối ngoại',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 3,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'XB_IN_PHAT_HANH',
              'OBJ_NAME': 'Xuất bản, in, phát hành',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'CHUNG_THUC_DIEN_TU',
              'OBJ_NAME': 'Chứng thực điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'BAO_CHI',
              'OBJ_NAME': 'Báo chí',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'PHAT_THANH_TH_TTDT',
              'OBJ_NAME': 'Phát thanh truyền hình & Thông tin điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'THONG_TIN_CO_SO',
              'OBJ_NAME': 'Thông tin cơ sở',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'THONG_TIN_DOI_NGOAI',
              'OBJ_NAME': 'Thông tin đối ngoại',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'XB_IN_PHAT_HANH',
              'OBJ_NAME': 'Xuất bản, in, phát hành',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'CHUNG_THUC_DIEN_TU',
              'OBJ_NAME': 'Chứng thực điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 23,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'BAO_CHI',
              'OBJ_NAME': 'Báo chí',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 7,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'PHAT_THANH_TH_TTDT',
              'OBJ_NAME': 'Phát thanh truyền hình & Thông tin điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 76,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'THONG_TIN_CO_SO',
              'OBJ_NAME': 'Thông tin cơ sở',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 6,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'THONG_TIN_DOI_NGOAI',
              'OBJ_NAME': 'Thông tin đối ngoại',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 32,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'XB_IN_PHAT_HANH',
              'OBJ_NAME': 'Xuất bản, in, phát hành',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'CHUNG_THUC_DIEN_TU',
              'OBJ_NAME': 'Chứng thực điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'BAO_CHI',
              'OBJ_NAME': 'Báo chí',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'PHAT_THANH_TH_TTDT',
              'OBJ_NAME': 'Phát thanh truyền hình & Thông tin điện tử',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'THONG_TIN_CO_SO',
              'OBJ_NAME': 'Thông tin cơ sở',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'THONG_TIN_DOI_NGOAI',
              'OBJ_NAME': 'Thông tin đối ngoại',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'XB_IN_PHAT_HANH',
              'OBJ_NAME': 'Xuất bản, in, phát hành',
              'PRD_ID': '20200401'
            }
          ],
          'displayConfigs': [
            {
              'id': 1621,
              'itemChartId': 555,
              'columnQuery': 'KPI_DISPLAY',
              'dataType': 'TEXT',
              'columnChart': 'LEGEND',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1622,
              'itemChartId': 555,
              'columnQuery': 'VAL',
              'dataType': 'FLOAT',
              'columnChart': 'Y_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1623,
              'itemChartId': 555,
              'columnQuery': 'OBJ_NAME',
              'dataType': 'TEXT',
              'columnChart': 'X_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            }
          ],
          'seriesData': {
            'data': [
              {
                'name': 'Chưa xác định mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  23,
                  1,
                  7,
                  76,
                  6,
                  32
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Chưa được cập nhật số liệu',
                'type': 'STACK_BARPLOT',
                'data': [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Chưa đạt mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  0,
                  0,
                  2,
                  0,
                  1,
                  0
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Đạt, vượt mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  3,
                  2,
                  2,
                  2,
                  2,
                  3
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              }
            ],
            'LEGEND': [
              'Chưa xác định mục tiêu',
              'Chưa được cập nhật số liệu',
              'Chưa đạt mục tiêu',
              'Đạt, vượt mục tiêu'
            ],
            'Y_AXIS': [
              2,
              3,
              2,
              2,
              2,
              3,
              2,
              1,
              1,
              23,
              7,
              76,
              6,
              32
            ],
            'X_AXIS': [
              'Báo chí',
              'Chứng thực điện tử',
              'Phát thanh truyền hình & Thông tin điện tử',
              'Thông tin cơ sở',
              'Thông tin đối ngoại',
              'Xuất bản, in, phát hành'
            ]
          }
        }
      ],
      'xAxis': [
        'Báo chí',
        'Chứng thực điện tử',
        'Phát thanh truyền hình & Thông tin điện tử',
        'Thông tin cơ sở',
        'Thông tin đối ngoại',
        'Xuất bản, in, phát hành'
      ],
      'series': {
        'data': [
          {
            'name': 'Chưa xác định mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              23,
              1,
              7,
              76,
              6,
              32
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Chưa được cập nhật số liệu',
            'type': 'STACK_BARPLOT',
            'data': [
              0,
              0,
              0,
              0,
              0,
              0
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Chưa đạt mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              0,
              0,
              2,
              0,
              1,
              0
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Đạt, vượt mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              3,
              2,
              2,
              2,
              2,
              3
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          }
        ]
      }
    },
    {
      'id': 343,
      'chartCode': 'TONG_QUAN',
      'chartName': 'Tổng quan',
      'titleChart': 'Tổng quan tháng 04/2020',
      'typeChart': 'OVERVIEW_CHART',
      'timeTypeDefault': 2,
      'relativeTime': null,
      'chartUrl': null,
      'groupChartId': null,
      'chartIdNextto': null,
      'orderIndex': 1,
      'groupKpiCode': '',
      'domainCode': '',
      'status': 1,
      'description': null,
      'updateTime': '2020-03-31T00:00:00Z',
      'updateUser': 'LANT1',
      'chartConfig': null,
      'filterParams': {
        'TIMETYPE': '2',
        'TODATE': '20200401'
      },
      'details': [
        {
          'chartType': 'STACK_BARPLOT',
          'orderIndex': 1,
          'kpiInfo': {
            'id': 465,
            'kpiId': 14000,
            'kpiCode': 'ALL_CT_DAT_KH',
            'kpiName': 'Chỉ tiêu đạt, vượt mục tiêu',
            'kpiDisplay': 'Đạt, vượt mục tiêu',
            'unitKpi': 'CHITIEU',
            'unitViewCode': 'CHITIEU',
            'unitViewName': null,
            'rate': 1,
            'unitName': 'Chỉ tiêu',
            'tableName': null,
            'status': 1,
            'groupKpiCode': 'NHOM_CT_TONG_QUAN',
            'groupKpiName': null,
            'domainCode': 'TONG_QUAN',
            'domainName': null,
            'source': 'MIC',
            'description': 'Chỉ tiêu đạt, vượt mục tiêu',
            'updateTime': '2020-03-23T00:00:00Z',
            'updateUser': 'nhungkt',
            'formulaLevel': 'SUM',
            'formulaQuar': null,
            'formulaYear': null,
            'alarmThresholdType': 1,
            'alarmThresholdTypeName': null,
            'alarmPlanType': 1,
            'alarmPlanTypeName': null,
            'formulaAcc': '',
            'kpiType': 1,
            'kpiTypeName': null
          },
          'data': [
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'INTERNET',
              'OBJ_NAME': 'Internet',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 3,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'TAN_SO_VO_TUYEN',
              'OBJ_NAME': 'Tần số vô tuyến điện',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'VIEN_THONG',
              'OBJ_NAME': 'Viễn thông',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'BUU_CHINH',
              'OBJ_NAME': 'Bưu chính',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 3,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'CONG_NGHIEP_ICT',
              'OBJ_NAME': 'Công nghiệp ICT',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 3,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'ATTT',
              'OBJ_NAME': 'An toàn thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Đạt, vượt mục tiêu',
              'KPI_ID': 14000,
              'OBJ_CODE': 'UNG_DUNG_CNTT',
              'OBJ_NAME': 'Ứng dụng công nghệ thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'INTERNET',
              'OBJ_NAME': 'Internet',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'TAN_SO_VO_TUYEN',
              'OBJ_NAME': 'Tần số vô tuyến điện',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'VIEN_THONG',
              'OBJ_NAME': 'Viễn thông',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'BUU_CHINH',
              'OBJ_NAME': 'Bưu chính',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'CONG_NGHIEP_ICT',
              'OBJ_NAME': 'Công nghiệp ICT',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'ATTT',
              'OBJ_NAME': 'An toàn thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 1,
              'KPI_DISPLAY': 'Chưa đạt mục tiêu',
              'KPI_ID': 14001,
              'OBJ_CODE': 'UNG_DUNG_CNTT',
              'OBJ_NAME': 'Ứng dụng công nghệ thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 6,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'INTERNET',
              'OBJ_NAME': 'Internet',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 2,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'TAN_SO_VO_TUYEN',
              'OBJ_NAME': 'Tần số vô tuyến điện',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 36,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'VIEN_THONG',
              'OBJ_NAME': 'Viễn thông',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 27,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'BUU_CHINH',
              'OBJ_NAME': 'Bưu chính',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 19,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'CONG_NGHIEP_ICT',
              'OBJ_NAME': 'Công nghiệp ICT',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 14,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'ATTT',
              'OBJ_NAME': 'An toàn thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 17,
              'KPI_DISPLAY': 'Chưa xác định mục tiêu',
              'KPI_ID': 14002,
              'OBJ_CODE': 'UNG_DUNG_CNTT',
              'OBJ_NAME': 'Ứng dụng công nghệ thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'INTERNET',
              'OBJ_NAME': 'Internet',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'TAN_SO_VO_TUYEN',
              'OBJ_NAME': 'Tần số vô tuyến điện',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'VIEN_THONG',
              'OBJ_NAME': 'Viễn thông',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'BUU_CHINH',
              'OBJ_NAME': 'Bưu chính',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'CONG_NGHIEP_ICT',
              'OBJ_NAME': 'Công nghiệp ICT',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'ATTT',
              'OBJ_NAME': 'An toàn thông tin',
              'PRD_ID': '20200401'
            },
            {
              'VAL': 0,
              'KPI_DISPLAY': 'Chưa được cập nhật số liệu',
              'KPI_ID': 14003,
              'OBJ_CODE': 'UNG_DUNG_CNTT',
              'OBJ_NAME': 'Ứng dụng công nghệ thông tin',
              'PRD_ID': '20200401'
            }
          ],
          'displayConfigs': [
            {
              'id': 1624,
              'itemChartId': 556,
              'columnQuery': 'OBJ_NAME',
              'dataType': 'TEXT',
              'columnChart': 'X_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1625,
              'itemChartId': 556,
              'columnQuery': 'VAL',
              'dataType': 'FLOAT',
              'columnChart': 'Y_AXIS',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            },
            {
              'id': 1626,
              'itemChartId': 556,
              'columnQuery': 'KPI_DISPLAY',
              'dataType': 'TEXT',
              'columnChart': 'LEGEND',
              'isRequire': 1,
              'status': 1,
              'description': 'Không xóa',
              'updateTime': '2020-03-31T00:00:00Z',
              'updateUser': 'LANT1'
            }
          ],
          'seriesData': {
            'data': [
              {
                'name': 'Chưa xác định mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  14,
                  27,
                  19,
                  6,
                  2,
                  36,
                  17
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Chưa được cập nhật số liệu',
                'type': 'STACK_BARPLOT',
                'data': [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Chưa đạt mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  2,
                  0,
                  2,
                  1,
                  1,
                  1,
                  1
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              },
              {
                'name': 'Đạt, vượt mục tiêu',
                'type': 'STACK_BARPLOT',
                'data': [
                  3,
                  2,
                  3,
                  0,
                  3,
                  1,
                  0
                ],
                'tooltips': [],
                'tooltip': {
                  'valueSuffix': ' Chỉ tiêu'
                }
              }
            ],
            'X_AXIS': [
              'An toàn thông tin',
              'Bưu chính',
              'Công nghiệp ICT',
              'Internet',
              'Tần số vô tuyến điện',
              'Viễn thông',
              'Ứng dụng công nghệ thông tin'
            ],
            'Y_AXIS': [
              3,
              1,
              2,
              3,
              3,
              1,
              1,
              1,
              2,
              2,
              1,
              6,
              2,
              36,
              27,
              19,
              14,
              17
            ],
            'LEGEND': [
              'Chưa xác định mục tiêu',
              'Chưa được cập nhật số liệu',
              'Chưa đạt mục tiêu',
              'Đạt, vượt mục tiêu'
            ]
          }
        }
      ],
      'xAxis': [
        'An toàn thông tin',
        'Bưu chính',
        'Công nghiệp ICT',
        'Internet',
        'Tần số vô tuyến điện',
        'Viễn thông',
        'Ứng dụng công nghệ thông tin'
      ],
      'series': {
        'data': [
          {
            'name': 'Chưa xác định mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              14,
              27,
              19,
              6,
              2,
              36,
              17
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Chưa được cập nhật số liệu',
            'type': 'STACK_BARPLOT',
            'data': [
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Chưa đạt mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              2,
              0,
              2,
              1,
              1,
              1,
              1
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          },
          {
            'name': 'Đạt, vượt mục tiêu',
            'type': 'STACK_BARPLOT',
            'data': [
              3,
              2,
              3,
              0,
              3,
              1,
              0
            ],
            'tooltips': [],
            'tooltip': {
              'valueSuffix': ' Chỉ tiêu'
            }
          }
        ]
      }
    }
  ]
}
