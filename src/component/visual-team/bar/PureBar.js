import React, {Component} from 'react';
import echart from 'echarts';

export default class PureBar extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this._flag = false;
    me.echartStyle = {
      ...me.props.style
    };
  }

  _flag = undefined;

  setData(d) {
    this._flag = true;
    this.setState({
      data: d
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

    if (!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);


    let unitArr = this.state.data.unitArr;
    let circleArr = this.state.data.circleArr;
    let seriseArr = [];
    let yArr = [];

    let obj1 = {
      type: 'bar',
      barWidth: 8,
      name: this.state.data.legendName[0],
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.state.data.colorStartOne
            }, {
              offset: 1, color: this.state.data.colorEndOne
            }]
          },
          borderColor: {
            colorStops: [
              {offset: 0, color: '#ff0'},
              {offset: 1, color: '#ff0'}
            ]
          },
          borderWidth: 0,
          barBorderRadius: 100
        }
      },
      data: this.state.data.yData1
    };

    let obj2 = {
      type: 'bar',
      name: this.state.data.legendName[1],
      barWidth: 8,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: this.state.data.colorStartTwo || ''
            }, {
              offset: 1, color: this.state.data.colorEndTwo || ''
            }]
          },
          borderColor: {
            colorStops: [
              {offset: 0, color: '#ff0'},
              {offset: 1, color: '#ff0'}
            ]
          },
          borderWidth: 0,
          barBorderRadius: 100
        }
      },
      data: this.state.data.yData2
    };

    if (this.state.data.num === 1) {
      seriseArr.push(obj1);
    } else if (this.state.data.num === 2) {
      seriseArr.push(obj1);
      seriseArr.push(obj2);
    }

    let arr = [];
    for (let i = 0; i < this.state.data.yData1.length; i++) {
      arr.push(this.state.data.yData1[i]);
    }

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }

    let a = arr[0];
    let max = 0;
    if (a <= 5) {
      max = 5;
    } else if (a > 5 && a <= 10) {
      max = 10;
    } else if (a > 10 && a <= 25) {
      max = 25;
    } else if (a > 25 && a <= 50) {
      max = 50;
    } else if (a > 50 && a <= 100) {
      max = 100;
    } else {
      max = 200;
    }


    let yObj1 = {
      type: 'value',
      splitNumber: 5,
      //max: max,
      axisTick: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: '#dbfcff'
        }
      }
    };

    let yObj2 = {
      type: 'value',
      name: '',
      min: 0,
      max: 25,
      splitNumber: 5,
      axisLabel: {
        formatter: '{value} %'
      },
      axisLine: {
        lineStyle: {
          color: '#dbfcff'
        }
      }
    };

    if (this.state.data.yNum === 1) {
      yArr.push(yObj1);
    } else if (this.state.data.yNum === 2) {
      yArr.push(yObj1);
      yArr.push(yObj2);
    }

    if (this.state.data.yLeftPercent === 1) {
      yObj1.axisLabel = {
        formatter: '{value}%'
      };
    }

    let option = {
      title: {
        show: this.state.data.showTitle || false,
        text: this.state.data.title || '111',
        textStyle: {
          color: '#dbfcff',
          fontSize: '14'
        },
        top: this.state.data.titleTop || 6,
        left: this.state.data.titleLeft || 5
      },
      legend: {
        show: this.state.data.showLegend || false,
        itemGap: this.state.data.itemGap || 15,
        textStyle: {
          color: '#dbfcff'
        },
        left: this.state.data.legendLeft || 0,
        top: this.state.data.legendTop || 0,
        icon: 'roundRect',
        data: this.state.data.legendName || ['111', '222'],
        itemWidth: this.state.data.itemWidth || 8,
        itemHeight: this.state.data.itemHeight || 8
      },
      xAxis: {
        data: this.state.data.xData,
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#dbfcff'
          },
          interval: 0
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#dbfcff'
          }
        },
        z: 10
      },
      yAxis: [],
      // tooltip : {
      //   show:this.state.data.showTooltip||false,
      //   trigger: 'axis',
      //   backgroundColor:'rgba(25,31,106,0.8)',
      //   formatter:function (params) {
      //     let res='<div style="min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="font-size: 18px;line-height: 30px">'+params[0].name+'</h2>';
      //     if(params.length > 0){
      //       for(let i=0;i<params.length;i++){
      //         res += '<span style="margin-right:7px;background: '+circleArr[i]+';display: inline-block;width:10px;height:10px;border-radius: 10px"></span>'+'</span><span>'+params[i].seriesName+': </span>'+ '<span>'+params[i].value+unitArr[i]+'</span><br/>';
      //       }
      //     }else{
      //       res += '- null'
      //     }
      //     return res;
      //   }
      // },
      tooltip: {
        show: this.state.data.showTooltip || false,
        trigger: 'axis',
        backgroundColor: 'rgba(25,31,106,0.8)',
        formatter: function (params) {
          let res = '<div style="min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="color:#dbfcff;font-size: 18px;line-height: 30px">' + params[0].name + '</h2>';
          if (params.length > 0) {
            for (let i = 0; i < params.length; i++) {
              res += '种植面积<span>' + params[i].seriesName + ': </span>' + '<span>' + params[i].data.value + unitArr[i] + '</span><br/><span>占总面积：' + params[i].data.percent + '</span>';
            }
          } else {
            res += '- null'
          }
          return res;
        }
      },
      grid: {
        top: this.state.data.gridTop || '20%',
        left: this.state.data.gridLeft || '2%',
        bottom: this.state.data.gridBottom || '1%',
        right: this.state.data.gridRight || '3%',
        containLabel: true
      },
      series: []
    };
    option.series = seriseArr;
    option.yAxis = yArr;
    echarts.setOption(option);
  }
}
