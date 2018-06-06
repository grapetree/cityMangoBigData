/**
 * Created by ws on 2018/5/21.
 */
import React, { Component } from "react";
import echarts from 'echarts';

export default class talkLine extends Component {
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
                    fontSize: 14,
                    fontWeight: 'lighter'
                },
                margin: 10,
                formatter:(params)=>{
                return params
            }
    }
        let option = {
            calculable : true,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
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
                data: data.legendData,
                left: 'center',
                top: '5',
                icon:'line',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                itemWidth: 20,
                itemHeight: 10,
            },
            grid:{
                top: '20%',
                left: '8%',
                right: '5%',
                bottom: '20%'
            },
            xAxis: {
                name:'',
                nameTextStyle:{
                    color:'#fff'
                },

                type: 'category',
                boundaryGap: true,//折线距离y轴有无距离
                axisLabel: axisLabel,
                axisTick: {
                    show:true
                },

                axisLine: {
                    lineStyle: {
                        color: "#35ece6",
                        type: "solid",
                        width: 1
                    }
                },

                data: data.xAxisData

            },
            yAxis: {
                name:'单位：条',
                nameTextStyle:{
                    color:'#fff'
                },

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
                        color: "#35ece6",
                        type: "solid",
                        opacity:1
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#17a096', //分割线颜色
                        type: "solid",
                        width:1
                    }
                },
             /*   min: function(value) {
                    return (value.min*0.98).toFixed(0);
                },
                max: function(value) {
                    return (value.max*1.02).toFixed(0);
                },*/
            },
            itemStyle:{
                normal:{
                    color:'#00a6ff',
                    borderWidth:'2'
                }
            },
            color: ['#02f4fd', '#2ad899','#fff116'],
            series : [
                {
                    name:'正面',
                    type:'line',
                    smooth:true,
                    data: data.seriesData[0],
                    symbolSize: 0,
                },
                {
                    name:'中立',
                    symbolSize: 0,
                    type:'line',
                    smooth:true,
                    data: data.seriesData[1],
                    symbolSize: 0
                }, {
                    name: '负面',
                    symbolSize: 0,
                    type: 'line',
                    smooth: true,
                    data: data.seriesData[2],
                    symbolSize: 0
                }
            ]
        };
        myChart.setOption(option);
    }

    componentDidMount() {   //初始化渲染图表
        //console.log(this.props.data)
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
                <div style={{ width: '100%', height: '100%' }} ref='myChart' className="my-chart"></div>
            )
        } else {
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}