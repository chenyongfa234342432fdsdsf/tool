/** 订阅图表点击事件 */
/** 计算图表指标位置 */
var calChartIndicatorPositon = function calChartIndicatorPositon(subIndicator) {
  /** 指标在图表中的位置计算 */
  var selectNum = 1;
  var chartScaleMargins = {
    top: 0.1,
    bottom: 0.01
  };
  var volScaleMargins = {
    top: 0,
    bottom: 0
  };
  var macdScaleMargins = {
    top: 0,
    bottom: 0
  };
  var kdjScaleMargins = {
    top: 0,
    bottom: 0
  };
  var rsiScaleMargins = {
    top: 0,
    bottom: 0
  };
  var wrScaleMargins = {
    top: 0,
    bottom: 0
  };
  for (var i in subIndicator) {
    if (subIndicator[i].select) {
      selectNum += 1;
    }
  }
  if (selectNum) {
    chartScaleMargins = {
      top: 0.12 - (selectNum - 1) * 0.01,
      /** 0.08 2个图表之间的间隔 */
      bottom: 0.01 + selectNum * 0.16 + 0.04
    };
    volScaleMargins = {
      top: 1 - (chartScaleMargins.bottom - 0.04) + 0.06,
      bottom: chartScaleMargins.bottom - 0.04 - 0.16
    };
    if (subIndicator.macd.select) {
      macdScaleMargins = {
        top: 1 - volScaleMargins.bottom + 0.06,
        bottom: volScaleMargins.bottom - 0.16
      };
    } else {
      macdScaleMargins = volScaleMargins;
    }
    if (subIndicator.kdj.select) {
      kdjScaleMargins = {
        top: 1 - macdScaleMargins.bottom + 0.06,
        bottom: macdScaleMargins.bottom - 0.16
      };
    } else {
      kdjScaleMargins = macdScaleMargins;
    }
    if (subIndicator.rsi.select) {
      rsiScaleMargins = {
        top: 1 - kdjScaleMargins.bottom + 0.06,
        bottom: kdjScaleMargins.bottom - 0.16
      };
    } else {
      rsiScaleMargins = kdjScaleMargins;
    }
    if (subIndicator.wr.select) {
      wrScaleMargins = {
        top: 1 - rsiScaleMargins.bottom + 0.06,
        bottom: rsiScaleMargins.bottom - 0.16
      };
    } else {
      wrScaleMargins = rsiScaleMargins;
    }
  }
  // console.log('chartScaleMargins', chartScaleMargins)
  // console.log('volScaleMargins', volScaleMargins)
  // console.log('macdScaleMargins', macdScaleMargins)
  // console.log('kdjScaleMargins', kdjScaleMargins)
  // console.log('rsiScaleMargins', rsiScaleMargins)
  // console.log('wrScaleMargins', wrScaleMargins)
  return {
    chartScaleMargins: chartScaleMargins,
    volScaleMargins: volScaleMargins,
    macdScaleMargins: macdScaleMargins,
    kdjScaleMargins: kdjScaleMargins,
    rsiScaleMargins: rsiScaleMargins,
    wrScaleMargins: wrScaleMargins
  };
};
var calHeightAndLowPoint = function calHeightAndLowPoint(visibleTimeRange, curTimeRef, propsDataRef, timeLineRef, candlestickSeriesRef, chartRef, setCurMaxAndMinPoint) {
  var _chartRef$current, _chartRef$current2;
  if (!visibleTimeRange.from || !visibleTimeRange.to) {
    return;
  }
  var from = visibleTimeRange.from,
    to = visibleTimeRange.to;
  var maxAndMinPoint = {
    min: {
      time: 0,
      value: 0,
      x: 0,
      y: 0
    },
    max: {
      time: 0,
      value: 0,
      x: 0,
      y: 0
    }
  };
  var curRef = curTimeRef.current.unit === 'time' ? timeLineRef.current : candlestickSeriesRef.current;
  if (curTimeRef.current.unit === 'time') {
    var _propsDataRef$current;
    (_propsDataRef$current = propsDataRef.current) === null || _propsDataRef$current === void 0 ? void 0 : _propsDataRef$current.forEach(function (item) {
      if (from === item.time) {
        maxAndMinPoint.max.value = item.close;
        maxAndMinPoint.max.time = item.time;
        maxAndMinPoint.min.value = item.close;
        maxAndMinPoint.min.time = item.time;
      } else if (from < item.time && item.time <= to) {
        if (item.close > maxAndMinPoint.max.value) {
          maxAndMinPoint.max.value = item.close;
          maxAndMinPoint.max.time = item.time;
        }
        if (item.close < maxAndMinPoint.min.value) {
          maxAndMinPoint.min.value = item.close;
          maxAndMinPoint.min.time = item.time;
        }
      }
    });
  } else {
    var _propsDataRef$current2;
    (_propsDataRef$current2 = propsDataRef.current) === null || _propsDataRef$current2 === void 0 ? void 0 : _propsDataRef$current2.forEach(function (item) {
      if (from === item.time) {
        maxAndMinPoint.max.value = item.high;
        maxAndMinPoint.max.time = item.time;
        maxAndMinPoint.min.value = item.low;
        maxAndMinPoint.min.time = item.time;
      } else if (from < item.time && item.time <= to) {
        if (item.high > maxAndMinPoint.max.value) {
          maxAndMinPoint.max.value = item.high;
          maxAndMinPoint.max.time = item.time;
        }
        if (item.low < maxAndMinPoint.min.value) {
          maxAndMinPoint.min.value = item.low;
          maxAndMinPoint.min.time = item.time;
        }
      }
    });
  }
  maxAndMinPoint.max.y = curRef === null || curRef === void 0 ? void 0 : curRef.priceToCoordinate(maxAndMinPoint.max.value);
  maxAndMinPoint.min.y = curRef === null || curRef === void 0 ? void 0 : curRef.priceToCoordinate(maxAndMinPoint.min.value);
  maxAndMinPoint.max.x = (_chartRef$current = chartRef.current) === null || _chartRef$current === void 0 ? void 0 : _chartRef$current.timeScale().timeToCoordinate(maxAndMinPoint.max.time);
  maxAndMinPoint.min.x = (_chartRef$current2 = chartRef.current) === null || _chartRef$current2 === void 0 ? void 0 : _chartRef$current2.timeScale().timeToCoordinate(maxAndMinPoint.min.time);
  setCurMaxAndMinPoint(maxAndMinPoint);
};
var numFormat = function numFormat(num, digits) {
  var si = [{
    value: 1,
    symbol: ''
  }, {
    value: 1e3,
    symbol: 'K'
  }, {
    value: 1e6,
    symbol: 'M'
  }];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};
export { calChartIndicatorPositon, calHeightAndLowPoint, numFormat };
