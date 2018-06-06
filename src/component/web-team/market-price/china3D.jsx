import React, { Component } from "react";
import echarts from 'echarts';
import 'echarts-gl';
import 'echarts/map/js/china.js';

export default class MapChina extends Component {
    constructor(props) {
        super(props);
        this.initEchart = this.initEchart.bind(this)
    }

    initEchart() {   // 渲染图表方法
        // console.log(this.props.data, this.props.minPrice, this.props.maxPrice)
        let myChart = echarts.init(this.refs.myChart);
        let data = this.props.data.chinaMapData;
        let regionsArr = [];
        data.map((v,i)=>{
            regionsArr[i] = {
                name: v.name.slice(0,v.name.length-1),
                itemStyle: {
                    color: '#0d6de4'
                }
            }
        })
        let option = {
            title: {
                text: '柱子表示近一个月的平均价',
                x: 'left',
                bottom: 30,
                textStyle: {
                    color: '#5db8f8',
                    fontSize: 14,
                    fontWeight:'normal'
                }
            },
            tooltip: {
                show: true,
                formatter:(params)=>{
                  let data = params.name + "<br/>"+"价格:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
                  return data;
                },
            },
            visualMap: [
                {
                    type: 'piecewise',
                    seriesIndex: 0,
                    text: ['颜色'],
                    textStyle: {
                        color: '#fff'
                    },
                    orient:'horizontal',                  //  水平、竖直
                    // selectedMode:'single', //    多选单选
                    calculable: true,
                    splitNumber:4,
                    left:10,
                    bottom:60,
                    min: this.props.minPrice || 0,
                    max: this.props.maxPrice || 20,
                    hoverLink:false,
                    inRange: {
                        color: ['#3284d0', '#42c9d7', '#2fce79',  '#e8e548'],
                        symbol: 'roundRect',
                    },
                    // outOfRange:{
                    //     color: ['#3284d0', '#42c9d7', '#2fce79', '#e8e548'],
                    //     symbol: 'roundRect'
                    // }
                }, 
                // {
                //     type: 'piecewise',
                //     seriesIndex: 0,
                //     text: ['半径'],
                //     textStyle:{
                //         color:'#5db8f8'
                //     },
                //     orient: 'horizontal',                  //  水平、竖直
                //     // selectedMode:'single', //    多选单选
                //     calculable: true,
                //     splitNumber: 4,
                //     left: 10,
                //     bottom: 90,
                //     // min: 0,
                //     // minOpen: true,
                //     // max: 300,
                //     itemGap:15,
                //     inRange: {
                //         color: ['#87aa66', '#eba438', '#d94d4c', '#F00'],
                //         symbol: 'circle'
                //     }
                // }, 
                // {
                //     type: 'piecewise',
                //     seriesIndex: 0,
                //     text: ['长短'],
                //     textStyle: {
                //         color: '#5db8f8'
                //     },
                //     orient: 'horizontal',                  //  水平、竖直
                //     // selectedMode:'single', //    多选单选
                //     calculable: true,
                //     splitNumber: 4,
                //     left: 10,
                //     bottom: 120,
                //     // min: 0,
                //     // minOpen: true,
                //     // max: 300,
                //     itemHeight: 22,
                //     itemWidth: 12,
                //     itemGap: 17,
                //     inRange: {
                //         color: ['#87aa66', '#eba438', '#d94d4c', '#F00'],
                //         symbolSize: [30, 100]
                //     }
                // }, 
                // {
                //     type: 'piecewise',
                //     seriesIndex: 1,
                //     text: ['scatter3D'],
                //     left: 'right',
                //     max: 100,
                //     calculable: true,
                //     inRange: {
                //         color: ['#000', 'blue', 'purple']
                //     }
                // }
            ],
            geo3D: {
                map: 'china',
                regionHeight: 4,
                itemStyle: {
                    color: '#0e7ee4',
                    opacity: 1,
                    borderWidth: 1,
                    borderColor: '#24d4fd'
                },
                label: {
                    show: false,
                    textStyle: {
                        color: '#fff', //地图初始化区域字体颜色
                        fontSize: 16,
                        fontFamily: 'Microsoft YaHei',
                        fontWeight: 'bold',
                        opacity: 1,
                        backgroundColor: 'rgba(0,23,11,0)'
                    },
                },
                regions: regionsArr || [],
                emphasis: { //当鼠标放上去  地区区域是否显示名称
                    label: {
                        show: false,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                            backgroundColor: 'rgba(0,23,11,0)'
                        }
                    },
                    opacity:.8
                },
                shading: 'lambert',
                light: { //光照阴影
                    main: {
                        color: '#ccc', //光照颜色
                        intensity: 1.2, //光照强度
                        shadowQuality: 'high', //阴影亮度
                        shadow: true, //是否显示阴影
                        alpha: 55,
                        beta: 10

                    },
                    ambient: {
                        intensity: 0.3
                    }
                },
                viewControl:{
                    autoRotate:true,    //  开启自动旋转
                    minBeta: -360,
                    maxBeta: 360,
                    autoRotateSpeed:60,
                    alpha:60
                },
                postEffect:{
                    enable:true
                }
            },
            series: [
                //柱状图
                {
                    name: 'bar3D',
                    type: "bar3D",
                    coordinateSystem: 'geo3D',
                    barSize: 1, //柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    minHeight: 1,
                    maxHeight: 200,
                    bevelSmoothness: 10,
                    bevelSize: .9,
                    label: {
                        show: false,
                        formatter:''
                    },
                    data: data
                }
            ]
        };
        myChart.setOption(option);
    }

    componentDidMount() {   //初始化渲染图表
        if (this.props.data) {
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