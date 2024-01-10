import { CreateChartType } from '@nbit/chart-utils';
import './index.css';
interface IChartType {
    time: string;
    resolution: string;
    currentCoin: any;
    createChart: CreateChartType;
    openChartProperties: string;
    wsCoinUrl: string;
    ws: Record<string, any>;
    theme: string;
    coinHistoryKline: any;
    klineCallback: any;
    locale: string;
    getKlineHistory: any;
    baseMarketStore: any;
}
export default Tradingview;
declare function Tradingview(props: IChartType): JSX.Element;
