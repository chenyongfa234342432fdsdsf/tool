'use strict';

var React = require('react');
var tradingview = require('@nbit/tradingview');
var chartUtils = require('@nbit/chart-utils');
var coinDatafeed = require('./coin-datafeed.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Tradingview(props) {
    const { resolution } = props;
    const currentCoinPair = chartUtils.getCurrentQuoteShowCoin(props.currentCoin.sellSymbol, props.currentCoin.buySymbol);
    const [widget, setWidget] = React.useState(null);
    const widgetRef = React.useRef(widget);
    React.useEffect(() => {
        if (props.coinHistoryKline.r && props.klineCallback) {
            const currentSub = chartUtils.getCurrentQuoteApiCoin(props.currentCoin.sellSymbol, props.currentCoin.buySymbol);
            props.ws.subscribe({
                subs: `market.v2.${currentSub}.kline.${props.time}`,
                callback: data => {
                    // 更新实时报价信息
                    if (data?.[0]?.list?.[0]?.klineData) {
                        const item = data[0].list[0].klineData;
                        const value = {
                            time: Number(item[0]),
                            open: Number(item[1]),
                            high: Number(item[2]),
                            low: Number(item[3]),
                            close: Number(item[4]),
                            volume: Number(item[5]),
                        };
                        props.klineCallback(value);
                    }
                },
                throttleType: chartUtils.WSThrottleTypeEnum.cover,
                throttleTime: 200,
            });
        }
    }, [props.coinHistoryKline, props.klineCallback]);
    React.useEffect(() => {
        if (widgetRef.current && props.openChartProperties) {
            if (props.openChartProperties === chartUtils.TradingviewIndicatorType.ChartProperties) {
                widgetRef.current.chart().executeActionById('chartProperties');
            }
            if (props.openChartProperties === chartUtils.TradingviewIndicatorType.InsertIndicator) {
                widgetRef.current.chart().executeActionById('insertIndicator');
            }
        }
    }, [props.openChartProperties]);
    // 控件背景颜色
    let styleColor = props.createChart.bgColor;
    // 网格/网线颜色
    props.createChart.bgColor;
    // 涨跌/交易量颜色
    let upColor = props.createChart.upColor;
    let downColor = props.createChart.downColor;
    // 坐标轴和刻度标签颜色
    props.createChart.textColor;
    React.useEffect(() => {
        const _widget = new tradingview.widget({
            // debug: true, // uncomment this line to see Library errors and warnings in the console
            // fullscreen: true, // 占用窗口所有空间
            // height: 442,
            // autosize: true, // 自动调整大小
            width: '100%',
            height: '100%',
            // symbol: 'A', // 初始商品 必须
            symbol: currentCoinPair,
            // @ts-ignore
            interval: '1',
            container: 'tv_chart_container',
            //	BEWARE: no trailing slash is expected in feed URL
            // @ts-ignore
            // datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo-feed-data.tradingview.com'), // js api
            datafeed: new coinDatafeed.UDFCompatibleDatafeed(props.baseMarketStore, props.getKlineHistory),
            library_path: `${location.origin}/charting_library/`,
            locale: chartUtils.LanguageMapToChartMap[props.locale] || 'en',
            disabled_features: [
                'header_widget',
                'display_market_status',
                'pane_context_menu',
                'timeframes_toolbar',
                'go_to_date',
                'header_indicators',
                'header_settings', // 设置
                // 'header_fullscreen_button',
                // 'header_chart_type',
                // 'header_resolutions',
                // 'use_localstorage_for_settings',
                // 'header_symbol_search',
                // 'header_saveload',
                // 'header_interval_dialog_button',
                // 'header_undo_redo',
                // 'header_compare',
                // 'header_screenshot',
                // 'volume_force_overlay',
                // 'compare_symbol',
                // 'save_chart_properties_to_local_storage',
            ],
            enabled_features: ['study_templates'],
            // disabled_features: ['use_localstorage_for_settings'],
            // enabled_features: ['study_templates'],
            // disabled_features, enabled_features // 包含功能在默认情况下启用/禁用名称的数组。
            // charts_storage_url: 'https://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_id',
            // charts_storage_url, client_id, user_id // 这些参数与用于保存/加载的高级API相关
            // load_last_chart // 图表库为用户加载上次保存的图表
            theme: chartUtils.ThemeChartMap[props.theme] || 'Light',
            custom_css_url: './css/style.css',
            // loading_screen // 定制加载进度条
            // favorites // 默认标记为收藏的项目
            // save_load_adapter  // 包含保存/加载功能的对象  //settings_adapter
            // compare_symbols // 自定义比较商品数组 additional_symbol_info_fields // 包含一组自定义交易商品信息字段的可选字段
            // header_widget_buttons_mode // 更改顶部工具栏上按钮外观的附加可选字段
            // time_scale  // 在屏幕上添加更多 K 线的附加可选字段
            time_scale: {
                min_bar_spacing: 5,
            },
            // timeframe // 初始时间范围
            timezone: 'Asia/Shanghai',
            // debug // info 写入控制台
            // width height
            // symbol_search_request_delay // 搜索延迟
            // auto_save_delay // 延迟秒数等待
            // toolbar_bg: styleColor, // 工具栏背景颜色
            // study_count_limit //多图布局
            // studies_access
            // drawings_access
            // Remark // 基于字体的绘图有一个特殊情况
            // saved_data // 包含已保存图表内容的 JS 对象
            // saved_data_meta_info // 包含保存的图表内容元信息的 JS 对象
            // numeric_formatting // 数字格式化
            // customFormatters // 自定义显示日期和时间的值
            // overrides // 对 Widget 对象的默认属性进行覆盖
            // 涨幅柱子颜色
            studies_overrides: {
                'volume.volume.color.0': props.createChart.upColor,
                'volume.volume.color.1': props.createChart.downColor,
                'volume.volume.transparency': 50,
                //   'volume.volume ma.color': '#FF0000',
                //   'volume.volume ma.transparency': 30,
                //   'volume.volume ma.linewidth': 5,
                //   'volume.volume ma.visible': true,
                //   'bollinger bands.median.color': '#33FF88',
                //   'bollinger bands.upper.linewidth': 7,
            },
            // overrides: {
            //   'paneProperties.backgroundType': 'solid',
            //   'paneProperties.background': '#000000',
            //   'paneProperties.crossHairProperties.color': textColor,
            //   'mainSeriesProperties.candleStyle.upColor': upColor,
            //   'mainSeriesProperties.candleStyle.downColor': downColor,
            //   'mainSeriesProperties.showCountdown': !1,
            //   // 烛心
            //   'mainSeriesProperties.candleStyle.drawWick': true,
            //   // 烛心颜色
            //   'mainSeriesProperties.candleStyle.wickUpColor': upColor,
            //   'mainSeriesProperties.candleStyle.wickDownColor': downColor,
            //   // 边框
            //   'mainSeriesProperties.candleStyle.drawBorder': true,
            //   'mainSeriesProperties.candleStyle.borderUpColor': upColor,
            //   'mainSeriesProperties.candleStyle.borderDownColor': downColor,
            //   // 网格
            //   'paneProperties.vertGridProperties.style': 0,
            //   'paneProperties.horzGridProperties.color': wgColor,
            //   'paneProperties.vertGridProperties.color': wgColor,
            //   // 坐标轴和刻度标签颜色
            //   'scalesProperties.lineColor': wgColor,
            //   'scalesProperties.textColor': textColor,
            //   'scalesProperties.fontSize': 12, // 图标区域xy轴 字体大小
            //   // 是否显示指标文字参数
            //   // 折叠信息
            //   'paneProperties.legendProperties.showLegend': true,
            //   'paneProperties.legendProperties.showBarChange': true, // K线变化值
            //   'paneProperties.legendProperties.showSeriesOHLC': true,
            //   'paneProperties.legendProperties.showStudyValues': true,
            //   'paneProperties.legendProperties.showOnlyPriceSource': true,
            //   'paneProperties.legendProperties.showStudyArguments': true,
            //   'volumePaneSize': 'medium', // 成交量大小
            // },
            // snapshot_url // 当用户按快照按钮时，使用 base64 编码将当前图表快照保存并返回 URL
            // custom_indicators_getter // 返回带有自定义指标数组的 Promise 对象的函数
            // preset // 预设
            // studies_overrides // 使用此选项自定义默认指标的样式及输入值
            // time_frames // 可以在图表底部选择的可见时间范围列表
            time_frames: [],
            // time_frames: [
            //   { text: "50y", resolution: "6M", description: "50 Years" },
            //   { text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
            //   { text: "8m", resolution: "D", description: "8 Month" },
            //   { text: "3d", resolution: "5", description: "3 Days" },
            //   { text: "1000y", resolution: "W", description: "All", title: "All" },
            // ]
        });
        setWidget(_widget);
        widgetRef.current = _widget;
        widgetRef.current.onChartReady(() => {
            widgetRef.current
                .chart()
                .createStudy('Moving Average', false, false, [5, 'close', 0], { 'plot.color.0': '#9660c4' });
            widgetRef.current
                .chart()
                .createStudy('Moving Average', false, false, [10, 'close', 0], { 'plot.color.0': '#84aad5' });
            widgetRef.current
                .chart()
                .createStudy('Moving Average', false, false, [30, 'close', 0], { 'plot.color.0': '#55b263' });
            widgetRef.current
                .chart()
                .createStudy('Moving Average', false, false, [60, 'close', 0], { 'plot.color.0': '#a00a7F' });
        });
    }, []);
    React.useEffect(() => {
        if (widgetRef.current) {
            widgetRef.current.onChartReady(() => {
                widgetRef.current.changeTheme(chartUtils.ThemeChartMap[props.theme]);
            });
        }
    }, [props.theme]);
    React.useEffect(() => {
        if (widgetRef.current && resolution && currentCoinPair) {
            widgetRef.current.onChartReady(() => {
                widgetRef.current.setSymbol(currentCoinPair, resolution);
                setTimeout(() => {
                    widgetRef.current.applyOverrides({
                        'paneProperties.background': styleColor,
                        'mainSeriesProperties.style': 1,
                        'mainSeriesProperties.candleStyle.upColor': upColor,
                        'mainSeriesProperties.candleStyle.downColor': downColor,
                        'mainSeriesProperties.candleStyle.drawWick': true,
                        'mainSeriesProperties.candleStyle.drawBorder': true,
                        // 'mainSeriesProperties.candleStyle.borderColor': '#fff',
                        'mainSeriesProperties.candleStyle.borderUpColor': upColor,
                        'mainSeriesProperties.candleStyle.borderDownColor': downColor,
                        'mainSeriesProperties.candleStyle.wickUpColor': upColor,
                        'mainSeriesProperties.candleStyle.wickDownColor': downColor,
                        // 'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
                        // 边际（百分比）。 用于自动缩放。
                        // 'paneProperties.topMargin': 5,
                        'paneProperties.bottomMargin': 25,
                    });
                });
            });
        }
    }, [resolution, currentCoinPair]);
    return React__default["default"].createElement("div", { className: "chart", id: "tv_chart_container" });
}

module.exports = Tradingview;
