import React,{Component} from 'react';
import echart from 'echarts';

export default class PureLine extends Component {
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
    //console.log(me._flag);

    if(!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);

    let unitArr = this.state.data.unitArr;
    let circleArr = this.state.data.circleArr;

    let option = {
      color:this.state.data.lineColor,
      title:{
        show:this.state.data.showTitle||false,
        text:this.state.data.title||'',
        textStyle:{
          color:'#dbfcff',
          fontSize:'14'
        },
        top:this.state.data.titleTop||6
      },

      legend:{
        show:this.state.data.showLegend||false,
        itemGap:this.state.data.itemGap||15,
        textStyle:{
          color:'#dbfcff'
        },
        left:this.state.data.legendLeft||0,
        top:this.state.data.legendTop||0,
        icon:'rect',
        data: this.state.data.legendName||['1','2'],
        itemWidth: 20,
        itemHeight: 2
      },
      dataZoom: [
        {
          show: this.state.data.showZoom||false,
          type: 'slider',
          backgroundColor: '#1e1d62',
          handleStyle: {
            color: '#61e7ff',
            borderWidth: 0.01,
            borderColor: '#61e7ff'
          },
          //handleIcon: 'M0,0 v9.7h5 v-15.7h-5 Z',
          handleIcon: 'M0,0 L1,0 L1,6 L0,6 Z',
          fillerColor: 'rgba(44,255,254,0.5)',
          dataBackground: {
            lineStyle: {
              color: '#f30505',
              width: 2
            },
            areaStyle: {
              //color: 'rgba(27,68,113,0.8)'
            }
          },
          left: '10%',
          right: '10%',
          bottom: '0%',
          height:18,
          textStyle: {
            color: '#1397fe'
          },
          borderColor: 'transparent',
        }],
      tooltip : {
        show:this.state.data.showTooltip||false,
        trigger: 'axis',
        backgroundColor:'rgba(25,31,106,0.8)',
        formatter:function (params) {
          let res='<div style="min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="font-size: 18px;line-height: 30px">'+params[0].name+'</h2>';
          if(params.length > 0){
            for(let i=0;i<params.length;i++){
              res += '<span style="margin-right:7px;background: '+circleArr[i]+';display: inline-block;width:10px;height:10px;border-radius: 10px"></span>'+'</span><span>'+params[i].seriesName+': </span>'+ '<span>'+params[i].value+unitArr[i]+'</span><br/>';
            }
          }else{
            res += '- null'
          }
          return res;
        }
      },

      xAxis: {
        type: 'category',
        data: this.state.data.xData,
        axisLine:{
          lineStyle:{
            color:'#dbfcff'
          }
        },
        axisTick:{
          show:this.state.data.showTick||true
        },
        boundaryGap:false
      },
      yAxis: {
        type: 'value',
        axisTick:{
          show:true
        },
        axisLine:{
          lineStyle:{
            color:'#dbfcff'
          }
        }
      },
      grid:{
        top:this.state.data.gridTop||'20%',
        left:this.state.data.gridLeft||'10%',
        bottom:this.state.data.gridBottom||'13%',
        right:this.state.data.gridRight||'5%',
      },
      series: [{
        name:this.state.data.legendName[0],
        data: this.state.data.yData1,
        type: 'line',
        smooth:true,
        symbol:'circle',
        symbolSize:0,
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(100,100,100,0)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(100,100,100,0)' // 100% 处的颜色
            }]
          }
        },
      },
      {
        name:this.state.data.legendName[1],
        data: this.state.data.yData2,
        type: 'line',
        smooth:true,
        symbol:'circle',
        symbolSize:0,
        areaStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(100,100,100,0)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(100,100,100,0)' // 100% 处的颜色
            }]
          }
        },
      },
        {
          name:this.state.data.legendName[2],
          data: this.state.data.yData3,
          type: 'line',
          smooth:true,
          symbol:'circle',
          symbolSize:0,
          areaStyle:{
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(100,100,100,0)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(100,100,100,0)' // 100% 处的颜色
              }]
            }
          },
        }
      ]
    };
    echarts.setOption(option);
  }
}
