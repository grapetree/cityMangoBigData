import React, { Component } from "react";
import echarts from 'echarts';

export default class ActualityLineBar extends Component {
  constructor(props) {
    super(props);
    let me = this;
    // console.log(this.props);
    this.initEchart = this.initEchart.bind(this);
    me.echartStyle = {
      width: '100%',
      height: '100%',
    }
  }

  initEchart(){   // 渲染图表方法
    let data = this.props.data;
    let myChart = echarts.init(this.refs.myChart);

    let option = {
      grid: {
        right: '5%',
        left: '8%',
        bottom: '15%',
        top: '30%'
      },
      dataZoom: [{
        show: true,
        height: 15,
        xAxisIndex: [0],
        left: '50',
        right: '50',
        bottom: 20,
        backgroundColor: '#1f2d70',
        dataBackground: {
          areaStyle: {
            color: 'rgba(79, 140, 210, 0.4)'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        fillerColor: 'rgba(4, 175, 246, 0.6)',
        start: 0,
        end: 100,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: '#00ADFA',
          shadowBlur: 0,
          shadowColor: 'rgba(255, 0, 0, 1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        textStyle: {
          color: "#11caff",
          fontSize: '12'
        },
        borderColor: "#3458B4"
      }],
      tooltip: {
        trigger: 'axis',
        formatter: function(param){
          //console.log(param);
          var html='',unit = '万吨';
          html +='<div style="padding: 10px 10px 5px 10px;font-size:14px;line-height:14px;color:#fff;border-radius:5px;">';
          html +='<p style="color:#fff;font-size:16px;">'+ param[0].name+'年</p>';
          param.map(function(item,index){
            html+= '<p><span style="color:#fff;">'+ item.seriesName +'</span>：'+  item.value + (index < 2 ? unit : '%') +'</p>';
          });
          html+='</div>';
          return html;
        }
      },
      legend: {
        data: ['芒果产量','芒果销量','产量增长率', '销量增长率'],
        right: 'center',
        top: '90',
        textStyle: {
          fontSize: '14',
          color: '#fff'
        },
        itemGap: 25,
        itemHeight: 10,
        itemWidth: 20
      },
      calculable: true,
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: true,
          interval: 0,
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: '0',
          textStyle: {
            fontSize: '14',
            color: '#fff'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#2f46a1']
          }
        },
        data: data.xAxisData,
      },
      yAxis: [{
        type: 'value',
        name: '万吨',
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#2f46a1']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: '14',
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            fontSize: '14',
            color: '#fff'
          }
        }
      }, {
        type: 'value',
        name: '变化率',
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#3277E0']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          formatter:'{value}%',
          textStyle: {
            fontSize: '14',
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            fontSize: '14',
            color: '#fff'
          }
        }
      }],
      series: [{
        name: '芒果产量',
        type: 'bar',
        barMaxWidth: 8,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: '#01ECF6'
              }, {
                offset: 1,
                color: '#0C80E8'
              }]
            ),
            opacity: 0.6,
            barBorderRadius: 30,
            barBorderColor: '#01ECF6'
          },
          emphasis: {
            opacity: 1
          }
        },
        data: data.seriesData[0],
        zlevel: 9
      }, {
        name: '芒果销量',
        type: 'bar',
        barMaxWidth: 8,
        barGap: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: '#F8EE27'
              }, {
                offset: 1,
                color: '#d0bc44'
              }]
            ),
            opacity: 0.7,
            barBorderRadius: 30,
            barBorderColor: '#F8EE27'
          },
          emphasis: {
            opacity: 1
          }
        },
        data: data.seriesData[1],
        zlevel: 9
      }, {
        name: '产量增长率',
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 0,
        symbol: 'line',
        itemStyle: {
          normal: {
            color: '#03EDFD',
            borderWidth: 2,
          },
          emphasis: {
            borderColor: '#03EDFD'
          }
        },
        smooth: true,
        data: data.seriesData[2],
        zlevel: 9

      },
        {
          name: '销量增长率',
          type: 'line',
          yAxisIndex: 1,
          symbolSize: 0,
          symbol: 'line',
          itemStyle: {
            normal: {
              color: '#F8EE27',
              borderWidth: 2,
            },
            emphasis: {
              borderColor: '#F8EE27'
            }
          },
          smooth: true,
          data: data.seriesData[3],
          zlevel: 9

        }]
    };
    myChart.setOption(option);
  }

  componentDidMount() {   //初始化渲染图表
    this.initEchart()
  }

  componentDidUpdate() {  //更新数据重新渲染图表
    this.initEchart()
  }

  render() {
    if (this.props.data){
    return (
      <div ref='myChart' style={this.echartStyle}>

      </div>
    )
    }else{
        return (
            <div style={this.echartStyle}></div>
        )
    }

  }
}