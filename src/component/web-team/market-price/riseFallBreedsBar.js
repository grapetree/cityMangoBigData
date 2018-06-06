import React, { Component } from "react";
import echarts from 'echarts';

export default class SurveyLink extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data;
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
            fz: '16',
            color: '#dbfcff'
        };
        let option = {
            grid: {
                right: '8%',
                left: '15%',
                bottom: '20%',
                top: '30'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                formatter: function(params) {
                    //console.log(params)
                    let val = (params[0].data).toFixed(2);
                    let str = '';
                    params.forEach(function(v, i) {
                        str += params[0].name + '<br/>价格变动幅度： ' + val +'%';
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
                show: false,
                data: [''],
                right: '60',
                top: '35',
                textStyle: {
                    color: echartOpt.color,
                    fontSize: echartOpt.fz
                },
                itemGap: 20,
                itemHeight: 15,
                itemWidth: 15
            },
            calculable: true,
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                axisTick: {
                    show: false,
                    interval: 0,
                    alignWithLabel: true
                },
                axisLabel: axisLabel,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: ['#2f46a1']
                    }
                },
                data: data.xAxisData
            },
            yAxis: {
                type: 'value',
                name: '%',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#2f46a1']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: axisLabel,
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#99aef8'
                    }
                },
            },
            series: [{
                name: '',
                type: 'bar',
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                       // borderColor: '#0897eb',
                        color: function(d) {
                            if (d.data > 0) {
                                return new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#02ebf5'
                                    }, {
                                        offset: 1,
                                        color: '#1675d7'
                                    }]
                                )
                            } else {
                                return new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ffff99'
                                    }, {
                                        offset: 1,
                                        color: '#999966'
                                    }]
                                )
                            }
                        },
                        //opacity: 0.6,
                        barBorderRadius: 1,
                    },
                    emphasis: {
                        opacity: 0.7
                    }
                },
                data: data.seriesData,
                zlevel: 9
            },
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