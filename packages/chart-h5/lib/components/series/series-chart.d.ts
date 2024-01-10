import { SeriesChartData } from '@nbit/chart-utils';
export interface PropsType {
    data: Array<SeriesChartData>;
    chartLayoutOptions: any;
    createChart: {
        brandColor: string;
        upColor: string;
        downColor: string;
        upLightColor: string;
        downLightColor: string;
        bgColor?: string;
        textColor?: string;
        cardBgColor?: string;
        textColor01?: string;
        cardBgColor03?: string;
    };
    theme: string;
    priceOffset: number;
    colors: number;
}
declare function SeriesChart(props: PropsType): JSX.Element;
declare namespace SeriesChart {
    var displayName: string;
}
export default SeriesChart;
