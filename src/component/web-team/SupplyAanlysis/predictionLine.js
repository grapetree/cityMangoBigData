import React, { Component } from "react";
import echarts from 'echarts';

export default class PredictionLine extends Component {
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
    let axisLabel = {
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'lighter'
      },
      margin: 18,
      formatter:(params)=>{
        return params
      }
    };
    let option = {
      calculable : true,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: true,
        icon:'rect',
        data: ['产量预测', '消費预测'],
        left: 'center',
        top: '50',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        itemWidth: 20,
        itemHeight: 10,
      },
      grid: {
        right: '5%',
        left: '5%',
        bottom: '15%',
        top: '23%'
      },
      xAxis: {
        name:'',
        nameTextStyle:{
          color:'#fff'
        },

        type: 'category',
        boundaryGap: true,//折线距离y轴有无距离
        axisLabel: axisLabel,
        axisTick: {
          show:false
        },

        axisLine: {
          lineStyle: {
            color: "#35ece6",
            type: "solid",
            width: 1
          }
        },

        data : data.xAxisData,

      },
      yAxis: {
        name:'万吨',
        nameTextStyle:{
          color:'#fff'
        },
        type: 'value',
        //min: 0,
        //max: 100,
        //interval: 20,
        axisLabel: axisLabel,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#35ece6",
            type: "solid",
            opacity:1
          }
        },
        splitLine: {
          lineStyle: {
            color: '#17a096', //分割线颜色
            type: "solid",
            width:1
          }
        }
      },
      itemStyle:{
        normal:{
          color:'#00a6ff',
          borderWidth:'2'
        }
      },
      color:['#00f8ff','#fffc09'],
      series : [
        {
          name:'消費预测',
          type:'line',
          smooth:false,
          itemStyle: {normal: {areaStyle: {type: 'default'},borderColor:'#2f4dad'}},
          data: data.seriesData[0],
          symbolSize: 6,
          lineStyle:{
            normal:{
              color:'#00f8ff'
            }
          },
          areaStyle:{
            normal:{
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(15,255,252,1)'
              }, {
                offset: 1,
                color: 'rgba(42,238,245,0.01)'
              }]),
              opacity:0.6
            }
          }
        }, {
          name:'产量预测',
          type:'line',
          smooth:false,
          itemStyle: {normal: {areaStyle: {type: 'default'},borderColor:'#2f4dad'}},
          data: data.seriesData[1],
          symbolSize: 8,
          lineStyle:{
            normal:{
              color:'#fffc09'
            }
          },
          areaStyle:{
            normal:{
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(245,238,42,1)'
              }, {
                offset: 1,
                color: 'rgba(245,238,42,.01)'
              }]),
              opacity:0.6
            }
          }
        },

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