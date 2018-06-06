import React, { Component } from "react";
import echarts from 'echarts';

export default class SeasonRule extends Component {
    constructor(props) {
        super(props);
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
                formatter: function (params) {
                    let html = `<div>
                                    <span>${params[0].name}</span><br>
                                    <span>${params[0].seriesName}：${params[0].value}</span><br>
                                    <span>${params[1].seriesName}：${params[1].value}</span>
                                </div>`;
                    return html;
                },
                backgroundColor: 'rgba(25,31,106,0.8)',
                borderColor: 'rgba(25,31,106,0.8)',
                borderWidth: 1,
                padding: 10,
                position: 'top',
                textStyle: {
                    color: '#fff',
                    fontSize: 15
                },
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: '',        // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                    }
                },

            },
            legend: {
                show: true,
                data: data.legendData,
                icon: 'rect',
                left: this.props.legrndLeft || 'center',
                top: this.props.legendTop || 5,
                textStyle: {
                    color: '#dbfcff',
                    fontSize: 14.5
                },
                itemGap: 25,
                itemWidth: 12,
                itemHeight: 4,
            },
            grid: {
                left: '8%',
                top: 40,
                right: 50,
                bottom:'32%'
            },
            dataZoom: [{
                show: true,
                height: 15,
                xAxisIndex: [0],
                left: 50,
                right: 50,
                bottom: 16,
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
                end: 80,
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
            }, {
                type: "inside",
                show: true,
                height: 15,
            }],
            xAxis: {
                name: '',
                nameTextStyle: {
                    color: '#fff'
                },
                type: 'category',
                boundaryGap: true,//折线距离y轴有无距离
                axisLabel: axisLabel,
                axisTick: {
                    show: true,
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#8ac7ff",
                        type: "solid",
                        width: 1
                    }
                },
                data: data.xAxisData,

            },
            yAxis: {
                name: '元/公斤',
                nameTextStyle: {
                    color: '#fff',
                    verticalAlign:'top',
                    align:'left'
                },
                nameGap:'20',
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
                        color: "#8ac7ff",
                        type: "solid",
                        opacity: 1
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(138,199,255,.2)', //分割线颜色
                        type: "solid",
                        width: 1
                    }
                }
            },
            lineStyle: {
                normal: {
                    color: 'rgba(245,202,28,1)'
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
                    name: data.legendData[0],
                    type: 'line',
                    itemStyle: { 
                        normal: { 
                            color:'#ffd015'
                        } 
                    },
                    data: data.seriesData[0],
                    symbolSize: 5,
                    showSymbol: false,
                    smooth: false,
                    areaStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            opacity: 0.2

                        }
                    }
                },{
                    name: data.legendData[1],
                    type: 'line',
                    itemStyle: { 
                        normal: { 
                            color:'#02e5fd',
                            areaStyle: { 
                                type: 'default' 
                            } 
                        } 
                    },
                    data: data.seriesData[1],
                    symbolSize: 5,
                    showSymbol: false,
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0.7,
                                color: 'rgba(0,255,203,0.83)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,209,255,0.83)'
                            }]),
                            opacity: 0.2

                        }
                    }
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