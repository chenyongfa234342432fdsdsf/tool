'use strict';

var dayjs = require('dayjs');
var lightweightCharts = require('lightweight-charts');
var React = require('react');
var chartUtils = require('@nbit/chart-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function SeriesChart(props) {
    const lineRef = React.useRef(null);
    const chartRef = React.useRef(null);
    const chartLineRef = React.useRef();
    React.useEffect(() => {
        if (chartRef.current) {
            chartRef.current.setData(props.data);
        }
    }, [props.data]);
    const colorRef = React.useRef(props.createChart);
    React.useEffect(() => {
        colorRef.current = props.createChart;
    }, [props.createChart]);
    const chartPriceLineProperty = {
        crosshairMarkerVisible: false,
        baseLineVisible: false,
        priceLineVisible: false,
        lastValueVisible: false,
    };
    const gridColor = props.theme === chartUtils.ThemeEnum.light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
    const chartPropertySetting = {
        layout: props.chartLayoutOptions,
        localization: {
            timeFormatter: item => {
                return dayjs__default["default"](item).format('YYYY/MM/DD HH:mm');
            },
            priceFormatter: item => {
                return `${item.toFixed(3)}%`;
            },
        },
        crosshair: {
            mode: lightweightCharts.CrosshairMode.Normal,
        },
        // 时间刻度和价格刻度
        timeScale: {
            barSpacing: 20,
            tickMarkFormatter: time => {
                return dayjs__default["default"](time).format('MM-DD');
            },
            borderColor: gridColor,
            lockVisibleTimeRangeOnResize: true,
        },
        rightPriceScale: {
            borderColor: gridColor,
            // visible: true,
            // alignLabels: true,
            autoScale: true,
        },
        grid: {
            vertLines: {
                color: gridColor,
            },
            horzLines: {
                color: gridColor,
            },
        },
    };
    React.useEffect(() => {
        chartLineRef.current?.applyOptions({
            ...chartPropertySetting,
            layout: {
                ...props.chartLayoutOptions,
            },
            grid: {
                vertLines: {
                    color: gridColor,
                },
                horzLines: {
                    color: gridColor,
                },
            },
            rightPriceScale: {
                ...chartPropertySetting.rightPriceScale,
            },
        });
    }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor]);
    const floatTooltip = React.useRef(null);
    React.useEffect(() => {
        if (floatTooltip.current) {
            floatTooltip.current.style.background = props.createChart.cardBgColor;
            floatTooltip.current.style.color = props.createChart.textColor01;
        }
    }, [props.createChart.cardBgColor, props.createChart.textColor]);
    React.useEffect(() => {
        chartLineRef.current = lightweightCharts.createChart(document.getElementById('chart'), chartPropertySetting);
        // #f1ae3d
        chartRef.current = chartLineRef.current.addLineSeries({
            color: props?.createChart?.brandColor,
            lineWidth: 1,
            lineStyle: lightweightCharts.LineStyle.Solid,
            ...chartPriceLineProperty,
        });
        chartRef.current.setData(props.data);
        chartLineRef.current.timeScale().fitContent();
        let toolTipWidth = 100;
        let toolTipMargin = 15;
        let toolTip = document.createElement('div');
        floatTooltip.current = toolTip;
        toolTip.className = 'series-floating-tooltip';
        toolTip.style.color = colorRef.current.textColor01;
        toolTip.style.background = colorRef.current.cardBgColor03;
        document.getElementById('chart')?.appendChild(toolTip);
        // update tooltip
        chartLineRef.current.subscribeCrosshairMove(function (param) {
            if (!param.time ||
                param.point.x < 0 ||
                param.point.x > lineRef.current.clientWidth ||
                param.point.y < 0 ||
                param.point.y > lineRef.current.clientHeight) {
                toolTip.style.display = 'none';
                return;
            }
            let dateStr = dayjs__default["default"](param.time).format('MM-DD HH:MM');
            toolTip.style.display = 'block';
            let price = param.seriesPrices.get(chartRef.current);
            // eslint-disable-next-line no-useless-concat
            toolTip.innerHTML = `<div>${dateStr}</div>` + `${'<div style="marginTop: 4px">'}${price}%</div>`;
            param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > lineRef.current.clientWidth - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
            }
            let top = 20;
            toolTip.style.left = `${left}px`;
            toolTip.style.top = `${top}px`;
        });
    }, []);
    return React__default["default"].createElement("div", { ref: lineRef, className: "chart", id: "chart" });
}
SeriesChart.displayName = 'Series';

module.exports = SeriesChart;
