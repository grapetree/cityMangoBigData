import React, { Component } from "react";
import echarts from 'echarts';

export default class SurveyLink extends Component {
    constructor(props) {
        super(props);
        console.log(props.params)
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        //console.log(this.props.sort)
        let data;
        if (this.props.sort){
            //处理数据排序
            data = this.props.data;
        }else{
            data = this.props.data;
        }
        let myChart = echarts.init(this.refs.myChart);
        let axisLabel = {
            textStyle: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 'lighter'
            },
            margin: 10,
            formatter: (params) => {
                return params
            }
        }
        let echartOpt = {
            fz: '14',
            color: '#dbfcff'
        };
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                formatter: function(params) {
                    let str = '';
                    params.forEach(function(v, i) {
                        str += '收购价 ' + '<br>' + '涨： ' + params[0].data;
                    });
                    return str

                },
                textStyle: {
                    align: 'left',
                    color: '#fff',
                    fontSize: '16'
                },
                backgroundColor: 'rgba(15, 52, 135, 0.9)',
                borderWidth: '1',
                borderColor: '#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);'


            },
            legend: {
                show:false,
                data: [{
                    name: "收购价",
                    textStyle: {
                        color:"#fff"
                    }
                }],
            },
            label: {
                normal: {
                    textStyle: {
                        color: "#ff3b00"
                    }
                },
                emphasis:{
                    textStyle:{
                        color:"#ff3b00"
                    }
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top:'30',
                containLabel: true
            },
            yAxis: [{
                name: this.props.unit || "%",
                nameTextStyle:{
                    padding: [3, 10,3,30]
                },
                type : 'value',
                //min:'dataMin',
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:true,
                    formatter: '{value}',
                    lineStyle: {
                        color: '#476bbe'
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#99aef8'
                    }
                },
                axisLabel:axisLabel,
            }],

            xAxis: {
                type : 'category',
                name: '',
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: ['#254495'],
                        type:'dashed'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:axisLabel,
                axisLine:{
                    lineStyle: {
                        color:echartOpt.color,
                        fontSize:echartOpt.fz
                    }
                },
                data : data.xAxisData,
            },
            series: [
                {
                    name: '收购价',
                    type: 'bar',
                    barWidth : 10,
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            formatter: "{c}%"
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor:'#07a2f5',
                            barBorderRadius: [20, 20, 20, 20],
                            color: new echarts.graphic.LinearGradient(0,0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 255, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(51, 102, 204, 0.4)'
                            }])
                        }

                    },
                    // 顺序 从下向上 传入
                    data:data.seriesData
                }
            ]
        };
        myChart.setOption(option);
    }

    componentDidMount() {   //初始化渲染图表
        if (this.props.data){
            this.initEchart()
        }
    }

    componentDidUpdate() {  //更新数据重新渲染图表
        if (this.props.data) {
            this.initEchart()
        }
    }

    render() {
        if (this.props.data) {
            return (
                <div style={{width:'100%',height:'100%'}} ref='myChart' className="my-chart"></div>
            )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}