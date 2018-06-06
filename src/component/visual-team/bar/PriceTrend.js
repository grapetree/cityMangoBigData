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


    let unitArr = this.state.data.unitArr;

    let arr = [];
    for(let i = 0;i < this.state.data.yData1.length;i++){
      arr.push(this.state.data.yData1[i]);
    }

    for(let i=0;i<arr.length-1;i++){
      for(let j=0;j<arr.length-1-i;j++){
        if(arr[j]<arr[j+1]){
          let temp=arr[j];
          arr[j]=arr[j+1];
          arr[j+1]=temp;
        }
      }
    }
    let a = arr[0];
    let max = 0;
    if(a<=5){
      max = 5;
    }else if(a>5&&a<=10){
      max = 10;
    }else if(a>10&&a<=25){
      max = 25;
    }else if(a>25&&a<=50){
      max = 50;
    }else if(a>50&&a<=100){
      max = 100;
    }else {
      max = 200;
    }


    let option = {
      title:{
        show:this.state.data.showTitle||false,
        text:this.state.data.title||'111',
        textStyle:{
          color:'#dbfcff',
          fontSize:'14'
        },
        top:this.state.data.titleTop||6,
        left:14
      },
      legend:{
        show:this.state.data.showLegend||false,
        itemGap:this.state.data.itemGap||15,
        textStyle:{
          color:'#dbfcff'
        },
        left:this.state.data.legendLeft||0,
        top:this.state.data.legendTop||0,
        //icon:'line',
        data: this.state.data.legendName||['111','222'],
        itemWidth: this.state.data.itemWidth ||20,
        itemHeight: this.state.data.itemHeight ||10
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
      yAxis: [
        {
          type: 'value',
          //splitNumber:5,
          //max:max,
          axisLabel:{
            formatter: '{value}'
          },
          axisTick:{
            show:true
          },
          axisLine:{
            lineStyle:{
              color:'#dbfcff'
            }
          }
        },
        {
          type: 'value',
          name: '同期增长率',
          //min: -100,
          //max: 150,
          //splitNumber:5,
          axisLabel: {
            formatter: '{value}%'
          },
          axisTick:{
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine:{
            lineStyle:{
              color:'#dbfcff'
            }
          }
        }
      ],
      // tooltip : {
      //   show:this.state.data.showTooltip||false,
      //   trigger: 'axis',
      //   backgroundColor:'rgba(25,31,106,0.8)',
      //   formatter:function (params) {
      //     let res='<div style="margin-bottom:0;min-width:10px;font-size: 14px;line-height: 22px">' + '<h2 style="color:#dbfcff;font-size: 18px;line-height: 30px">'+params[0].name+'</h2>';
      //     if(params.length > 0){
      //       for(let i=0;i<params.length;i++){
      //         res += '种植面积<span>'+params[i].seriesName+': </span>'+ '<span>'+params[i].value+unitArr[i]+'</span><br/><span>占总面积：'+parseInt(25*params[i].value/max)+'%</span>';
      //       }
      //     }else{
      //       res += '- null'
      //     }
      //     return res;
      //   }
      // },
      grid:{
        top:this.state.data.gridTop||'20%',
        left:this.state.data.gridLeft||'10%',
        bottom:this.state.data.gridBottom||'13%',
        right:this.state.data.gridRight||'3%',
      },
      series: [
        {
          type: 'bar',
          barWidth:20,
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
                  offset: 0, color: this.state.data.colorStartOne
                }, {
                  offset: 1, color: this.state.data.colorEndOne
                }]
              },
              borderColor:{
                colorStops: [
                  {offset: 0, color: '#ff0'},
                  {offset: 1, color: '#ff0'}
                ]
              },
              borderWidth:0,
              barBorderRadius:0
            }
          },
          data: this.state.data.yData1
        },
        {
          name:this.state.data.legendName[1],
          data: this.state.data.yData2,
          type: 'line',
          color:'#fde634',
          yAxisIndex: 1,
          smooth:this.state.data.smooth,
          symbol:'circle',
          symbolSize:this.state.data.symbolSize||0,

        }
      ]
    };
    echarts.setOption(option);
  }
}
