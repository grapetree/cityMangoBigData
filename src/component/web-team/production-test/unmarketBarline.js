import React, { Component } from "react";
import echarts from 'echarts';

export default class UnmarketBarline extends Component {
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
                formatter:(params)=>{
                return params
            }
        }
        let option = {

            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow',
                    shadowStyle:{
                        color:'rgba(255,255,255,0.2)'
                    }
                },
                padding:0,
                backgroundColor:'transparent',
                formatter: function(param){
                    //console.log(param);
                    var html='',unit = '万';
                    html +='<div style="position:relative;padding: 15px 15px 5px 15px;font-size:14px;line-height:14px;font-weight:bold;color:#fff;background:rgba(15, 52, 135, 0.5);border:2px solid #167cc4;border-radius:5px;box-shadow:0 0 10px 0 rgba(40,157,252,.6);">';
                    html +='<p style="font-size:16px;">'+ param[0].name+'</p>';
                    html += '<p>产量： ' + param[0].data + '</p>';
                    html += '<p>销量： ' + param[1].data + '</p>';
                    return html;
                }
            },
            legend: {
                left: 'center',
                itemWidth: 15,
                itemHeight: 8,
                itemGap: 40,
                data: [{
                    name: "产量",
                    borderRadius: 30,
                    textStyle: {
                        color:"#fff",
                        fontSize: 16
                    }
                },
                    {
                        name: "销量",
                        icon:'rect',
                        textStyle: {
                            color:"#fff",
                            fontSize: 16
                        },
                    }],
            },
            label: {
                normal: {
                    textStyle: {
                        color: "#ff3b00"
                    }
                },
                emphasis:{
                    textStyle:{
                        color:"#ff3b00"
                    }
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            yAxis: [{
                name: "",
                type: 'value',
                min:'0',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color:'#8ac7ff',
                        width: 1
                    }
                },
                axisLabel:axisLabel,
                /*splitArea: {
                 show: true,
                 areaStyle: {
                 color: ['rgba(2,24,65,0.8)', 'rgba(2,13,41,0.8)']
                 }
                 },*/
                splitLine:{
                    show: true,
                    lineStyle:{
                        color:'#3f7adf',
                        type:'solid',
                        width:1
                    }
                }
            },{
                name: "",
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color:'#8ac7ff',
                        width: 2
                    }
                }
            }],

            xAxis: {
                type: 'category',
                name: '',
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: ['#254495'],
                        type:'dashed'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    lineStyle: {
                        color:'#6297df',
                        fontSize: 16,
                        width: 2
                    }
                },
                axisLabel:axisLabel,
                data: data.xAxisData
            },
            series: [

                {
                    name: '产量',
                    type: 'bar',
                    barWidth : 20,
                    itemStyle: {
                        normal: {
                            borderColor:'#07a2f5',
                            barBorderRadius: [20, 20, 20, 20],
                            color: new echarts.graphic.LinearGradient(0,0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 255, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(51, 102, 204, 0.4)'
                            }])
                        }

                    },
                    data:data.seriesData[0]
                },{
                    name: '销量',
                    type: 'line',
                    stack: '总量',
                    /*areaStyle: {
                     normal: {
                     color: '#f9d148',
                     opacity: 0.1
                     }
                     },*/
                    lineStyle: {
                        normal: {
                            color: '#fbce46'
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: '#e9c145',
                            borderWidth: '2',
                        },
                        emphasis: {
                            borderWidth: '4',
                            shadowBlur: 10,
                            shadowColor: '#e9c145',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                        }
                    },
                    smooth: false,
                    data:data.seriesData[1]
                } ,{

                    type: 'bar',
                    barWidth:20,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [20, 20, 20, 20],
                            color: '#013275'
                        }
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data:data.seriesData[2],
                    animation: false
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
                <div style={{width:'1030px',height:'327px'}} ref='myChart' className="my-chart"></div>
        )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
        )
        }

    }
}