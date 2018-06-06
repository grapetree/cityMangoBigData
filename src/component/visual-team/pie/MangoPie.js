import React,{Component} from 'react';
import echart from 'echarts';

class Pie extends Component {
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
      title:{
        show: config.titleShow,
        text: config.titleText,
        top: 15,
        textStyle:{
          color: '#46ebff',
          fontSize: 16,
          align: 'left'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: config.legendShow,
        orient: 'vertical',
        x: 'left',
        data: config.legendData || []
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius: config.seriesRadius,
          center: config.seriesCenter,
          hoverOffset: 5,
          selectedOffset: 5,
          label:{
            color: '#fff',
            fontSize: 16,
            padding: 10,
            formatter: function(d){
              return d.name + '\n' + d.value + '万吨' +' '+ d.percent + '%'
            }
          },
          // emphasis:{
          //   itemStyle:{
          //     borderColor: 'transparent',
          //     borderWidth: 10
          //   }
          // },
          labelLine: {
            length: 5,
            length2: 15,
            lineStyle:{
              color: '#30b4fc'
            }
          },
          data: []
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
export default Pie;
