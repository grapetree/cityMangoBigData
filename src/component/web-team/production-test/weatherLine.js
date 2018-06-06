import React, { Component } from "react";
import echarts from 'echarts';

export default class weatherLine extends Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data;
        let myChart = echarts.init(this.refs.myChart);
        let datas = {
            datax:[],
            datas:[]
        }
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
            calculable : true,
            tooltip: {
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
                    html += '<p>预警次数： ' + param[0].data + '次</p>';
                    return html;
                }

            },
            grid:{

                right:'10',
                top:'45'
            },
            xAxis: {
                name:'',
                boundaryGap:true,
                nameTextStyle:{
                    color:'#fff'
                },

                type: 'category',
                axisLabel: axisLabel,
                axisTick: {
                    show:false
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
                name:'次',
                nameTextStyle:{
                    color:'#fff'
                },
                type: 'value',
                //min: 0,
                // min: this.echartsData.minData,
                // max: this.echartsData.maxData
                min: function(value) {
                    return (value.min*0.5).toFixed(0);
                },
                max: function(value) {
                    return (value.max*1.5).toFixed(0);
                },
            /*    interval:10,*/
                axisLabel: axisLabel,
                axisTick: {
                    show:false,
                },
                markLine:{
                    precision:20,
                    lineStyle: {
                        color: "#9b6966",
                        type: "solid",
                        opacity:1
                    }
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
                        color: '#17a096',//分割线颜色
                        type: "solid",
                        width:1
                    }
                }
            },
            itemStyle:{
                normal:{
                    color:'#00a6ff',
                    borderWidth:'2'
                }
            },

            series : [
                {
                    name:'消費预测',
                    type:'line',
                    smooth:false,
                    itemStyle: {normal: {areaStyle: {type: 'default'},borderColor:'#2f4dad',}},
                    data:data.seriesData,
                    symbolSize: 6,
                    lineStyle:{
                        normal:{
                            color:'#2af594',
                        }
                    },
                    markLine: {
                        data: [
                            {
                                name: '阈值',
                                yAxis: 20,
                                label: {type:'solid',
                                    normal: {
                                        show: true,
                                        position: 'end',

                                        textStyle:{
                                            fontSize: 18,
                                            fontWeight: 'bolder',

                                        }
                                    }
                                }
                            }
                        ]
                    },
                    areaStyle:{
                        normal:{
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(15,255,252,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(42,238,245,0.01)'
                            }]),
                            opacity:0.6

                        }
                    }
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