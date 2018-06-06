/**
 * Created by ws on 2018/5/21.
 */
import React, { Component } from "react";
import echarts from 'echarts';import "echarts-liquidfill";

export default class talkPie extends Component {
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
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
          /*  toolbox: {
                show: true,
                itemSize:22,
                top:-10,
                right:10,
                iconStyle:{
                    borderColor:'#479dec',
                    borderWidth:'2',
                },
                feature: {
                    saveAsImage: {

                    }
                }
            },*/
            tooltip: {
                trigger: 'item',
                position: function (point, params, dom, rect, size) {
                    //console.log(size.contentSize);
                    //console.log(size.viewSize);
                    return [(size.viewSize[0] - size.contentSize[0]) / 2, (size.viewSize[1] - size.contentSize[1]) / 2 ];
                },
                formatter: function (params) {
                    // console.log(params)
                    let html=`<div style="background:transparent;font-size:16px;background: linear-gradient(#9affff, #21d1f5);-webkit-background-clip: text;">
                                ${params.percent}%
                            </div>`;
                    return html;
                },
                backgroundColor:'rgba(55,67,95,0)',
                padding: 10
            },
                legend: {
                    show: false,
                    right: '0',
                    textStyle: { color: "#82bcff" },
                    data: ['', '', '', '', '', '', '']
                },
                series: [{
                    name: '',
                    label: {
                        normal: {
                            formatter: '{b}({d}%)',
                            textStyle: {
                                fontSize:16,
                                color:'#fff'
                            }
                        }
                    },
                    type: 'pie',
                    labelLine: {
                        normal: {
                            length: 11,
                            length2: 28
                        },
                        lineStyle:{
                            color:"#19a4e9"
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#67fbb5',
                            shadowColor: 'rgba(102,102,153, 0.6)'
                        }
                    },
                    radius: ['30%', '50%'],
                    center: ['50%', '50%'],
                    color: data.pieColor,
                    data: data.seriesData
                }],
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
                <div style={{ width: '100%', height: '100%' }} ref='myChart' className="my-chart"></div>
        )
        }else{
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
        )
        }

    }
}