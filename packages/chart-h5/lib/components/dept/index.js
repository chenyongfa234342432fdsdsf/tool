'use strict';

var React = require('react');
var chartUtils = require('@nbit/chart-utils');
var deptChart = require('./dept-chart.js');
var deptRealChart = require('./dept-real-chart.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Dept(props) {
    const { bgColor, textColor, textColor01, brandColor, upColor, downColor, upLightColor, downLightColor, cardBgColor, cardBgColor03, } = chartUtils.getTheme();
    const [chartLayoutOptions, setChartLayoutOptions] = React.useState({
        background: {
            color: bgColor,
        },
        textColor,
    });
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
    const { priceOffset } = props.offset;
    return (React__default["default"].createElement("div", { className: "dept-chart-wrap" },
        React__default["default"].createElement("div", { className: "dept-chart" }, props.type === chartUtils.DeptChartSpecieEnum.Dept ? (React__default["default"].createElement(deptChart, { chartLayoutOptions: chartLayoutOptions, data: props.deptData, createChart: { brandColor, upColor, downColor, upLightColor, downLightColor } })) : (React__default["default"].createElement(deptRealChart["default"], { chartLayoutOptions: chartLayoutOptions, data: props.deptData, theme: props.theme, priceOffset: priceOffset, colors: props.colors, createChart: {
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
            } })))));
}
var index = React.memo(Dept);

module.exports = index;
