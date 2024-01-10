function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { memo, useState, useEffect } from 'react';
import { getTheme } from '@nbit/chart-utils';
import SeriesChart from './series-chart.js';
function Series(props) {
  var _getTheme = getTheme(),
    bgColor = _getTheme.bgColor,
    textColor = _getTheme.textColor,
    textColor01 = _getTheme.textColor01,
    brandColor = _getTheme.brandColor,
    upColor = _getTheme.upColor,
    downColor = _getTheme.downColor,
    upLightColor = _getTheme.upLightColor,
    downLightColor = _getTheme.downLightColor,
    cardBgColor = _getTheme.cardBgColor,
    cardBgColor03 = _getTheme.cardBgColor03;
  var _useState = useState({
      background: {
        color: bgColor
      },
      textColor: textColor
    }),
    _useState2 = _slicedToArray(_useState, 2),
    chartLayoutOptions = _useState2[0],
    setChartLayoutOptions = _useState2[1];
  var priceOffset = props.offset.priceOffset;
  useEffect(function () {
    var _bgColor = getTheme().bgColor;
    var _textColor = getTheme().textColor;
    setChartLayoutOptions({
      background: {
        color: _bgColor
      },
      textColor: _textColor
    });
  }, [props.theme]);
  return React.createElement("div", {
    className: "series-chart-wrap"
  }, React.createElement("div", {
    className: "chart-wrap"
  }, React.createElement(SeriesChart, {
    chartLayoutOptions: chartLayoutOptions,
    data: props.seriesData,
    theme: props.theme,
    priceOffset: priceOffset,
    colors: props.colors,
    createChart: {
      brandColor: brandColor,
      upColor: upColor,
      downColor: downColor,
      upLightColor: upLightColor,
      downLightColor: downLightColor,
      bgColor: bgColor,
      textColor: textColor,
      cardBgColor: cardBgColor,
      textColor01: textColor01,
      cardBgColor03: cardBgColor03
    }
  })));
}
var Series$1 = memo(Series);
export { Series$1 as default };
