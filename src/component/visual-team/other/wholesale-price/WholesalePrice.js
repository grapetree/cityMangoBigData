import React from 'react';
import RankTop5 from '../rank/RankTop5';
import Title from '../../title/Title';
import Panel from '../../panel/Panel';
import PriceTrend from '../../bar/PriceTrend';
import ChinaMap from '../../map/ChinaMap';



import * as api from '../../../../page/api/api-wholesale-price';

export default class WholesalePrice extends React.Component{
  constructor(props){
    super(props);
  }


  _tokens = [];
  _clearTokens(){
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  _pullDownMes(){

  }

  render(){
    return(
      <div style={{display:this.props.display}}>
        <RankTop5 title={'全国各省平均价格排名TOP5'} ref={'ave'} width={400} height={275} left={'1025px'} top={'185px'}/>
        <RankTop5 title={'全国各省最高价格排名TOP5'} ref={'top'} width={400} height={275} left={'1465px'} top={'185px'}/>

        <Panel left={'1027px'} top={'460px'} width={854} height={285}>
          <Title left={20} top={20} content={'价格走势'}/>
          <PriceTrend ref={'priceTrend'} style={{width:'880px',height:'280px',position:'absolute',top:'10px'}}/>
        </Panel>
      
        <div style={{position:'absolute',left:'160px',top:'150px',height:'600px',width:'850px'}}>
          <ChinaMap ref={ref => {
            this.saleTrend = ref;
          }}/>
        </div>
        <div style={{fontSize:'14px',color:'#8ac7ff',width:'150px',height:'120px',background:'#2f53bb',position:'absolute',left:'260px',top:'560px'}}>
          <p style={{marginBottom:'12px',height:'14px',lineHeight:'14px'}}>价格：（元／公斤）</p>
          <p style={{marginBottom:'8px',height:'14px',lineHeight:'14px',textIndent:'15px'}}>
            <span style={{float:'left',display:'block',background:'#1682fb',width:'14px',height:'14px'}}></span>15-20
          </p>
          <p style={{marginBottom:'8px',height:'14px',lineHeight:'14px',textIndent:'15px'}}>
            <span style={{float:'left',display:'block',background:'#1ca6fc',width:'14px',height:'14px'}}></span>10-15
          </p>
          <p style={{marginBottom:'8px',height:'14px',lineHeight:'14px',textIndent:'15px'}}>
            <span style={{float:'left',display:'block',background:'#23cdfc',width:'14px',height:'14px'}}></span>5-10
          </p>
          <p style={{marginBottom:'8px',height:'14px',lineHeight:'14px',textIndent:'15px'}}>
            <span style={{float:'left',display:'block',background:'#00c7ff',width:'14px',height:'14px'}}></span>5元以下
          </p>
        </div>
      </div>
    )
  }
  componentDidMount(){
    let me = this;
    //全国各省平均价格排名TOP5
    me._tokens.push(api.price.send({
      jsonData : JSON.stringify({

      })
    }).then((res)=>{
      me.refs.ave.setData(res.data.ave);
    }));

    //全国各省最高价格排名TOP5
    me._tokens.push(api.price.send({jsonData : JSON.stringify({

    })}).then((res)=>{
      me.refs.top.setData(res.data.top);
    }));

    //价格走势
    me._tokens.push(api.priceTrend.send({
      jsonData : JSON.stringify({

      })
    }).then((res)=>{
      let yData1 = [],yData2 = [],xData = [];
      for(let i = 0;i < res.data.length;i++){
        yData1.push(res.data[i].price);
        xData.push(res.data[i].times);
        yData2.push(res.data[i].chg);
      }

      let obj = {
        showTitle:true,
        title:'价格（元／公斤）',
        titleTop:40,
        showTooltip:true,
        showTick:true,
        unitArr:['万亩'],
        circleArr:['rgba(0,255,246,1)'],
        showLegend:true,
        itemGap:25,
        legendLeft:325,
        legendTop:45,
        legendName:['全国芒果批发市场均价','同期增长率'],
        gridLeft:'5%',
        gridTop:70,
        gridBottom:0,
        gridRight:'10%',
        smooth:true,
        num:1,
        yNum:2,
        xData:xData,
        yData1:yData1,
        yData2:yData2,
        colorStartOne:'rgba(0,204,255,1)',
        colorEndOne:'rgba(0,204,255,0.3)'
      };
      me.refs.priceTrend.setData(obj);
    }));

    /* 华坪销售流向监测 */
    let domesticTouristSource = me.saleTrend;
    me._tokens.push(api.map1.send({
      jsonData : JSON.stringify({

      })
    }).then(response => {
      let arr = response.data.map((v,i)=>{
        return v.average_price_unit;
      });

      for(let i=0;i<arr.length-1;i++){
        for(let j=0;j<arr.length-1-i;j++){
          if(arr[j]>arr[j+1]){
            let temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
          }
        }
      }
      let max = arr[arr.length-1];

      domesticTouristSource.mapColor = response.data.map(d => {
        return {
          id: d.region_name,
          value: d.average_price_unit/max,
          value1: d.average_price_unit,
          value2: d.bottom_price_unit,
          value3: d.top_price_unit
          //color: color.get(value)
        };
      });
      domesticTouristSource.edges
    }));
    domesticTouristSource.start3DRender();

  }

  componentWillUnmount() {
    this._clearTokens();
  }
}
