'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var lightweightCharts = require('lightweight-charts');
var chartUtils = require('@nbit/chart-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TradeDirectionEnum;
(function (TradeDirectionEnum) {
    TradeDirectionEnum["Buy"] = "buy";
    TradeDirectionEnum["Sell"] = "sell";
})(TradeDirectionEnum || (TradeDirectionEnum = {}));
/** 涨跌色 */
exports.UserUpsAndDownsColorEnum = void 0;
(function (UserUpsAndDownsColorEnum) {
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["greenUpRedDown"] = 1] = "greenUpRedDown";
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["redUpGreenDown"] = 2] = "redUpGreenDown";
})(exports.UserUpsAndDownsColorEnum || (exports.UserUpsAndDownsColorEnum = {}));
function DeptRealChart(props) {
    const { priceOffset, colors } = props;
    const leftDeptRef = React.useRef(null);
    const centerDeptRef = React.useRef(null);
    const rightDeptRef = React.useRef(null);
    const deptRef = React.useRef(null);
    const chartRef = React.useRef(null);
    const floatTooltip = React.useRef(null);
    const leftDataRef = React.useRef([]);
    const rightDataRef = React.useRef([]);
    const [centerVerLine, setCenterVerLine] = React.useState({
        x: 0,
    });
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
                return item;
            },
        },
        // 时间刻度和价格刻度
        timeScale: {
            barSpacing: 6,
            tickMarkFormatter: time => {
                return time;
            },
        },
        rightPriceScale: {
            borderColor: gridColor,
        },
    };
    React.useEffect(() => {
        chartRef.current?.applyOptions({
            // 时间刻度和价格刻度
            layout: props.chartLayoutOptions,
            grid: {
                vertLines: {
                    color: gridColor,
                },
                horzLines: {
                    color: gridColor,
                },
            },
        });
    }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor]);
    React.useEffect(() => {
        if (floatTooltip.current) {
            floatTooltip.current.style.background = props.createChart.cardBgColor;
            floatTooltip.current.style.color = props.createChart.textColor01;
        }
    }, [props.createChart.cardBgColor, props.createChart.textColor]);
    const setVerLineChart = () => {
        if (!leftDataRef.current?.length && !rightDataRef.current?.length) {
            return;
        }
        requestAnimationFrame(() => {
            const verPoint = {
                x: 0,
            };
            const leftX = chartRef.current
                ?.timeScale()
                .timeToCoordinate(leftDataRef.current[leftDataRef.current.length - 1].time) || 0;
            const rightX = chartRef.current?.timeScale().timeToCoordinate(rightDataRef.current[0].time) || 0;
            verPoint.x = leftX + (rightX - leftX) / 2;
            setCenterVerLine(verPoint);
        });
    };
    const dealData = data => {
        const leftData = [];
        const rightData = [];
        data.forEach(item => {
            if (item.direction !== TradeDirectionEnum.Sell) {
                leftData.push(item);
            }
            else {
                rightData.push(item);
            }
        });
        leftDeptRef.current?.setData(leftData);
        rightDeptRef.current?.setData(rightData);
        leftDataRef.current = leftData;
        rightDataRef.current = rightData;
        setVerLineChart();
        chartRef.current?.timeScale().fitContent();
    };
    React.useEffect(() => {
        if (!props.data?.length || !leftDeptRef.current || !rightDeptRef.current || !chartRef.current) {
            return;
        }
        dealData(props.data);
    }, [props.data]);
    React.useEffect(() => {
        chartRef.current = lightweightCharts.createChart(document.getElementById('chart'), chartPropertySetting);
        leftDeptRef.current = chartRef.current.addAreaSeries({
            lineColor: props.createChart.upColor,
            topColor: 'rgba(80, 177, 108, 0.35)',
            bottomColor: 'rgba(80, 177, 108, 0.05)',
            lineWidth: 1,
            ...chartPriceLineProperty,
        });
        centerDeptRef.current = chartRef.current.addLineSeries({
            color: '#ff0000',
            lineWidth: 1,
            lineStyle: lightweightCharts.LineStyle.Solid,
            ...chartPriceLineProperty,
        });
        rightDeptRef.current = chartRef.current.addAreaSeries({
            lineColor: props.createChart.downColor,
            topColor: 'rgba(233, 90, 92, 0.35)',
            bottomColor: 'rgba(233, 90, 92, 0.05)',
            lineWidth: 1,
            ...chartPriceLineProperty,
        });
        let toolTipWidth = 100;
        let toolTipHeight = 80;
        let toolTipMargin = 15;
        let toolTip = document.createElement('div');
        floatTooltip.current = toolTip;
        toolTip.className = `dept-floating-tooltip`;
        toolTip.style.color = colorRef.current.textColor01;
        toolTip.style.background = colorRef.current.cardBgColor03;
        document.getElementById('chart')?.appendChild(toolTip);
        const subscribeTimeChange = newVisibleTimeRange => {
            if (chartRef.current?.timeScale().getVisibleRange()?.from) {
                setVerLineChart();
            }
        };
        chartRef.current.timeScale().subscribeVisibleTimeRangeChange(subscribeTimeChange);
        // update tooltip
        chartRef.current.subscribeCrosshairMove(function (param) {
            if (!param.time ||
                param.point.x < 0 ||
                param.point.x > (deptRef?.current?.clientWidth || 0) ||
                param.point.y < 0 ||
                param.point.y > (deptRef?.current?.clientHeight || 0)) {
                toolTip.style.display = 'none';
                return;
            }
            let dateStr = param.time;
            toolTip.style.display = 'block';
            toolTip.style.color = colorRef.current.textColor01;
            let leftCount = param.seriesPrices.get(leftDeptRef.current);
            let rightCount = param.seriesPrices.get(rightDeptRef.current);
            let chgTemp = 0;
            let chg = `${chgTemp.toFixed(priceOffset || 2)}%`;
            let dir = dateStr >= rightDataRef.current?.[0].value ? TradeDirectionEnum.Sell : TradeDirectionEnum.Buy;
            props.data?.forEach(item => {
                const symbol = item.direction === TradeDirectionEnum.Buy ? '-' : '+';
                if (item.time === dateStr) {
                    chg = `${symbol}${item.chg.toFixed(priceOffset || 2)}%`;
                    dir = item.direction;
                }
            });
            // eslint-disable-next-line no-useless-concat
            toolTip.innerHTML =
                `<div style="display: flex; justify-content: space-between; min-width: 120px;"><span>价差幅度</span><span style="color: ${dir === TradeDirectionEnum.Buy ? colorRef.current.upColor : colorRef.current.downColor}">${chg}</span></div>` +
                    `<div style="display: flex; justify-content: space-between; min-width: 120px; margin-top: 16px; color: ${colorRef.current.textColor01}"><span>委托价格</span><span>${dateStr}</span></div>` +
                    `<div style="display: flex; justify-content: space-between; min-width: 120px; margin-top: 16px; color: ${colorRef.current.textColor01}"><span>累计挂单</span><span>${leftCount || rightCount}</span></div>`;
            let y = param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > (deptRef?.current?.clientWidth || 0) - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
            }
            let top = y + toolTipMargin;
            if (top > (deptRef?.current?.clientHeight || 0) - toolTipHeight) {
                top = y - toolTipHeight - toolTipMargin;
            }
            toolTip.style.left = `${left}px`;
            toolTip.style.top = `${top}px`;
        });
    }, []);
    React.useEffect(() => {
        if (leftDeptRef.current && rightDeptRef.current) {
            if (colors === exports.UserUpsAndDownsColorEnum.greenUpRedDown) {
                leftDeptRef.current.applyOptions({
                    lineColor: props.createChart.upColor,
                    topColor: 'rgba(80, 177, 108, 0.35)',
                    bottomColor: 'rgba(80, 177, 108, 0.05)',
                });
                rightDeptRef.current.applyOptions({
                    lineColor: props.createChart.downColor,
                    topColor: 'rgba(233, 90, 92, 0.35)',
                    bottomColor: 'rgba(233, 90, 92, 0.05)',
                });
            }
            else {
                leftDeptRef.current.applyOptions({
                    lineColor: props.createChart.upColor,
                    topColor: 'rgba(233, 90, 92, 0.35)',
                    bottomColor: 'rgba(233, 90, 92, 0.05)',
                });
                rightDeptRef.current.applyOptions({
                    lineColor: props.createChart.downColor,
                    topColor: 'rgba(80, 177, 108, 0.35)',
                    bottomColor: 'rgba(80, 177, 108, 0.05)',
                });
            }
        }
    }, [colors]);
    return (React__default["default"].createElement("div", { ref: deptRef, className: "chart", id: "chart" },
        React__default["default"].createElement("div", { className: "center-ver-line", style: {
                width: '1px',
                height: (deptRef.current?.clientHeight || 0) - 26,
                top: 0,
                left: centerVerLine.x,
                background: props.chartLayoutOptions.textColor,
                opacity: 0.5,
            } })));
}
DeptRealChart.displayName = 'deptChart';

exports["default"] = DeptRealChart;
