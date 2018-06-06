import React, { Component } from 'react';
import echart from 'echarts';
import circle1 from './img/circle1.png';
import circle2 from './img/circle2.png';

export default class PureLine extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this._flag = false;
    this.state = {
      select: '种植面积'
    }
    me.echartStyle = {
      ...me.props.style
    };
  }

  _flag = undefined;

  setData(d) {
    this._flag = true;
    let _data = undefined;
    let _Data = d.Data;
    let _yData1 = [];
    let _yData2 = [];
    let _yData3 = [];
    console.log(d);
    if(this.state.select=='种植面积'){
      d.yData1 = _Data.areas.totalArea;
      d.yData2 = _Data.areas.organic;
      d.yData3 = _Data.areas.greenArea;
    }else if(this.state.select=='产量'){
      d.yData1 = _Data.outputs.totalArea;
      d.yData2 = _Data.outputs.organic;
      d.yData3 = _Data.outputs.greenArea;

    }else if(this.state.select=='产值'){
      d.yData1 = _Data.products.totalArea;
      d.yData2 = _Data.products.organic;
      d.yData3 = _Data.products.greenArea;
    }
    this.d = d;

    this.setState({
      data: d,
      Data: _Data
    })
  }
  setSelect(d) {
    this._flag = true;
    if(d=='种植面积'){
      this.d.yData1 = this.state.Data.areas.totalArea;
      this.d.yData2 = this.state.Data.areas.organic;
      this.d.yData3 = this.state.Data.areas.greenArea;
    }else if(d=='产量'){
      this.d.yData1 = this.state.Data.outputs.totalOutput;
      this.d.yData2 = this.state.Data.outputs.organicOutput;
      this.d.yData3 = this.state.Data.outputs.greenOutput;

    }else if(d=='产值'){
      this.d.yData1 = this.state.Data.products.totalProduct;
      this.d.yData2 = this.state.Data.products.organicProduct;
      this.d.yData3 = this.state.Data.products.greenProduct;
    }
    this.setState({
      select: this.d
    })
  }
  render() {
    let me = this;
    if (me._flag) {
      return (
        <div style={me.echartStyle} ref={'echarts'}>

        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  componentDidMount() {
    //console.log(echart);

  }
  componentDidUpdate() {
    let me = this;
    //console.log(me._flag);


    if (!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);

    let circle = undefined;
    if (this.state.data.flag === 1) {
      circle = 'image://' + circle1;
    }
    if (this.state.data.flag === 2) {
      circle = 'image://' + circle2;
    } else {
      circle = 'circle';
    }

    let unitArr = this.state.data.unitArr;
    let circleArr = this.state.data.circleArr;

    let option = {
      color: this.state.data.lineColor,
      title: {
        show: this.state.data.showTitle || false,
        text: this.state.data.title || '',
        textStyle: {
          color: '#dbfcff',
          fontSize: '14'
        },
        top: this.state.data.titleTop || 6
      },

      legend: {
        show: this.state.data.showLegend || false,
        itemGap: this.state.data.itemGap || 15,
        textStyle: {
          color: '#dbfcff'
        },
        left: this.state.data.legendLeft || 0,
        top: this.state.data.legendTop || 0,
        icon: 'rect',
        data: this.state.data.legendName || ['1', '2'],
        itemWidth: 20,
        itemHeight: 2
      },
      dataZoom: [
        {
          show: this.state.data.showZoom || false,
          type: 'slider',
          backgroundColor: '#1e1d62',
          handleStyle: {
            color: '#61e7ff',
            borderWidth: 0.01,
            borderColor: '#61e7ff'
          },
          //handleIcon: 'M0,0 v9.7h5 v-15.7h-5 Z',
          handleIcon: 'M0,0 L1,0 L1,6 L0,6 Z',
          fillerColor: 'rgba(44,255,254,0.5)',
          dataBackground: {
            lineStyle: {
              color: '#f30505',
              width: 2
            },
            areaStyle: {
              //color: 'rgba(27,68,113,0.8)'
            }
          },
          left: '10%',
          right: '10%',
          bottom: '0%',
          height: 18,
          textStyle: {
            color: '#1397fe'
          },
          borderColor: 'transparent',
        }],
      tooltip: {
        show: this.state.data.showTooltip || false,
        trigger: 'axis',
        backgroundColor: 'rgba(25,31,106,0.8)',
        formatter: function (params) {
          let res = '<div style="min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="margin-bottom:0;color:#fff;font-size: 18px;line-height: 30px">' + params[0].name + '</h2>';
          if (params.length > 0) {
            for (let i = 0; i < params.length; i++) {
              res += '<span style="margin-right:7px;background: ' + circleArr[i] + ';display: inline-block;width:10px;height:10px;border-radius: 10px"></span>' + '</span><span>' + params[i].seriesName + ': </span>' + '<span>' + params[i].value + unitArr[i] + '</span><br/>';
            }
          } else {
            res += '- null'
          }
          return res;
        }
      },
      xAxis: {
        type: 'category',
        data: this.state.data.xData,
        axisLine: {
          lineStyle: {
            color: '#dbfcff'
          }
        },
        axisTick: {
          show: this.state.data.showTick || true
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#dbfcff'
          }
        }
      },
      grid: {
        top: this.state.data.gridTop || '20%',
        left: this.state.data.gridLeft || '10%',
        bottom: this.state.data.gridBottom || '13%',
        right: this.state.data.gridRight || '3%',
      },
      series: [{
        name: this.state.data.legendName[0],
        data: this.state.data.yData1,
        type: 'line',
        smooth: this.state.data.smooth,
        symbol: circle,
        symbolSize: this.state.data.symbolSize || 0,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.state.data.colorStartOne || 'rgba(100,100,100,0)' // 0% 处的颜色
            }, {
              offset: 1, color: this.state.data.colorEndOne || 'rgba(100,100,100,0)' // 100% 处的颜色
            }]
          }
        },
      },
      {
        name: this.state.data.legendName[1],
        data: this.state.data.yData2,
        type: 'line',
        smooth: this.state.data.smooth,
        symbol: circle,
        symbolSize: this.state.data.symbolSize || 0,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.state.data.colorStartTwo || 'rgba(100,100,100,0)' // 0% 处的颜色
            }, {
              offset: 1, color: this.state.data.colorEndTwo || 'rgba(100,100,100,0)' // 100% 处的颜色
            }]
          }
        },
      },
      {
        name: this.state.data.legendName[2],
        data: this.state.data.yData3,
        type: 'line',
        smooth: this.state.data.smooth,
        symbol: circle,
        symbolSize: this.state.data.symbolSize || 0,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.state.data.colorStartThr || 'rgba(100,100,100,0)' // 0% 处的颜色
            }, {
              offset: 1, color: this.state.data.colorEndThr || 'rgba(100,100,100,0)' // 100% 处的颜色
            }]
          }
        },
      }
      ]
    };
    echarts.setOption(option);
  }
}
