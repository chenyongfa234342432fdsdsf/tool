import './index.css';
import { DeptChartSpecieEnum, SeriesChartData } from '@nbit/chart-utils';
export interface PropsType {
    theme: string;
    seriesData: Array<SeriesChartData>;
    type?: DeptChartSpecieEnum;
    offset: {
        priceOffset: number;
        amountOffset: number;
    };
    colors: number;
}
declare const _default: any;
export default _default;
