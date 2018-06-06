import React, { Component } from "react";
import echarts from 'echarts';
import mapjson from './hua.1.json'

export default class CityMap extends Component {
    constructor(props) {
        super(props);
        this.initChart = this.initChart.bind(this);
    }
    initChart(data) {
        // let lineDate = [
        //     [
        //         ["101.0645526800", "26.6171538506","10"],
        //         ["101.3320514432", "26.8346621619", "10"]
        //     ], 
        // ];
        let alirl;
        if(data.length>0){
            alirl = data
        }else{
            alirl = [
            ];
        }
        let myChart = echarts.init(this.refs.myChart);
        let option = {
            title: {
                text: '',
                x: 'left',
                bottom: 80,
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                show: true,
                formatter:(params)=>{
                    // console.log(params)
                    let data = params.name + "<br/>有机种植面积:" + params.value[3] + "<br/>抽检次数:" + params.value[4] + "次<br/>抽检合格率:" + params.value[5] + "<br/>质量问题反馈次数:" + params.value[6]+"次";
                    return data;
                }
            },
            series: [
                {
                    type:'map3D',
                    map: '华坪县',
                    regionHeight: 4,
                    itemStyle: {
                        color: '#0e7ee4',
                        opacity: 1,
                        borderWidth: 1,
                        borderColor: '#24d4fd'
                    },
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff', //地图初始化区域字体颜色
                            fontSize: 16,
                            fontFamily: 'Microsoft YaHei',
                            fontWeight: 'bold',
                            opacity: 1,
                            backgroundColor: 'rgba(0,23,11,0)'
                        },
                    },
                    viewControl: {
                        autoRotate: true,    //  开启自动旋转
                        alpha: 50,
                        distance:170,
                        minBeta: -360,
                        autoRotateSpeed: 30,
                        center:[10,-30,0],
                        maxBeta: 360
                    },
                    top:0,
                    bottom:50,
                    postEffect: {
                        enable: true
                    },
                    shading: 'lambert',
                    light: { //光照阴影
                        main: {
                            color: '#ccc', //光照颜色
                            intensity: 1.2, //光照强度
                            shadowQuality: 'high', //阴影亮度
                            shadow: true, //是否显示阴影
                            alpha: 45,
                            beta: 10

                        },
                        ambient: {
                            intensity: 0.3
                        }
                    },
                    data: alirl
                },
                //画线

                // {
                //     type: 'lines3D',

                //     coordinateSystem: 'geo3D',

                //     effect: {
                //         show: true,
                //         trailWidth: 5,
                //         trailOpacity: 0.6,
                //         trailLength: 0.8,
                //         constantSpeed: 10
                //     },

                //     blendMode: 'lighter',

                //     lineStyle: {
                //         width: 2,
                //         opacity: 0.2
                //     },

                //     data: lineDate
                // },
                // {
                //     name: '',
                //     type: "scatter3D",
                //     coordinateSystem: 'geo3D',
                //     symbol: 'pin',
                //     symbolSize: 30,
                //     opacity: 1,
                //     label: {
                //         show: false,
                //         formatter: ''
                //     },
                //     itemStyle: {
                //         borderWidth: 0.5,
                //         borderColor: '#fff'
                //     },
                //     data: alirl
                // }
            ]
        };
        echarts.registerMap('华坪县', mapjson)
        myChart.setOption(option)
    }
    componentDidMount() {
        if (this.props.data) {
            this.initChart(this.props.data)
        }
    }
    componentDidUpdate() {
        if (this.props.data) {
            this.initChart(this.props.data)
        }
    }
    render() {
        if (this.props.data) {
            return (
                <div ref="myChart" style={{ width: '100%', height: '100%'}}></div>
            )
        } else {
            return (
                <div style={{ width: '100%', height: '100%' }}></div>
            )
        }

    }
}