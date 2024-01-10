import { BarPrices } from 'lightweight-charts';
/** 订阅图表点击事件 */
export declare const subscribeClickChange: (param: any, markersRef: any, setPopVisible: any, props: any, priceOffset: any, setCurMarkers: any) => void;
export interface SubKType {
    dea: BarPrices | undefined;
    dif: BarPrices | undefined;
    macd: BarPrices | undefined;
}
type SN = string | number;
export interface MainKType {
    time: SN;
    open: SN;
    high: SN;
    low: SN;
    close: SN;
    isUp: boolean;
    chg: SN;
    amp: SN;
}
/** 计算图表指标位置 */
export declare const calChartIndicatorPositon: (subIndicator: any) => {
    chartScaleMargins: {
        top: number;
        bottom: number;
    };
    volScaleMargins: {
        top: number;
        bottom: number;
    };
    macdScaleMargins: {
        top: number;
        bottom: number;
    };
    kdjScaleMargins: {
        top: number;
        bottom: number;
    };
    rsiScaleMargins: {
        top: number;
        bottom: number;
    };
    wrScaleMargins: {
        top: number;
        bottom: number;
    };
};
export declare const calHeightAndLowPoint: (visibleTimeRange: any, curTimeRef: any, propsDataRef: any, timeLineRef: any, candlestickSeriesRef: any, chartRef: any, setCurMaxAndMinPoint: any) => void;
export declare const numFormat: (num: any, digits: any) => string;
export {};
