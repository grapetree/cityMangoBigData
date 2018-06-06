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
      // legendShow: me.state.data.legendShow,
      legendData: me.state.data.legendData,
      xAxisData: me.state.data.xAxisData,
      yAxisName: me.state.data.yAxisName,
      seriesData: me.state.data.seriesData,
      colorTop: me.state.data.colorTop,
      colorBottom: me.state.data.colorBottom,
      color: me.state.data.color
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
      color: config.color,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            width: 2,
            type: 'solid',
            color: '#999'
          }
        }
      },
      grid: {
        left: '5%',
        right: '2%',
        top: '28%',
        bottom: '12%',
      },
      legend: {
        left: '8%',
        top: '13%',
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 5,
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
          name: config.yAxisName,
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'left'
          },
          type: 'value',
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
          },
          axisLabel: {
            fontSize: 16
          }
        }
      ],
      series: []
    };

    let arr = config.seriesData;
    //数据第一组是折线的数据，后面几组是柱子的数据
    arr.map((v, i) => {
      if (i === 0) {
        option.series.push({
          name: v.names,
          type: 'line',
          itemStyle: {
            color: '#fff'
          },
          symbolSize: 0,
          data: v.values
        });
      } else {
        //后面几组是柱子的数据
        option.series.push({
          name: v.names,
          type: 'bar',
          data: []
        });
        //往 series的 data加数据 即 柱子的样式 还有就是 前面和最后一个不一致，做了一个判断
        arr[i].values.map((val, index) => {
          //给最后一个柱子加虚线
          if (index === arr[i].values.length - 1)

            option.series[i].data.push({
              name: v.names,
              value: val,
              itemStyle: {
                borderColor: config.colorTop[i],
                borderWidth: 2,
                borderType: 'dashed',
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: config.colorTop[i] // 0% 处的颜色
                  }, {
                    offset: 1, color: config.colorBottom[i] // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false2.0, 4.9, 7.0, 23.2, 25.6, 76.7
                }
              }
            });
          //给不是最后一个柱子加样式
          option.series[i].data.push({
            name: v.names,
            value: val,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: config.colorTop[i] // 0% 处的颜色
                }, {
                  offset: 1, color: config.colorBottom[i] // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false2.0, 4.9, 7.0, 23.2, 25.6, 76.7
              }
            }
          });
        });
      }
    });
    echarts.setOption(option);
  }
}

export default DeepLineBar;
