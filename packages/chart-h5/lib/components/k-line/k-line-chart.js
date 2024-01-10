require('./index.css');
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');
var lightweightCharts = require('lightweight-charts');
var React = require('react');
var classNames = require('classnames');
var chartUtils = require('@nbit/chart-utils');
var index = require('./helper/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

/** 涨跌色 */
exports.UserUpsAndDownsColorEnum = void 0;
(function (UserUpsAndDownsColorEnum) {
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["greenUpRedDown"] = 1] = "greenUpRedDown";
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["redUpGreenDown"] = 2] = "redUpGreenDown";
})(exports.UserUpsAndDownsColorEnum || (exports.UserUpsAndDownsColorEnum = {}));
function KLineChart(props, ref) {
    const { mainIndicator, subIndicator, chartHeight, offset, updateMarketChangesTime, colors, coinInfo } = props;
    const { priceOffset, amountOffset } = offset;
    const chartRef = React.useRef();
    const candlestickSeriesRef = React.useRef();
    const macdVolumeSeriesRef = React.useRef();
    const smaLineRef = React.useRef();
    const timeLineRef = React.useRef();
    const bollRef = React.useRef();
    const kdjRef = React.useRef();
    const chartPriceLineProperty = {
        crosshairMarkerVisible: false,
        baseLineVisible: false,
        priceLineVisible: false,
        lastValueVisible: false,
    };
    /** 是否点击图表 */
    const isHoverChart = React.useRef(false);
    const [curMaxAndMinPoint, setCurMaxAndMinPoint] = React.useState({
        min: {
            time: 0,
            value: 0,
            x: 0,
            y: 0,
        },
        max: {
            time: 0,
            value: 0,
            x: 0,
            y: 0,
        },
    });
    const [chartCrossHair, setChartCrossHair] = React.useState({
        x: 0,
        y: 0,
        show: false,
    });
    const rsiRef = React.useRef();
    const wrRef = React.useRef();
    const deaRef = React.useRef();
    const difRef = React.useRef();
    const containerRef = React.useRef(null);
    const volumeSeriesRef = React.useRef();
    const checkIsUp = (value) => {
        return value?.close > value?.open;
    };
    const [maIndicator, setMaIndicator] = React.useState();
    const [visibleTimeRange, setVisibleTimeRange] = React.useState({
        from: 0,
        to: 0,
    });
    const [mainK, setMainK] = React.useState();
    const [subK, setSubK] = React.useState();
    const [bollK, setBollK] = React.useState({
        mid: 0,
        upper: 0,
        lower: 0,
    });
    const [volume, setVolume] = React.useState({
        vol: 0,
        quoteVolume: 0,
        dir: 'rise',
    });
    const [kdjK, setKdjK] = React.useState();
    const [rsiK, setRsiK] = React.useState();
    const mainIndicatorRef = React.useRef();
    const subIndicatorRef = React.useRef();
    const [wrK, setWrK] = React.useState();
    const propsDataRef = React.useRef(props.data);
    const curTimeRef = React.useRef(props.curTime);
    const colorsRef = React.useRef(exports.UserUpsAndDownsColorEnum.greenUpRedDown);
    const timeCount = React.useRef(0);
    React.useEffect(() => {
        propsDataRef.current = props.data;
        curTimeRef.current = props.curTime;
        mainIndicatorRef.current = props.mainIndicator;
        subIndicatorRef.current = props.subIndicator;
        colorsRef.current = colors;
    }, [props.data, props.curTime, props.mainIndicator, props.subIndicator, colors]);
    const showFormatTime = (item, unit) => {
        timeCount.current += 1;
        if (!(timeCount.current % 2)) {
            if (unit === chartUtils.TimeSharingType.Mon || unit === chartUtils.TimeSharingType.Week || unit === chartUtils.TimeSharingType.Day) {
                return dayjs__default["default"](item).format('YYYY-MM-DD');
            }
            return dayjs__default["default"](item).format('YYYY-MM-DD HH:mm');
        }
        return '';
    };
    /** 指标在图表中的位置计算 */
    const { chartScaleMargins, volScaleMargins, macdScaleMargins, kdjScaleMargins, rsiScaleMargins, wrScaleMargins } = index.calChartIndicatorPositon(subIndicator);
    const gridColor = props.theme === chartUtils.ThemeEnum.light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
    React.useEffect(() => {
        if (chartRef.current) {
            chartRef.current.applyOptions({
                timeScale: {
                    barSpacing: 10,
                    minBarSpacing: 5,
                    lockVisibleTimeRangeOnResize: true,
                    tickMarkFormatter: item => {
                        return showFormatTime(item, props.curTime.unit);
                    },
                },
            });
        }
    }, [props.curTime.unit, props.curTime.value]);
    const chartPropertySetting = {
        layout: props.chartLayoutOptions,
        localization: {
            timeFormatter: item => {
                return dayjs__default["default"](item).format('YY/MM/DD HH:mm');
            },
        },
        timeScale: {
            barSpacing: 10,
            minBarSpacing: 5,
            borderColor: gridColor,
            lockVisibleTimeRangeOnResize: true,
            tickMarkFormatter: item => {
                // return dayjs(item).format('YY/MM/DD HH:mm')
                return showFormatTime(item, props.curTime.unit);
            },
        },
        rightPriceScale: {
            scaleMargins: chartScaleMargins,
            entireTextOnly: true,
            visible: true,
            alignLabels: true,
            autoScale: true,
            borderColor: gridColor,
        },
    };
    React.useEffect(() => {
        /** 平滑效果 */
        /** 考虑了 3 个可能性，切换 tab 时，改变屏幕大小时，滚动时都会对可见区域处理，这块极其容易出 bug */
        requestAnimationFrame(() => {
            index.calHeightAndLowPoint(visibleTimeRange, curTimeRef, propsDataRef, timeLineRef, candlestickSeriesRef, chartRef, setCurMaxAndMinPoint);
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
    React.useEffect(() => {
        chartRef.current = lightweightCharts.createChart(document.getElementById('chart'), chartPropertySetting);
        const subscribeTimeChange = newVisibleTimeRange => {
            if (chartRef.current?.timeScale().getVisibleRange()?.from) {
                setVisibleTimeRange(chartRef.current?.timeScale().getVisibleRange());
            }
            // setPopVisible(false)
        };
        /** 最高价最低价逻辑 */
        chartRef.current.timeScale().subscribeVisibleTimeRangeChange(subscribeTimeChange);
        chartRef.current.timeScale().fitContent();
        const subscribeMoveChange = param => {
            if (!param.time ||
                param.point.x < 0 ||
                param.point.x > (containerRef?.current?.clientWidth || 0) ||
                param.point.y < 0 ||
                param.point.y > (containerRef?.current?.clientHeight || 0)) {
                setChartCrossHair({
                    x: 0,
                    y: 0,
                    show: false,
                });
                isHoverChart.current = false;
                return;
            }
            isHoverChart.current = true;
            const time = param.time;
            const volumeSeriesData = macdVolumeSeriesRef.current
                ? param.seriesPrices.get(macdVolumeSeriesRef.current)
                : undefined;
            const chartData = candlestickSeriesRef.current
                ? param.seriesPrices.get(candlestickSeriesRef.current)
                : {};
            const smaLineArr = [];
            smaLineRef.current?.forEach(item => {
                smaLineArr.push(param.seriesPrices.get(item));
            });
            const dif = difRef.current ? param.seriesPrices.get(difRef.current) : undefined;
            const dea = deaRef.current ? param.seriesPrices.get(deaRef.current) : undefined;
            setMaIndicator(smaLineArr);
            const _chartData = propsDataRef.current.filter(item => {
                return item.time === time;
            })?.[0];
            setMainK({
                time: dayjs__default["default"](time).format('YYYY-MM-DD HH:mm'),
                open: chartData?.open,
                close: chartData?.close,
                high: chartData?.high,
                low: chartData?.low,
                isUp: checkIsUp(chartData),
                chg: chartUtils.calcChg(chartData, priceOffset),
                amp: chartUtils.calcAmp(chartData, priceOffset),
                volume: _chartData?.volume,
                quoteVolume: _chartData?.quoteVolume,
            });
            setSubK({
                macd: volumeSeriesData,
                dea: dea,
                dif: dif,
            });
            setBollK({
                mid: param.seriesPrices.get(bollRef.current?.mid),
                upper: param.seriesPrices.get(bollRef.current?.upper),
                lower: param.seriesPrices.get(bollRef.current?.lower),
            });
            setKdjK({
                k: param.seriesPrices.get(kdjRef.current?.k),
                d: param.seriesPrices.get(kdjRef.current?.d),
                j: param.seriesPrices.get(kdjRef.current?.j),
            });
            setRsiK({
                r: param.seriesPrices.get(rsiRef.current?.[0]),
                s: param.seriesPrices.get(rsiRef.current?.[1]),
                i: param.seriesPrices.get(rsiRef.current?.[2]),
            });
            const wrLineArr = [];
            wrRef.current?.forEach(item => {
                wrLineArr.push(param.seriesPrices.get(item));
            });
            setWrK(wrLineArr);
            let toolTipWidth = 160;
            let toolTipMargin = 15;
            param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > (containerRef?.current?.clientWidth || 0) - toolTipWidth) {
                // left = param.point.x - toolTipMargin - toolTipWidth
                setChartCrossHair({
                    x: 16,
                    y: 32,
                    show: true,
                });
            }
            else {
                setChartCrossHair({
                    x: (containerRef?.current?.clientWidth || 0) - toolTipWidth - 16,
                    y: 32,
                    show: true,
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
        return () => {
            chartRef.current?.timeScale().unsubscribeVisibleTimeRangeChange(subscribeTimeChange);
            // chartRef.current?.unsubscribeClick(param => {
            //   subscribeClickChange(param, markersRef, setPopVisible, props, priceOffset, setCurMarkers)
            // })
            chartRef.current?.unsubscribeCrosshairMove(subscribeMoveChange);
        };
    }, []);
    const getColorOfSetting = (close, open) => {
        if (colorsRef.current === exports.UserUpsAndDownsColorEnum.greenUpRedDown) {
            return close > open ? 'rgba(80, 177, 108, 0.5)' : 'rgba(233, 90, 92, 0.5)';
        }
        else {
            return close > open ? 'rgba(233, 90, 92, 0.5)' : 'rgba(80, 177, 108, 0.5)';
        }
    };
    React.useImperativeHandle(ref, () => ({
        scrollToTime(marketChangesTime) {
            /** 跳转行情异动的 k 线柱子 */
            if (chartRef.current && propsDataRef.current?.length) {
                /** 库 api 有 bug，无法获取正确的位置，导致 scrollToPosition 不可用 */
                chartRef.current?.timeScale().timeToCoordinate(marketChangesTime);
                // console.log('getVisibleLogicalRange--------', chartRef.current?.timeScale().getVisibleLogicalRange())
                //   chartRef.current?.timeScale().scrollToPosition(timeToCoordinate as number, true)
                setTimeout(() => {
                    chartRef.current?.timeScale().setVisibleRange({
                        from: (curTimeRef.current.unit === 'm'
                            ? marketChangesTime - 1000 * 60 * 120
                            : marketChangesTime - 1000 * 60 * 60 * 120),
                        to: curTimeRef.current.unit === 'm' ? marketChangesTime + 1000 * 60 : marketChangesTime + 1000 * 60 * 60,
                    });
                });
                /** 跳转之后清空时间 */
                updateMarketChangesTime(0);
            }
        },
        updateCandlestickData(data) {
            candlestickSeriesRef.current?.update(data);
            if (!isHoverChart.current) {
                setMainK({
                    ...data,
                    time: dayjs__default["default"](data.time).format('YYYY/MM/DD HH:mm'),
                    isUp: checkIsUp(data),
                    chg: chartUtils.calcChg(data, priceOffset),
                    amp: chartUtils.calcAmp(data, priceOffset),
                });
            }
        },
        updateTimeData(data) {
            timeLineRef.current?.update(data);
            if (!isHoverChart.current) {
                setMainK({
                    ...data,
                    time: dayjs__default["default"](data.time).format('YYYY/MM/DD HH:mm'),
                    isUp: checkIsUp(data),
                    chg: chartUtils.calcChg(data, priceOffset),
                    amp: chartUtils.calcAmp(data, priceOffset),
                });
            }
        },
        updateVolumeData(data) {
            volumeSeriesRef.current?.update({
                ...data,
                // 'rgba(var(--buy_up_color), 0.5)' : 'rgba(var(--sell_down_color), 0.5)'
                color: getColorOfSetting(data.close, data.open),
            });
            if (!isHoverChart.current) {
                setVolume({
                    ...data,
                    vol: data.value,
                });
            }
        },
        updateMaData() {
            if (mainIndicatorRef.current?.ma.select) {
                let _ma = [];
                mainIndicatorRef.current?.ma.cur.forEach((item, index) => {
                    if (item.select) {
                        const { strip, type } = item;
                        let smaData = chartUtils.calculateSMA(propsDataRef.current, Number(strip), type, priceOffset);
                        _ma.push(smaData[smaData.length - 1]?.value);
                        smaData[smaData.length - 1]?.time &&
                            smaLineRef.current?.[index]?.update(smaData[smaData.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setMaIndicator(_ma);
                }
            }
        },
        updateMacdData(data) {
            if (subIndicatorRef.current?.macd.select) {
                let _subK = {
                    dea: undefined,
                    dif: undefined,
                    macd: undefined,
                };
                const fast = (subIndicatorRef.current?.macd.cur.fast).value;
                const slow = (subIndicatorRef.current?.macd.cur.slow).value;
                const signal = (subIndicatorRef.current?.macd.cur.signal).value;
                const newData = chartUtils.calculateMACD(propsDataRef.current, Number(fast), Number(slow), Number(signal), priceOffset);
                _subK.dif = newData[newData.length - 1]?.dif;
                _subK.dea = newData[newData.length - 1]?.dea;
                _subK.macd = newData[newData.length - 1]?.value;
                const difData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dif,
                    };
                }) || [];
                const deaData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dea,
                    };
                }) || [];
                const macdData = newData.map(item => {
                    return {
                        time: item?.time,
                        value: item?.value,
                        // color: item?.value < 0 ? props.createChart.downColor : props.createChart.upColor,
                        color: getColorOfSetting(item?.value, 0),
                    };
                }) || [];
                const nameList = [difRef.current, deaRef.current, macdVolumeSeriesRef.current];
                const dataList = [difData[difData.length - 1], deaData[deaData.length - 1], macdData[macdData.length - 1]];
                subIndicator.macd.curLine?.forEach((item, index) => {
                    if (item.select) {
                        nameList[index]?.update(dataList[index]);
                    }
                });
                if (!isHoverChart.current) {
                    setSubK(_subK);
                }
            }
        },
        updateBollData() {
            if (mainIndicatorRef.current?.boll.select) {
                let _boll = {
                    mid: 0,
                    upper: 0,
                    lower: 0,
                };
                const result = chartUtils.calBoll(propsDataRef.current, [
                    Number((mainIndicatorRef.current?.boll.cur.mid).value),
                    Number((mainIndicatorRef.current?.boll.cur.std).value),
                ], priceOffset);
                mainIndicatorRef.current?.boll.curLine?.forEach((item, index) => {
                    if (item.select) {
                        const _index = Object.keys(_boll)[index];
                        _boll[_index] = result[result.length - 1][_index];
                        const value = result.map(_item => {
                            return {
                                value: _item[_index],
                                time: _item.time,
                            };
                        }) || [];
                        bollRef.current?.[_index].update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setBollK(_boll);
                }
            }
        },
        updateKdjData() {
            if (subIndicatorRef.current?.kdj.select) {
                let _kdjK = {
                    k: 0,
                    d: 0,
                    j: 0,
                };
                const result = chartUtils.calKdj(propsDataRef.current, [
                    Number((subIndicatorRef.current?.kdj.cur.k).value),
                    Number((subIndicatorRef.current?.kdj.cur.d).value),
                    Number((subIndicatorRef.current?.kdj.cur.j).value),
                ], priceOffset);
                subIndicatorRef.current?.kdj.curLine?.forEach((item, index) => {
                    const _index = Object.keys(_kdjK)[index];
                    if (item.select) {
                        _kdjK[_index] = result[result.length - 1]?.[_index];
                        const value = result.map(_item => {
                            return {
                                value: _item[_index],
                                time: _item.time,
                            };
                        }) || [];
                        kdjRef.current?.[_index].update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setKdjK(_kdjK);
                }
            }
        },
        updateRsiData() {
            if (subIndicatorRef.current?.rsi.select) {
                let _rsiK = {
                    r: 0,
                    s: 0,
                    i: 0,
                };
                const result = chartUtils.calRsi(propsDataRef.current, [
                    Number(subIndicatorRef.current?.rsi.cur[0].value),
                    Number(subIndicatorRef.current?.rsi.cur[1].value),
                    Number(subIndicatorRef.current?.rsi.cur[2].value),
                ], priceOffset);
                _rsiK.r = result[result.length - 1]?.r;
                _rsiK.s = result[result.length - 1]?.s;
                _rsiK.i = result[result.length - 1]?.i;
                subIndicatorRef.current?.rsi.cur.forEach((_item, index) => {
                    if (_item.select) {
                        const value = result.map(item => {
                            return {
                                value: item[Object.keys(_rsiK)[index]],
                                time: item.time,
                            };
                        }) || [];
                        rsiRef.current?.[index]?.update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setRsiK(_rsiK);
                }
            }
        },
        updateWrData() {
            if (subIndicatorRef.current?.wr.select) {
                let _wrK = [];
                subIndicatorRef.current.wr.cur.forEach((_item, index) => {
                    if (_item.select) {
                        const result = chartUtils.calWr(propsDataRef.current, [Number(subIndicatorRef.current?.wr.cur[index].value)], [
                            { key: 'wr1', title: 'wr1' },
                            { key: 'wr2', title: 'wr2' },
                        ], priceOffset);
                        _wrK.push(result[result.length - 1]?.wr1);
                        const value = result.map(item => {
                            return {
                                value: item.wr1,
                                time: item.time,
                            };
                        }) || [];
                        wrRef.current?.[index]?.update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setWrK(_wrK);
                }
            }
        },
    }));
    React.useLayoutEffect(() => {
        const handleResize = () => {
            chartRef.current?.applyOptions({
                ...chartPropertySetting,
                width: containerRef.current?.clientWidth,
                height: containerRef.current?.clientHeight,
                rightPriceScale: {
                    ...chartPropertySetting.rightPriceScale,
                    scaleMargins: chartScaleMargins,
                },
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    React.useEffect(() => {
        chartRef.current?.applyOptions({
            ...chartPropertySetting,
            height: chartHeight,
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
                scaleMargins: chartScaleMargins,
            },
        });
    }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor, chartHeight]);
    React.useEffect(() => {
        let _ma = [];
        let _mainK = {
            ...props.data[props.data.length - 1],
            time: dayjs__default["default"](props.data[props.data.length - 1]?.time).format('YY-MM-DD HH:mm'),
            isUp: checkIsUp(props.data[props.data.length - 1]),
            chg: chartUtils.calcChg(props.data[props.data.length - 1], priceOffset),
            amp: chartUtils.calcAmp(props.data[props.data.length - 1], priceOffset),
            volume: props.data[props.data.length - 1]?.volume,
            quoteVolume: props.data[props.data.length - 1]?.quoteVolume,
        };
        let _subK = {
            dea: undefined,
            dif: undefined,
            macd: undefined,
        };
        let _boll = {
            mid: 0,
            upper: 0,
            lower: 0,
        };
        let _kdjK = {
            k: 0,
            d: 0,
            j: 0,
        };
        let _rsiK = {
            r: 0,
            s: 0,
            i: 0,
        };
        let _wrK = [];
        if (chartRef.current) {
            if (!candlestickSeriesRef.current) {
                candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
                    upColor: props?.createChart?.upColor || '#26a69a',
                    downColor: props?.createChart?.downColor || '#ef5350',
                    borderVisible: false,
                    wickUpColor: props?.createChart?.upColor || '#26a69a',
                    wickDownColor: props?.createChart?.downColor || '#ef5350',
                    ...chartPriceLineProperty,
                    lastValueVisible: true,
                });
            }
            /* 清空操作，除了 k 线都需要清空 * */
            smaLineRef.current?.forEach(item => {
                item.setData([]);
            });
            timeLineRef.current?.setData([]);
            bollRef.current?.lower.setData([]);
            bollRef.current?.mid.setData([]);
            bollRef.current?.upper.setData([]);
            difRef.current?.setData([]);
            deaRef.current?.setData([]);
            macdVolumeSeriesRef.current?.setData([]);
            kdjRef.current?.k.setData([]);
            kdjRef.current?.d.setData([]);
            kdjRef.current?.j.setData([]);
            rsiRef.current?.forEach(item => {
                item.setData([]);
            });
            wrRef.current?.forEach(item => {
                item.setData([]);
            });
            if (props.curTime.unit === 'time') {
                if (!timeLineRef.current) {
                    timeLineRef.current = chartRef.current?.addLineSeries({
                        color: '#ff0000',
                        lineWidth: 1,
                        lineStyle: lightweightCharts.LineStyle.Solid,
                        ...chartPriceLineProperty,
                        lastValueVisible: true,
                    });
                }
                timeLineRef.current.setData(propsDataRef.current.map(item => {
                    return {
                        ...item,
                        value: item.close,
                    };
                }));
                candlestickSeriesRef.current.setData([]);
            }
            else {
                candlestickSeriesRef.current.setData(propsDataRef.current);
            }
            if (!volumeSeriesRef.current) {
                volumeSeriesRef.current = chartRef.current?.addHistogramSeries({
                    color: props.createChart.upColor,
                    priceFormat: {
                        type: 'price',
                    },
                    priceScaleId: 'vol',
                    scaleMargins: volScaleMargins,
                    ...chartPriceLineProperty,
                });
            }
            volumeSeriesRef.current.setData(propsDataRef.current.map(item => {
                return {
                    time: item.time,
                    value: item.volume,
                    color: getColorOfSetting(item.close, item.open),
                };
            }));
            if (mainIndicator.boll.select) {
                if (!bollRef.current) {
                    bollRef.current = {
                        mid: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[0].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                        upper: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[1].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                        lower: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[2].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                    };
                }
                const result = chartUtils.calBoll(props.data, [mainIndicator.boll.cur.mid, mainIndicator.boll.cur.std], priceOffset);
                _boll.lower = result[result.length - 1]?.lower;
                _boll.mid = result[result.length - 1]?.mid;
                _boll.upper = result[result.length - 1]?.upper;
                bollRef.current.mid.setData(result.map(item => {
                    return {
                        value: item.mid,
                        time: item.time,
                    };
                }));
                bollRef.current.lower.setData(result.map(item => {
                    return {
                        value: item.lower,
                        time: item.time,
                    };
                }));
                bollRef.current.upper.setData(result.map(item => {
                    return {
                        value: item.upper,
                        time: item.time,
                    };
                }));
            }
            if (mainIndicator.ma.select) {
                if (!smaLineRef.current) {
                    const smaLineList = [];
                    mainIndicator.ma.cur.forEach(item => {
                        const value = chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        });
                        smaLineList.push(value);
                    });
                    smaLineRef.current = smaLineList;
                }
                mainIndicator.ma.cur.forEach((item, index) => {
                    if (item.select) {
                        const { strip, type } = item;
                        let smaData = chartUtils.calculateSMA(props.data, Number(strip), type, priceOffset);
                        _ma.push(smaData[smaData.length - 1]?.value);
                        smaLineRef.current?.[index]?.setData(smaData);
                    }
                });
            }
            if (subIndicator.macd.select) {
                const { fast, slow, signal } = subIndicator.macd.cur;
                const newData = chartUtils.calculateMACD(props.data, Number(fast), Number(slow), Number(signal), priceOffset);
                _subK.dif = newData[newData.length - 1]?.dif;
                _subK.dea = newData[newData.length - 1]?.dea;
                _subK.macd = newData[newData.length - 1]?.value;
                const difData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dif,
                    };
                });
                const deaData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dea,
                    };
                });
                const macdData = newData.map(item => {
                    return {
                        time: item?.time,
                        value: item?.value,
                        color: item?.value < 0 ? props.createChart.downColor : props.createChart.upColor,
                    };
                });
                const subLineConfig = {
                    color: props.createChart.brandColor,
                    lineWidth: 1,
                    lineStyle: lightweightCharts.LineStyle.Solid,
                    priceScaleId: 'volume',
                    scaleMargins: macdScaleMargins,
                    ...chartPriceLineProperty,
                };
                if (!difRef.current) {
                    difRef.current = chartRef.current?.addLineSeries({
                        ...subLineConfig,
                        color: '#9660c4',
                    });
                }
                if (!deaRef.current) {
                    deaRef.current = chartRef.current?.addLineSeries({
                        ...subLineConfig,
                        color: '#84aad5',
                    });
                }
                if (!macdVolumeSeriesRef.current) {
                    macdVolumeSeriesRef.current = chartRef.current?.addHistogramSeries({
                        color: props.createChart.upColor,
                        priceFormat: {
                            type: 'price',
                        },
                        priceScaleId: 'volume',
                        scaleMargins: macdScaleMargins,
                        ...chartPriceLineProperty,
                    });
                }
                difRef.current.setData(difData);
                deaRef.current.setData(deaData);
                macdVolumeSeriesRef.current.setData(macdData);
            }
            if (subIndicator.kdj.select) {
                if (!kdjRef.current) {
                    kdjRef.current = {
                        k: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[0].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                        d: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[1].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                        j: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[2].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                    };
                }
                const result = chartUtils.calKdj(props.data, [subIndicator.kdj.cur.k, subIndicator.kdj.cur.d, subIndicator.kdj.cur.j], priceOffset);
                _kdjK.k = result[result.length - 1]?.k;
                _kdjK.d = result[result.length - 1]?.d;
                _kdjK.j = result[result.length - 1]?.j;
                kdjRef.current.k.setData(result.map(item => {
                    return {
                        value: item.k,
                        time: item.time,
                    };
                }));
                kdjRef.current.d.setData(result.map(item => {
                    return {
                        value: item.d,
                        time: item.time,
                    };
                }));
                kdjRef.current.j.setData(result.map(item => {
                    return {
                        value: item.j,
                        time: item.time,
                    };
                }));
            }
            if (subIndicator.rsi.select) {
                if (!rsiRef.current) {
                    const rsiList = [];
                    subIndicator.rsi.cur.forEach(item => {
                        rsiList.push(chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'rsi',
                            scaleMargins: rsiScaleMargins,
                            ...chartPriceLineProperty,
                        }));
                    });
                    rsiRef.current = rsiList;
                }
                const result = chartUtils.calRsi(props.data, [
                    Number(subIndicator.rsi.cur[0]?.value),
                    Number(subIndicator.rsi.cur[1]?.value),
                    Number(subIndicator.rsi.cur[2]?.value),
                ], priceOffset);
                _rsiK.r = result[result.length - 1]?.r;
                _rsiK.s = result[result.length - 1]?.s;
                _rsiK.i = result[result.length - 1]?.i;
                subIndicator.rsi.cur.forEach((item, index) => {
                    rsiRef.current?.[index]?.setData(result.map(item => {
                        return {
                            value: item[Object.keys(_rsiK)[index]],
                            time: item.time,
                        };
                    }));
                });
            }
            if (subIndicator.wr.select) {
                if (!wrRef.current) {
                    const wrList = [];
                    subIndicator.wr.cur.forEach(item => {
                        wrList.push(chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'wr',
                            scaleMargins: wrScaleMargins,
                            ...chartPriceLineProperty,
                        }));
                    });
                    wrRef.current = wrList;
                }
                subIndicator.wr.cur.forEach((item, index) => {
                    const result = chartUtils.calWr(props.data, [Number(subIndicator.wr.cur[index].value)], [
                        { key: 'wr1', title: 'wr1' },
                        { key: 'wr2', title: 'wr2' },
                    ], priceOffset);
                    _wrK.push(result[result.length - 1]?.wr1);
                    wrRef.current?.[index]?.setData(result.map(item => {
                        return {
                            value: item.wr1,
                            time: item.time,
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
    React.useEffect(() => {
        if (candlestickSeriesRef.current) {
            candlestickSeriesRef.current.applyOptions({
                scaleMargins: chartScaleMargins,
                upColor: props?.createChart?.upColor || '#26a69a',
                downColor: props?.createChart?.downColor || '#ef5350',
                wickUpColor: props?.createChart?.upColor || '#26a69a',
                wickDownColor: props?.createChart?.downColor || '#ef5350',
            });
        }
        if (timeLineRef.current) {
            timeLineRef.current.applyOptions({
                scaleMargins: chartScaleMargins,
            });
        }
        if (smaLineRef.current) {
            smaLineRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: chartScaleMargins,
                });
            });
        }
        if (difRef.current) {
            difRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (deaRef.current) {
            deaRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (macdVolumeSeriesRef.current) {
            macdVolumeSeriesRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (volumeSeriesRef.current) {
            volumeSeriesRef.current.applyOptions({
                scaleMargins: volScaleMargins,
            });
        }
        if (bollRef.current) {
            bollRef.current.mid.applyOptions({
                scaleMargins: chartScaleMargins,
            });
            bollRef.current.upper.applyOptions({
                scaleMargins: chartScaleMargins,
            });
            bollRef.current.lower.applyOptions({
                scaleMargins: chartScaleMargins,
            });
        }
        if (kdjRef.current) {
            kdjRef.current.k.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
            kdjRef.current.d.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
            kdjRef.current.j.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
        }
        if (rsiRef.current) {
            rsiRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: rsiScaleMargins,
                });
            });
        }
        if (wrRef.current) {
            wrRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: wrScaleMargins,
                });
            });
        }
    }, [subIndicator, colors]);
    const mainKList = [
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['时间'],
            value: 'time',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['开'],
            value: 'open',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['高'],
            value: 'high',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['低'],
            value: 'low',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['收'],
            value: 'close',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['涨跌幅'],
            value: 'chg',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['振幅'],
            value: 'amp',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['量'],
            value: 'volume',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['额'],
            value: 'quoteVolume',
        },
    ];
    const getHeight = scaleMargins => {
        if (containerRef.current?.clientHeight) {
            return (containerRef.current.clientHeight - 26) * scaleMargins - 18;
        }
        return 0;
    };
    return (React__default["default"].createElement("div", { className: "chart", id: "chart", ref: containerRef },
        curMaxAndMinPoint.max.value !== curMaxAndMinPoint.min.value ? (React__default["default"].createElement("div", { className: "chart-max-or-min-price", style: {
                top: curMaxAndMinPoint.max.y - 20 || 0,
                left: curMaxAndMinPoint.max.x || 0,
                transform: curMaxAndMinPoint.max.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
                color: props.createChart.textColor01,
            } }, curMaxAndMinPoint.max.x < 80
            ? [
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01", style: { width: '16px', height: '1px' } }),
                React__default["default"].createElement("span", { className: "ml-1", key: 1 }, curMaxAndMinPoint.max.value),
            ]
            : [
                React__default["default"].createElement("span", { key: 1 }, curMaxAndMinPoint.max.value),
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01 ml-1", style: { width: '16px', height: '1px' } }),
            ])) : null,
        React__default["default"].createElement("div", { className: "chart-max-or-min-price", style: {
                top: curMaxAndMinPoint.min.y || 0,
                left: curMaxAndMinPoint.min.x || 0,
                transform: curMaxAndMinPoint.min.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
                color: props.createChart.textColor01,
            } }, curMaxAndMinPoint.min.x < 80
            ? [
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01", style: { width: '16px', height: '1px' } }),
                React__default["default"].createElement("span", { className: "ml-1", key: 1 }, curMaxAndMinPoint.min.value),
            ]
            : [
                React__default["default"].createElement("span", { key: 1 }, curMaxAndMinPoint.min.value),
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01 ml-1", style: { width: '16px', height: '1px' } }),
            ]),
        React__default["default"].createElement("div", { className: "ma" },
            mainIndicator.ma.select ? (React__default["default"].createElement("div", { className: "text-text_color_03 k-line-ind-wrap common-text" }, mainIndicator.ma.cur.map((item, index) => {
                if (item.select) {
                    return (React__default["default"].createElement("span", { key: item.strip, className: "ma-child" },
                        `MA(${item.strip})`,
                        React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, maIndicator?.[index]?.toFixed(2))));
                }
                return null;
            }))) : null,
            mainIndicator.boll.select ? (React__default["default"].createElement("div", { className: "k-line-ind-wrap text-text_color_03 common-text" },
                React__default["default"].createElement("span", { className: "ma-child" },
                    `BOLL(${mainIndicator.boll.cur.mid}, ${mainIndicator.boll.cur.std}):`,
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "UP"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[0].color } }, bollK.upper),
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "MB"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[1].color } }, bollK.mid),
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "DN"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[2].color } }, bollK.lower)))) : null),
        React__default["default"].createElement("div", { className: "common-sub-ind text-text_color_03", style: {
                // top: `${(macdScaleMargins.top - 0.05) * 100}%`,
                /** chart 下移了0.5，这里递减 */
                // top: `calc(${(volScaleMargins.top - 0.1) * 100}% - 10px)`,
                top: getHeight(volScaleMargins.top),
            } },
            React__default["default"].createElement("span", null,
                React__default["default"].createElement("span", null,
                    "Vol(",
                    coinInfo.baseSymbolName,
                    ")"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor } }, volume.vol)),
            React__default["default"].createElement("span", { className: "common-ml-5" },
                React__default["default"].createElement("span", null,
                    "Vol(",
                    coinInfo.quoteSymbolName,
                    ")"),
                React__default["default"].createElement("span", { style: { color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor }, className: "common-ml-5" }, volume.quoteVolume))),
        subIndicator.macd.select ? (React__default["default"].createElement("div", { className: "common-sub-ind common-text text-text_color_03", style: {
                top: getHeight(macdScaleMargins.top),
            } },
            React__default["default"].createElement("span", null, `MACD(${subIndicator.macd.cur.fast}, ${subIndicator.macd.cur.slow}, ${subIndicator.macd.cur.signal})`),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: '#9660c4' } }, Number(subK?.dea).toFixed(2)),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: '#84aad5' } }, Number(subK?.dif).toFixed(2)),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: Number(subK?.macd) > 0 ? props.createChart.upColor : props.createChart.downColor } }, Number(subK?.macd).toFixed(2)))) : null,
        subIndicator.kdj.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(kdjScaleMargins.top),
            }, className: "common-sub-ind  common-text text-text_color_03" },
            React__default["default"].createElement("span", { className: "ma-child" },
                `KDJ(${subIndicator.kdj.cur.k}, ${subIndicator.kdj.cur.d}, ${subIndicator.kdj.cur.j}):`,
                React__default["default"].createElement("span", { className: "common-ml-5" }, "K"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[0].color } }, kdjK?.k),
                React__default["default"].createElement("span", { className: "common-ml-5" }, "D"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[1].color } }, kdjK?.d),
                React__default["default"].createElement("span", { className: "common-ml-5" }, "J"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[2].color } }, kdjK?.j)))) : null,
        subIndicator.rsi.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(rsiScaleMargins.top),
            }, className: "common-sub-ind common-text text-text_color_03" }, subIndicator.rsi.cur.map((item, index) => {
            if (item.select) {
                return (React__default["default"].createElement("span", { key: index, className: "ma-child" },
                    `RSI(${item.value})`,
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, rsiK?.[Object.keys(rsiK)[index]])));
            }
            return null;
        }))) : null,
        subIndicator.wr.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(wrScaleMargins.top),
            }, className: "common-sub-ind common-text text-text_color_03" }, subIndicator.wr.cur.map((item, index) => {
            if (item.select) {
                return (React__default["default"].createElement("span", { key: index, className: "ma-child" },
                    `Wm %R(${item.value})`,
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, wrK?.[index])));
            }
            return null;
        }))) : null,
        React__default["default"].createElement("div", { className: "k-data", style: {
                background: props.createChart.cardBgColor03,
                display: chartCrossHair.show ? 'block' : 'none',
                top: chartCrossHair.y,
                left: chartCrossHair.x,
            } }, mainKList.map(item => {
            return (React__default["default"].createElement("div", { key: item.value, style: { height: '18px' }, className: "flex justify-between items-center gap-2 text-text_color_02" },
                React__default["default"].createElement("span", null, item.name),
                React__default["default"].createElement("span", { className: classNames__default["default"]({
                        'text-buy_up_color': item.value === 'chg' && mainK?.isUp,
                        'text-text_color_01': item.value !== 'chg',
                        'text-sell_down_color': item.value === 'chg' && !mainK?.isUp,
                    }) }, item.value === 'volume' || item.value === 'quoteVolume'
                    ? index.numFormat(mainK?.[item.value], 2)
                    : mainK?.[item.value])));
        }))));
}
var kLineChart = React.forwardRef(KLineChart);

exports["default"] = kLineChart;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');
var lightweightCharts = require('lightweight-charts');
var React = require('react');
var classNames = require('classnames');
var chartUtils = require('@nbit/chart-utils');
var index = require('./helper/index.js');

function _interopDefaultLegacy$1 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy$1(dayjs);
var React__default = /*#__PURE__*/_interopDefaultLegacy$1(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy$1(classNames);

/** 涨跌色 */
exports.UserUpsAndDownsColorEnum = void 0;
(function (UserUpsAndDownsColorEnum) {
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["greenUpRedDown"] = 1] = "greenUpRedDown";
    UserUpsAndDownsColorEnum[UserUpsAndDownsColorEnum["redUpGreenDown"] = 2] = "redUpGreenDown";
})(exports.UserUpsAndDownsColorEnum || (exports.UserUpsAndDownsColorEnum = {}));
function KLineChart(props, ref) {
    const { mainIndicator, subIndicator, chartHeight, offset, updateMarketChangesTime, colors, coinInfo } = props;
    const { priceOffset, amountOffset } = offset;
    const chartRef = React.useRef();
    const candlestickSeriesRef = React.useRef();
    const macdVolumeSeriesRef = React.useRef();
    const smaLineRef = React.useRef();
    const timeLineRef = React.useRef();
    const bollRef = React.useRef();
    const kdjRef = React.useRef();
    const chartPriceLineProperty = {
        crosshairMarkerVisible: false,
        baseLineVisible: false,
        priceLineVisible: false,
        lastValueVisible: false,
    };
    /** 是否点击图表 */
    const isHoverChart = React.useRef(false);
    const [curMaxAndMinPoint, setCurMaxAndMinPoint] = React.useState({
        min: {
            time: 0,
            value: 0,
            x: 0,
            y: 0,
        },
        max: {
            time: 0,
            value: 0,
            x: 0,
            y: 0,
        },
    });
    const [chartCrossHair, setChartCrossHair] = React.useState({
        x: 0,
        y: 0,
        show: false,
    });
    const rsiRef = React.useRef();
    const wrRef = React.useRef();
    const deaRef = React.useRef();
    const difRef = React.useRef();
    const containerRef = React.useRef(null);
    const volumeSeriesRef = React.useRef();
    const checkIsUp = (value) => {
        return value?.close > value?.open;
    };
    const [maIndicator, setMaIndicator] = React.useState();
    const [visibleTimeRange, setVisibleTimeRange] = React.useState({
        from: 0,
        to: 0,
    });
    const [mainK, setMainK] = React.useState();
    const [subK, setSubK] = React.useState();
    const [bollK, setBollK] = React.useState({
        mid: 0,
        upper: 0,
        lower: 0,
    });
    const [volume, setVolume] = React.useState({
        vol: 0,
        quoteVolume: 0,
        dir: 'rise',
    });
    const [kdjK, setKdjK] = React.useState();
    const [rsiK, setRsiK] = React.useState();
    const mainIndicatorRef = React.useRef();
    const subIndicatorRef = React.useRef();
    const [wrK, setWrK] = React.useState();
    const propsDataRef = React.useRef(props.data);
    const curTimeRef = React.useRef(props.curTime);
    const colorsRef = React.useRef(exports.UserUpsAndDownsColorEnum.greenUpRedDown);
    const timeCount = React.useRef(0);
    React.useEffect(() => {
        propsDataRef.current = props.data;
        curTimeRef.current = props.curTime;
        mainIndicatorRef.current = props.mainIndicator;
        subIndicatorRef.current = props.subIndicator;
        colorsRef.current = colors;
    }, [props.data, props.curTime, props.mainIndicator, props.subIndicator, colors]);
    const showFormatTime = (item, unit) => {
        timeCount.current += 1;
        if (!(timeCount.current % 2)) {
            if (unit === chartUtils.TimeSharingType.Mon || unit === chartUtils.TimeSharingType.Week || unit === chartUtils.TimeSharingType.Day) {
                return dayjs__default["default"](item).format('YYYY-MM-DD');
            }
            return dayjs__default["default"](item).format('YYYY-MM-DD HH:mm');
        }
        return '';
    };
    /** 指标在图表中的位置计算 */
    const { chartScaleMargins, volScaleMargins, macdScaleMargins, kdjScaleMargins, rsiScaleMargins, wrScaleMargins } = index.calChartIndicatorPositon(subIndicator);
    const gridColor = props.theme === chartUtils.ThemeEnum.light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)';
    React.useEffect(() => {
        if (chartRef.current) {
            chartRef.current.applyOptions({
                timeScale: {
                    barSpacing: 10,
                    minBarSpacing: 5,
                    lockVisibleTimeRangeOnResize: true,
                    tickMarkFormatter: item => {
                        return showFormatTime(item, props.curTime.unit);
                    },
                },
            });
        }
    }, [props.curTime.unit, props.curTime.value]);
    const chartPropertySetting = {
        layout: props.chartLayoutOptions,
        localization: {
            timeFormatter: item => {
                return dayjs__default["default"](item).format('YY/MM/DD HH:mm');
            },
        },
        timeScale: {
            barSpacing: 10,
            minBarSpacing: 5,
            borderColor: gridColor,
            lockVisibleTimeRangeOnResize: true,
            tickMarkFormatter: item => {
                // return dayjs(item).format('YY/MM/DD HH:mm')
                return showFormatTime(item, props.curTime.unit);
            },
        },
        rightPriceScale: {
            scaleMargins: chartScaleMargins,
            entireTextOnly: true,
            visible: true,
            alignLabels: true,
            autoScale: true,
            borderColor: gridColor,
        },
    };
    React.useEffect(() => {
        /** 平滑效果 */
        /** 考虑了 3 个可能性，切换 tab 时，改变屏幕大小时，滚动时都会对可见区域处理，这块极其容易出 bug */
        requestAnimationFrame(() => {
            index.calHeightAndLowPoint(visibleTimeRange, curTimeRef, propsDataRef, timeLineRef, candlestickSeriesRef, chartRef, setCurMaxAndMinPoint);
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
    React.useEffect(() => {
        chartRef.current = lightweightCharts.createChart(document.getElementById('chart'), chartPropertySetting);
        const subscribeTimeChange = newVisibleTimeRange => {
            if (chartRef.current?.timeScale().getVisibleRange()?.from) {
                setVisibleTimeRange(chartRef.current?.timeScale().getVisibleRange());
            }
            // setPopVisible(false)
        };
        /** 最高价最低价逻辑 */
        chartRef.current.timeScale().subscribeVisibleTimeRangeChange(subscribeTimeChange);
        chartRef.current.timeScale().fitContent();
        const subscribeMoveChange = param => {
            if (!param.time ||
                param.point.x < 0 ||
                param.point.x > (containerRef?.current?.clientWidth || 0) ||
                param.point.y < 0 ||
                param.point.y > (containerRef?.current?.clientHeight || 0)) {
                setChartCrossHair({
                    x: 0,
                    y: 0,
                    show: false,
                });
                isHoverChart.current = false;
                return;
            }
            isHoverChart.current = true;
            const time = param.time;
            const volumeSeriesData = macdVolumeSeriesRef.current
                ? param.seriesPrices.get(macdVolumeSeriesRef.current)
                : undefined;
            const chartData = candlestickSeriesRef.current
                ? param.seriesPrices.get(candlestickSeriesRef.current)
                : {};
            const smaLineArr = [];
            smaLineRef.current?.forEach(item => {
                smaLineArr.push(param.seriesPrices.get(item));
            });
            const dif = difRef.current ? param.seriesPrices.get(difRef.current) : undefined;
            const dea = deaRef.current ? param.seriesPrices.get(deaRef.current) : undefined;
            setMaIndicator(smaLineArr);
            const _chartData = propsDataRef.current.filter(item => {
                return item.time === time;
            })?.[0];
            setMainK({
                time: dayjs__default["default"](time).format('YYYY-MM-DD HH:mm'),
                open: chartData?.open,
                close: chartData?.close,
                high: chartData?.high,
                low: chartData?.low,
                isUp: checkIsUp(chartData),
                chg: chartUtils.calcChg(chartData, priceOffset),
                amp: chartUtils.calcAmp(chartData, priceOffset),
                volume: _chartData?.volume,
                quoteVolume: _chartData?.quoteVolume,
            });
            setSubK({
                macd: volumeSeriesData,
                dea: dea,
                dif: dif,
            });
            setBollK({
                mid: param.seriesPrices.get(bollRef.current?.mid),
                upper: param.seriesPrices.get(bollRef.current?.upper),
                lower: param.seriesPrices.get(bollRef.current?.lower),
            });
            setKdjK({
                k: param.seriesPrices.get(kdjRef.current?.k),
                d: param.seriesPrices.get(kdjRef.current?.d),
                j: param.seriesPrices.get(kdjRef.current?.j),
            });
            setRsiK({
                r: param.seriesPrices.get(rsiRef.current?.[0]),
                s: param.seriesPrices.get(rsiRef.current?.[1]),
                i: param.seriesPrices.get(rsiRef.current?.[2]),
            });
            const wrLineArr = [];
            wrRef.current?.forEach(item => {
                wrLineArr.push(param.seriesPrices.get(item));
            });
            setWrK(wrLineArr);
            let toolTipWidth = 160;
            let toolTipMargin = 15;
            param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > (containerRef?.current?.clientWidth || 0) - toolTipWidth) {
                // left = param.point.x - toolTipMargin - toolTipWidth
                setChartCrossHair({
                    x: 16,
                    y: 32,
                    show: true,
                });
            }
            else {
                setChartCrossHair({
                    x: (containerRef?.current?.clientWidth || 0) - toolTipWidth - 16,
                    y: 32,
                    show: true,
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
        return () => {
            chartRef.current?.timeScale().unsubscribeVisibleTimeRangeChange(subscribeTimeChange);
            // chartRef.current?.unsubscribeClick(param => {
            //   subscribeClickChange(param, markersRef, setPopVisible, props, priceOffset, setCurMarkers)
            // })
            chartRef.current?.unsubscribeCrosshairMove(subscribeMoveChange);
        };
    }, []);
    const getColorOfSetting = (close, open) => {
        if (colorsRef.current === exports.UserUpsAndDownsColorEnum.greenUpRedDown) {
            return close > open ? 'rgba(80, 177, 108, 0.5)' : 'rgba(233, 90, 92, 0.5)';
        }
        else {
            return close > open ? 'rgba(233, 90, 92, 0.5)' : 'rgba(80, 177, 108, 0.5)';
        }
    };
    React.useImperativeHandle(ref, () => ({
        scrollToTime(marketChangesTime) {
            /** 跳转行情异动的 k 线柱子 */
            if (chartRef.current && propsDataRef.current?.length) {
                /** 库 api 有 bug，无法获取正确的位置，导致 scrollToPosition 不可用 */
                chartRef.current?.timeScale().timeToCoordinate(marketChangesTime);
                // console.log('getVisibleLogicalRange--------', chartRef.current?.timeScale().getVisibleLogicalRange())
                //   chartRef.current?.timeScale().scrollToPosition(timeToCoordinate as number, true)
                setTimeout(() => {
                    chartRef.current?.timeScale().setVisibleRange({
                        from: (curTimeRef.current.unit === 'm'
                            ? marketChangesTime - 1000 * 60 * 120
                            : marketChangesTime - 1000 * 60 * 60 * 120),
                        to: curTimeRef.current.unit === 'm' ? marketChangesTime + 1000 * 60 : marketChangesTime + 1000 * 60 * 60,
                    });
                });
                /** 跳转之后清空时间 */
                updateMarketChangesTime(0);
            }
        },
        updateCandlestickData(data) {
            candlestickSeriesRef.current?.update(data);
            if (!isHoverChart.current) {
                setMainK({
                    ...data,
                    time: dayjs__default["default"](data.time).format('YYYY/MM/DD HH:mm'),
                    isUp: checkIsUp(data),
                    chg: chartUtils.calcChg(data, priceOffset),
                    amp: chartUtils.calcAmp(data, priceOffset),
                });
            }
        },
        updateTimeData(data) {
            timeLineRef.current?.update(data);
            if (!isHoverChart.current) {
                setMainK({
                    ...data,
                    time: dayjs__default["default"](data.time).format('YYYY/MM/DD HH:mm'),
                    isUp: checkIsUp(data),
                    chg: chartUtils.calcChg(data, priceOffset),
                    amp: chartUtils.calcAmp(data, priceOffset),
                });
            }
        },
        updateVolumeData(data) {
            volumeSeriesRef.current?.update({
                ...data,
                // 'rgba(var(--buy_up_color), 0.5)' : 'rgba(var(--sell_down_color), 0.5)'
                color: getColorOfSetting(data.close, data.open),
            });
            if (!isHoverChart.current) {
                setVolume({
                    ...data,
                    vol: data.value,
                });
            }
        },
        updateMaData() {
            if (mainIndicatorRef.current?.ma.select) {
                let _ma = [];
                mainIndicatorRef.current?.ma.cur.forEach((item, index) => {
                    if (item.select) {
                        const { strip, type } = item;
                        let smaData = chartUtils.calculateSMA(propsDataRef.current, Number(strip), type, priceOffset);
                        _ma.push(smaData[smaData.length - 1]?.value);
                        smaData[smaData.length - 1]?.time &&
                            smaLineRef.current?.[index]?.update(smaData[smaData.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setMaIndicator(_ma);
                }
            }
        },
        updateMacdData(data) {
            if (subIndicatorRef.current?.macd.select) {
                let _subK = {
                    dea: undefined,
                    dif: undefined,
                    macd: undefined,
                };
                const fast = (subIndicatorRef.current?.macd.cur.fast).value;
                const slow = (subIndicatorRef.current?.macd.cur.slow).value;
                const signal = (subIndicatorRef.current?.macd.cur.signal).value;
                const newData = chartUtils.calculateMACD(propsDataRef.current, Number(fast), Number(slow), Number(signal), priceOffset);
                _subK.dif = newData[newData.length - 1]?.dif;
                _subK.dea = newData[newData.length - 1]?.dea;
                _subK.macd = newData[newData.length - 1]?.value;
                const difData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dif,
                    };
                }) || [];
                const deaData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dea,
                    };
                }) || [];
                const macdData = newData.map(item => {
                    return {
                        time: item?.time,
                        value: item?.value,
                        // color: item?.value < 0 ? props.createChart.downColor : props.createChart.upColor,
                        color: getColorOfSetting(item?.value, 0),
                    };
                }) || [];
                const nameList = [difRef.current, deaRef.current, macdVolumeSeriesRef.current];
                const dataList = [difData[difData.length - 1], deaData[deaData.length - 1], macdData[macdData.length - 1]];
                subIndicator.macd.curLine?.forEach((item, index) => {
                    if (item.select) {
                        nameList[index]?.update(dataList[index]);
                    }
                });
                if (!isHoverChart.current) {
                    setSubK(_subK);
                }
            }
        },
        updateBollData() {
            if (mainIndicatorRef.current?.boll.select) {
                let _boll = {
                    mid: 0,
                    upper: 0,
                    lower: 0,
                };
                const result = chartUtils.calBoll(propsDataRef.current, [
                    Number((mainIndicatorRef.current?.boll.cur.mid).value),
                    Number((mainIndicatorRef.current?.boll.cur.std).value),
                ], priceOffset);
                mainIndicatorRef.current?.boll.curLine?.forEach((item, index) => {
                    if (item.select) {
                        const _index = Object.keys(_boll)[index];
                        _boll[_index] = result[result.length - 1][_index];
                        const value = result.map(_item => {
                            return {
                                value: _item[_index],
                                time: _item.time,
                            };
                        }) || [];
                        bollRef.current?.[_index].update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setBollK(_boll);
                }
            }
        },
        updateKdjData() {
            if (subIndicatorRef.current?.kdj.select) {
                let _kdjK = {
                    k: 0,
                    d: 0,
                    j: 0,
                };
                const result = chartUtils.calKdj(propsDataRef.current, [
                    Number((subIndicatorRef.current?.kdj.cur.k).value),
                    Number((subIndicatorRef.current?.kdj.cur.d).value),
                    Number((subIndicatorRef.current?.kdj.cur.j).value),
                ], priceOffset);
                subIndicatorRef.current?.kdj.curLine?.forEach((item, index) => {
                    const _index = Object.keys(_kdjK)[index];
                    if (item.select) {
                        _kdjK[_index] = result[result.length - 1]?.[_index];
                        const value = result.map(_item => {
                            return {
                                value: _item[_index],
                                time: _item.time,
                            };
                        }) || [];
                        kdjRef.current?.[_index].update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setKdjK(_kdjK);
                }
            }
        },
        updateRsiData() {
            if (subIndicatorRef.current?.rsi.select) {
                let _rsiK = {
                    r: 0,
                    s: 0,
                    i: 0,
                };
                const result = chartUtils.calRsi(propsDataRef.current, [
                    Number(subIndicatorRef.current?.rsi.cur[0].value),
                    Number(subIndicatorRef.current?.rsi.cur[1].value),
                    Number(subIndicatorRef.current?.rsi.cur[2].value),
                ], priceOffset);
                _rsiK.r = result[result.length - 1]?.r;
                _rsiK.s = result[result.length - 1]?.s;
                _rsiK.i = result[result.length - 1]?.i;
                subIndicatorRef.current?.rsi.cur.forEach((_item, index) => {
                    if (_item.select) {
                        const value = result.map(item => {
                            return {
                                value: item[Object.keys(_rsiK)[index]],
                                time: item.time,
                            };
                        }) || [];
                        rsiRef.current?.[index]?.update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setRsiK(_rsiK);
                }
            }
        },
        updateWrData() {
            if (subIndicatorRef.current?.wr.select) {
                let _wrK = [];
                subIndicatorRef.current.wr.cur.forEach((_item, index) => {
                    if (_item.select) {
                        const result = chartUtils.calWr(propsDataRef.current, [Number(subIndicatorRef.current?.wr.cur[index].value)], [
                            { key: 'wr1', title: 'wr1' },
                            { key: 'wr2', title: 'wr2' },
                        ], priceOffset);
                        _wrK.push(result[result.length - 1]?.wr1);
                        const value = result.map(item => {
                            return {
                                value: item.wr1,
                                time: item.time,
                            };
                        }) || [];
                        wrRef.current?.[index]?.update(value[value.length - 1]);
                    }
                });
                if (!isHoverChart.current) {
                    setWrK(_wrK);
                }
            }
        },
    }));
    React.useLayoutEffect(() => {
        const handleResize = () => {
            chartRef.current?.applyOptions({
                ...chartPropertySetting,
                width: containerRef.current?.clientWidth,
                height: containerRef.current?.clientHeight,
                rightPriceScale: {
                    ...chartPropertySetting.rightPriceScale,
                    scaleMargins: chartScaleMargins,
                },
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    React.useEffect(() => {
        chartRef.current?.applyOptions({
            ...chartPropertySetting,
            height: chartHeight,
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
                scaleMargins: chartScaleMargins,
            },
        });
    }, [props.chartLayoutOptions.background, props.chartLayoutOptions.textColor, chartHeight]);
    React.useEffect(() => {
        let _ma = [];
        let _mainK = {
            ...props.data[props.data.length - 1],
            time: dayjs__default["default"](props.data[props.data.length - 1]?.time).format('YY-MM-DD HH:mm'),
            isUp: checkIsUp(props.data[props.data.length - 1]),
            chg: chartUtils.calcChg(props.data[props.data.length - 1], priceOffset),
            amp: chartUtils.calcAmp(props.data[props.data.length - 1], priceOffset),
            volume: props.data[props.data.length - 1]?.volume,
            quoteVolume: props.data[props.data.length - 1]?.quoteVolume,
        };
        let _subK = {
            dea: undefined,
            dif: undefined,
            macd: undefined,
        };
        let _boll = {
            mid: 0,
            upper: 0,
            lower: 0,
        };
        let _kdjK = {
            k: 0,
            d: 0,
            j: 0,
        };
        let _rsiK = {
            r: 0,
            s: 0,
            i: 0,
        };
        let _wrK = [];
        if (chartRef.current) {
            if (!candlestickSeriesRef.current) {
                candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
                    upColor: props?.createChart?.upColor || '#26a69a',
                    downColor: props?.createChart?.downColor || '#ef5350',
                    borderVisible: false,
                    wickUpColor: props?.createChart?.upColor || '#26a69a',
                    wickDownColor: props?.createChart?.downColor || '#ef5350',
                    ...chartPriceLineProperty,
                    lastValueVisible: true,
                });
            }
            /* 清空操作，除了 k 线都需要清空 * */
            smaLineRef.current?.forEach(item => {
                item.setData([]);
            });
            timeLineRef.current?.setData([]);
            bollRef.current?.lower.setData([]);
            bollRef.current?.mid.setData([]);
            bollRef.current?.upper.setData([]);
            difRef.current?.setData([]);
            deaRef.current?.setData([]);
            macdVolumeSeriesRef.current?.setData([]);
            kdjRef.current?.k.setData([]);
            kdjRef.current?.d.setData([]);
            kdjRef.current?.j.setData([]);
            rsiRef.current?.forEach(item => {
                item.setData([]);
            });
            wrRef.current?.forEach(item => {
                item.setData([]);
            });
            if (props.curTime.unit === 'time') {
                if (!timeLineRef.current) {
                    timeLineRef.current = chartRef.current?.addLineSeries({
                        color: '#ff0000',
                        lineWidth: 1,
                        lineStyle: lightweightCharts.LineStyle.Solid,
                        ...chartPriceLineProperty,
                        lastValueVisible: true,
                    });
                }
                timeLineRef.current.setData(propsDataRef.current.map(item => {
                    return {
                        ...item,
                        value: item.close,
                    };
                }));
                candlestickSeriesRef.current.setData([]);
            }
            else {
                candlestickSeriesRef.current.setData(propsDataRef.current);
            }
            if (!volumeSeriesRef.current) {
                volumeSeriesRef.current = chartRef.current?.addHistogramSeries({
                    color: props.createChart.upColor,
                    priceFormat: {
                        type: 'price',
                    },
                    priceScaleId: 'vol',
                    scaleMargins: volScaleMargins,
                    ...chartPriceLineProperty,
                });
            }
            volumeSeriesRef.current.setData(propsDataRef.current.map(item => {
                return {
                    time: item.time,
                    value: item.volume,
                    color: getColorOfSetting(item.close, item.open),
                };
            }));
            if (mainIndicator.boll.select) {
                if (!bollRef.current) {
                    bollRef.current = {
                        mid: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[0].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                        upper: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[1].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                        lower: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[2].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        }),
                    };
                }
                const result = chartUtils.calBoll(props.data, [mainIndicator.boll.cur.mid, mainIndicator.boll.cur.std], priceOffset);
                _boll.lower = result[result.length - 1]?.lower;
                _boll.mid = result[result.length - 1]?.mid;
                _boll.upper = result[result.length - 1]?.upper;
                bollRef.current.mid.setData(result.map(item => {
                    return {
                        value: item.mid,
                        time: item.time,
                    };
                }));
                bollRef.current.lower.setData(result.map(item => {
                    return {
                        value: item.lower,
                        time: item.time,
                    };
                }));
                bollRef.current.upper.setData(result.map(item => {
                    return {
                        value: item.upper,
                        time: item.time,
                    };
                }));
            }
            if (mainIndicator.ma.select) {
                if (!smaLineRef.current) {
                    const smaLineList = [];
                    mainIndicator.ma.cur.forEach(item => {
                        const value = chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            ...chartPriceLineProperty,
                        });
                        smaLineList.push(value);
                    });
                    smaLineRef.current = smaLineList;
                }
                mainIndicator.ma.cur.forEach((item, index) => {
                    if (item.select) {
                        const { strip, type } = item;
                        let smaData = chartUtils.calculateSMA(props.data, Number(strip), type, priceOffset);
                        _ma.push(smaData[smaData.length - 1]?.value);
                        smaLineRef.current?.[index]?.setData(smaData);
                    }
                });
            }
            if (subIndicator.macd.select) {
                const { fast, slow, signal } = subIndicator.macd.cur;
                const newData = chartUtils.calculateMACD(props.data, Number(fast), Number(slow), Number(signal), priceOffset);
                _subK.dif = newData[newData.length - 1]?.dif;
                _subK.dea = newData[newData.length - 1]?.dea;
                _subK.macd = newData[newData.length - 1]?.value;
                const difData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dif,
                    };
                });
                const deaData = newData.map(item => {
                    return {
                        time: item.time,
                        value: item.dea,
                    };
                });
                const macdData = newData.map(item => {
                    return {
                        time: item?.time,
                        value: item?.value,
                        color: item?.value < 0 ? props.createChart.downColor : props.createChart.upColor,
                    };
                });
                const subLineConfig = {
                    color: props.createChart.brandColor,
                    lineWidth: 1,
                    lineStyle: lightweightCharts.LineStyle.Solid,
                    priceScaleId: 'volume',
                    scaleMargins: macdScaleMargins,
                    ...chartPriceLineProperty,
                };
                if (!difRef.current) {
                    difRef.current = chartRef.current?.addLineSeries({
                        ...subLineConfig,
                        color: '#9660c4',
                    });
                }
                if (!deaRef.current) {
                    deaRef.current = chartRef.current?.addLineSeries({
                        ...subLineConfig,
                        color: '#84aad5',
                    });
                }
                if (!macdVolumeSeriesRef.current) {
                    macdVolumeSeriesRef.current = chartRef.current?.addHistogramSeries({
                        color: props.createChart.upColor,
                        priceFormat: {
                            type: 'price',
                        },
                        priceScaleId: 'volume',
                        scaleMargins: macdScaleMargins,
                        ...chartPriceLineProperty,
                    });
                }
                difRef.current.setData(difData);
                deaRef.current.setData(deaData);
                macdVolumeSeriesRef.current.setData(macdData);
            }
            if (subIndicator.kdj.select) {
                if (!kdjRef.current) {
                    kdjRef.current = {
                        k: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[0].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                        d: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[1].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                        j: chartRef.current?.addLineSeries({
                            color: mainIndicator.ma.cur[2].color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'kdj',
                            scaleMargins: kdjScaleMargins,
                            ...chartPriceLineProperty,
                        }),
                    };
                }
                const result = chartUtils.calKdj(props.data, [subIndicator.kdj.cur.k, subIndicator.kdj.cur.d, subIndicator.kdj.cur.j], priceOffset);
                _kdjK.k = result[result.length - 1]?.k;
                _kdjK.d = result[result.length - 1]?.d;
                _kdjK.j = result[result.length - 1]?.j;
                kdjRef.current.k.setData(result.map(item => {
                    return {
                        value: item.k,
                        time: item.time,
                    };
                }));
                kdjRef.current.d.setData(result.map(item => {
                    return {
                        value: item.d,
                        time: item.time,
                    };
                }));
                kdjRef.current.j.setData(result.map(item => {
                    return {
                        value: item.j,
                        time: item.time,
                    };
                }));
            }
            if (subIndicator.rsi.select) {
                if (!rsiRef.current) {
                    const rsiList = [];
                    subIndicator.rsi.cur.forEach(item => {
                        rsiList.push(chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'rsi',
                            scaleMargins: rsiScaleMargins,
                            ...chartPriceLineProperty,
                        }));
                    });
                    rsiRef.current = rsiList;
                }
                const result = chartUtils.calRsi(props.data, [
                    Number(subIndicator.rsi.cur[0]?.value),
                    Number(subIndicator.rsi.cur[1]?.value),
                    Number(subIndicator.rsi.cur[2]?.value),
                ], priceOffset);
                _rsiK.r = result[result.length - 1]?.r;
                _rsiK.s = result[result.length - 1]?.s;
                _rsiK.i = result[result.length - 1]?.i;
                subIndicator.rsi.cur.forEach((item, index) => {
                    rsiRef.current?.[index]?.setData(result.map(item => {
                        return {
                            value: item[Object.keys(_rsiK)[index]],
                            time: item.time,
                        };
                    }));
                });
            }
            if (subIndicator.wr.select) {
                if (!wrRef.current) {
                    const wrList = [];
                    subIndicator.wr.cur.forEach(item => {
                        wrList.push(chartRef.current?.addLineSeries({
                            color: item.color,
                            lineWidth: 1,
                            lineStyle: lightweightCharts.LineStyle.Solid,
                            priceScaleId: 'wr',
                            scaleMargins: wrScaleMargins,
                            ...chartPriceLineProperty,
                        }));
                    });
                    wrRef.current = wrList;
                }
                subIndicator.wr.cur.forEach((item, index) => {
                    const result = chartUtils.calWr(props.data, [Number(subIndicator.wr.cur[index].value)], [
                        { key: 'wr1', title: 'wr1' },
                        { key: 'wr2', title: 'wr2' },
                    ], priceOffset);
                    _wrK.push(result[result.length - 1]?.wr1);
                    wrRef.current?.[index]?.setData(result.map(item => {
                        return {
                            value: item.wr1,
                            time: item.time,
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
    React.useEffect(() => {
        if (candlestickSeriesRef.current) {
            candlestickSeriesRef.current.applyOptions({
                scaleMargins: chartScaleMargins,
                upColor: props?.createChart?.upColor || '#26a69a',
                downColor: props?.createChart?.downColor || '#ef5350',
                wickUpColor: props?.createChart?.upColor || '#26a69a',
                wickDownColor: props?.createChart?.downColor || '#ef5350',
            });
        }
        if (timeLineRef.current) {
            timeLineRef.current.applyOptions({
                scaleMargins: chartScaleMargins,
            });
        }
        if (smaLineRef.current) {
            smaLineRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: chartScaleMargins,
                });
            });
        }
        if (difRef.current) {
            difRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (deaRef.current) {
            deaRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (macdVolumeSeriesRef.current) {
            macdVolumeSeriesRef.current.applyOptions({
                scaleMargins: macdScaleMargins,
            });
        }
        if (volumeSeriesRef.current) {
            volumeSeriesRef.current.applyOptions({
                scaleMargins: volScaleMargins,
            });
        }
        if (bollRef.current) {
            bollRef.current.mid.applyOptions({
                scaleMargins: chartScaleMargins,
            });
            bollRef.current.upper.applyOptions({
                scaleMargins: chartScaleMargins,
            });
            bollRef.current.lower.applyOptions({
                scaleMargins: chartScaleMargins,
            });
        }
        if (kdjRef.current) {
            kdjRef.current.k.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
            kdjRef.current.d.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
            kdjRef.current.j.applyOptions({
                scaleMargins: kdjScaleMargins,
            });
        }
        if (rsiRef.current) {
            rsiRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: rsiScaleMargins,
                });
            });
        }
        if (wrRef.current) {
            wrRef.current.forEach(item => {
                item.applyOptions({
                    scaleMargins: wrScaleMargins,
                });
            });
        }
    }, [subIndicator, colors]);
    const mainKList = [
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['时间'],
            value: 'time',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['开'],
            value: 'open',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['高'],
            value: 'high',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['低'],
            value: 'low',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['收'],
            value: 'close',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['涨跌幅'],
            value: 'chg',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['振幅'],
            value: 'amp',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['量'],
            value: 'volume',
        },
        {
            name: chartUtils.timeLocaleLanguageMap[props.locale]['额'],
            value: 'quoteVolume',
        },
    ];
    const getHeight = scaleMargins => {
        if (containerRef.current?.clientHeight) {
            return (containerRef.current.clientHeight - 26) * scaleMargins - 18;
        }
        return 0;
    };
    return (React__default["default"].createElement("div", { className: "chart", id: "chart", ref: containerRef },
        curMaxAndMinPoint.max.value !== curMaxAndMinPoint.min.value ? (React__default["default"].createElement("div", { className: "chart-max-or-min-price", style: {
                top: curMaxAndMinPoint.max.y - 20 || 0,
                left: curMaxAndMinPoint.max.x || 0,
                transform: curMaxAndMinPoint.max.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
                color: props.createChart.textColor01,
            } }, curMaxAndMinPoint.max.x < 80
            ? [
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01", style: { width: '16px', height: '1px' } }),
                React__default["default"].createElement("span", { className: "ml-1", key: 1 }, curMaxAndMinPoint.max.value),
            ]
            : [
                React__default["default"].createElement("span", { key: 1 }, curMaxAndMinPoint.max.value),
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01 ml-1", style: { width: '16px', height: '1px' } }),
            ])) : null,
        React__default["default"].createElement("div", { className: "chart-max-or-min-price", style: {
                top: curMaxAndMinPoint.min.y || 0,
                left: curMaxAndMinPoint.min.x || 0,
                transform: curMaxAndMinPoint.min.x < 80 ? 'scale(0.83)' : 'translateX(-90%) scale(0.83)',
                color: props.createChart.textColor01,
            } }, curMaxAndMinPoint.min.x < 80
            ? [
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01", style: { width: '16px', height: '1px' } }),
                React__default["default"].createElement("span", { className: "ml-1", key: 1 }, curMaxAndMinPoint.min.value),
            ]
            : [
                React__default["default"].createElement("span", { key: 1 }, curMaxAndMinPoint.min.value),
                React__default["default"].createElement("div", { key: 2, className: "bg-text_color_01 ml-1", style: { width: '16px', height: '1px' } }),
            ]),
        React__default["default"].createElement("div", { className: "ma" },
            mainIndicator.ma.select ? (React__default["default"].createElement("div", { className: "text-text_color_03 k-line-ind-wrap common-text" }, mainIndicator.ma.cur.map((item, index) => {
                if (item.select) {
                    return (React__default["default"].createElement("span", { key: item.strip, className: "ma-child" },
                        `MA(${item.strip})`,
                        React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, maIndicator?.[index]?.toFixed(2))));
                }
                return null;
            }))) : null,
            mainIndicator.boll.select ? (React__default["default"].createElement("div", { className: "k-line-ind-wrap text-text_color_03 common-text" },
                React__default["default"].createElement("span", { className: "ma-child" },
                    `BOLL(${mainIndicator.boll.cur.mid}, ${mainIndicator.boll.cur.std}):`,
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "UP"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[0].color } }, bollK.upper),
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "MB"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[1].color } }, bollK.mid),
                    React__default["default"].createElement("span", { className: "common-ml-5" }, "DN"),
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[2].color } }, bollK.lower)))) : null),
        React__default["default"].createElement("div", { className: "common-sub-ind text-text_color_03", style: {
                // top: `${(macdScaleMargins.top - 0.05) * 100}%`,
                /** chart 下移了0.5，这里递减 */
                // top: `calc(${(volScaleMargins.top - 0.1) * 100}% - 10px)`,
                top: getHeight(volScaleMargins.top),
            } },
            React__default["default"].createElement("span", null,
                React__default["default"].createElement("span", null,
                    "Vol(",
                    coinInfo.baseSymbolName,
                    ")"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor } }, volume.vol)),
            React__default["default"].createElement("span", { className: "common-ml-5" },
                React__default["default"].createElement("span", null,
                    "Vol(",
                    coinInfo.quoteSymbolName,
                    ")"),
                React__default["default"].createElement("span", { style: { color: volume.dir === 'rise' ? props.createChart.upColor : props.createChart.downColor }, className: "common-ml-5" }, volume.quoteVolume))),
        subIndicator.macd.select ? (React__default["default"].createElement("div", { className: "common-sub-ind common-text text-text_color_03", style: {
                top: getHeight(macdScaleMargins.top),
            } },
            React__default["default"].createElement("span", null, `MACD(${subIndicator.macd.cur.fast}, ${subIndicator.macd.cur.slow}, ${subIndicator.macd.cur.signal})`),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: '#9660c4' } }, Number(subK?.dea).toFixed(2)),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: '#84aad5' } }, Number(subK?.dif).toFixed(2)),
            React__default["default"].createElement("span", { className: "common-ml-5", style: { color: Number(subK?.macd) > 0 ? props.createChart.upColor : props.createChart.downColor } }, Number(subK?.macd).toFixed(2)))) : null,
        subIndicator.kdj.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(kdjScaleMargins.top),
            }, className: "common-sub-ind  common-text text-text_color_03" },
            React__default["default"].createElement("span", { className: "ma-child" },
                `KDJ(${subIndicator.kdj.cur.k}, ${subIndicator.kdj.cur.d}, ${subIndicator.kdj.cur.j}):`,
                React__default["default"].createElement("span", { className: "common-ml-5" }, "K"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[0].color } }, kdjK?.k),
                React__default["default"].createElement("span", { className: "common-ml-5" }, "D"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[1].color } }, kdjK?.d),
                React__default["default"].createElement("span", { className: "common-ml-5" }, "J"),
                React__default["default"].createElement("span", { className: "common-ml-5", style: { color: mainIndicator.ma.cur[2].color } }, kdjK?.j)))) : null,
        subIndicator.rsi.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(rsiScaleMargins.top),
            }, className: "common-sub-ind common-text text-text_color_03" }, subIndicator.rsi.cur.map((item, index) => {
            if (item.select) {
                return (React__default["default"].createElement("span", { key: index, className: "ma-child" },
                    `RSI(${item.value})`,
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, rsiK?.[Object.keys(rsiK)[index]])));
            }
            return null;
        }))) : null,
        subIndicator.wr.select ? (React__default["default"].createElement("div", { style: {
                top: getHeight(wrScaleMargins.top),
            }, className: "common-sub-ind common-text text-text_color_03" }, subIndicator.wr.cur.map((item, index) => {
            if (item.select) {
                return (React__default["default"].createElement("span", { key: index, className: "ma-child" },
                    `Wm %R(${item.value})`,
                    React__default["default"].createElement("span", { className: "common-ml-5", style: { color: item.color } }, wrK?.[index])));
            }
            return null;
        }))) : null,
        React__default["default"].createElement("div", { className: "k-data", style: {
                background: props.createChart.cardBgColor03,
                display: chartCrossHair.show ? 'block' : 'none',
                top: chartCrossHair.y,
                left: chartCrossHair.x,
            } }, mainKList.map(item => {
            return (React__default["default"].createElement("div", { key: item.value, style: { height: '18px' }, className: "flex justify-between items-center gap-2 text-text_color_02" },
                React__default["default"].createElement("span", null, item.name),
                React__default["default"].createElement("span", { className: classNames__default["default"]({
                        'text-buy_up_color': item.value === 'chg' && mainK?.isUp,
                        'text-text_color_01': item.value !== 'chg',
                        'text-sell_down_color': item.value === 'chg' && !mainK?.isUp,
                    }) }, item.value === 'volume' || item.value === 'quoteVolume'
                    ? index.numFormat(mainK?.[item.value], 2)
                    : mainK?.[item.value])));
        }))));
}
var kLineChart = React.forwardRef(KLineChart);

exports["default"] = kLineChart;
