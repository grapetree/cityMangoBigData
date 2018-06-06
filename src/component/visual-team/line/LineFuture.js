/**
 * 折线图  实现 当年和去年 数据对比，及未来预测值
 * author   zll
 */
import React, {Component} from 'react';
import echart from 'echarts';

class LineFutureChartMap extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {};
    me._flag = false;

  }

  setData(d) {
    this._flag = true;
    this.setState({
      data: d
    });
  }

  _option = undefined;

  render() {
    return (
      <div ref={'box'} style={this.props.style}></div>
    )
  }

  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      me._objData = {

        legendLeft: me.state.data.legendLeft,
        legendTop: me.state.data.legendTop,
        legendOrient: me.state.data.legendOrient,
        legendShow: me.state.data.legendShow,
        legendData: me.state.data.legendData,
        legendIcon: me.state.data.legendIcon,
        legendItemWidth: me.state.data.legendItemWidth,
        legendItemHeight: me.state.data.legendItemHeight,
        legendItemGap: me.state.data.legendItemGap,

        gridLeft: me.state.data.gridLeft,
        gridTop: me.state.data.gridTop,
        gridRight: me.state.data.gridRight,
        gridBottom: me.state.data.gridBottom,

        yAxisName: me.state.data.yAxisName,
        xAxisData: me.state.data.xAxisData,
        xAxisBoundaryGap: me.state.data.xAxisBoundaryGap,
        yAxisLineLineStyleColor: me.state.data.yAxisLineLineStyleColor,
        dataZoomShow: me.state.data.dataZoomShow,

        colorTop: me.state.data.colorTop,
        colorBottom: me.state.data.colorBottom,
        color: me.state.data.color,

        seriesDataOne: me.state.data.seriesDataOne,
        seriesDataTwo: me.state.data.seriesDataTwo,
        seriesDataThree: me.state.data.seriesDataThree,
        seriesDataFour: me.state.data.seriesDataFour,
        seriesDataFive: me.state.data.seriesDataFive,
        seriesDataSix: me.state.data.seriesDataSix,
        seriesSmooth: me.state.data.seriesSmooth,
        seriesLineWidth: me.state.data.seriesLineWidth,
        seriesShadowColor: me.state.data.seriesShadowColor,
        seriesSymbolSize: me.state.data.seriesSymbolSize,
        emptyLine: me.state.data.emptyLine,
        solidLine: me.state.data.solidLine

      };
      let echarts = echart.init(me.refs.box);
      me._option = {
        color: me._objData.colorTop,
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#00306f',
          axisPointer: {
            lineStyle: {
              color: '#000000'
            }
          }
          // formatter:'当前：{c}'
        },
        legend: {
          show: me._objData.legendShow,
          data: me._objData.legendData,
          icon: me._objData.legendIcon,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          itemWidth: me._objData.legendItemWidth,
          itemHeight: me._objData.legendItemHeight,
          // borderWidth: 5,
          left: me._objData.legendLeft,
          top: me._objData.legendTop,
          itemGap: me._objData.legendItemGap || 35,
          orient: me._objData.legendOrient
        },
        grid: {
          top: me._objData.gridTop,
          left: me._objData.gridLeft,
          right: me._objData.gridRight || '2%',
          bottom: me._objData.gridBottom || '16%',
          containLabel: true
        },
        dataZoom: [
          {
            show: me._objData.dataZoomShow,
            type: 'slider',
            backgroundColor: '#1d1a64',
            handleStyle: {
              color: '#61e7ff',
              borderWidth: 0.05,
              borderColor: '#61e7ff'
            },
            handleIcon: 'M0,0 v9.7h5 v-15.7h-5 Z',
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
            left: '4%',
            right: '4%',
            top: '90%',
            bottom: '5%',
            textStyle: {
              color: '#1397fe'
            },
            borderColor: 'transparent',
            start: 0,
            end: 100
          }],
        xAxis: [{
          type: 'category',
          boundaryGap: me._objData.xAxisBoundaryGap,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          },
          data: me._objData.xAxisData
        }],
        yAxis: [
          {
            name: me._objData.yAxisName || null,
            nameTextStyle: {
              color: '#ffffff',
              fontSize: 14
            },
            nameGap: 20,
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              },
              margin: 16
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLine: {
              lineStyle: {
                color: me._objData.yAxisLineLineStyleColor || 'transparent'
              }
            }
          }],

        series: [
          {
            name: me._objData.legendData[0],
            type: 'line',
            symbol: 'circle',
            symbolSize: me._objData.seriesSymbolSize || 0,
            lineStyle: {
              normal: {
                color: me._objData.color[0],
                width: me._objData.seriesLineWidth,
                shadowColor: me._objData.seriesShadowColor,
                shadowBlur: 10,
                shadowOffsetY: 5
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0.2,
                    color: me._objData.colorTop[0] || 'red'
                  }, {
                    offset: 1,
                    color: me._objData.colorBottom[0] || 'red'
                  }],
                  globalCoord: false
                },
                opacity: 0.6
              }
            },
            data: me._objData.seriesDataOne,
            smooth: me._objData.seriesSmooth
          },
          {
            name: me._objData.legendData[1],
            type: 'line',
            symbol: 'circle',
            symbolSize: me._objData.seriesSymbolSize || 0,
            lineStyle: {
              normal: {
                color: me._objData.color[1],
                type: 'dashed',
                width: me._objData.seriesLineWidth,
                shadowColor: me._objData.seriesShadowColor,
                shadowBlur: 10,
                smooth: true,
                shadowOffsetY: 5
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0.2,
                    color: me._objData.colorTop[1] || 'red'
                  }, {
                    offset: 1,
                    color: me._objData.colorBottom[1] || 'red'
                  }],
                  globalCoord: false
                },
                opacity: 0.6
              }
            },
            data: me._objData.seriesDataTwo,
            smooth: me._objData.seriesSmooth
          }
        ]
      };

      if (me._objData.emptyLine) {
        me._option.series.map((v, i) => {
          delete v['areaStyle'];
        })
      }

      echarts.setOption(me._option);
      me._flag = false;
    }
  }
}

export default LineFutureChartMap;
