import React,{ Component } from "react";
import echarts from "echarts";


export default class Feedback extends Component{
    constructor(props){
        super(props)
        this.initChart = this.initChart.bind(this)
    }
    randomNum = () =>{
        return (Math.random() * 100).toFixed(0);
    }
    initChart(){
        let myChart = echarts.init(this.refs.chart);
        let data = this.props.data;
        let legend = this.props.legend || ['产量', '消费'];
        let unitName = this.props.unitName || "单位：个";
        // let showSymbol = this.props.showSymbol;
        let gird = this.props.gird || { left: 30, right: 40, top: 50, bottom: 40, containLabel: true }
        // console.log(showSymbol)
        let option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                padding: 10
            },
            legend: {
                show: true,
                data: legend,
                icon: 'rect',
                left: this.props.legrndLeft || 'center',
                top: this.props.legendTop || 10,
                textStyle: {
                    color: '#dbfcff',
                    fontSize: 14.5
                },
                itemGap: 30,
                itemWidth: 12,
                itemHeight: 4,
            },
            grid: gird,
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                data: data.xAxisData || ['2013', '2014', '2015', '2016', '2017', '2018'],
                axisLabel: {
                    color: '#dbfcff',
                    textStyle: {
                        fontSize: 14
                    },
                    margin: 10,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#8ac7ff',
                        width: 1,
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel:true
                },
                splitLine: {
                    show:false
                }
            }],
            yAxis: [{
                name: unitName,
                nameTextStyle:{
                    color:'#dbfcff',
                    fontSize: 14,
                    align:'left'
                },
                type: 'value',
                axisLabel: {
                    color: '#dbfcff',
                    textStyle: {
                        fontSize: 14
                    },
                    margin: 10,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#8ac7ff',
                        width: 1,
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#4265bc',
                        type: 'solid',
                        width: 1,
                    }
                }
            }],
            series: [
            {
                name: legend[1],
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#2aeb96',
                        borderColor: '#fff',
                        borderWidth: '2',
                    }
                },
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: true,
                smooth: false,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(253,230,52,.5)' // 0% 处的颜色
                            }, {
                                    offset: 1, color: 'rgba(253,230,52,.2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        opacity: 0.5

                    }
                },
                data: data.seriesData || [this.randomNum(), this.randomNum(), this.randomNum(), this.randomNum(), this.randomNum(), this.randomNum()]
            }
            ]
        };
        myChart.setOption(option)
    }
    
    componentDidMount(){
        if (this.props.data) {
            this.initChart()
        }
    }

    componentDidUpdate(){
        if (this.props.data) {
            this.initChart()
        }
    }

    render(){
        if (this.props.data) {
            return (
                <div ref="chart" style={{width:'100%',height:'100%'}}></div>
            )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }
       
    }
}