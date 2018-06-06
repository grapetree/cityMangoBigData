import React, {Component} from "react";
import echarts from 'echarts';
import mapjson from './hua.json';

export default class ProductionStatus extends Component {
  constructor(props) {
    super(props);
    this.initChart = this.initChart.bind(this);
  }

  initChart() {
    let alirl = [
      [
        [101.283872, 26.580802],
        [101.165871, 26.343662]
      ],
    ];
    let myChart = echarts.init(this.refs.myChart);
    let option = {
      title: {
        text: '柱子表示近一个月的平均价',
        x: 'left',
        bottom: 30,
        textStyle: {
          color: '#5db8f8',
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        show: true,
        // formatter:(params)=>{
        //   let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
        //   return data;
        // },
      },
      // visualMap: [
      //     {
      //         type: 'piecewise',
      //         seriesIndex: 0,
      //         text: ['颜色'],
      //         textStyle: {
      //             color: '#5db8f8'
      //         },
      //         orient: 'horizontal',                  //  水平、竖直
      //         // selectedMode:'single', //    多选单选
      //         calculable: true,
      //         splitNumber: 4,
      //         left: 10,
      //         bottom: 60,
      //         // min:0,
      //         // minOpen:true,
      //         // max: 300,
      //         inRange: {
      //             color: ['#87aa66', '#eba438', '#d94d4c', '#F00'],
      //             symbol: 'react',
      //         }
      //     },
      //     {
      //         type: 'piecewise',
      //         seriesIndex: 0,
      //         text: ['半径'],
      //         textStyle: {
      //             color: '#5db8f8'
      //         },
      //         orient: 'horizontal',                  //  水平、竖直
      //         // selectedMode:'single', //    多选单选
      //         calculable: true,
      //         splitNumber: 4,
      //         left: 10,
      //         bottom: 90,
      //         // min: 0,
      //         // minOpen: true,
      //         // max: 300,
      //         itemGap: 15,
      //         inRange: {
      //             color: ['#87aa66', '#eba438', '#d94d4c', '#F00'],
      //             symbol: 'circle'
      //         }
      //     },
      //     {
      //         type: 'piecewise',
      //         seriesIndex: 0,
      //         text: ['长短'],
      //         textStyle: {
      //             color: '#5db8f8'
      //         },
      //         orient: 'horizontal',                  //  水平、竖直
      //         // selectedMode:'single', //    多选单选
      //         calculable: true,
      //         splitNumber: 4,
      //         left: 10,
      //         bottom: 120,
      //         // min: 0,
      //         // minOpen: true,
      //         // max: 300,
      //         itemHeight: 22,
      //         itemWidth: 12,
      //         itemGap: 17,
      //         inRange: {
      //             color: ['#87aa66', '#eba438', '#d94d4c', '#F00'],
      //             symbolSize: [30, 100]
      //         }
      //     },
      //     // {
      //     //     type: 'piecewise',
      //     //     seriesIndex: 1,
      //     //     text: ['scatter3D'],
      //     //     left: 'right',
      //     //     max: 100,
      //     //     calculable: true,
      //     //     inRange: {
      //     //         color: ['#000', 'blue', 'purple']
      //     //     }
      //     // }
      // ],
      geo3D: {
        map: '华坪县',
        boxWidth: 100,
        boxHeight: 20,
        boxDepth: 'auto',
        regionHeight: 4,
        itemStyle: {
          color: '#0e7ee4',
          opacity: 1,
          borderWidth: 1,
          borderColor: '#24d4fd'
        },
        // environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 0, color: 'rgba(70,111,227,1)' // 天空颜色
        // }, {
        //         offset: 0.7, color: 'rgba(37,70,177,1)' // 地面颜色
        // }, {
        //     offset: 1, color: 'rgba(37,70,177,1)' // 地面颜色
        // }], false),
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
        // regions: [
        //     {
        //         name: '河南',
        //         itemStyle: {
        //             color: '#0d6de4'
        //         }
        //     },
        //     {
        //         name: '西藏',
        //         itemStyle: {
        //             color: '#0d6de4'
        //         }
        //     },
        //     {
        //         name: '海南',
        //         itemStyle: {
        //             color: '#3080e1'
        //         }
        //     },
        //     {
        //         name: '内蒙古',
        //         itemStyle: {
        //             color: '#3080e1'
        //         }
        //     },
        // ],
        emphasis: { //当鼠标放上去  地区区域是否显示名称
          label: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
              backgroundColor: 'rgba(0,23,11,0)'
            }
          },
          opacity: .8
        },
        shading: 'lambert',
        light: { //光照阴影
          main: {
            color: '#ccc', //光照颜色
            intensity: 1.2, //光照强度
            shadowQuality: 'high', //阴影亮度
            shadow: true, //是否显示阴影
            alpha: 155,
            beta: 10

          },
          ambient: {
            intensity: 0.3
          }
        },
        viewControl: {
          autoRotate: false,    //  开启自动旋转
          alpha: 50,
          distance: 170,
          minBeta: -360,
          center: [10, -30, 0],
          maxBeta: 360
        },
        left: 20,
        // right: 20,
        top: 20,
        bottom: 20,
        postEffect: {
          enable: true
        }
      },
      series: [
        // {
        //     type: 'effectScatter',  //  标记
        //     coordinateSystem: 'geo',
        //     // symbol: 'diamond',
        //     showEffectOn: 'render',
        //     rippleEffect: {
        //         period: 15,
        //         scale: 6,
        //         brushType: 'fill'
        //     },
        //     hoverAnimation: true,
        //     itemStyle: {
        //         normal: {
        //             color: function (params) {
        //                 return '#eee';
        //             },
        //             shadowBlur: 10,
        //             shadowColor: '#333'
        //         }
        //     },
        //     data: [
        //         { name: '荣将镇', value: [101.283872, 26.580802,10,1]},
        //         { name: '福田镇', value: [101.417424, 26.597807,10,13]},
        //         { name: '仁和镇', value: [101.165871, 26.343662,10,13]},
        //     ]
        // },
        //柱状图
        // {
        //     name: 'bar3D',
        //     type: "bar3D",
        //     coordinateSystem: 'geo3D',
        //     barSize: 1, //柱子粗细
        //     shading: 'lambert',
        //     opacity: 1,
        //     minHeight: 2,
        //     bevelSmoothness: 10,
        //     bevelSize: .9,
        //     label: {
        //         show: false,
        //         formatter: '{b}'
        //     },
        //     data: data
        // },


        //画线

        {
          type: 'lines3D',
          coordinateSystem: 'geo3D',
          effect: {
            show: true,
            trailWidth: 5,
            trailOpacity: 0.5,
            trailLength: 0.2,
            constantSpeed: 15
          },

          blendMode: 'lighter',

          lineStyle: {
            width: 0.2,
            opacity: 0.05
          },

          data: alirl
        }
      ]
    };
    echarts.registerMap('华坪县', mapjson)
    myChart.setOption(option)
  }

  render() {
    console.log(this.props.data);
    if (this.props.data) {
      return (
        <div ref="myChart" style={{width: '100%', height: '100%'}}></div>
      )
    } else {
      return (
        <div style={{width: '100%', height: '100%'}}></div>
      )
    }

  }

  componentDidMount() {
    if (this.props.data) {
      this.initChart()
    }
  }

  componentDidUpdate() {
    if (this.props.data) {

      this.initChart()
    }
  }
}