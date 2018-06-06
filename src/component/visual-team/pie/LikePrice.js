import React,{Component} from 'react';
import echart from 'echarts';

class LikePrice extends Component {
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
  }
  componentDidUpdate(){
    let me = this;
    if(!me._flag) return;
    let box = me.refs.echarts;
    let echarts = echart.init(box);
    let config = {
      titleShow: me.state.data.titleShow,
      titleText: me.state.data.titleText,
      legendShow: me.state.data.legendShow,
      legendData: me.state.data.legendData,
      seriesRadius: me.state.data.seriesRadius,
      seriesCenter: me.state.data.seriesCenter,
      seriesData: me.state.data.seriesData,
      colorTop: me.state.data.colorTop,
      colorBottom: me.state.data.colorBottom
    };
    let option = {
      title : {
        config: config.titleShow,
        text: config.titleText,
        x:'left',
        top: 15,
        textStyle:{
          fontSize: 16,
          color: '#46ebff'
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: config.legendShow,
        x : 'center',
        y : 'bottom',
        data: config.legendData
      },
      calculable : true,
      series : [
        {
          name:'面积模式',
          type:'pie',
          radius : config.seriesRadius,
          center : config.seriesCenter,
          roseType : 'area',
          label:{
            formatter: function(d){
              return d.name + '\n' + d.value + '万吨' +' '+ d.percent + '%'
            },
            color: '#fff',
            fontSize: 16,
            padding: 5
          },
          labelLine: {
            length: 5,
            length2: 5,
            lineStyle:{
              color: '#30b4fc'
            }
          },
          data:[
          ]
        }
      ]
    };

    let arr = config.seriesData;

    arr.map((v,i)=>{
      option.series[0].data.push({
        value: v.vals,
        name: v.names,
        itemStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: config.colorTop[i] // 0% 处的颜色
            }, {
              offset: 1, color: config.colorBottom[i] // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      })
    });

    echarts.setOption(option);
  }
}
export default LikePrice;
