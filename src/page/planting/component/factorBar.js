import React, { Component } from "react";
import echarts from 'echarts';

export default class FactorBar extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data;
        let myChart = echarts.init(this.refs.myChart);
        let axisLabel = {
            interval:0,
            //rotate: '45',
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
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                /* formatter: function (param) {
                    console.log(param)
                    return
                }, */
                backgroundColor: 'rgba(4, 54, 181, 0.85)',
                borderWidth: '1',
                borderColor: '#0a61ff',
                extraCssText: 'box-shadow: 0 0 5px rgba(0, 210, 255, 0.25);'
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top: '15%',
                containLabel: true
            },
            color: ['#7d87bd'],
            xAxis: [{
                type: 'category',
                name: '',
                interval: 0,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#83c1cc',
                    padding: [60, 0, 0, -60]
                },
                data: ['低温', '干旱', '连阴雨', '低温', '干旱', '连阴雨', '低温', '干旱', '连阴雨'],
                boundaryGap: true,
                splitNumber: 19,
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#83c1cc'
                    }
                },
                axisLabel: axisLabel,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#7896ff'
                    }
                }
            },
            {
                type: 'category',
                data: ['低温', '干旱', '连阴雨', '低温', '干旱', '连阴雨', '低温', '干旱', '连阴雨'],
                boundaryGap: false,
                splitNumber: 20,
                interval: 0,
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#83c1cc'
                    }
                },
                axisLabel: {
                    show: false,
                    color: '#83c1cc'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#7896ff'
                    }
                }
            }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: "",
                    nameTextStyle: {
                        color: '#83c1cc',
                        padding: [60, 0, 0, -40]
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#7896ff'
                        }
                    },
                    axisLabel: axisLabel,
                    axisTick: {
                        show: false,
                        lineStyle: {
                            color: '#83c1cc'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(120,150,255,.1)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barCategoryGap: '70%',
                    backgroundColor: 'transparent',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [20, 20, 20, 20] ,
                            color: function (d) {
                                let i = (d.dataIndex)*1;
                                //console.log(i)
                                    if (i <= 2) {
                                        return  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(0, 255, 255, 1)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(51, 153, 204, 0.8)'
                                        }])
                                    }else if (i == 3 || i ==4 || i == 5) {
                                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(255, 255, 153, 1)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(153, 153, 205, 0.8)'
                                        }])
                                    }else{
                                         return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                             offset: 0,
                                             color: 'rgba(102, 204, 204, 1)'
                                         }, {
                                             offset: 1,
                                             color: 'rgba(153, 255, 204, 0.8)'
                                         }])
                                    }

                            }
                        },
                        emphasis: {
                            opacity: 0.7
                        }
                    },
                    data: [10,20,30,40,50,60,70,80,85,88
                       /*  {
                            value: 30,
                            itemStyle: {
                                normal: {
                                    borderColor: '#07a2f5',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 255, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(51, 153, 204, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 40,
                            itemStyle: {
                                normal: {
                                    borderColor: '#07a2f5',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 255, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(51, 153, 204, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 50,
                            itemStyle: {
                                normal: {
                                    borderColor: '#07a2f5',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 255, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(51, 153, 204, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 38,
                            itemStyle: {
                                normal: {
                                    borderColor: '#f5de33',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(255, 255, 153, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 153, 205, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 45,
                            itemStyle: {
                                normal: {
                                    borderColor: '#f5de33',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(255, 255, 153, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 153, 205, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 40,
                            itemStyle: {
                                normal: {
                                    borderColor: '#f5de33',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(255, 255, 153, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 153, 205, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 40,
                            itemStyle: {
                                normal: {
                                    borderColor: '#66ff99',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(102, 204, 204, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 255, 204, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 30,
                            itemStyle: {
                                normal: {
                                    borderColor: '#66ff99',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(102, 204, 204, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 255, 204, 0.8)'
                                    }])
                                }

                            },
                        },
                        {
                            value: 20,
                            itemStyle: {
                                normal: {
                                    borderColor: '#66ff99',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(102, 204, 204, 1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(153, 255, 204, 0.8)'
                                    }])
                                }

                            },
                        } */
                    ]
                },
                {
                    xAxisIndex: 1,
                    // show: false,
                    name: '辅助',
                    type: 'line',
                    data: [],
                    markArea: {
                        silent: true,
                        itemStyle:{
                            opcity:0
                        },
                        label: {
                            normal: {
                                color: '#b2e1ff',
                                padding: [8, 30, 8, 30]
                            }
                        },
                        data: [
                            [{
                                name: '开花期座果期(3-4月份)',
                                coord: [0],
                            }, {
                                coord: [3]
                            }],
                            [{
                                name: '果实快速生长期(5月份)',
                                coord: [3],
                            }, {
                                coord: [6]
                            }],
                            [{
                                name: '果实成熟期(6月份)',
                                coord: [6],
                            }, {
                                coord: [9]
                            }]
                        ]
                    },
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