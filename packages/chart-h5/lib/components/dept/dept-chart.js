'use strict';

var React = require('react');
var lightweightCharts = require('lightweight-charts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function DeptChart(props) {
    const deptRef = React.useRef(null);
    const chartRef = React.useRef(null);
    React.useEffect(() => {
        const chart = lightweightCharts.createChart(document.getElementById('chart'), {
            layout: props.chartLayoutOptions,
            // 时间刻度和价格刻度
            timeScale: {
                visible: false,
            },
            rightPriceScale: {
                visible: false,
            },
            // 布局相关
            crosshair: {
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
                vertLine: {
                    visible: false,
                    labelVisible: false,
                },
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
        });
        const front = props.data[props.data.length - 1]?.value || 0;
        const end = props.data[props.data.length - 2]?.value || 0;
        const isUp = front - end > 0;
        chartRef.current = chart.addAreaSeries({
            lineColor: isUp ? props.createChart.upColor : props.createChart.downColor,
            topColor: isUp ? props.createChart.upColor : props.createChart.downColor,
            bottomColor: isUp ? props.createChart.upLightColor : props.createChart.downLightColor,
            crosshairMarkerVisible: false,
            priceLineVisible: false,
        });
        chartRef.current.setData(props.data);
        chart.timeScale().fitContent();
    }, []);
    return React__default["default"].createElement("div", { ref: deptRef, className: "chart", id: "chart" });
}
DeptChart.displayName = 'deptChart';

module.exports = DeptChart;
