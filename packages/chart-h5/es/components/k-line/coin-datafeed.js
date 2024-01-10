import { sortMarketChartData } from '@nbit/chart-utils';

// import { baseMarketStore } from '@/store/market'
var baseMarketStore;
var getKlineHistory;
var datafeedsFun = function datafeedsFun(store, method) {
  baseMarketStore = store;
  getKlineHistory = method;
  // // 用于临时存储回调函数
  // this._dataCallBacks = {}
  // // 存储当前的时间间隔，1m,5m
  // this._currentSymbol = symbol
  // this._currentName = symbol
  // this._current_resolution = '1min'
};

var Datafeeds = {
  UDFCompatibleDatafeed: datafeedsFun
};
Datafeeds.UDFCompatibleDatafeed = datafeedsFun;
function getDecimal() {
  var decimal = 2;
  var currentObject = baseMarketStore.getState().coinModule.currentCoin;
  if (currentObject && currentObject.digit && currentObject.digit.indexOf('#') !== -1) {
    var digit = currentObject.digit.split('#');
    decimal = Number(digit[0]);
  }
  var str = '1';
  if (decimal > 0) {
    for (var i = 1; i <= decimal; i += 1) {
      str += '0';
    }
  }
  return parseInt(str);
}
/**
 * 构造默认配置
 * {"supports_search":true,"supports_group_request":false,"supports_marks":true,"supports_timescale_marks":true,"supports_time":true,"exchanges":[{"value":"","name":"All Exchanges","desc":""},{"value":"NasdaqNM","name":"NasdaqNM","desc":"NasdaqNM"},{"value":"NYSE","name":"NYSE","desc":"NYSE"},{"value":"NCM","name":"NCM","desc":"NCM"},{"value":"NGM","name":"NGM","desc":"NGM"}],"symbols_types":[{"name":"All types","value":""},{"name":"Stock","value":"stock"},{"name":"Index","value":"index"}],"supported_resolutions":["D","2D","3D","W","3W","M","6M"]}
 */
function defaultConfig() {
  return {
    supports_search: false,
    supports_group_request: false,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: true,
    exchanges: [{
      value: '',
      name: 'All Exchanges',
      desc: ''
    }, {
      value: 'NasdaqNM',
      name: 'NasdaqNM',
      desc: 'NasdaqNM'
    }, {
      value: 'NYSE',
      name: 'NYSE',
      desc: 'NYSE'
    }, {
      value: 'NCM',
      name: 'NCM',
      desc: 'NCM'
    }, {
      value: 'NGM',
      name: 'NGM',
      desc: 'NGM'
    }],
    symbols_types: [{
      name: 'All types',
      value: ''
    }, {
      name: 'Stock',
      value: ''
    }, {
      name: 'Index',
      value: ''
    }],
    // "supported_resolutions": ['1', '5', '15', '30', '60', 'D', 'W', 'M']
    supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '1440', '10080', '43200']
  };
}
/**
 * onready 方法
 * @param callback
 */
Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function (callback) {
  setTimeout(function () {
    callback(defaultConfig());
  }, 0);
};
/**
 *
 * 当需要根据交易对的名字获得交易对的详细信息的时候调用
 * @param symbolName
 * @param onSymbolResolvedCallback
 *
 * @param onResolveErrorCallback
 */
Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
  setTimeout(function () {
    onSymbolResolvedCallback({
      'name': symbolName,
      'exchange-traded': '',
      'exchange-listed': '',
      'timezone': 'Asia/Shanghai',
      'minmov': 1,
      'minmov2': 0,
      'pointvalue': 1,
      'session': '24x7',
      'has_intraday': true,
      'has_no_volume': false,
      'type': 'bitcoin',
      'supported_resolutions': ['1', '5', '15', '30', '60', '120', '240', '1440', '10080', '43200'],
      'has_weekly_and_monthly': true,
      'has_daily': true,
      'pricescale': getDecimal(),
      'ticker': symbolName,
      'exchange': '',
      'data_status': 'streaming'
    });
  }, 0);
};
/**
 *
 * @param symbolInfo
 * @param resolution
 * @param from
 * @param to
 * @param onHistoryCallback
 * @param onErrorCallback
 * @param firstDataRequest 是否是第一次加载数据，第一次加载数据的时候，可以忽略 to
 *
 * {time, close, open, high, low, volume}
 *
 */
Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
  var firstDataRequest = periodParams.firstDataRequest;
  function firstReq() {
    var symbol = 1;
    if (baseMarketStore.getState().coinModule.currentCoin.tradeId) {
      symbol = baseMarketStore.getState().coinModule.currentCoin.tradeId;
    }
    // 获取历史数据的当前查看数据时间段
    var time = '1m';
    switch (resolution) {
      case '1':
      case '5':
      case '15':
      case '30':
        time = "".concat(resolution, "m");
        break;
      case '60':
        time = "".concat(1, "h");
        break;
      case '120':
        time = "".concat(2, "h");
        break;
      case '240':
        time = "".concat(4, "h");
        break;
      case '1440':
        time = "".concat(1, "d");
        break;
      case '10080':
        time = "".concat(1, "w");
        break;
      case '43200':
        time = "".concat(1, "mo");
        break;
      default:
        time = "".concat(resolution, "m");
    }
    var from = '';
    var params = {
      tradeId: symbol,
      period: time,
      from: firstDataRequest ? '' : from,
      limit: 1000,
      direction: firstDataRequest ? 1 : -1
    };
    getKlineHistory(params).then(function (res) {
      if (res.isOk) {
        var _res$data;
        var klineData = [];
        if ((_res$data = res.data) !== null && _res$data !== void 0 && _res$data.length) {
          res.data.forEach(function (item) {
            var barValue = {
              time: Number(item[0]),
              open: Number(item[1]),
              high: Number(item[2]),
              low: Number(item[3]),
              close: Number(item[4]),
              volume: Number(item[5])
            };
            klineData.push(barValue);
          });
          var meta = {
            noData: !(klineData.length > 0)
          };
          var _klineData = sortMarketChartData(klineData);
          onHistoryCallback(_klineData, meta);
          if (firstDataRequest) {
            // 历史 K 线绘制完成后开启订阅
            baseMarketStore.getState().coinModule.updateCoinHistoryKline({
              r: time,
              t: new Date().getTime()
            });
          }
        }
      }
    });
  }
  if (firstDataRequest) {
    firstReq();
  } else {
    onHistoryCallback([], {
      noData: true
    });
  }
};
/**
 * 订阅 K 线数据。图表库将调用 onRealtimeCallback 方法以更新实时数据。
 */
Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
  baseMarketStore.getState().coinModule.updateKlineCallback(onRealtimeCallback);
};
/**
 * 取消订阅 K 线数据。在调用 subscribeBars 方法时，图表库将跳过与 subscriberUID 相同的对象。
 */
Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
  baseMarketStore.getState().coinModule.updateKlineCallback(null);
};
/**
 * 获取服务器时间
 * @param callback
 */
Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function (callback) {
  var timestamp = new Date().getTime();
  callback(timestamp);
};
export { Datafeeds as default };
