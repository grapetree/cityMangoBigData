import React, { Component } from "react";
import echarts from 'echarts';

export default class SurveyLink extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data[0];
        const dataKey = [];
        const dataValue = [];
        if(data != undefined && data != null){
            for (const key in data){
                dataKey.push(key)
                dataValue.push(data[key])
            }
        }

        let myChart = echarts.init(this.refs.myChart);
        let axisLabel = {
            interval:0,
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'lighter'
            },
            margin: 16,
            formatter: (params) => {
                return params
            }
        }
        let echartOpt = {
            fz: '10',
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
                        str += '种植户数量 :'+ params[0].data;
                    });
                    return str

                },
                textStyle: {
                    align: 'left',
                    color: '#ffffff',
                    fontSize: '16'
                },
                backgroundColor: 'rgba(15, 52, 135, 0.5)',
                borderWidth: '1',
                borderColor: '#5cc1ff'


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
                left: '1%',
                right: '1%',
                bottom: '5%',
                top:'30',
                containLabel: true
            },
            yAxis: [{

                type : 'value',
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
                axisLine:{
                    lineStyle: {
                        color:echartOpt.color,
                        fontSize:echartOpt.fz
                    }
                },
                axisLabel:axisLabel,
                interval:50,
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
                data : dataKey,
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
                    data:dataValue
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
                <div style={{width:'321px',height:'200px',top:'-10px',left:'15px'}} ref='myChart' className="my-chart"></div>
            )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}