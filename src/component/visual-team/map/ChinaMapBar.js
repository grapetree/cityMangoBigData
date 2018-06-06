import React,{Component} from 'react';
import echart from 'echarts';

export default class ChinaMapBar extends Component {
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
      xAxis: {
        data: this.state.data.xData,
        show:true,
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#46ebff'
          },
          interval: 0
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle:{
            color:'#dbfcff'
          }
        },
        z: 10
      },
      yAxis:[
        {
          show:false,
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
        top:10,
        left:0,
        bottom:'20%',
        right:'5%',
      },
      series: [
        {
          type: 'bar',
          barWidth:14,
          barGap:'-100%',
          silent:true,
          barCategoryGap:'40%',
          itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(13,25,102,0.5)'
                }, {
                  offset: 1, color: 'rgba(13,25,102,0.5)'
                }]
              }

          },
          data:[100,100,100,100,100,100,100,100]
        },
        {
          type: 'bar',
          barWidth:14,
          itemStyle: {

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
              }

          },
          data:[]
        }
      ]
    };

    let arr = this.state.data.yData1;
    arr.map((v,i)=>{
      if(i===0){
        option.series[1].data.push({
          value: v,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#167ffd'
              }, {
                offset: 1, color: '#167ffd'
              }]
            }
          },
        });
      }else if(i===1){
        option.series[1].data.push({
          value: v,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#02baff'
              }, {
                offset: 1, color: '#02baff'
              }]
            }
          },
        });
      }else if(i===2){
        option.series[1].data.push({
          value: v,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#19eafa'
              }, {
                offset: 1, color: '#19eafa'
              }]
            }
          },
        });
      }else if(i===3){
        option.series[1].data.push({
          value: v,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#24ed8d'
              }, {
                offset: 1, color: '#24ed8d'
              }]
            }
          },
        });
      }else {
        option.series[1].data.push({
          value: v,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#fbcc3e'
              }, {
                offset: 1, color: '#fbcc3e'
              }]
            }
          },
        });
      }

    });

    //option.series = seriseArr;
    echarts.setOption(option);
  }
}
