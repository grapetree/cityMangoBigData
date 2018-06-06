import React, { Component } from "react";
import echarts from 'echarts';

export default class SurveyKline extends Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart(){   // 渲染图表方法
        let data = this.props.data;
        let myChart = echarts.init(this.refs.myChart);
        let upColor = '#fc1f1b';
        let upBorderColor = '#fc1f1b';
        let downColor = '#1cc048';
        let downBorderColor = '#1cc048';
        let echartOpt = {
            fz: '14',
            color: '#dbfcff'
        };
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

// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
        let data0 = splitData(data.data);
        function splitData(rawData) {
            let categoryData = [];
            let values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        }
        /*function calculateMA(dayCount) {
            let result = [];
            for (let i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                let sum = 0;
                for (let j = 0; j < dayCount; j++) {
                    sum += data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }*/

        let option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var res = params[0].name;
                    res +='<div style="position:relative;padding: 5px 5px 5px 5px;font-weight:bold;color:#f5f5f8">';
                    params.map((v,i)=>{
                        if(v.componentSubType == "candlestick"){
                           res +=  '  最高价 : ' + v.value[4];
                           res += '<br/>  最低价 : ' + v.value[3]; 
                        }else if(v.componentSubType == "line"){
                           res += '<br/>  平均价 : ' + v.value;  
                        }
                    })
                    res +='<i style="position:absolute;bottom:-25px;left:20%;margin-left:-5px;width:0;height:0;border:10px solid transparent;border-top:10px solid #5cc1ff;"></i>';
                        res +='<i style="position:absolute;bottom:-22px;left:20%;width:0;height:0;margin-left:-4px;border:9px solid transparent;border-top:9px solid rgba(15, 52, 135,0.9);"></i>';
                        res +='</div>';
                    return res;
                },
                backgroundColor:'rgba(15, 52, 135, 0.9)',
                borderWidth:'1',
                borderColor:'#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);'
            },
            grid: {
                left: '12%',
                right: '5%',
                bottom: '20%',
                top:'17%'
            },
            /*legend:{
                borderWidth:0
            },*/
            xAxis: {
                type: 'category',
                data: data.time,
                //scale: true,
                // boundaryGap: false,
                splitLine: {show: false},
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#8ac7ff'
                    }
                },
                axisLabel: axisLabel,
                //splitNumber: 20,
            },
            yAxis: {
                name: '元/公斤',
                nameTextStyle: {
                    fontSize: 12,
                    color: '#fff',
                    padding: [20, 0, 0, '-18']
                },
                scale: true,
                splitArea: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#112942',
                        type: 'dashed'
                    }
                },
                splitLine: {
                    show: true,
                    formatter: '{value}',
                    lineStyle: {
                        color: 'rgba(138, 199, 255, .2)',
                        type: 'dashed'
                    }
                },
                axisLabel: axisLabel,
                // min:this.echartsData.minData,
                // max:this.echartsData.maxData
                min: function(value) {
                    return (value.min*0.98).toFixed(0);
                },
                max: function(value) {
                    return (value.max*1.02).toFixed(0);
                }
            },
            series: [
                {
                    name: 'K线图',
                    type: 'candlestick',
                    barWidth:'30%',
                    data: data0.values,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor,
                            borderWidth:2
                        }
                    }
                },
                {
                    name: '平均价',
                    type: 'line',
                    data: data.avg,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            color: '#839dd7',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(228, 74, 99)',
                            opacity: 0
                        },
                        emphasis: {
                            color: 'rgb(228, 74, 99)',
                            opacity: 1,
                            borderColor: 'rgb(254, 253, 56)',
                            borderWidth: 2
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    componentWillReceiveProps(){
        if (this.props.data){
                this.initEchart()
            }
    }
    componentDidMount() {   //初始化渲染图表
        if (this.props.data){
            this.initEchart()
        }
    }

    componentDidUpdate() {  //更新数据重新渲染图表
        //console.log(this.props.data)
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