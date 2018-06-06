import React, { Component } from "react";
import echarts from 'echarts';

export default class publicLine extends Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data;
        let myChart = echarts.init(this.refs.myChart);

        let axisLabel = {
            interval:1,
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'lighter'
                },

                margin: 18,
                formatter:(params)=>{
                return params
            }
    }
        let option = {
            calculable : true,
            title:{

                text:data.title||'',
                textStyle:{
                    color:'#dbfcff',
                    fontSize:'14'
                },

            },
            tooltip: {
                trigger: 'axis',
                borderWidth:1,
                position:'top',

                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle:{
                        color: 'rgba(255,255,255,1)',
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
                data: data.legendName,
                left: 'center',
                icon:'rect',
                top: '5',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                itemWidth: 13,
                itemHeight: 5
            },
            grid:{

                right:'10',
                top:'45'
            },
            xAxis: [{
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

            }],
            yAxis: [{
                name:data.yName,
                nameTextStyle:{
                    color:'#fff'
                },
                type: 'value',
                interval:data.yInterval,
                //min: 0,
                //max: 100,
                //interval: 20,
                axisLabel: {
                    color: '#fff',
                    fontSize: 16,
                    formatter: function(value,index){
                        var value;
                        if (value >=10000) {
                            value = value/10000+'万';
                        }else if(value <10000){
                            value = value;
                        }
                        return value
                    }
                },
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
                }
            }],
            itemStyle:{
                normal:{
                    color:'#00a6ff',
                    borderWidth:'2'
                }
            },
            color:['#00f8ff','#fffc09','#1ceb99'],
            series : [

                {
                    name:data.legendName[0],
                    type:'line',
                    smooth:true,
                    symbolSize: 0,
                    data:data.seriesData[0]
                }, {
                    name:data.legendName[1],
                    symbolSize: 0,
                    type:'line',
                    smooth:true,
                    symbolSize: 0,
                    data:data.seriesData[1]
                },{
                    name:data.legendName[2],
                    symbolSize: 0,
                    type:'line',
                    smooth:true,
                    symbolSize: 0,
                    data:data.seriesData[2]
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
                <div style={{width:'630px',height:'195px'}} ref='myChart' className="my-chart"></div>
        )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
        )
        }

    }
}