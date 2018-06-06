import React, { Component } from "react";
import echarts from 'echarts';

export default class Gx extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this._flag = false;
    this.state={
       relationship:{},
       name:''
    }
    this.initEchart = this.initEchart.bind(this);
    me.echartStyle = {
      width: '880px',
      height: '650px',
    }

  }
 componentWillReceiveProps(nextProps) {
  console.log(nextProps,'nextProps')
        this.setState({relationship: nextProps.data.relationship,name: nextProps.data.comInfo.enterpriseName});
    }
  initEchart(){   // 渲染图表方法
    let myChart = echarts.init(this.refs.myChart);
    let datas = {
      datax:[],
      datas:[]
    };
    let axisLabel = {
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'lighter'
      },
      margin: 18,
      formatter:(params)=>{
        return params
      }
    };
     let arr = Object.keys(this.state.relationship);
    console.log(arr,'aaa')
    let me=this
    let aaa=[]
    let colors=['#1daefc','rgba(253, 136, 85)','rgba(180, 143, 252)','rgba(195, 94, 251)','rgba(21, 133, 212)','#9efd6e','#fdaf57']                           
    arr.forEach((key,index)=>{
       let abc={
                                    name: key+'('+this.state.relationship[key].length+')',
                                    value: 200,                                    
                                    collapsed: false,
                                    itemStyle:{color:colors[index],borderWidth:0},
                                    symbolSize: 14, 
                                    color:'#1daefc',
                                    label: {
                                            position: 'left',
                                            color: '#fff',
                                            fontSize:12
                                    },
                                    children: []
                                    
                                };
              
      this.state.relationship[key].forEach((k,i) => {
          abc.children.push({
                                                name: k.enterpriseName,
                                                value: 200,
                                                itemStyle:{color:colors[index],borderWidth:0},
                                                symbolSize: 10, 
                                                label: {
                                                    distance:10,
                                                    position:'inside',
                                                    color: '#fff'
                                                },
                                            })
      })
      aaa.push(abc)
      
    })
    
    let  option = {
   
     
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    left: '10%',
                    right: '10%',
                    top: '20%',
                    bottom: '20%',
                    symbol: 'circle',
                    orient: 'vertical',
                    expandAndCollapse: true,
                    layout: 'radial',                  
                    itemStyle:{                        
                        borderColor:"#ccc"                  
                    },    
                    data: [{
                        name:this.state.name,
                        symbolSize: 16, 
                        itemStyle:{normal:{color:'#2fabfc',borderWidth:0}},
                        label: {

                                fontSize: 12,
                                color:'#fff'
                        },
                    
                        children: aaa
                        
                    }],
    
                }
            ]
    };

    myChart.setOption(option);
  }

  _flag = undefined;

  componentDidMount() {   //初始化渲染图表
    //this.initEchart()
  }

  componentDidUpdate() {  //更新数据重新渲染图表
    this.initEchart()
  }

  render() {
    // if (this._flag){
    return (
      <div ref='myChart' style={this.echartStyle}>

      </div>
    )
    // }else{
    //     return (
    //         <div></div>
    //     )
    // }

  }
}