import React, { Component } from "react";
import echarts from 'echarts';

export default class ProcessedTop10 extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.initEchart = this.initEchart.bind(this);
    me.echartStyle = {
      width: '100%',
      height: '100%',
    }
  }

  initEchart(){   // 渲染图表方法
    let data = this.props.data;
    let myChart = echarts.init(this.refs.myChart);
    let echartOpt = {
      fz: '15',
      color: '#fff'
    };
    let option = {
      title: {
        text: '加工品销量TOP10地区',
        top: '50',
        left: '10',
        textStyle: {
          color: '#fff',
        }
      },
      grid: {
        right: '10%',
        left: '15%',
        bottom: '5%',
        top: '30%'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['质量监测事件数'],
        show: false,
        x : 'right',
        y : 'top',
      },
      calculable: true,
      xAxis: [
        {
          show: false,
          name: '次数',
          nameTextStyle:{
            color:'#fff'
          },
          type: 'value',
          //boundaryGap: [0, 0.01],
          boundaryGap : false,
          axisLabel: {
            interval: 0,
            rotate: 0,
            margin: 2,
            textStyle: {
              color: '#FFF',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13,
            }
          },
          axisLine: {
            lineStyle: {
              color:'rgba(255,255,255,0.2)',
              width: 1,
              type: 'solid'
            }
          },
          axisTick : {
            show:false,
            length: 6,
            lineStyle: {
              color: '#274271',
              type: 'solid',
              width: 1
            }
          },
          splitLine: {
            show:false
          }

        }
      ],
      yAxis: [
        {
          type: 'category',
          data: data.yAxisData,
          axisLine: {
            lineStyle: {
              color: '#425374',
              width: 1,
              type: 'solid'
            }
          },

          axisTick:{
            show:false
          },
          axisLabel: {
            textStyle: {
              color: '#FFF',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13,
            }
          },
          splitLine: {
            lineStyle: {
              color:'#274271'
            }
          }
        }
      ],
      color: new echarts.graphic.LinearGradient(
        1, 0, 0, 0, [{
          offset: 0,
          color: '#d0bc44'
        }, {
          offset: 1,
          color: '#F8EE27'
        }]
      ),
      series: [

        {
          name: '鲜果销售量',
          type: 'bar',
          barMaxWidth: 8,
          barGap: 2,
          data: data.seriesData,
          itemStyle:{
            normal:{
              label:{
                show:true,
                position:'right',
                textStyle:{color:'#FFF'}
              },
              barBorderRadius: [0, 25, 25, 0],
            }
          }
        }
      ]
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