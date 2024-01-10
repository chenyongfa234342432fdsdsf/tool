function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useRef, useState, useEffect } from 'react';
import { createChart, LineStyle } from 'lightweight-charts';
import { ThemeEnum } from '@nbit/chart-utils';
var TradeDirectionEnum;
(function (TradeDirectionEnum) {
  TradeDirectionEnum["Buy"] = "buy";
  TradeDirectionEnum["Sell"] = "sell";
})(TradeDirectionEnum || (TradeDirectionEnum = {}));
/** 涨跌色 */
var UserUpsAndDownsColorEnum;
(function (UserUpsAndDownsColorEnum) {
  UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["greenUpRedDown"] = 1] = "greenUpRedDown";
  UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["redUpGreenDown"] = 2] = "redUpGreenDown";
})(UserUpsAndDownsColorEnum || (UserUpsAndDownsColorEnum = {}));
function DeptRealChart(props) {
  var _deptRef$current5;
  var priceOffset = props.priceOffset,
    colors = props.colors;
  var leftDeptRef = useRef(null);
  var centerDeptRef = useRef(null);
  var rightDeptRef = useRef(null);
  var deptRef = useRef(null);
  var chartRef = useRef(null);
  var floatTooltip = useRef(null);
  var leftDataRef = useRef([]);
  var rightDataRef = useRef([]);
  var _useState = useState({
      x: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    centerVerLine = _useState2[0],
    setCenterVerLine = _useState2[1];
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
        return item;
      }
    },
    // 时间刻度和价格刻度
    timeScale: {
      barSpacing: 6,
      tickMarkFormatter: function tickMarkFormatter(time) {
        return time;
      }
    },
    rightPriceScale: {
      borderColor: gridColor
    }
  };
  useEffect(function () {
    var _chartRef$current;
    (_chartRef$current = chartRef.current) === null || _chartRef$current === void 0 ? void 0 : _chartRef$current.applyOptions({
      // 时间刻度和价格刻度
      layout: props.chartLayoutOptions,
      grid: {
        vertLines: {
          color: gridColor
        },
        horzLines: {
          color: gridColor
        }
      }
    });
  }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor]);
  useEffect(function () {
    if (floatTooltip.current) {
      floatTooltip.current.style.background = props.createChart.cardBgColor;
      floatTooltip.current.style.color = props.createChart.textColor01;
    }
  }, [props.createChart.cardBgColor, props.createChart.textColor]);
  var setVerLineChart = function setVerLineChart() {
    var _leftDataRef$current, _rightDataRef$current;
    if (!((_leftDataRef$current = leftDataRef.current) !== null && _leftDataRef$current !== void 0 && _leftDataRef$current.length) && !((_rightDataRef$current = rightDataRef.current) !== null && _rightDataRef$current !== void 0 && _rightDataRef$current.length)) {
      return;
    }
    requestAnimationFrame(function () {
      var _chartRef$current2, _chartRef$current3;
      var verPoint = {
        x: 0
      };
      var leftX = ((_chartRef$current2 = chartRef.current) === null || _chartRef$current2 === void 0 ? void 0 : _chartRef$current2.timeScale().timeToCoordinate(leftDataRef.current[leftDataRef.current.length - 1].time)) || 0;
      var rightX = ((_chartRef$current3 = chartRef.current) === null || _chartRef$current3 === void 0 ? void 0 : _chartRef$current3.timeScale().timeToCoordinate(rightDataRef.current[0].time)) || 0;
      verPoint.x = leftX + (rightX - leftX) / 2;
      setCenterVerLine(verPoint);
    });
  };
  var dealData = function dealData(data) {
    var _leftDeptRef$current, _rightDeptRef$current, _chartRef$current4;
    var leftData = [];
    var rightData = [];
    data.forEach(function (item) {
      if (item.direction !== TradeDirectionEnum.Sell) {
        leftData.push(item);
      } else {
        rightData.push(item);
      }
    });
    (_leftDeptRef$current = leftDeptRef.current) === null || _leftDeptRef$current === void 0 ? void 0 : _leftDeptRef$current.setData(leftData);
    (_rightDeptRef$current = rightDeptRef.current) === null || _rightDeptRef$current === void 0 ? void 0 : _rightDeptRef$current.setData(rightData);
    leftDataRef.current = leftData;
    rightDataRef.current = rightData;
    setVerLineChart();
    (_chartRef$current4 = chartRef.current) === null || _chartRef$current4 === void 0 ? void 0 : _chartRef$current4.timeScale().fitContent();
  };
  useEffect(function () {
    var _props$data;
    if (!((_props$data = props.data) !== null && _props$data !== void 0 && _props$data.length) || !leftDeptRef.current || !rightDeptRef.current || !chartRef.current) {
      return;
    }
    dealData(props.data);
  }, [props.data]);
  useEffect(function () {
    var _document$getElementB;
    chartRef.current = createChart(document.getElementById('chart'), chartPropertySetting);
    leftDeptRef.current = chartRef.current.addAreaSeries(_objectSpread({
      lineColor: props.createChart.upColor,
      topColor: 'rgba(80, 177, 108, 0.35)',
      bottomColor: 'rgba(80, 177, 108, 0.05)',
      lineWidth: 1
    }, chartPriceLineProperty));
    centerDeptRef.current = chartRef.current.addLineSeries(_objectSpread({
      color: '#ff0000',
      lineWidth: 1,
      lineStyle: LineStyle.Solid
    }, chartPriceLineProperty));
    rightDeptRef.current = chartRef.current.addAreaSeries(_objectSpread({
      lineColor: props.createChart.downColor,
      topColor: 'rgba(233, 90, 92, 0.35)',
      bottomColor: 'rgba(233, 90, 92, 0.05)',
      lineWidth: 1
    }, chartPriceLineProperty));
    var toolTipWidth = 100;
    var toolTipHeight = 80;
    var toolTipMargin = 15;
    var toolTip = document.createElement('div');
    floatTooltip.current = toolTip;
    toolTip.className = "dept-floating-tooltip";
    toolTip.style.color = colorRef.current.textColor01;
    toolTip.style.background = colorRef.current.cardBgColor03;
    (_document$getElementB = document.getElementById('chart')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.appendChild(toolTip);
    var subscribeTimeChange = function subscribeTimeChange(newVisibleTimeRange) {
      var _chartRef$current5, _chartRef$current5$ti;
      if ((_chartRef$current5 = chartRef.current) !== null && _chartRef$current5 !== void 0 && (_chartRef$current5$ti = _chartRef$current5.timeScale().getVisibleRange()) !== null && _chartRef$current5$ti !== void 0 && _chartRef$current5$ti.from) {
        setVerLineChart();
      }
    };
    chartRef.current.timeScale().subscribeVisibleTimeRangeChange(subscribeTimeChange);
    // update tooltip
    chartRef.current.subscribeCrosshairMove(function (param) {
      var _deptRef$current, _deptRef$current2, _rightDataRef$current2, _props$data2, _deptRef$current3, _deptRef$current4;
      if (!param.time || param.point.x < 0 || param.point.x > ((deptRef === null || deptRef === void 0 ? void 0 : (_deptRef$current = deptRef.current) === null || _deptRef$current === void 0 ? void 0 : _deptRef$current.clientWidth) || 0) || param.point.y < 0 || param.point.y > ((deptRef === null || deptRef === void 0 ? void 0 : (_deptRef$current2 = deptRef.current) === null || _deptRef$current2 === void 0 ? void 0 : _deptRef$current2.clientHeight) || 0)) {
        toolTip.style.display = 'none';
        return;
      }
      var dateStr = param.time;
      toolTip.style.display = 'block';
      toolTip.style.color = colorRef.current.textColor01;
      var leftCount = param.seriesPrices.get(leftDeptRef.current);
      var rightCount = param.seriesPrices.get(rightDeptRef.current);
      var chgTemp = 0;
      var chg = "".concat(chgTemp.toFixed(priceOffset || 2), "%");
      var dir = dateStr >= ((_rightDataRef$current2 = rightDataRef.current) === null || _rightDataRef$current2 === void 0 ? void 0 : _rightDataRef$current2[0].value) ? TradeDirectionEnum.Sell : TradeDirectionEnum.Buy;
      (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : _props$data2.forEach(function (item) {
        var symbol = item.direction === TradeDirectionEnum.Buy ? '-' : '+';
        if (item.time === dateStr) {
          chg = "".concat(symbol).concat(item.chg.toFixed(priceOffset || 2), "%");
          dir = item.direction;
        }
      });
      // eslint-disable-next-line no-useless-concat
      toolTip.innerHTML = "<div style=\"display: flex; justify-content: space-between; min-width: 120px;\"><span>\u4EF7\u5DEE\u5E45\u5EA6</span><span style=\"color: ".concat(dir === TradeDirectionEnum.Buy ? colorRef.current.upColor : colorRef.current.downColor, "\">").concat(chg, "</span></div>") + "<div style=\"display: flex; justify-content: space-between; min-width: 120px; margin-top: 16px; color: ".concat(colorRef.current.textColor01, "\"><span>\u59D4\u6258\u4EF7\u683C</span><span>").concat(dateStr, "</span></div>") + "<div style=\"display: flex; justify-content: space-between; min-width: 120px; margin-top: 16px; color: ".concat(colorRef.current.textColor01, "\"><span>\u7D2F\u8BA1\u6302\u5355</span><span>").concat(leftCount || rightCount, "</span></div>");
      var y = param.point.y;
      var left = param.point.x + toolTipMargin;
      if (left > ((deptRef === null || deptRef === void 0 ? void 0 : (_deptRef$current3 = deptRef.current) === null || _deptRef$current3 === void 0 ? void 0 : _deptRef$current3.clientWidth) || 0) - toolTipWidth) {
        left = param.point.x - toolTipMargin - toolTipWidth;
      }
      var top = y + toolTipMargin;
      if (top > ((deptRef === null || deptRef === void 0 ? void 0 : (_deptRef$current4 = deptRef.current) === null || _deptRef$current4 === void 0 ? void 0 : _deptRef$current4.clientHeight) || 0) - toolTipHeight) {
        top = y - toolTipHeight - toolTipMargin;
      }
      toolTip.style.left = "".concat(left, "px");
      toolTip.style.top = "".concat(top, "px");
    });
  }, []);
  useEffect(function () {
    if (leftDeptRef.current && rightDeptRef.current) {
      if (colors === UserUpsAndDownsColorEnum.greenUpRedDown) {
        leftDeptRef.current.applyOptions({
          lineColor: props.createChart.upColor,
          topColor: 'rgba(80, 177, 108, 0.35)',
          bottomColor: 'rgba(80, 177, 108, 0.05)'
        });
        rightDeptRef.current.applyOptions({
          lineColor: props.createChart.downColor,
          topColor: 'rgba(233, 90, 92, 0.35)',
          bottomColor: 'rgba(233, 90, 92, 0.05)'
        });
      } else {
        leftDeptRef.current.applyOptions({
          lineColor: props.createChart.upColor,
          topColor: 'rgba(233, 90, 92, 0.35)',
          bottomColor: 'rgba(233, 90, 92, 0.05)'
        });
        rightDeptRef.current.applyOptions({
          lineColor: props.createChart.downColor,
          topColor: 'rgba(80, 177, 108, 0.35)',
          bottomColor: 'rgba(80, 177, 108, 0.05)'
        });
      }
    }
  }, [colors]);
  return React.createElement("div", {
    ref: deptRef,
    className: "chart",
    id: "chart"
  }, React.createElement("div", {
    className: "center-ver-line",
    style: {
      width: '1px',
      height: (((_deptRef$current5 = deptRef.current) === null || _deptRef$current5 === void 0 ? void 0 : _deptRef$current5.clientHeight) || 0) - 26,
      top: 0,
      left: centerVerLine.x,
      background: props.chartLayoutOptions.textColor,
      opacity: 0.5
    }
  }));
}
DeptRealChart.displayName = 'deptChart';
export { UserUpsAndDownsColorEnum, DeptRealChart as default };
