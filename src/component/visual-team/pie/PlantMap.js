import React,{Component} from 'react';
import echart from 'echarts';

class PlantMap extends Component {
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
        config: config.config,
        text: config.titleText,
        x:'left',
        textStyle:{
          fontSize: 16,
          color: '#46ebff'
        }
      },
      tooltip : {

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
          data:[
          ]
        }
      ]
    };

    let arr = config.seriesData;

    let vals = [];
    let valsName = [];
    let index;
    arr.map((v,i)=>{

      vals.push(v.vals);
      valsName.push(v.names);

      index = vals.indexOf(Math.max.apply(Math, vals));
      let maxValue = Math.max.apply(Math, vals);

      if( i === index){
        option.series[0].data.push({
          value: v.vals,
          name: v.names,
          label:{
            formatter: function(d){
              return d.name + '\n' + d.value + '万亩'
            },
            color: '#fff',
            fontSize: 16,
            padding: 5
          },
          labelLine: {
            length: 5,
            length2: 15,
            lineStyle:{
              color: '#30b4fc'
            }
          },
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
        });
      }else{
        option.series[0].data.push({
          value: v.vals,
          name: v.names,
          label:{
            show: false,

          },
          labelLine: {
            show: false,
            emphasis:{
              show: false,
            }
          },
          emphasis:{
            label:{
              show: false,
            },
          },
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
        });
      }
    });
    let town = valsName[index];
    let h1 = document.createElement('h2');
    let h2 = document.createElement('h2');
    h1.innerHTML = `${town}种植面积最多`;
    h1.style.color = '#fff';
    h1.style.fontSize = '16px';
    h1.style.position = 'absolute';
    h1.style.left = '55px';
    h1.style.bottom = '10px';

    h2.innerHTML = `有机认证面积最多`;
    h2.style.color = '#fff';
    h2.style.fontSize = '16px';
    h2.style.position = 'absolute';
    h2.style.left = '65px';
    h2.style.bottom = '-20px';
    box.appendChild(h1);
    box.appendChild(h2);

    echarts.setOption(option);
  }
}
export default PlantMap;
