import React,{Component} from 'react';
import echart from 'echarts';

class Pie extends Component {
    constructor(props){
        super(props);
        let me = this;
        this._flag = false;
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
                <div style={me.echartStyle}>
                    <div ref={'echarts'} style={{
                        width: '321px',
                        height: '200px'
                    }}> </div>
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
                textStyle:{
                    color: '#46ebff',
                    fontSize: 14,
                    align: 'left'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : ({d}%) <br/> 预警次数{c}次"
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
                        padding: 10
                    },
                    labelLine: {
                        length: 15,
                        length2: 20,
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
                value: v.count,
                name: v.mangoType,
                itemStyle:{
                    normal: {
                        color: config.colorBottom[i]
                    }
                }
            })
        });

        echarts.setOption(option);
    }
}
export default Pie;
