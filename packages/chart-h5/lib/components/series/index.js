'use strict';

var React = require('react');
var chartUtils = require('@nbit/chart-utils');
var seriesChart = require('./series-chart.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Series(props) {
    const { bgColor, textColor, textColor01, brandColor, upColor, downColor, upLightColor, downLightColor, cardBgColor, cardBgColor03, } = chartUtils.getTheme();
    const [chartLayoutOptions, setChartLayoutOptions] = React.useState({
        background: {
            color: bgColor,
        },
        textColor,
    });
    const { priceOffset } = props.offset;
    React.useEffect(() => {
        const _bgColor = chartUtils.getTheme().bgColor;
        const _textColor = chartUtils.getTheme().textColor;
        setChartLayoutOptions({
            background: {
                color: _bgColor,
            },
            textColor: _textColor,
        });
    }, [props.theme]);
    return (React__default["default"].createElement("div", { className: "series-chart-wrap" },
        React__default["default"].createElement("div", { className: "chart-wrap" },
            React__default["default"].createElement(seriesChart, { chartLayoutOptions: chartLayoutOptions, data: props.seriesData, theme: props.theme, priceOffset: priceOffset, colors: props.colors, createChart: {
                    brandColor,
                    upColor,
                    downColor,
                    upLightColor,
                    downLightColor,
                    bgColor,
                    textColor,
                    cardBgColor,
                    textColor01,
                    cardBgColor03,
                } }))));
}
var Series$1 = React.memo(Series);

module.exports = Series$1;
