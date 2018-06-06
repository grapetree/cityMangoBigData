import React, { Component } from "react";
import echarts from "echarts";
import "echarts-liquidfill";


export default class LiquidPie extends Component {
    constructor(props) {
        super(props)
        this.initChart = this.initChart.bind(this)
    }
    randomNum = () => {
        return (Math.random() * 100).toFixed(0);
    }
    initChart() {
        let myChart = echarts.init(this.refs.chart);
        let data = this.props.data;
        // console.log(data)
        let option = {
            title: {
                text:'三品生产面积',
                textStyle: {
                    color:'#46ebff',
                    fontSize: 16
                },
                left:'center',
                bottom: '11%'
            },
            series: [
            //     {
            //     type: "pie",
            //     radius: [
            //         60,
            //         62
            //     ],
            //     clockWise: false,
            //     hoverAnimation: false,
            //     itemStyle: {
            //         normal: {
            //             label: {
            //                 show: false
            //             },
            //             labelLine: {
            //                 show: false
            //             },
            //             borderColor: "#2d61ba",
            //             borderWidth: 8
            //         }
            //     },
            //     data: [1]

            // },
            {
                radius: [
                    60,
                    62
                ],
                clockWise: false,
                hoverAnimation: false,
                type: "pie",
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: "bold"
                            },
                            position: "center"
                        },
                        labelLine: {
                            show: false
                        },
                        color: "#19e8fb",
                        borderColor: "#19e8fb",
                        borderWidth: 8
                    }
                },
                data: [{
                        name: " ",
                        value: 15,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: "#19e8fb",
                                borderColor: "#19e8fb",
                                borderWidth: 8
                            }
                        }
                    },
                    {
                        value: 85
                    }
                ]
                }, {
                    type: 'liquidFill',
                    data: [
                        {
                            value: 0.8,
                            direction: 'left',
                            itemStyle: {
                                normal: {
                                    color: "rgba(34,199,252,.3)"
                                }
                            }
                            // itemStyle: {     //  注释的代码是渐变效果，更新数据造成谷歌浏览器崩溃，原因未知，因此舍弃渐变效果。
                            //     normal: {
                            //         color: {
                            //             type: 'linear',
                            //             x: 0,
                            //             y: 0,
                            //             x2: 0,
                            //             y2: 1,
                            //             colorStops: [{
                            //                 offset: 0, color: 'rgba(42,254,201,.3)' // 0% 处的颜色
                            //             }, {
                            //                 offset: 1, color: 'rgba(42,254,201,.6)' // 100% 处的颜色
                            //             }]
                            //         }
                            //     }
                            // }
                        },
                        {
                            value: 0.7,
                            direction: 'right',
                            itemStyle: {
                                normal: {
                                    color: "rgba(34,199,252,.7)"
                                }
                            }
                            // itemStyle: {     //  注释的代码是渐变效果，更新数据造成谷歌浏览器崩溃，因此舍弃渐变效果。
                            //     normal: {
                            //         color: {
                            //             type: 'linear',
                            //             x: 0,
                            //             y: 0,
                            //             x2: 0,
                            //             y2: 1,
                            //             colorStops: [{
                            //                 offset: 0, color: 'rgba(42,254,201,.3)' // 0% 处的颜色
                            //             }, {
                            //                 offset: 1, color: 'rgba(42,254,201,.6)' // 100% 处的颜色
                            //             }]
                            //         }
                            //     }
                            // }

                        }
                    ],
                    radius: '50%',
                    outline: {
                        borderDistance: 2,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'rgba(113,215,245,.8)',
                            shadowBlur: 2,
                            shadowColor: 'rgba(252, 202, 7, .8)'
                        }
                    },
                    backgroundStyle: {
                        borderColor: '#259dd2',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 183, 238,.25)'
                        }, {
                            offset: 1,
                            color: 'rgba(0, 183, 238,0)'
                        }]),
                        borderWidth: 5,
                        shadowBlur: 20,
                        shadowColor: 'rgba(37, 157, 210, .8)'
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                return data.value ? `${data.value/10000}万亩` :`0亩`;
                            },
                            fontSize: 18,
                            color: '#00a2ff'
                        }
                    }
                }]
        };

        myChart.setOption(option)
    }

    componentDidMount() {
        if (this.props.data) {
            this.initChart()
        }
    }

    componentDidUpdate() {
        if (this.props.data) {
            this.initChart()
        }
    }

    render() {
        if (this.props.data) {
            return (
                <div ref="chart" style={{ width: '100%', height: '100%' }}></div>
            )
        } else {
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}