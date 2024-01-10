function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import dayjs from 'dayjs';
import { CrosshairMode, createChart, LineStyle } from 'lightweight-charts';
import React, { useRef, useEffect } from 'react';
import { ThemeEnum } from '@nbit/chart-utils';
function SeriesChart(props) {
  var lineRef = useRef(null);
  var chartRef = useRef(null);
  var chartLineRef = useRef();
  useEffect(function () {
    if (chartRef.current) {
      chartRef.current.setData(props.data);
    }
  }, [props.data]);
  var colorRef = useRef(props.createChart);
  useEffect(function () {
    colorRef.current = props.createChart;
  }, [props.createChart]);
  var chartPriceLineProperty = {
    crosshairMarkerVisible: false,
    baseLineVisible: false,
    priceLineVisible: false,
    lastValueVisible: false
  };
  var gridColor = props.theme === ThemeEnum.light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
  var chartPropertySetting = {
    layout: props.chartLayoutOptions,
    localization: {
      timeFormatter: function timeFormatter(item) {
        return dayjs(item).format('YYYY/MM/DD HH:mm');
      },
      priceFormatter: function priceFormatter(item) {
        return "".concat(item.toFixed(3), "%");
      }
    },
    crosshair: {
      mode: CrosshairMode.Normal
    },
    // 时间刻度和价格刻度
    timeScale: {
      barSpacing: 20,
      tickMarkFormatter: function tickMarkFormatter(time) {
        return dayjs(time).format('MM-DD');
      },
      borderColor: gridColor,
      lockVisibleTimeRangeOnResize: true
    },
    rightPriceScale: {
      borderColor: gridColor,
      // visible: true,
      // alignLabels: true,
      autoScale: true
    },
    grid: {
      vertLines: {
        color: gridColor
      },
      horzLines: {
        color: gridColor
      }
    }
  };
  useEffect(function () {
    var _chartLineRef$current;
    (_chartLineRef$current = chartLineRef.current) === null || _chartLineRef$current === void 0 ? void 0 : _chartLineRef$current.applyOptions(_objectSpread(_objectSpread({}, chartPropertySetting), {}, {
      layout: _objectSpread({}, props.chartLayoutOptions),
      grid: {
        vertLines: {
          color: gridColor
        },
        horzLines: {
          color: gridColor
        }
      },
      rightPriceScale: _objectSpread({}, chartPropertySetting.rightPriceScale)
    }));
  }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor]);
  var floatTooltip = useRef(null);
  useEffect(function () {
    if (floatTooltip.current) {
      floatTooltip.current.style.background = props.createChart.cardBgColor;
      floatTooltip.current.style.color = props.createChart.textColor01;
    }
  }, [props.createChart.cardBgColor, props.createChart.textColor]);
  useEffect(function () {
    var _props$createChart, _document$getElementB;
    chartLineRef.current = createChart(document.getElementById('chart'), chartPropertySetting);
    // #f1ae3d
    chartRef.current = chartLineRef.current.addLineSeries(_objectSpread({
      color: props === null || props === void 0 ? void 0 : (_props$createChart = props.createChart) === null || _props$createChart === void 0 ? void 0 : _props$createChart.brandColor,
      lineWidth: 1,
      lineStyle: LineStyle.Solid
    }, chartPriceLineProperty));
    chartRef.current.setData(props.data);
    chartLineRef.current.timeScale().fitContent();
    var toolTipWidth = 100;
    var toolTipMargin = 15;
    var toolTip = document.createElement('div');
    floatTooltip.current = toolTip;
    toolTip.className = 'series-floating-tooltip';
    toolTip.style.color = colorRef.current.textColor01;
    toolTip.style.background = colorRef.current.cardBgColor03;
    (_document$getElementB = document.getElementById('chart')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.appendChild(toolTip);
    // update tooltip
    chartLineRef.current.subscribeCrosshairMove(function (param) {
      if (!param.time || param.point.x < 0 || param.point.x > lineRef.current.clientWidth || param.point.y < 0 || param.point.y > lineRef.current.clientHeight) {
        toolTip.style.display = 'none';
        return;
      }
      var dateStr = dayjs(param.time).format('MM-DD HH:MM');
      toolTip.style.display = 'block';
      var price = param.seriesPrices.get(chartRef.current);
      // eslint-disable-next-line no-useless-concat
      toolTip.innerHTML = "<div>".concat(dateStr, "</div>") + '<div style="marginTop: 4px">'.concat(price, "%</div>");
      param.point.y;
      var left = param.point.x + toolTipMargin;
      if (left > lineRef.current.clientWidth - toolTipWidth) {
        left = param.point.x - toolTipMargin - toolTipWidth;
      }
      var top = 20;
      toolTip.style.left = "".concat(left, "px");
      toolTip.style.top = "".concat(top, "px");
    });
  }, []);
  return React.createElement("div", {
    ref: lineRef,
    className: "chart",
    id: "chart"
  });
}
SeriesChart.displayName = 'Series';
export { SeriesChart as default };
