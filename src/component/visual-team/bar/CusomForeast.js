import React,{Component} from 'react';
import echart from 'echarts';

export default class PureBar extends Component {
  constructor(props){
    super(props);
    let me = this;
    this._flag = false;
    me.echartStyle = {
      ...me.props.style
    };
  }

  _flag = undefined;

  setData(d){
    this._flag = true;
    this.setState({
      data: d
    })
  }

  render(){
    let me = this;
    if(me._flag){
      return(
        <div style={me.echartStyle} ref={'echarts'}>

        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
  }

  componentDidMount(){
    //console.log(echart);

  }
  componentDidUpdate(){
    let me = this;

    if(!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);

    let seriseArr = [];

    let obj1 = {
      type: 'bar',
      barWidth:14,
      name:this.state.data.legendName[0],
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(0,255,246,1)'
            }, {
              offset: 1, color: 'rgba(0,255,246,0.3)'
            }]
          },
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(0,255,246,1)'
            }, {
              offset: 1, color: 'rgba(0,255,246,0.3)'
            }]
          },
          borderWidth:4
        }
      },
      data: this.state.data.yData1
    };

    seriseArr.push(obj1);

    let option = {
      title:{
        show:true,
        text:this.state.data.text||'万吨',
        textStyle:{
          color:'#dbfcff',
          fontSize:'14'
        },
        top:6
      },
      legend:{
        show:this.state.data.showLegend||false,
        itemGap:this.state.data.itemGap||15,
        textStyle:{
          color:'#dbfcff'
        },
        left:125,
        top:3,
        icon:'rect',
        data: this.state.data.legendName||['111','222'],
        itemWidth:22,
        itemHeight:10
      },
      xAxis: {
        data: this.state.data.xData,
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#dbfcff'
          },
          interval: 0
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle:{
            color:'#dbfcff'
          }
        },
        z: 10
      },
      yAxis:[
        {
          type: 'value',
          axisTick:{
            show:true
          },
          axisLine:{
            lineStyle:{
              color:'#dbfcff'
            }
          }
        }
      ],
      grid:{
        top:40,
        left:'7%',
        bottom:'15%',
        right:'5%',
      },
      series: [
        {
          type: 'bar',
          barWidth:14,
          name:this.state.data.legendName[0],
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              },
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              },
              borderWidth:4
            }
          },
          data:[]
        }
      ]
    };

    let arr = this.state.data.yData1;
    arr.map((v,i)=>{
      if(i === arr.length-1){
        option.series[0].data.push({
          value: v,
          itemStyle: {
            normal: {
              borderType:'dashed',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,0)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0)'
                }]
              },
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              },
              borderWidth:4
            }
          },
        })
      }else{
        option.series[0].data.push({
          value: v,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              },
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,255,246,1)'
                }, {
                  offset: 1, color: 'rgba(0,255,246,0.3)'
                }]
              },
              borderWidth:0
            }
          },
        })
      }
    });

    //option.series = seriseArr;
    echarts.setOption(option);
  }
}
