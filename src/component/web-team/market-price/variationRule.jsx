import React, { Component } from "react";
import echarts from 'echarts';

export default class VariationRule extends Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart() {   // 渲染图表方法
        let data = this.props.data;
        let myChart = echarts.init(this.refs.myChart);
        let axisLabel = {
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'lighter'
            },
            margin: 18,
            formatter: (params) => {
                return params
            }
        }
        let option = {
            backgroundColor: 'transparent',
            calculable: true,
            tooltip: {
                trigger: 'axis',
                formatter: '{b}：{c}',
                backgroundColor: 'rgba(25,31,106,0.8)',
                borderColor: 'rgba(25,31,106,0.8)',
                borderWidth: 1,
                position: 'top',
                padding: 10,
                textStyle: {
                    color: '#fff',
                },
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: '',        // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)',
                    }
                },

            },
            grid: {
                left: '8%',
                top: 40,
                right: 50,
                bottom: '32%'
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
                    show: false,
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#739673",
                        type: "solid",
                        width: 1
                    }
                },

                data: data.xAxisData

            },
            yAxis: {
                name: '',
                nameTextStyle: {
                    color: '#fff'
                },
                type: 'value',
                splitNumber: 5,
                //min: 0,
                //max: 100,
                //interval: 20,
                axisLabel: axisLabel,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#8ac7ff",
                        type: "solid",
                        opacity: 1
                    }
                },
                splitLine: {
                    interval: 1,
                    lineStyle: {
                        color: 'rgba(138,199,255,.2)', //分割线颜色
                        type: "solid",
                        width: 1
                    }
                }
            },
            lineStyle: {
                normal: {
                    color: '#0654b8'
                }
            },
            itemStyle: {
                normal: {
                    color: '#00a6ff',
                    borderWidth: '2'
                }
            },

            series: [
                {
                    name: '成交',
                    type: 'line',
                    smooth: false,
                    itemStyle: {
                        normal: {
                            color: '#2af594',
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: data.seriesData,
                    symbolSize: 8,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0.7,
                                color: 'rgba(42,2245,148,0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(42,2245,148,0.5)'
                            }]),
                            opacity: 0.5
                        }
                    }
                },

            ]
        };
        myChart.setOption(option);
    }

    componentDidMount() {   //初始化渲染图表
        if (this.props.data) {
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
                <div style={{ width: '100%', height: '100%' }} ref='myChart' className="my-chart"></div>
            )
        } else {
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}