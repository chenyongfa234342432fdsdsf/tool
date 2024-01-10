type DatafeedsType = {
    UDFCompatibleDatafeed: (httpURL: any, symbol: any) => void;
};
declare const Datafeeds: DatafeedsType;
export default Datafeeds;
