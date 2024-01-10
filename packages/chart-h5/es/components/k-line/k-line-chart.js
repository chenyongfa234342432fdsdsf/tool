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
import dayjs from 'dayjs';
import { createChart, LineStyle } from 'lightweight-charts';
import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { ThemeEnum, calcChg, calcAmp, calculateSMA, calculateMACD, calBoll, calKdj, calRsi, calWr, timeLocaleLanguageMap, TimeSharingType } from '@nbit/chart-utils';
import { calChartIndicatorPositon, calHeightAndLowPoint, numFormat } from './helper/index.js';

/** 涨跌色 */
var UserUpsAndDownsColorEnum;
(function (UserUpsAndDownsColorEnum) {
  UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["greenUpRedDown"] = 1] = "greenUpRedDown";
  UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["redUpGreenDown"] = 2] = "redUpGreenDown";
})(UserUpsAndDownsColorEnum || (UserUpsAndDownsColorEnum = {}));
function KLineChart(props, ref) {
  var mainIndicator = props.mainIndicator,
    subIndicator = props.subIndicator,
    chartHeight = props.chartHeight,
    offset = props.offset,
    updateMarketChangesTime = props.updateMarketChangesTime,
    colors = props.colors,
    coinInfo = props.coinInfo;
  var priceOffset = offset.priceOffset,
    amountOffset = offset.amountOffset;
  var chartRef = useRef();
  var candlestickSeriesRef = useRef();
  var macdVolumeSeriesRef = useRef();
  var smaLineRef = useRef();
  var timeLineRef = useRef();
  var bollRef = useRef();
  var kdjRef = useRef();
  var chartPriceLineProperty = {
    crosshairMarkerVisible: false,
    baseLineVisible: false,
    priceLineVisible: false,
    lastValueVisible: false
  };
  /** 是否点击图表 */
  var isHoverChart = useRef(false);
  var _useState = useState({
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
    }),
    _useState2 = _slicedToArray(_useState, 2),
    curMaxAndMinPoint = _useState2[0],
    setCurMaxAndMinPoint = _useState2[1];
  var _useState3 = useState({
      x: 0,
      y: 0,
      show: false
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    chartCrossHair = _useState4[0],
    setChartCrossHair = _useState4[1];
  var rsiRef = useRef();
  var wrRef = useRef();
  var deaRef = useRef();
  var difRef = useRef();
  var containerRef = useRef(null);
  var volumeSeriesRef = useRef();
  var checkIsUp = function checkIsUp(value) {
    return (value === null || value === void 0 ? void 0 : value.close) > (value === null || value === void 0 ? void 0 : value.open);
  };
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    maIndicator = _useState6[0],
    setMaIndicator = _useState6[1];
  var _useState7 = useState({
      from: 0,
      to: 0
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    visibleTimeRange = _useState8[0],
    setVisibleTimeRange = _useState8[1];
  var _useState9 = useState(),
    _useState10 = _slicedToArray(_useState9, 2),
    mainK = _useState10[0],
    setMainK = _useState10[1];
  var _useState11 = useState(),
    _useState12 = _slicedToArray(_useState11, 2),
    subK = _useState12[0],
    setSubK = _useState12[1];
  var _useState13 = useState({
      mid: 0,
      upper: 0,
      lower: 0
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    bollK = _useState14[0],
    setBollK = _useState14[1];
  var _useState15 = useState({
      vol: 0,
      quoteVolume: 0,
      dir: 'rise'
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    volume = _useState16[0],
    setVolume = _useState16[1];
  var _useState17 = useState(),
    _useState18 = _slicedToArray(_useState17, 2),
    kdjK = _useState18[0],
    setKdjK = _useState18[1];
  var _useState19 = useState(),
    _useState20 = _slicedToArray(_useState19, 2),
    rsiK = _useState20[0],
    setRsiK = _useState20[1];
  var mainIndicatorRef = useRef();
  var subIndicatorRef = useRef();
  var _useState21 = useState(),
    _useState22 = _slicedToArray(_useState21, 2),
    wrK = _useState22[0],
    setWrK = _useState22[1];
  var propsDataRef = useRef(props.data);
  var curTimeRef = useRef(props.curTime);
  var colorsRef = useRef(UserUpsAndDownsColorEnum.greenUpRedDown);
  var timeCount = useRef(0);
  useEffect(function () {
    propsDataRef.current = props.data;
    curTimeRef.current = props.curTime;
    mainIndicatorRef.current = props.mainIndicator;
    subIndicatorRef.current = props.subIndicator;
    colorsRef.current = colors;
  }, [props.data, props.curTime, props.mainIndicator, props.subIndicator, colors]);
  var showFormatTime = function showFormatTime(item, unit) {
    timeCount.current += 1;
    if (!(timeCount.current % 2)) {
      if (unit === TimeSharingType.Mon || unit === TimeSharingType.Week || unit === TimeSharingType.Day) {
        return dayjs(item).format('YYYY-MM-DD');
      }
      return dayjs(item).format('YYYY-MM-DD HH:mm');
    }
    return '';
  };
  /** 指标在图表中的位置计算 */
  var _calChartIndicatorPos = calChartIndicatorPositon(subIndicator),
    chartScaleMargins = _calChartIndicatorPos.chartScaleMargins,
    volScaleMargins = _calChartIndicatorPos.volScaleMargins,
    macdScaleMargins = _calChartIndicatorPos.macdScaleMargins,
    kdjScaleMargins = _calChartIndicatorPos.kdjScaleMargins,
    rsiScaleMargins = _calChartIndicatorPos.rsiScaleMargins,
    wrScaleMargins = _calChartIndicatorPos.wrScaleMargins;
  var gridColor = props.theme === ThemeEnum.light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
  useEffect(function () {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        timeScale: {
          barSpacing: 10,
          minBarSpacing: 5,
          lockVisibleTimeRangeOnResize: true,
          tickMarkFormatter: function tickMarkFormatter(item) {
            return showFormatTime(item, props.curTime.unit);
          }
        }
      });
    }
  }, [props.curTime.unit, props.curTime.value]);
  var chartPropertySetting = {
    layout: props.chartLayoutOptions,
    localization: {
      timeFormatter: function timeFormatter(item) {
        return dayjs(item).format('YY/MM/DD HH:mm');
      }
    },
    timeScale: {
      barSpacing: 10,
      minBarSpacing: 5,
      borderColor: gridColor,
      lockVisibleTimeRangeOnResize: true,
      tickMarkFormatter: function tickMarkFormatter(item) {
        // return dayjs(item).format('YY/MM/DD HH:mm')
        return showFormatTime(item, props.curTime.unit);
      }
    },
    rightPriceScale: {
      scaleMargins: chartScaleMargins,
      entireTextOnly: true,
      visible: true,
      alignLabels: true,
      autoScale: true,
      borderColor: gridColor
    }
  };
  useEffect(function () {
    /** 平滑效果 */
    /** 考虑了 3 个可能性，切换 tab 时，改变屏幕大小时，滚动时都会对可见区域处理，这块极其容易出 bug */
    requestAnimationFrame(function () {
      calHeightAndLowPoint(visibleTimeRange, curTimeRef, propsDataRef, timeLineRef, candlestickSeriesRef, chartRef, setCurMaxAndMinPoint);
    });
    // setTimeout(() => {
    //   calHeightAndLowPoint(
    //     visibleTimeRange,
    //     curTimeRef,
    //     propsDataRef,
    //     timeLineRef,
    //     candlestickSeriesRef,
    //     chartRef,
    //     setCurMaxAndMinPoint
    //   )
    // })
  }, [visibleTimeRange, subIndicator]);
  useEffect(function () {
    chartRef.current = createChart(document.getElementById('chart'), chartPropertySetting);
    var subscribeTimeChange = function subscribeTimeChange(newVisibleTimeRange) {
      var _chartRef$current, _chartRef$current$tim;
      if ((_chartRef$current = chartRef.current) !== null && _chartRef$current !== void 0 && (_chartRef$current$tim = _chartRef$current.timeScale().getVisibleRange()) !== null && _chartRef$current$tim !== void 0 && _chartRef$current$tim.from) {
        var _chartRef$current2;
        setVisibleTimeRange((_chartRef$current2 = chartRef.current) === null || _chartRef$current2 === void 0 ? void 0 : _chartRef$current2.timeScale().getVisibleRange());
      }
      // setPopVisible(false)
    };
    /** 最高价最低价逻辑 */
    chartRef.current.timeScale().subscribeVisibleTimeRangeChange(subscribeTimeChange);
    chartRef.current.timeScale().fitContent();
    var subscribeMoveChange = function subscribeMoveChange(param) {
      var _containerRef$current, _containerRef$current2, _smaLineRef$current, _propsDataRef$current, _bollRef$current, _bollRef$current2, _bollRef$current3, _kdjRef$current, _kdjRef$current2, _kdjRef$current3, _rsiRef$current, _rsiRef$current2, _rsiRef$current3, _wrRef$current, _containerRef$current3;
      if (!param.time || param.point.x < 0 || param.point.x > ((containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.clientWidth) || 0) || param.point.y < 0 || param.point.y > ((containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.clientHeight) || 0)) {
        setChartCrossHair({
          x: 0,
          y: 0,
          show: false
        });
        isHoverChart.current = false;
        return;
      }
      isHoverChart.current = true;
      var time = param.time;
      var volumeSeriesData = macdVolumeSeriesRef.current ? param.seriesPrices.get(macdVolumeSeriesRef.current) : undefined;
      var chartData = candlestickSeriesRef.current ? param.seriesPrices.get(candlestickSeriesRef.current) : {};
      var smaLineArr = [];
      (_smaLineRef$current = smaLineRef.current) === null || _smaLineRef$current === void 0 ? void 0 : _smaLineRef$current.forEach(function (item) {
        smaLineArr.push(param.seriesPrices.get(item));
      });
      var dif = difRef.current ? param.seriesPrices.get(difRef.current) : undefined;
      var dea = deaRef.current ? param.seriesPrices.get(deaRef.current) : undefined;
      setMaIndicator(smaLineArr);
      var _chartData = (_propsDataRef$current = propsDataRef.current.filter(function (item) {
        return item.time === time;
      })) === null || _propsDataRef$current === void 0 ? void 0 : _propsDataRef$current[0];
      setMainK({
        time: dayjs(time).format('YYYY-MM-DD HH:mm'),
        open: chartData === null || chartData === void 0 ? void 0 : chartData.open,
        close: chartData === null || chartData === void 0 ? void 0 : chartData.close,
        high: chartData === null || chartData === void 0 ? void 0 : chartData.high,
        low: chartData === null || chartData === void 0 ? void 0 : chartData.low,
        isUp: checkIsUp(chartData),
        chg: calcChg(chartData, priceOffset),
        amp: calcAmp(chartData, priceOffset),
        volume: _chartData === null || _chartData === void 0 ? void 0 : _chartData.volume,
        quoteVolume: _chartData === null || _chartData === void 0 ? void 0 : _chartData.quoteVolume
      });
      setSubK({
        macd: volumeSeriesData,
        dea: dea,
        dif: dif
      });
      setBollK({
        mid: param.seriesPrices.get((_bollRef$current = bollRef.current) === null || _bollRef$current === void 0 ? void 0 : _bollRef$current.mid),
        upper: param.seriesPrices.get((_bollRef$current2 = bollRef.current) === null || _bollRef$current2 === void 0 ? void 0 : _bollRef$current2.upper),
        lower: param.seriesPrices.get((_bollRef$current3 = bollRef.current) === null || _bollRef$current3 === void 0 ? void 0 : _bollRef$current3.lower)
      });
      setKdjK({
        k: param.seriesPrices.get((_kdjRef$current = kdjRef.current) === null || _kdjRef$current === void 0 ? void 0 : _kdjRef$current.k),
        d: param.seriesPrices.get((_kdjRef$current2 = kdjRef.current) === null || _kdjRef$current2 === void 0 ? void 0 : _kdjRef$current2.d),
        j: param.seriesPrices.get((_kdjRef$current3 = kdjRef.current) === null || _kdjRef$current3 === void 0 ? void 0 : _kdjRef$current3.j)
      });
      setRsiK({
        r: param.seriesPrices.get((_rsiRef$current = rsiRef.current) === null || _rsiRef$current === void 0 ? void 0 : _rsiRef$current[0]),
        s: param.seriesPrices.get((_rsiRef$current2 = rsiRef.current) === null || _rsiRef$current2 === void 0 ? void 0 : _rsiRef$current2[1]),
        i: param.seriesPrices.get((_rsiRef$current3 = rsiRef.current) === null || _rsiRef$current3 === void 0 ? void 0 : _rsiRef$current3[2])
      });
      var wrLineArr = [];
      (_wrRef$current = wrRef.current) === null || _wrRef$current === void 0 ? void 0 : _wrRef$current.forEach(function (item) {
        wrLineArr.push(param.seriesPrices.get(item));
      });
      setWrK(wrLineArr);
      var toolTipWidth = 160;
      var toolTipMargin = 15;
      param.point.y;
      var left = param.point.x + toolTipMargin;
      if (left > ((containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current3 = containerRef.current) === null || _containerRef$current3 === void 0 ? void 0 : _containerRef$current3.clientWidth) || 0) - toolTipWidth) {
        // left = param.point.x - toolTipMargin - toolTipWidth
        setChartCrossHair({
          x: 16,
          y: 32,
          show: true
        });
      } else {
        var _containerRef$current4;
        setChartCrossHair({
          x: ((containerRef === null || containerRef === void 0 ? void 0 : (_containerRef$current4 = containerRef.current) === null || _containerRef$current4 === void 0 ? void 0 : _containerRef$current4.clientWidth) || 0) - toolTipWidth - 16,
          y: 32,
          show: true
        });
      }
      // let top = y + toolTipMargin
      // if (top > (containerRef?.current?.clientHeight || 0) - toolTipHeight) {
      //   top = y - toolTipHeight - toolTipMargin
      // }
      // setChartCrossHair({
      //   x: left,
      //   y: top,
      //   show: true,
      // })
    };

    chartRef.current.subscribeCrosshairMove(subscribeMoveChange);
    return function () {
      var _chartRef$current3, _chartRef$current4;
      (_chartRef$current3 = chartRef.current) === null || _chartRef$current3 === void 0 ? void 0 : _chartRef$current3.timeScale().unsubscribeVisibleTimeRangeChange(subscribeTimeChange);
      // chartRef.current?.unsubscribeClick(param => {
      //   subscribeClickChange(param, markersRef, setPopVisible, props, priceOffset, setCurMarkers)
      // })
      (_chartRef$current4 = chartRef.current) === null || _chartRef$current4 === void 0 ? void 0 : _chartRef$current4.unsubscribeCrosshairMove(subscribeMoveChange);
    };
  }, []);
  var getColorOfSetting = function getColorOfSetting(close, open) {
    if (colorsRef.current === UserUpsAndDownsColorEnum.greenUpRedDown) {
      return close > open ? 'rgba(80, 177, 108, 0.5)' : 'rgba(233, 90, 92, 0.5)';
    } else {
      return close > open ? 'rgba(233, 90, 92, 0.5)' : 'rgba(80, 177, 108, 0.5)';
    }
  };
  useImperativeHandle(ref, function () {
    return {
      scrollToTime: function scrollToTime(marketChangesTime) {
        var _propsDataRef$current2;
        /** 跳转行情异动的 k 线柱子 */
        if (chartRef.current && (_propsDataRef$current2 = propsDataRef.current) !== null && _propsDataRef$current2 !== void 0 && _propsDataRef$current2.length) {
          var _chartRef$current5;
          /** 库 api 有 bug，无法获取正确的位置，导致 scrollToPosition 不可用 */
          (_chartRef$current5 = chartRef.current) === null || _chartRef$current5 === void 0 ? void 0 : _chartRef$current5.timeScale().timeToCoordinate(marketChangesTime);
          // console.log('getVisibleLogicalRange--------', chartRef.current?.timeScale().getVisibleLogicalRange())
          //   chartRef.current?.timeScale().scrollToPosition(timeToCoordinate as number, true)
          setTimeout(function () {
            var _chartRef$current6;
            (_chartRef$current6 = chartRef.current) === null || _chartRef$current6 === void 0 ? void 0 : _chartRef$current6.timeScale().setVisibleRange({
              from: curTimeRef.current.unit === 'm' ? marketChangesTime - 1000 * 60 * 120 : marketChangesTime - 1000 * 60 * 60 * 120,
              to: curTimeRef.current.unit === 'm' ? marketChangesTime + 1000 * 60 : marketChangesTime + 1000 * 60 * 60
            });
          });
          /** 跳转之后清空时间 */
          updateMarketChangesTime(0);
        }
      },
      updateCandlestickData: function updateCandlestickData(data) {
        var _candlestickSeriesRef;
        (_candlestickSeriesRef = candlestickSeriesRef.current) === null || _candlestickSeriesRef === void 0 ? void 0 : _candlestickSeriesRef.update(data);
        if (!isHoverChart.current) {
          setMainK(_objectSpread(_objectSpread({}, data), {}, {
            time: dayjs(data.time).format('YYYY/MM/DD HH:mm'),
            isUp: checkIsUp(data),
            chg: calcChg(data, priceOffset),
            amp: calcAmp(data, priceOffset)
          }));
        }
      },
      updateTimeData: function updateTimeData(data) {
        var _timeLineRef$current;
        (_timeLineRef$current = timeLineRef.current) === null || _timeLineRef$current === void 0 ? void 0 : _timeLineRef$current.update(data);
        if (!isHoverChart.current) {
          setMainK(_objectSpread(_objectSpread({}, data), {}, {
            time: dayjs(data.time).format('YYYY/MM/DD HH:mm'),
            isUp: checkIsUp(data),
            chg: calcChg(data, priceOffset),
            amp: calcAmp(data, priceOffset)
          }));
        }
      },
      updateVolumeData: function updateVolumeData(data) {
        var _volumeSeriesRef$curr;
        (_volumeSeriesRef$curr = volumeSeriesRef.current) === null || _volumeSeriesRef$curr === void 0 ? void 0 : _volumeSeriesRef$curr.update(_objectSpread(_objectSpread({}, data), {}, {
          // 'rgba(var(--buy_up_color), 0.5)' : 'rgba(var(--sell_down_color), 0.5)'
          color: getColorOfSetting(data.close, data.open)
        }));
        if (!isHoverChart.current) {
          setVolume(_objectSpread(_objectSpread({}, data), {}, {
            vol: data.value
          }));
        }
      },
      updateMaData: function updateMaData() {
        var _mainIndicatorRef$cur;
        if ((_mainIndicatorRef$cur = mainIndicatorRef.current) !== null && _mainIndicatorRef$cur !== void 0 && _mainIndicatorRef$cur.ma.select) {
          var _mainIndicatorRef$cur2;
          var _ma = [];
          (_mainIndicatorRef$cur2 = mainIndicatorRef.current) === null || _mainIndicatorRef$cur2 === void 0 ? void 0 : _mainIndicatorRef$cur2.ma.cur.forEach(function (item, index) {
            if (item.select) {
              var _smaData, _smaData2, _smaLineRef$current2, _smaLineRef$current2$;
              var strip = item.strip,
                type = item.type;
              var smaData = calculateSMA(propsDataRef.current, Number(strip), type, priceOffset);
              _ma.push((_smaData = smaData[smaData.length - 1]) === null || _smaData === void 0 ? void 0 : _smaData.value);
              ((_smaData2 = smaData[smaData.length - 1]) === null || _smaData2 === void 0 ? void 0 : _smaData2.time) && ((_smaLineRef$current2 = smaLineRef.current) === null || _smaLineRef$current2 === void 0 ? void 0 : (_smaLineRef$current2$ = _smaLineRef$current2[index]) === null || _smaLineRef$current2$ === void 0 ? void 0 : _smaLineRef$current2$.update(smaData[smaData.length - 1]));
            }
          });
          if (!isHoverChart.current) {
            setMaIndicator(_ma);
          }
        }
      },
      updateMacdData: function updateMacdData(data) {
        var _subIndicatorRef$curr;
        if ((_subIndicatorRef$curr = subIndicatorRef.current) !== null && _subIndicatorRef$curr !== void 0 && _subIndicatorRef$curr.macd.select) {
          var _subIndicatorRef$curr2, _subIndicatorRef$curr3, _subIndicatorRef$curr4, _newData, _newData2, _newData3, _subIndicator$macd$cu;
          var _subK = {
            dea: undefined,
            dif: undefined,
            macd: undefined
          };
          var fast = ((_subIndicatorRef$curr2 = subIndicatorRef.current) === null || _subIndicatorRef$curr2 === void 0 ? void 0 : _subIndicatorRef$curr2.macd.cur.fast).value;
          var slow = ((_subIndicatorRef$curr3 = subIndicatorRef.current) === null || _subIndicatorRef$curr3 === void 0 ? void 0 : _subIndicatorRef$curr3.macd.cur.slow).value;
          var signal = ((_subIndicatorRef$curr4 = subIndicatorRef.current) === null || _subIndicatorRef$curr4 === void 0 ? void 0 : _subIndicatorRef$curr4.macd.cur.signal).value;
          var newData = calculateMACD(propsDataRef.current, Number(fast), Number(slow), Number(signal), priceOffset);
          _subK.dif = (_newData = newData[newData.length - 1]) === null || _newData === void 0 ? void 0 : _newData.dif;
          _subK.dea = (_newData2 = newData[newData.length - 1]) === null || _newData2 === void 0 ? void 0 : _newData2.dea;
          _subK.macd = (_newData3 = newData[newData.length - 1]) === null || _newData3 === void 0 ? void 0 : _newData3.value;
          var difData = newData.map(function (item) {
            return {
              time: item.time,
              value: item.dif
            };
          }) || [];
          var deaData = newData.map(function (item) {
            return {
              time: item.time,
              value: item.dea
            };
          }) || [];
          var macdData = newData.map(function (item) {
            return {
              time: item === null || item === void 0 ? void 0 : item.time,
              value: item === null || item === void 0 ? void 0 : item.value,
              // color: item?.value < 0 ? props.createChart.downColor : props.createChart.upColor,
              color: getColorOfSetting(item === null || item === void 0 ? void 0 : item.value, 0)
            };
          }) || [];
          var nameList = [difRef.current, deaRef.current, macdVolumeSeriesRef.current];
          var dataList = [difData[difData.length - 1], deaData[deaData.length - 1], macdData[macdData.length - 1]];
          (_subIndicator$macd$cu = subIndicator.macd.curLine) === null || _subIndicator$macd$cu === void 0 ? void 0 : _subIndicator$macd$cu.forEach(function (item, index) {
            if (item.select) {
              var _nameList$index;
              (_nameList$index = nameList[index]) === null || _nameList$index === void 0 ? void 0 : _nameList$index.update(dataList[index]);
            }
          });
          if (!isHoverChart.current) {
            setSubK(_subK);
          }
        }
      },
      updateBollData: function updateBollData() {
        var _mainIndicatorRef$cur3;
        if ((_mainIndicatorRef$cur3 = mainIndicatorRef.current) !== null && _mainIndicatorRef$cur3 !== void 0 && _mainIndicatorRef$cur3.boll.select) {
          var _mainIndicatorRef$cur4, _mainIndicatorRef$cur5, _mainIndicatorRef$cur6, _mainIndicatorRef$cur7;
          var _boll = {
            mid: 0,
            upper: 0,
            lower: 0
          };
          var result = calBoll(propsDataRef.current, [Number(((_mainIndicatorRef$cur4 = mainIndicatorRef.current) === null || _mainIndicatorRef$cur4 === void 0 ? void 0 : _mainIndicatorRef$cur4.boll.cur.mid).value), Number(((_mainIndicatorRef$cur5 = mainIndicatorRef.current) === null || _mainIndicatorRef$cur5 === void 0 ? void 0 : _mainIndicatorRef$cur5.boll.cur.std).value)], priceOffset);
          (_mainIndicatorRef$cur6 = mainIndicatorRef.current) === null || _mainIndicatorRef$cur6 === void 0 ? void 0 : (_mainIndicatorRef$cur7 = _mainIndicatorRef$cur6.boll.curLine) === null || _mainIndicatorRef$cur7 === void 0 ? void 0 : _mainIndicatorRef$cur7.forEach(function (item, index) {
            if (item.select) {
              var _bollRef$current4;
              var _index = Object.keys(_boll)[index];
              _boll[_index] = result[result.length - 1][_index];
              var value = result.map(function (_item) {
                return {
                  value: _item[_index],
                  time: _item.time
                };
              }) || [];
              (_bollRef$current4 = bollRef.current) === null || _bollRef$current4 === void 0 ? void 0 : _bollRef$current4[_index].update(value[value.length - 1]);
            }
          });
          if (!isHoverChart.current) {
            setBollK(_boll);
          }
        }
      },
      updateKdjData: function updateKdjData() {
        var _subIndicatorRef$curr5;
        if ((_subIndicatorRef$curr5 = subIndicatorRef.current) !== null && _subIndicatorRef$curr5 !== void 0 && _subIndicatorRef$curr5.kdj.select) {
          var _subIndicatorRef$curr6, _subIndicatorRef$curr7, _subIndicatorRef$curr8, _subIndicatorRef$curr9, _subIndicatorRef$curr10;
          var _kdjK = {
            k: 0,
            d: 0,
            j: 0
          };
          var result = calKdj(propsDataRef.current, [Number(((_subIndicatorRef$curr6 = subIndicatorRef.current) === null || _subIndicatorRef$curr6 === void 0 ? void 0 : _subIndicatorRef$curr6.kdj.cur.k).value), Number(((_subIndicatorRef$curr7 = subIndicatorRef.current) === null || _subIndicatorRef$curr7 === void 0 ? void 0 : _subIndicatorRef$curr7.kdj.cur.d).value), Number(((_subIndicatorRef$curr8 = subIndicatorRef.current) === null || _subIndicatorRef$curr8 === void 0 ? void 0 : _subIndicatorRef$curr8.kdj.cur.j).value)], priceOffset);
          (_subIndicatorRef$curr9 = subIndicatorRef.current) === null || _subIndicatorRef$curr9 === void 0 ? void 0 : (_subIndicatorRef$curr10 = _subIndicatorRef$curr9.kdj.curLine) === null || _subIndicatorRef$curr10 === void 0 ? void 0 : _subIndicatorRef$curr10.forEach(function (item, index) {
            var _index = Object.keys(_kdjK)[index];
            if (item.select) {
              var _result, _kdjRef$current4;
              _kdjK[_index] = (_result = result[result.length - 1]) === null || _result === void 0 ? void 0 : _result[_index];
              var value = result.map(function (_item) {
                return {
                  value: _item[_index],
                  time: _item.time
                };
              }) || [];
              (_kdjRef$current4 = kdjRef.current) === null || _kdjRef$current4 === void 0 ? void 0 : _kdjRef$current4[_index].update(value[value.length - 1]);
            }
          });
          if (!isHoverChart.current) {
            setKdjK(_kdjK);
          }
        }
      },
      updateRsiData: function updateRsiData() {
        var _subIndicatorRef$curr11;
        if ((_subIndicatorRef$curr11 = subIndicatorRef.current) !== null && _subIndicatorRef$curr11 !== void 0 && _subIndicatorRef$curr11.rsi.select) {
          var _subIndicatorRef$curr12, _subIndicatorRef$curr13, _subIndicatorRef$curr14, _result2, _result3, _result4, _subIndicatorRef$curr15;
          var _rsiK = {
            r: 0,
            s: 0,
            i: 0
          };
          var result = calRsi(propsDataRef.current, [Number((_subIndicatorRef$curr12 = subIndicatorRef.current) === null || _subIndicatorRef$curr12 === void 0 ? void 0 : _subIndicatorRef$curr12.rsi.cur[0].value), Number((_subIndicatorRef$curr13 = subIndicatorRef.current) === null || _subIndicatorRef$curr13 === void 0 ? void 0 : _subIndicatorRef$curr13.rsi.cur[1].value), Number((_subIndicatorRef$curr14 = subIndicatorRef.current) === null || _subIndicatorRef$curr14 === void 0 ? void 0 : _subIndicatorRef$curr14.rsi.cur[2].value)], priceOffset);
          _rsiK.r = (_result2 = result[result.length - 1]) === null || _result2 === void 0 ? void 0 : _result2.r;
          _rsiK.s = (_result3 = result[result.length - 1]) === null || _result3 === void 0 ? void 0 : _result3.s;
          _rsiK.i = (_result4 = result[result.length - 1]) === null || _result4 === void 0 ? void 0 : _result4.i;
          (_subIndicatorRef$curr15 = subIndicatorRef.current) === null || _subIndicatorRef$curr15 === void 0 ? void 0 : _subIndicatorRef$curr15.rsi.cur.forEach(function (_item, index) {
            if (_item.select) {
              var _rsiRef$current4, _rsiRef$current4$inde;
              var value = result.map(function (item) {
                return {
                  value: item[Object.keys(_rsiK)[index]],
                  time: item.time
                };
              }) || [];
              (_rsiRef$current4 = rsiRef.current) === null || _rsiRef$current4 === void 0 ? void 0 : (_rsiRef$current4$inde = _rsiRef$current4[index]) === null || _rsiRef$current4$inde === void 0 ? void 0 : _rsiRef$current4$inde.update(value[value.length - 1]);
            }
          });
          if (!isHoverChart.current) {
            setRsiK(_rsiK);
          }
        }
      },
      updateWrData: function updateWrData() {
        var _subIndicatorRef$curr16;
        if ((_subIndicatorRef$curr16 = subIndicatorRef.current) !== null && _subIndicatorRef$curr16 !== void 0 && _subIndicatorRef$curr16.wr.select) {
          var _wrK = [];
          subIndicatorRef.current.wr.cur.forEach(function (_item, index) {
            if (_item.select) {
              var _subIndicatorRef$curr17, _result5, _wrRef$current2, _wrRef$current2$index;
              var result = calWr(propsDataRef.current, [Number((_subIndicatorRef$curr17 = subIndicatorRef.current) === null || _subIndicatorRef$curr17 === void 0 ? void 0 : _subIndicatorRef$curr17.wr.cur[index].value)], [{
                key: 'wr1',
                title: 'wr1'
              }, {
                key: 'wr2',
                title: 'wr2'
              }], priceOffset);
              _wrK.push((_result5 = result[result.length - 1]) === null || _result5 === void 0 ? void 0 : _result5.wr1);
              var value = result.map(function (item) {
                return {
                  value: item.wr1,
                  time: item.time
                };
              }) || [];
              (_wrRef$current2 = wrRef.current) === null || _wrRef$current2 === void 0 ? void 0 : (_wrRef$current2$index = _wrRef$current2[index]) === null || _wrRef$current2$index === void 0 ? void 0 : _wrRef$current2$index.update(value[value.length - 1]);
            }
          });
          if (!isHoverChart.current) {
            setWrK(_wrK);
          }
        }
      }
    };
  });
  useLayoutEffect(function () {
    var handleResize = function handleResize() {
      var _chartRef$current7, _containerRef$current5, _containerRef$current6;
      (_chartRef$current7 = chartRef.current) === null || _chartRef$current7 === void 0 ? void 0 : _chartRef$current7.applyOptions(_objectSpread(_objectSpread({}, chartPropertySetting), {}, {
        width: (_containerRef$current5 = containerRef.current) === null || _containerRef$current5 === void 0 ? void 0 : _containerRef$current5.clientWidth,
        height: (_containerRef$current6 = containerRef.current) === null || _containerRef$current6 === void 0 ? void 0 : _containerRef$current6.clientHeight,
        rightPriceScale: _objectSpread(_objectSpread({}, chartPropertySetting.rightPriceScale), {}, {
          scaleMargins: chartScaleMargins
        })
      }));
    };
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(function () {
    var _chartRef$current8;
    (_chartRef$current8 = chartRef.current) === null || _chartRef$current8 === void 0 ? void 0 : _chartRef$current8.applyOptions(_objectSpread(_objectSpread({}, chartPropertySetting), {}, {
      height: chartHeight,
      layout: _objectSpread({}, props.chartLayoutOptions),
      grid: {
        vertLines: {
          color: gridColor
        },
        horzLines: {
          color: gridColor
        }
      },
      rightPriceScale: _objectSpread(_objectSpread({}, chartPropertySetting.rightPriceScale), {}, {
        scaleMargins: chartScaleMargins
      })
    }));
  }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor, chartHeight]);
  useEffect(function () {
    var _props$data, _props$data2, _props$data3;
    var _ma = [];
    var _mainK = _objectSpread(_objectSpread({}, props.data[props.data.length - 1]), {}, {
      time: dayjs((_props$data = props.data[props.data.length - 1]) === null || _props$data === void 0 ? void 0 : _props$data.time).format('YY-MM-DD HH:mm'),
      isUp: checkIsUp(props.data[props.data.length - 1]),
      chg: calcChg(props.data[props.data.length - 1], priceOffset),
      amp: calcAmp(props.data[props.data.length - 1], priceOffset),
      volume: (_props$data2 = props.data[props.data.length - 1]) === null || _props$data2 === void 0 ? void 0 : _props$data2.volume,
      quoteVolume: (_props$data3 = props.data[props.data.length - 1]) === null || _props$data3 === void 0 ? void 0 : _props$data3.quoteVolume
    });
    var _subK = {
      dea: undefined,
      dif: undefined,
      macd: undefined
    };
    var _boll = {
      mid: 0,
      upper: 0,
      lower: 0
    };
    var _kdjK = {
      k: 0,
      d: 0,
      j: 0
    };
    var _rsiK = {
      r: 0,
      s: 0,
      i: 0
    };
    var _wrK = [];
    if (chartRef.current) {
      var _smaLineRef$current3, _timeLineRef$current2, _bollRef$current5, _bollRef$current6, _bollRef$current7, _difRef$current, _deaRef$current, _macdVolumeSeriesRef$, _kdjRef$current5, _kdjRef$current6, _kdjRef$current7, _rsiRef$current5, _wrRef$current3;
      if (!candlestickSeriesRef.current) {
        var _props$createChart, _props$createChart2, _props$createChart3, _props$createChart4;
        candlestickSeriesRef.current = chartRef.current.addCandlestickSeries(_objectSpread(_objectSpread({
          upColor: (props === null || props === void 0 ? void 0 : (_props$createChart = props.createChart) === null || _props$createChart === void 0 ? void 0 : _props$createChart.upColor) || '#26a69a',
          downColor: (props === null || props === void 0 ? void 0 : (_props$createChart2 = props.createChart) === null || _props$createChart2 === void 0 ? void 0 : _props$createChart2.downColor) || '#ef5350',
          borderVisible: false,
          wickUpColor: (props === null || props === void 0 ? void 0 : (_props$createChart3 = props.createChart) === null || _props$createChart3 === void 0 ? void 0 : _props$createChart3.upColor) || '#26a69a',
          wickDownColor: (props === null || props === void 0 ? void 0 : (_props$createChart4 = props.createChart) === null || _props$createChart4 === void 0 ? void 0 : _props$createChart4.downColor) || '#ef5350'
        }, chartPriceLineProperty), {}, {
          lastValueVisible: true
        }));
      }
      /* 清空操作，除了 k 线都需要清空 * */
      (_smaLineRef$current3 = smaLineRef.current) === null || _smaLineRef$current3 === void 0 ? void 0 : _smaLineRef$current3.forEach(function (item) {
        item.setData([]);
      });
      (_timeLineRef$current2 = timeLineRef.current) === null || _timeLineRef$current2 === void 0 ? void 0 : _timeLineRef$current2.setData([]);
      (_bollRef$current5 = bollRef.current) === null || _bollRef$current5 === void 0 ? void 0 : _bollRef$current5.lower.setData([]);
      (_bollRef$current6 = bollRef.current) === null || _bollRef$current6 === void 0 ? void 0 : _bollRef$current6.mid.setData([]);
      (_bollRef$current7 = bollRef.current) === null || _bollRef$current7 === void 0 ? void 0 : _bollRef$current7.upper.setData([]);
      (_difRef$current = difRef.current) === null || _difRef$current === void 0 ? void 0 : _difRef$current.setData([]);
      (_deaRef$current = deaRef.current) === null || _deaRef$current === void 0 ? void 0 : _deaRef$current.setData([]);
      (_macdVolumeSeriesRef$ = macdVolumeSeriesRef.current) === null || _macdVolumeSeriesRef$ === void 0 ? void 0 : _macdVolumeSeriesRef$.setData([]);
      (_kdjRef$current5 = kdjRef.current) === null || _kdjRef$current5 === void 0 ? void 0 : _kdjRef$current5.k.setData([]);
      (_kdjRef$current6 = kdjRef.current) === null || _kdjRef$current6 === void 0 ? void 0 : _kdjRef$current6.d.setData([]);
      (_kdjRef$current7 = kdjRef.current) === null || _kdjRef$current7 === void 0 ? void 0 : _kdjRef$current7.j.setData([]);
      (_rsiRef$current5 = rsiRef.current) === null || _rsiRef$current5 === void 0 ? void 0 : _rsiRef$current5.forEach(function (item) {
        item.setData([]);
      });
      (_wrRef$current3 = wrRef.current) === null || _wrRef$current3 === void 0 ? void 0 : _wrRef$current3.forEach(function (item) {
        item.setData([]);
      });
      if (props.curTime.unit === 'time') {
        if (!timeLineRef.current) {
          var _chartRef$current9;
          timeLineRef.current = (_chartRef$current9 = chartRef.current) === null || _chartRef$current9 === void 0 ? void 0 : _chartRef$current9.addLineSeries(_objectSpread(_objectSpread({
            color: '#ff0000',
            lineWidth: 1,
            lineStyle: LineStyle.Solid
          }, chartPriceLineProperty), {}, {
            lastValueVisible: true
          }));
        }
        timeLineRef.current.setData(propsDataRef.current.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            value: item.close
          });
        }));
        candlestickSeriesRef.current.setData([]);
      } else {
        candlestickSeriesRef.current.setData(propsDataRef.current);
      }
      if (!volumeSeriesRef.current) {
        var _chartRef$current10;
        volumeSeriesRef.current = (_chartRef$current10 = chartRef.current) === null || _chartRef$current10 === void 0 ? void 0 : _chartRef$current10.addHistogramSeries(_objectSpread({
          color: props.createChart.upColor,
          priceFormat: {
            type: 'price'
          },
          priceScaleId: 'vol',
          scaleMargins: volScaleMargins
        }, chartPriceLineProperty));
      }
      volumeSeriesRef.current.setData(propsDataRef.current.map(function (item) {
        return {
          time: item.time,
          value: item.volume,
          color: getColorOfSetting(item.close, item.open)
        };
      }));
      if (mainIndicator.boll.select) {
        var _result6, _result7, _result8;
        if (!bollRef.current) {
          var _chartRef$current11, _chartRef$current12, _chartRef$current13;
          bollRef.current = {
            mid: (_chartRef$current11 = chartRef.current) === null || _chartRef$current11 === void 0 ? void 0 : _chartRef$current11.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[0].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid
            }, chartPriceLineProperty)),
            upper: (_chartRef$current12 = chartRef.current) === null || _chartRef$current12 === void 0 ? void 0 : _chartRef$current12.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[1].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid
            }, chartPriceLineProperty)),
            lower: (_chartRef$current13 = chartRef.current) === null || _chartRef$current13 === void 0 ? void 0 : _chartRef$current13.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[2].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid
            }, chartPriceLineProperty))
          };
        }
        var result = calBoll(props.data, [mainIndicator.boll.cur.mid, mainIndicator.boll.cur.std], priceOffset);
        _boll.lower = (_result6 = result[result.length - 1]) === null || _result6 === void 0 ? void 0 : _result6.lower;
        _boll.mid = (_result7 = result[result.length - 1]) === null || _result7 === void 0 ? void 0 : _result7.mid;
        _boll.upper = (_result8 = result[result.length - 1]) === null || _result8 === void 0 ? void 0 : _result8.upper;
        bollRef.current.mid.setData(result.map(function (item) {
          return {
            value: item.mid,
            time: item.time
          };
        }));
        bollRef.current.lower.setData(result.map(function (item) {
          return {
            value: item.lower,
            time: item.time
          };
        }));
        bollRef.current.upper.setData(result.map(function (item) {
          return {
            value: item.upper,
            time: item.time
          };
        }));
      }
      if (mainIndicator.ma.select) {
        if (!smaLineRef.current) {
          var smaLineList = [];
          mainIndicator.ma.cur.forEach(function (item) {
            var _chartRef$current14;
            var value = (_chartRef$current14 = chartRef.current) === null || _chartRef$current14 === void 0 ? void 0 : _chartRef$current14.addLineSeries(_objectSpread({
              color: item.color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid
            }, chartPriceLineProperty));
            smaLineList.push(value);
          });
          smaLineRef.current = smaLineList;
        }
        mainIndicator.ma.cur.forEach(function (item, index) {
          if (item.select) {
            var _smaData3, _smaLineRef$current4, _smaLineRef$current4$;
            var strip = item.strip,
              type = item.type;
            var smaData = calculateSMA(props.data, Number(strip), type, priceOffset);
            _ma.push((_smaData3 = smaData[smaData.length - 1]) === null || _smaData3 === void 0 ? void 0 : _smaData3.value);
            (_smaLineRef$current4 = smaLineRef.current) === null || _smaLineRef$current4 === void 0 ? void 0 : (_smaLineRef$current4$ = _smaLineRef$current4[index]) === null || _smaLineRef$current4$ === void 0 ? void 0 : _smaLineRef$current4$.setData(smaData);
          }
        });
      }
      if (subIndicator.macd.select) {
        var _newData4, _newData5, _newData6;
        var _subIndicator$macd$cu2 = subIndicator.macd.cur,
          fast = _subIndicator$macd$cu2.fast,
          slow = _subIndicator$macd$cu2.slow,
          signal = _subIndicator$macd$cu2.signal;
        var newData = calculateMACD(props.data, Number(fast), Number(slow), Number(signal), priceOffset);
        _subK.dif = (_newData4 = newData[newData.length - 1]) === null || _newData4 === void 0 ? void 0 : _newData4.dif;
        _subK.dea = (_newData5 = newData[newData.length - 1]) === null || _newData5 === void 0 ? void 0 : _newData5.dea;
        _subK.macd = (_newData6 = newData[newData.length - 1]) === null || _newData6 === void 0 ? void 0 : _newData6.value;
        var difData = newData.map(function (item) {
          return {
            time: item.time,
            value: item.dif
          };
        });
        var deaData = newData.map(function (item) {
          return {
            time: item.time,
            value: item.dea
          };
        });
        var macdData = newData.map(function (item) {
          return {
            time: item === null || item === void 0 ? void 0 : item.time,
            value: item === null || item === void 0 ? void 0 : item.value,
            color: (item === null || item === void 0 ? void 0 : item.value) < 0 ? props.createChart.downColor : props.createChart.upColor
          };
        });
        var subLineConfig = _objectSpread({
          color: props.createChart.brandColor,
          lineWidth: 1,
          lineStyle: LineStyle.Solid,
          priceScaleId: 'volume',
          scaleMargins: macdScaleMargins
        }, chartPriceLineProperty);
        if (!difRef.current) {
          var _chartRef$current15;
          difRef.current = (_chartRef$current15 = chartRef.current) === null || _chartRef$current15 === void 0 ? void 0 : _chartRef$current15.addLineSeries(_objectSpread(_objectSpread({}, subLineConfig), {}, {
            color: '#9660c4'
          }));
        }
        if (!deaRef.current) {
          var _chartRef$current16;
          deaRef.current = (_chartRef$current16 = chartRef.current) === null || _chartRef$current16 === void 0 ? void 0 : _chartRef$current16.addLineSeries(_objectSpread(_objectSpread({}, subLineConfig), {}, {
            color: '#84aad5'
          }));
        }
        if (!macdVolumeSeriesRef.current) {
          var _chartRef$current17;
          macdVolumeSeriesRef.current = (_chartRef$current17 = chartRef.current) === null || _chartRef$current17 === void 0 ? void 0 : _chartRef$current17.addHistogramSeries(_objectSpread({
            color: props.createChart.upColor,
            priceFormat: {
              type: 'price'
            },
            priceScaleId: 'volume',
            scaleMargins: macdScaleMargins
          }, chartPriceLineProperty));
        }
        difRef.current.setData(difData);
        deaRef.current.setData(deaData);
        macdVolumeSeriesRef.current.setData(macdData);
      }
      if (subIndicator.kdj.select) {
        var _result10, _result11, _result12;
        if (!kdjRef.current) {
          var _chartRef$current18, _chartRef$current19, _chartRef$current20;
          kdjRef.current = {
            k: (_chartRef$current18 = chartRef.current) === null || _chartRef$current18 === void 0 ? void 0 : _chartRef$current18.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[0].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid,
              priceScaleId: 'kdj',
              scaleMargins: kdjScaleMargins
            }, chartPriceLineProperty)),
            d: (_chartRef$current19 = chartRef.current) === null || _chartRef$current19 === void 0 ? void 0 : _chartRef$current19.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[1].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid,
              priceScaleId: 'kdj',
              scaleMargins: kdjScaleMargins
            }, chartPriceLineProperty)),
            j: (_chartRef$current20 = chartRef.current) === null || _chartRef$current20 === void 0 ? void 0 : _chartRef$current20.addLineSeries(_objectSpread({
              color: mainIndicator.ma.cur[2].color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid,
              priceScaleId: 'kdj',
              scaleMargins: kdjScaleMargins
            }, chartPriceLineProperty))
          };
        }
        var _result9 = calKdj(props.data, [subIndicator.kdj.cur.k, subIndicator.kdj.cur.d, subIndicator.kdj.cur.j], priceOffset);
        _kdjK.k = (_result10 = _result9[_result9.length - 1]) === null || _result10 === void 0 ? void 0 : _result10.k;
        _kdjK.d = (_result11 = _result9[_result9.length - 1]) === null || _result11 === void 0 ? void 0 : _result11.d;
        _kdjK.j = (_result12 = _result9[_result9.length - 1]) === null || _result12 === void 0 ? void 0 : _result12.j;
        kdjRef.current.k.setData(_result9.map(function (item) {
          return {
            value: item.k,
            time: item.time
          };
        }));
        kdjRef.current.d.setData(_result9.map(function (item) {
          return {
            value: item.d,
            time: item.time
          };
        }));
        kdjRef.current.j.setData(_result9.map(function (item) {
          return {
            value: item.j,
            time: item.time
          };
        }));
      }
      if (subIndicator.rsi.select) {
        var _subIndicator$rsi$cur, _subIndicator$rsi$cur2, _subIndicator$rsi$cur3, _result14, _result15, _result16;
        if (!rsiRef.current) {
          var rsiList = [];
          subIndicator.rsi.cur.forEach(function (item) {
            var _chartRef$current21;
            rsiList.push((_chartRef$current21 = chartRef.current) === null || _chartRef$current21 === void 0 ? void 0 : _chartRef$current21.addLineSeries(_objectSpread({
              color: item.color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid,
              priceScaleId: 'rsi',
              scaleMargins: rsiScaleMargins
            }, chartPriceLineProperty)));
          });
          rsiRef.current = rsiList;
        }
        var _result13 = calRsi(props.data, [Number((_subIndicator$rsi$cur = subIndicator.rsi.cur[0]) === null || _subIndicator$rsi$cur === void 0 ? void 0 : _subIndicator$rsi$cur.value), Number((_subIndicator$rsi$cur2 = subIndicator.rsi.cur[1]) === null || _subIndicator$rsi$cur2 === void 0 ? void 0 : _subIndicator$rsi$cur2.value), Number((_subIndicator$rsi$cur3 = subIndicator.rsi.cur[2]) === null || _subIndicator$rsi$cur3 === void 0 ? void 0 : _subIndicator$rsi$cur3.value)], priceOffset);
        _rsiK.r = (_result14 = _result13[_result13.length - 1]) === null || _result14 === void 0 ? void 0 : _result14.r;
        _rsiK.s = (_result15 = _result13[_result13.length - 1]) === null || _result15 === void 0 ? void 0 : _result15.s;
        _rsiK.i = (_result16 = _result13[_result13.length - 1]) === null || _result16 === void 0 ? void 0 : _result16.i;
        subIndicator.rsi.cur.forEach(function (item, index) {
          var _rsiRef$current6, _rsiRef$current6$inde;
          (_rsiRef$current6 = rsiRef.current) === null || _rsiRef$current6 === void 0 ? void 0 : (_rsiRef$current6$inde = _rsiRef$current6[index]) === null || _rsiRef$current6$inde === void 0 ? void 0 : _rsiRef$current6$inde.setData(_result13.map(function (item) {
            return {
              value: item[Object.keys(_rsiK)[index]],
              time: item.time
            };
          }));
        });
      }
      if (subIndicator.wr.select) {
        if (!wrRef.current) {
          var wrList = [];
          subIndicator.wr.cur.forEach(function (item) {
            var _chartRef$current22;
            wrList.push((_chartRef$current22 = chartRef.current) === null || _chartRef$current22 === void 0 ? void 0 : _chartRef$current22.addLineSeries(_objectSpread({
              color: item.color,
              lineWidth: 1,
              lineStyle: LineStyle.Solid,
              priceScaleId: 'wr',
              scaleMargins: wrScaleMargins
            }, chartPriceLineProperty)));
          });
          wrRef.current = wrList;
        }
        subIndicator.wr.cur.forEach(function (item, index) {
          var _result17, _wrRef$current4, _wrRef$current4$index;
          var result = calWr(props.data, [Number(subIndicator.wr.cur[index].value)], [{
            key: 'wr1',
            title: 'wr1'
          }, {
            key: 'wr2',
            title: 'wr2'
          }], priceOffset);
          _wrK.push((_result17 = result[result.length - 1]) === null || _result17 === void 0 ? void 0 : _result17.wr1);
          (_wrRef$current4 = wrRef.current) === null || _wrRef$current4 === void 0 ? void 0 : (_wrRef$current4$index = _wrRef$current4[index]) === null || _wrRef$current4$index === void 0 ? void 0 : _wrRef$current4$index.setData(result.map(function (item) {
            return {
              value: item.wr1,
              time: item.time
            };
          }));
        });
      }
      setMaIndicator(_ma);
      setMainK(_mainK);
      setSubK(_subK);
      setBollK(_boll);
      setKdjK(_kdjK);
      setRsiK(_rsiK);
      setWrK(_wrK);
    }
  }, [mainIndicator, subIndicator, chartRef.current, props.getDataAndUpdateChart, colors]);
  useEffect(function () {
    if (candlestickSeriesRef.current) {
      var _props$createChart5, _props$createChart6, _props$createChart7, _props$createChart8;
      candlestickSeriesRef.current.applyOptions({
        scaleMargins: chartScaleMargins,
        upColor: (props === null || props === void 0 ? void 0 : (_props$createChart5 = props.createChart) === null || _props$createChart5 === void 0 ? void 0 : _props$createChart5.upColor) || '#26a69a',
        downColor: (props === null || props === void 0 ? void 0 : (_props$createChart6 = props.createChart) === null || _props$createChart6 === void 0 ? void 0 : _props$createChart6.downColor) || '#ef5350',
        wickUpColor: (props === null || props === void 0 ? void 0 : (_props$createChart7 = props.createChart) === null || _props$createChart7 === void 0 ? void 0 : _props$createChart7.upColor) || '#26a69a',
        wickDownColor: (props === null || props === void 0 ? void 0 : (_props$createChart8 = props.createChart) === null || _props$createChart8 === void 0 ? void 0 : _props$createChart8.downColor) || '#ef5350'
      });
    }
    if (timeLineRef.current) {
      timeLineRef.current.applyOptions({
        scaleMargins: chartScaleMargins
      });
    }
    if (smaLineRef.current) {
      smaLineRef.current.forEach(function (item) {
        item.applyOptions({
          scaleMargins: chartScaleMargins
        });
      });
    }
    if (difRef.current) {
      difRef.current.applyOptions({
        scaleMargins: macdScaleMargins
      });
    }
    if (deaRef.current) {
      deaRef.current.applyOptions({
        scaleMargins: macdScaleMargins
      });
    }
    if (macdVolumeSeriesRef.current) {
      macdVolumeSeriesRef.current.applyOptions({
        scaleMargins: macdScaleMargins
      });
    }
    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.applyOptions({
        scaleMargins: volScaleMargins
      });
    }
    if (bollRef.current) {
      bollRef.current.mid.applyOptions({
        scaleMargins: chartScaleMargins
      });
      bollRef.current.upper.applyOptions({
        scaleMargins: chartScaleMargins
      });
      bollRef.current.lower.applyOptions({
        scaleMargins: chartScaleMargins
      });
    }
    if (kdjRef.current) {
      kdjRef.current.k.applyOptions({
        scaleMargins: kdjScaleMargins
      });
      kdjRef.current.d.applyOptions({
        scaleMargins: kdjScaleMargins
      });
      kdjRef.current.j.applyOptions({
        scaleMargins: kdjScaleMargins
      });
    }
    if (rsiRef.current) {
      rsiRef.current.forEach(function (item) {
        item.applyOptions({
          scaleMargins: rsiScaleMargins
        });
      });
    }
    if (wrRef.current) {
      wrRef.current.forEach(function (item) {
        item.applyOptions({
          scaleMargins: wrScaleMargins
        });
      });
    }
  }, [subIndicator, colors]);
  var mainKList = [{
    name: timeLocaleLanguageMap[props.locale]['时间'],
    value: 'time'
  }, {
    name: timeLocaleLanguageMap[props.locale]['开'],
    value: 'open'
  }, {
    name: timeLocaleLanguageMap[props.locale]['高'],
    value: 'high'
  }, {
    name: timeLocaleLanguageMap[props.locale]['低'],
    value: 'low'
  }, {
    name: timeLocaleLanguageMap[props.locale]['收'],
    value: 'close'
  }, {
    name: timeLocaleLanguageMap[props.locale]['涨跌幅'],
    value: 'chg'
  }, {
    name: timeLocaleLanguageMap[props.locale]['振幅'],
    value: 'amp'
  }, {
    name: timeLocaleLanguageMap[props.locale]['量'],
    value: 'volume'
  }, {
    name: timeLocaleLanguageMap[props.locale]['额'],
    value: 'quoteVolume'
  }];
  var getHeight = function getHeight(scaleMargins) {
    var _containerRef$current7;
    if ((_containerRef$current7 = containerRef.current) !== null && _containerRef$current7 !== void 0 && _containerRef$current7.clientHeight) {
      return (containerRef.current.clientHeight - 26) * scaleMargins - 18;
    }
    return 0;
  };
  return React.createElement("div", {
    className: "chart",
    id: "chart",
    ref: containerRef
  }, curMaxAndMinPoint.max.value !== curMaxAndMinPoint.min.value ? React.createElement("div", {
    className: "chart-max-or-min-price",
    style: {
      top: curMaxAndMinPoint.max.y - 20 || 0,
      left: curMaxAndMinPoint.max.x || 0,
      transform: curMaxAndMinPoint.max.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
      color: props.createChart.textColor01
    }
  }, curMaxAndMinPoint.max.x < 80 ? [React.createElement("div", {
    key: 2,
    className: "bg-text_color_01",
    style: {
      width: '16px',
      height: '1px'
    }
  }), React.createElement("span", {
    className: "ml-1",
    key: 1
  }, curMaxAndMinPoint.max.value)] : [React.createElement("span", {
    key: 1
  }, curMaxAndMinPoint.max.value), React.createElement("div", {
    key: 2,
    className: "bg-text_color_01 ml-1",
    style: {
      width: '16px',
      height: '1px'
    }
  })]) : null, React.createElement("div", {
    className: "chart-max-or-min-price",
    style: {
      top: curMaxAndMinPoint.min.y || 0,
      left: curMaxAndMinPoint.min.x || 0,
      transform: curMaxAndMinPoint.min.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
      color: props.createChart.textColor01
    }
  }, curMaxAndMinPoint.min.x < 80 ? [React.createElement("div", {
    key: 2,
    className: "bg-text_color_01",
    style: {
      width: '16px',
      height: '1px'
    }
  }), React.createElement("span", {
    className: "ml-1",
    key: 1
  }, curMaxAndMinPoint.min.value)] : [React.createElement("span", {
    key: 1
  }, curMaxAndMinPoint.min.value), React.createElement("div", {
    key: 2,
    className: "bg-text_color_01 ml-1",
    style: {
      width: '16px',
      height: '1px'
    }
  })]), React.createElement("div", {
    className: "ma"
  }, mainIndicator.ma.select ? React.createElement("div", {
    className: "text-text_color_03 k-line-ind-wrap common-text"
  }, mainIndicator.ma.cur.map(function (item, index) {
    if (item.select) {
      var _maIndicator$index;
      return React.createElement("span", {
        key: item.strip,
        className: "ma-child"
      }, "MA(".concat(item.strip, ")"), React.createElement("span", {
        className: "common-ml-5",
        style: {
          color: item.color
        }
      }, maIndicator === null || maIndicator === void 0 ? void 0 : (_maIndicator$index = maIndicator[index]) === null || _maIndicator$index === void 0 ? void 0 : _maIndicator$index.toFixed(2)));
    }
    return null;
  })) : null, mainIndicator.boll.select ? React.createElement("div", {
    className: "k-line-ind-wrap text-text_color_03 common-text"
  }, React.createElement("span", {
    className: "ma-child"
  }, "BOLL(".concat(mainIndicator.boll.cur.mid, ", ").concat(mainIndicator.boll.cur.std, "):"), React.createElement("span", {
    className: "common-ml-5"
  }, "UP"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[0].color
    }
  }, bollK.upper), React.createElement("span", {
    className: "common-ml-5"
  }, "MB"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[1].color
    }
  }, bollK.mid), React.createElement("span", {
    className: "common-ml-5"
  }, "DN"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[2].color
    }
  }, bollK.lower))) : null), React.createElement("div", {
    className: "common-sub-ind text-text_color_03",
    style: {
      // top: `${(macdScaleMargins.top - 0.05) * 100}%`,
      /** chart 下移了0.5，这里递减 */
      // top: `calc(${(volScaleMargins.top - 0.1) * 100}% - 10px)`,
      top: getHeight(volScaleMargins.top)
    }
  }, React.createElement("span", null, React.createElement("span", null, "Vol(", coinInfo.baseSymbolName, ")"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor
    }
  }, volume.vol)), React.createElement("span", {
    className: "common-ml-5"
  }, React.createElement("span", null, "Vol(", coinInfo.quoteSymbolName, ")"), React.createElement("span", {
    style: {
      color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor
    },
    className: "common-ml-5"
  }, volume.quoteVolume))), subIndicator.macd.select ? React.createElement("div", {
    className: "common-sub-ind common-text text-text_color_03",
    style: {
      top: getHeight(macdScaleMargins.top)
    }
  }, React.createElement("span", null, "MACD(".concat(subIndicator.macd.cur.fast, ", ").concat(subIndicator.macd.cur.slow, ", ").concat(subIndicator.macd.cur.signal, ")")), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: '#9660c4'
    }
  }, Number(subK === null || subK === void 0 ? void 0 : subK.dea).toFixed(2)), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: '#84aad5'
    }
  }, Number(subK === null || subK === void 0 ? void 0 : subK.dif).toFixed(2)), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: Number(subK === null || subK === void 0 ? void 0 : subK.macd) > 0 ? props.createChart.upColor : props.createChart.downColor
    }
  }, Number(subK === null || subK === void 0 ? void 0 : subK.macd).toFixed(2))) : null, subIndicator.kdj.select ? React.createElement("div", {
    style: {
      top: getHeight(kdjScaleMargins.top)
    },
    className: "common-sub-ind  common-text text-text_color_03"
  }, React.createElement("span", {
    className: "ma-child"
  }, "KDJ(".concat(subIndicator.kdj.cur.k, ", ").concat(subIndicator.kdj.cur.d, ", ").concat(subIndicator.kdj.cur.j, "):"), React.createElement("span", {
    className: "common-ml-5"
  }, "K"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[0].color
    }
  }, kdjK === null || kdjK === void 0 ? void 0 : kdjK.k), React.createElement("span", {
    className: "common-ml-5"
  }, "D"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[1].color
    }
  }, kdjK === null || kdjK === void 0 ? void 0 : kdjK.d), React.createElement("span", {
    className: "common-ml-5"
  }, "J"), React.createElement("span", {
    className: "common-ml-5",
    style: {
      color: mainIndicator.ma.cur[2].color
    }
  }, kdjK === null || kdjK === void 0 ? void 0 : kdjK.j))) : null, subIndicator.rsi.select ? React.createElement("div", {
    style: {
      top: getHeight(rsiScaleMargins.top)
    },
    className: "common-sub-ind common-text text-text_color_03"
  }, subIndicator.rsi.cur.map(function (item, index) {
    if (item.select) {
      return React.createElement("span", {
        key: index,
        className: "ma-child"
      }, "RSI(".concat(item.value, ")"), React.createElement("span", {
        className: "common-ml-5",
        style: {
          color: item.color
        }
      }, rsiK === null || rsiK === void 0 ? void 0 : rsiK[Object.keys(rsiK)[index]]));
    }
    return null;
  })) : null, subIndicator.wr.select ? React.createElement("div", {
    style: {
      top: getHeight(wrScaleMargins.top)
    },
    className: "common-sub-ind common-text text-text_color_03"
  }, subIndicator.wr.cur.map(function (item, index) {
    if (item.select) {
      return React.createElement("span", {
        key: index,
        className: "ma-child"
      }, "Wm %R(".concat(item.value, ")"), React.createElement("span", {
        className: "common-ml-5",
        style: {
          color: item.color
        }
      }, wrK === null || wrK === void 0 ? void 0 : wrK[index]));
    }
    return null;
  })) : null, React.createElement("div", {
    className: "k-data",
    style: {
      background: props.createChart.cardBgColor03,
      display: chartCrossHair.show ? 'block' : 'none',
      top: chartCrossHair.y,
      left: chartCrossHair.x
    }
  }, mainKList.map(function (item) {
    return React.createElement("div", {
      key: item.value,
      style: {
        height: '18px'
      },
      className: "flex justify-between items-center gap-2 text-text_color_02"
    }, React.createElement("span", null, item.name), React.createElement("span", {
      className: classNames({
        'text-buy_up_color': item.value === 'chg' && (mainK === null || mainK === void 0 ? void 0 : mainK.isUp),
        'text-text_color_01': item.value !== 'chg',
        'text-sell_down_color': item.value === 'chg' && !(mainK !== null && mainK !== void 0 && mainK.isUp)
      })
    }, item.value === 'volume' || item.value === 'quoteVolume' ? numFormat(mainK === null || mainK === void 0 ? void 0 : mainK[item.value], 2) : mainK === null || mainK === void 0 ? void 0 : mainK[item.value]));
  })));
}
var kLineChart = forwardRef(KLineChart);
export { UserUpsAndDownsColorEnum, kLineChart as default };
