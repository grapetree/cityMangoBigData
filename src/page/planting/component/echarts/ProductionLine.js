import React,{Component} from 'react';
import echart from 'echarts';

export default class PureLine extends Component {
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
                <div style={{width:'521px',height:'200px'}} ref={'echarts'}>

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
                    height:15,
                    textStyle: {
                        color: '#1397fe'
                    },
                    borderColor: 'transparent',
                }],
            tooltip : {
                show:this.state.data.showTooltip||false,
                trigger: 'axis',
                backgroundColor:'rgba(25,31,106,0.8)'
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
                axisLabel:{
                    margin:16,
                    textStyle:{
                        color:'#ffffff',
                        fontSize: 16
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:'#4d74d5'
                    }
                },
                boundaryGap:false
            },
            yAxis: {
                type: 'value',
                axisTick:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color:'#dbfcff'
                    }
                },
                axisLabel:{
                    margin:16,
                    textStyle:{
                        color:'#ffffff',
                        fontSize: 16
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:'#4a70d2'
                    }
                }
            },
            grid:{
                top:this.state.data.gridTop||'10%',
                left:this.state.data.gridLeft||'10%',
                bottom:this.state.data.gridBottom||'13%',
                right:this.state.data.gridRight||'5%'
            },
            series: [
                {
                    name:this.state.data.legendName[0],
                    data: this.state.data.yData1,
                    type: 'line',
                    smooth:false,
                    symbol:'emptyCircle',
                    symbolSize: 4 ,
                    markPoint : {
                        clickable : false,
                        symbol : 'emptyCircle',
                        symbolSize: 4 ,
                    },
                    areaStyle:{
                        color: {
                            type: 'default',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(51, 102, 204, 0.4)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(51, 102, 204, 0.4)' // 100% 处的颜色
                            }]
                        }
                    },
                }
            ]
        };
        echarts.setOption(option);
    }
}
