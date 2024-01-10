import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
function DeptChart(props) {
  var deptRef = useRef(null);
  var chartRef = useRef(null);
  useEffect(function () {
    var _props$data, _props$data2;
    var chart = createChart(document.getElementById('chart'), {
      layout: props.chartLayoutOptions,
      // 时间刻度和价格刻度
      timeScale: {
        visible: false
      },
      rightPriceScale: {
        visible: false
      },
      // 布局相关
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false
        },
        vertLine: {
          visible: false,
          labelVisible: false
        }
      },
      grid: {
        vertLines: {
          visible: false
        },
        horzLines: {
          visible: false
        }
      }
    });
    var front = ((_props$data = props.data[props.data.length - 1]) === null || _props$data === void 0 ? void 0 : _props$data.value) || 0;
    var end = ((_props$data2 = props.data[props.data.length - 2]) === null || _props$data2 === void 0 ? void 0 : _props$data2.value) || 0;
    var isUp = front - end > 0;
    chartRef.current = chart.addAreaSeries({
      lineColor: isUp ? props.createChart.upColor : props.createChart.downColor,
      topColor: isUp ? props.createChart.upColor : props.createChart.downColor,
      bottomColor: isUp ? props.createChart.upLightColor : props.createChart.downLightColor,
      crosshairMarkerVisible: false,
      priceLineVisible: false
    });
    chartRef.current.setData(props.data);
    chart.timeScale().fitContent();
  }, []);
  return React.createElement("div", {
    ref: deptRef,
    className: "chart",
    id: "chart"
  });
}
DeptChart.displayName = 'deptChart';
export { DeptChart as default };
