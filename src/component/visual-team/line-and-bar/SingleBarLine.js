import React, {Component} from 'react';
import echart from 'echarts';

class DeepLineBar extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this._flag = false;
    me.echartStyle = {
      ...me.props.style
    };
    me.h2 = {
      height: '30px',
      fontSize: '22px',
      color: '#46ebff'
    }
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
        <div style={me.echartStyle}>
          <h2 style={me.h2}>
            <p style={{
              height: '22px',
              lineHeight: '22px',
              borderLeft: '3px solid #46ebff',
              paddingLeft: '8px'
            }}>{me.props.title}</p>
          </h2>
          <div ref={'echarts'} style={{
            width: me.echartStyle.width,
            height: parseInt(me.echartStyle.height) - 30 + 'px'
          }}></div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    let me = this;
    if (!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);
    let config = {
      titleShow: me.state.data.titleShow,
      titleText: me.state.data.titleText,
      legendShow: me.state.data.legendShow,
      legendData: me.state.data.legendData,
      xAxisData: me.state.data.xAxisData,
    //   yAxisName: me.state.data.yAxisName,
      seriesLineData: me.state.data.seriesLineData,
      seriesBarData: me.state.data.seriesBarData,
    //   colorTop: me.state.data.colorTop,
    //   colorBottom: me.state.data.colorBottom,
    //   color: me.state.data.color
    };
    let option = {
      title: {
        show: config.titleShow,
        text: config.titleText,
        textStyle: {
          color: '#46ebff',
          fontSize: 16,
          align: 'left'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#999'
          }
        }
      },
      grid: {
        left: '5%',
        right: '10%',
        top: '28%',
        bottom: '12%',
      },
      legend: {
        show: config.legendShow,
        left: '12%',
        top: '13%',
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 25,
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        data: config.legendData
      },
      xAxis: [
        {
          type: 'category',
          data: config.xAxisData,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '百万元',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'left'
          },

          interval: 50,
          axisLabel: {
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          }
        },
        {
          type: 'value',
          name: '百分比',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'left'
          },
          axisLabel: {
            fontSize: 16,
            formatter: '{value} %'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
        }
      ],
      series: [
        {
          name:'鲜果消耗量',
          type:'bar',
          barCategoryGap: '75%',
          itemStyle: {
            barBorderRadius:50,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(0,234,255,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(0,234,255,0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false2.0, 4.9, 7.0, 23.2, 25.6, 76.7
            }
          },
          data: config.seriesBarData
        },
        {
          name:'加工品消耗鲜果量占鲜果产量比例',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            color: '#feff87'
          },
          symbolSize: 0,
          data: config.seriesLineData
        }
      ]
    };

    // let arr = config.seriesData;


    echarts.setOption(option);
  }
}

export default DeepLineBar;
