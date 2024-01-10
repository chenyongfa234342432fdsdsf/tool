import { DeptChartPropsType } from '@nbit/chart-utils';
/** 涨跌色 */
export declare enum UserUpsAndDownsColorEnum {
    greenUpRedDown = 1,
    redUpGreenDown = 2
}
declare function DeptRealChart(props: DeptChartPropsType & {
    theme: string;
} & {
    priceOffset: number;
} & {
    colors: number;
}): JSX.Element;
declare namespace DeptRealChart {
    var displayName: string;
}
export default DeptRealChart;
