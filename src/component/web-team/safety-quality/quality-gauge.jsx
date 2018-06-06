import React,{ Component } from "react";
import echarts from 'echarts';

export default class GaugeMap extends Component{
    constructor(props){
        super(props);
        this.initChart = this.initChart.bind(this);
    }
    initChart(){
        let myChart = echarts.init(this.refs.myChart);
        let data = this.props.data;
        let option = {
            tooltip: {
                show:false
            },
            backgroundColor: 'transparent',
            title: {
                text: '',
                top: 'top',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 28
                }
            },
            series: [
            {
                name: '质量安全指数',
                type: 'gauge',
                startAngle: 200,
                endAngle: -20,
                radius: '70%',
                splitNumber: 3,
                axisLine: { 
                    show:false,          // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 30,
                        color: [[1 / 3, '#3389cd'], [2 / 3, '#2c9998'],[1, '#99856c']],
                        opacity:0
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 31,
                    lineStyle: {
                        width: 0,
                        color: 'rgba(43,73,173,0)'
                    }
                }, 
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    formatter: function (v) {
                        return '';
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bolder'
                    }
                },
                pointer: {
                    width: 10,
                    length: '76%'
                },
                title: {
                    show: false,
                },
                detail: {
                    show: true,
                    color:'#fff'
                },
                data: [{ value: data, name: '质量安全指数' }]
            }, {
                name: '',
                type: 'pie',
                selectedMode: 'single',
                radius: [5, 15],
                center: ['center', 'center'],
                itemStyle: {
                    normal: {
                        color: '#05243e'

                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'inner',
                        formatter: '{d}%\n{b}',
                        align: 'left'
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: [
                    { value: 335, name: '个人' }
                ]
            },
            {
                name: '',
                type: 'pie',
                radius: [15, 25],
                center: ['center', 'center'],
                itemStyle: {
                    normal: {
                        color: '#2a6ebf'

                    }
                },
                label: {
                    normal: {
                        show: false,
                        formatter: '{d}%\n{b}',
                        align: 'left'
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: [
                    { value: 100, name: '个人2' }
                ]
            },
            {
                name: '',
                type: 'pie',
                radius: [25, 27],
                center: ['center', 'center'],
                itemStyle: {
                    normal: {
                        color: '#4ddcf6'

                    }
                },
                label: {
                    normal: {
                        show: false,
                        formatter: '{d}%\n{b}',
                        align: 'left'
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: [
                    { value: 100, name: '个人3' }
                ]
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
        if(this.props.data){
            return(
                <div ref="myChart" style={{width:'100%',height:'100%'}}>
                </div>
            )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }
        
    }
}