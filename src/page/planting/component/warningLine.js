import React, { Component } from "react";
import echarts from 'echarts';

export default class WarningLine extends Component {
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
                fontSize: 16,
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
            calculable: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                formatter: function (params) {
                    let str = params[0].name;
                    //console.log(params)
                    params.forEach(function (v, i) {
                        str += '年 ' + '<br>' + '受灾次数： ' + params[0].data  + '次' ;
                    });
                    return str

                },
                textStyle: {
                    align: 'left',
                    color: '#5cc1ff',
                    fontSize: '16'
                },
                backgroundColor: 'rgba(15, 52, 135, 0.5)',
                borderWidth: '1',
                borderColor: '#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);'
            },
            legend: {
                show: true,
                data: ['长期趋势'],
                left: 'center',
                top: '5',
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                itemWidth: 20,
                itemHeight: 10,
            },
            grid: {
                left: '30',
                top: '30',
                right:'20',
                bottom:'40'
            },
            xAxis: {
                name: '',
                nameTextStyle: {
                    color: '#fff'
                },

                type: 'category',
                boundaryGap: true,//折线距离y轴有无距离
                axisLabel: axisLabel,
                axisTick: {
                    show: false
                },

                axisLine: {
                    lineStyle: {
                        color: "#35ece6",
                        type: "solid",
                        width: 1
                    }
                },

                data: data.xAxisData,

            },
            yAxis: {
                name: '次数',
                nameTextStyle: {
                    color: '#fff'
                },
                type: 'value',
                axisLabel: axisLabel,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#35ece6",
                        type: "solid",
                        opacity: 1
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#17a096', //分割线颜色
                        type: "solid",
                        width: 1
                    }
                },
                min: function(value) {
                    return (value.min*0.9).toFixed(0);
                },
                max: function(value) {
                    return (value.max*1.1).toFixed(0);
                }
            },
            lineStyle: {
                normal: {
                    color: 'rgba(51,2255,153,1)'
                }
            },
            itemStyle: {
                normal: {
                    color: '#33ff99',
                    borderWidth: '2'
                }
            },

            series: [
                {
                    name: '华坪',
                    type: 'line',
                    symbolSize: 8,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(49,145,224,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(49,145,224,0)'
                            }])
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#33ff99',
                            borderWidth: 2,
                            borderColor: '#2c60bc'
                        },
                        emphasis: {
                            borderColor: '#2c60bc'
                        }
                    },
                    data: data.seriesData[0]
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