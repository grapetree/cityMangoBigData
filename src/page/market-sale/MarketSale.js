import React from 'react';
import SaleTrendChinaMap from '../../component/visual-team/map/SaleTrendChinaMap';
import Select from '../../component/visual-team/other/Select';
import Panel from '../../component/visual-team/panel/Panel';
import Title from '../../component/visual-team/title/Title';
import PureBar from '../../component/visual-team/bar/PureBar';
import ChinaMapBar from '../../component/visual-team/map/ChinaMapBar';
import CombineHobby from '../../component/visual-team/other/combine-hobby/CombineHobby';
import CusomForeast from '../../component/visual-team/bar/CusomForeast';
// 销售产值
import SaleResult from '../../component/visual-team/other/sale-result/SaleResult';
import * as api from '../api/api-market-sale';
//芒果品种消费量偏好
import MangoPie from '../../component/visual-team/pie/MangoPie';
import LikePrice from '../../component/visual-team/pie/LikePrice';
import MangoWhreeSale from '../../component/visual-team/d3/MangoWhreeSale';

/**
 * 市场消费
 */
class MarketSale extends React.Component {
  constructor(props) {
    super(props);
    this.mangoSaleStyle = {
      width: '400px',
      height: '230px',
      marginLeft:'10px',
      float: 'left'
    };
    this.mangoPriceStyle = {
      width: '400px',
      height: '230px',
      marginLeft:'55px',
      float: 'left'
    };
    this.mangoWhreeSale = {
      width: '325px',
      height: '230px',
      marginLeft:'40px',
      float: 'left'
    };
    this.mangoSizeStyle = {
      width: '425px',
      height: '230px',
      marginLeft:'60px',
      float: 'left'
    };
    this.state = {
      num2:'鲜芒果',
      num3:'销售量',
      num5:'鲜芒果',
      num6:'销售量'
    }
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  _pullDownMes(i,a){
    switch (i){
      case 1:
        break;
      case 2:
        this.setState({
          num2:a.name
        });
        break;
      case 3:
        this.setState({
          num3:a.name
        });
        break;
      case 4:
        break;
      case 5:
        this.setState({
          num5:a.name
        });
        break;
      case 6:
        this.setState({
          num6:a.name
        });
        break;
    }
  }

  changeValue(d){
    if(d.name==='组合偏好'){
      this.refs.hurley1.style.display = 'block';
      this.refs.hurley2.style.display = 'block';
      this.refs.hurley3.style.display = 'none';
    }else if(d.name='单向偏好'){
      this.refs.hurley1.style.display = 'none';
      this.refs.hurley2.style.display = 'none';
      this.refs.hurley3.style.display = 'block';
    }
  }

  render() {
    return (
      <div>
        <div style={{width:'840px',height:'620px',position:'absolute',top:'126px',left:'180px'}}>
          <div style={{position:'absolute',left:'0',top:'500px',width:'225px',height:'120px'}}>
            <p style={{paddingLeft:'10px',color:'#46ebff',height:'16px',lineHeight:'16px'}}>流向全国芒果消费量排名TOP5</p>
            <ChinaMapBar ref={'chinaMapBar'} style={{width:'235px',height:'100px'}}/>
          </div>
          <p style={{height:'60px',lineHeight:'60px',color:'#46ebff',fontSize:'22px'}}>华坪销售流向监测</p>
          <ul style={{width:'100%',height:'40px',position:'absolute',top:'60px'}}>
            <Select _pullDownMes={this._pullDownMes.bind(this,1)} nameArr={['2017','2016']} width={80} style={{position: 'absolute'}}/>
            <Select _pullDownMes={this._pullDownMes.bind(this,2)} nameArr={['鲜芒果','加工芒果']} width={80} style={{position: 'absolute',left:'120px'}}/>
            <Select _pullDownMes={this._pullDownMes.bind(this,3)} nameArr={['销售量','销售金额']} width={80} style={{position: 'absolute',left:'240px'}}/>
            <Select _pullDownMes={this._pullDownMes.bind(this,4)} nameArr={['流向全国','流向全球']} width={80} style={{position: 'absolute',left:'360px'}}/>
          </ul>
          <div style={{width:'100%',height:'550px'}}>
            <SaleTrendChinaMap ref={ref => {
              this.saleTrend = ref;
            }}/>
          </div>

        </div>

        <Panel height={300} width={440} left={'1440px'} top={'125px'}>
          <Title left={20} top={20} content={'消费预测'}/>
          <div style={{cursor:'pointer',position:'absolute',zIndex:'3',left:'240px',top:'103px',width:'70px',height:'20px'}}>
            <span style={{marginTop:'1px',display:'block',float:'left',width:'16px',height:'12px',border:'3px dashed rgba(0,255,246,1)'}}></span>
            <span style={{fontSize:'12px',lineHeight:'12px',color:'#dbfcff',display:'block',float:'right'}}>预测值</span>
          </div>
          <ul style={{position:'absolute',top:'60px',width:'100%',height:'35px'}}>
            <Select _pullDownMes={this._pullDownMes.bind(this,5)} nameArr={['鲜芒果','加工芒果']} width={80} style={{position: 'absolute',left:'20px'}}/>
            <Select _pullDownMes={this._pullDownMes.bind(this,6)} nameArr={['销售量','销售金额']} width={80} style={{position: 'absolute',left:'140px'}}/>
          </ul>
          <div style={{position:'absolute',width:'100%',height:'200px',top:'96px'}}>
            <CusomForeast ref={'consumForecast'} style={{width:'425px',height:'200px',position:'absolute',left:'15px',top:'0px'}}/>
          </div>
        </Panel>

        <Panel height={300} width={440} left={'1440px'} top={'435px'}>
          <Title left={20} top={20} content={'芒果产值'}/>
          <div style={{position:'absolute',width:'100%',height:'230px',top:'63px'}}>
            <PureBar ref={'manggoValue'} style={{width:'425px',height:'220px',position:'absolute',left:'15px',top:'10px'}}/>
          </div>
        </Panel>

        <div style={{borderTop:'1px solid #3353b5',width:'370px',height:'600px',position:'absolute',left:'1033px',top:'140px'}}>
          <SaleResult ref={'saleResult'}/>
        </div>

        <Panel height={285} width={1720} left={'160px'} top={'755px'}>
          <Title left={20} top={20} content={'消费特点'}/>
          <p ref={'hurley1'} style={{display:'none',height:'16px',lineHeight:'16px',color:'#46ebff',position:'absolute',left:'135px',top:'25px',fontSize:'16px',width:'1500px'}}>结论：每斤价格为10-15元贵妃芒最受消费者青睐。果径为8-9cm，单价为5-15元/斤的芒果最受消费者青睐。</p>
          <Select _pullDownMes={this.changeValue.bind(this)} nameArr={['单向偏好','组合偏好']} width={80} style={{position: 'absolute',left:'1600px'}}/>
          <div ref={'hurley2'} style={{display:'none',width:'1720px',height:'227px',position:'absolute',top:'53px'}}>
            <CombineHobby ref={'combineHobby'}/>
          </div>
          <div ref={'hurley3'} style={{display:'block',width:'1720px',height:'227px',position:'absolute',top:'53px'}}>

            <MangoPie ref={'mangoSaleRefs'} style={this.mangoSaleStyle}/>
            <LikePrice ref={'mangoPriceRefs'} style={this.mangoPriceStyle}/>
            <MangoWhreeSale style={this.mangoWhreeSale} ref={'mangoWhreeSaleRefs'}/>
            <LikePrice ref={'mangoSizeRefs'} style={this.mangoSizeStyle}/>

          </div>
        </Panel>
      </div>
    )
  }
  componentDidMount(){
    let me = this;

    //芒果消费渠道偏好
    me._tokens.push(api.mangoSaleJson.send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : "3", //查询类型 1：芒果品种消费量偏好，2：芒果单斤价格偏好，3：芒果消费渠道偏好，4：芒果规格偏好
          "queryTime" : "2018", //查询日期 2018
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let data = [];
      res.data.map((v,i)=>{
        data.push({
          name: v.sale_channel_type_text,
          vals: (v.amount/10000).toFixed(1),
          unit: "万吨"
        })
      });
      me.refs.mangoWhreeSaleRefs.setData(data);
    }));
    // 芒果规格偏好
    me._tokens.push(api.mangoSaleJson.send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : "4", //查询类型 1：芒果品种消费量偏好，2：芒果单斤价格偏好，3：芒果消费渠道偏好，4：芒果规格偏好
          "queryTime" : "2018", //查询日期 2018
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let data = [];
      res.data.map((v,i)=>{
        data.push({
          name: v.weight_specification_text,
          vals: (v.amount/10000).toFixed(1),
          unit: "万吨"
        })
      });
      let obj = {
        titleShow: true,
        titleText: '芒果规格偏好',
        legendShow: false,
        seriesRadius: [15, 65],
        seriesCenter: ['50%', '55%'],
        seriesData: data,
        colorTop: ['#fed645','#1093f5','#29ccf4','#2af594','#58e2c2','#d9ff87','#fed645','#1093f5'],
        colorBottom: ['#eea21f','#1779ff','#29ccf4','#12d578','#58e2c2','#feff87','#eea21f','#1779ff']
      };
      me.refs.mangoSizeRefs.setData(obj);
    }));

    // 芒果单斤价格偏好
    me._tokens.push(api.mangoSaleJson.send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : "2", //查询类型 1：芒果品种消费量偏好，2：芒果单斤价格偏好，3：芒果消费渠道偏好，4：芒果规格偏好
          "queryTime" : "2018", //查询日期 2018
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let data = [];
      res.data.map((v,i)=>{
        data.push({
          name: v.price_range_text,
          vals: (v.amount/10000).toFixed(1),
          unit: "万吨"
        })
      });
      let obj = {
        titleShow: true,
        titleText: '芒果单斤价格偏好',
        legendShow: false,
        seriesRadius: [15, 65],
        seriesCenter: ['50%', '55%'],
        seriesData: data,
        colorTop: ['#fed645','#1093f5','#29ccf4','#2af594','#58e2c2','#d9ff87','#fed645','#1093f5'],
        colorBottom: ['#eea21f','#1779ff','#29ccf4','#12d578','#58e2c2','#feff87','#eea21f','#1779ff']
      };
      me.refs.mangoPriceRefs.setData(obj);
    }));

    // 芒果品种消费量偏好
    me._tokens.push(api.mangoSaleJson.send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : "1", //查询类型 1：芒果品种消费量偏好，2：芒果单斤价格偏好，3：芒果消费渠道偏好，4：芒果规格偏好
          "queryTime" : "2018", //查询日期 2018
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let data = [];
      res.data.map((v,i)=>{
        data.push({
          name: v.strains_text,
          vals: (v.amount/10000).toFixed(1),
          unit: "万吨"
        })
      });
      let obj = {
        titleShow: true,
        titleText: '芒果品种消费量偏好',
        legendShow: false,
        seriesRadius: ['30%', '50%'],
        seriesCenter: ['50%', '55%'],
        seriesData: data,
        colorTop: ['#1093f5','#11e0ff','#2fffe4','#2af594','#fed645'],
        colorBottom: ['#1779ff','#00b4ff','#14e6ff','#12d578','#eea21f']
      };
      me.refs.mangoSaleRefs.setData(obj);
    }));

    /* 华坪销售流向监测 */
    let domesticTouristSource = me.saleTrend;
    me._tokens.push(api.map1.send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : "1", //查询类型 1：销售量，2：销售额。
          "queryTime" : "2018-05" //查询日期 2018-05
        },
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 100
        }
      })
    }).then(response => {
      let arr = [];
      let max = 0;
      let serchMax = [];
      for(let i = 0;i < response.data.length;i++){
        serchMax.push(response.data[i].sale_amount_unit);
      }
      for(let i=0;i<serchMax.length-1;i++){
        for(let j=i+1;j<serchMax.length;j++){
          let cur = serchMax[i];
          if(cur>serchMax[j]){
            let index = serchMax[j];
            serchMax[j] = cur;
            serchMax[i] = index;
          }
        }
      }
      max = 1.2*serchMax[serchMax.length-1];

      for(let i = 0;i < response.data.length;i++){
        arr.push({"fromRegionCode":response.data[i].sale_region_code,"touristNum":response.data[i].sale_region_text,"value":(Number(response.data[i].sale_amount_unit)/max)})
      }
      let centerLonLat = [100.25, 26.86];

      domesticTouristSource.lineData = arr.map(d => {
        return {
          source: d.fromRegionCode,
          target: centerLonLat,
          value: d.touristNum,
          mount:d.value
        };
      });

      domesticTouristSource.markerData = arr.map(d => {
        return {
          id: d.fromRegionCode,
          size: 2,//+ Math.random() * 5,
          mount:d.value
        };
      });

      domesticTouristSource.edges
    }));
    domesticTouristSource.start3DRender();

    //芒果产值
    me._tokens.push(api.manggoValue1.send({
        jsonData: JSON.stringify({
          "entityRelated" : {
          },
          "orderList" : [ {
            "columnName" : "sale_amount",
            "isASC" : true
          } ],
          "page" : {
            "pageIndex" : 1,
            "pageSize" : 10
          }
        })
      }
    ).then((res1) => {
      me._tokens.push(api.manggoValue2.send({
        jsonData : JSON.stringify({
          "entityRelated" : {
          },
          "orderList" : [ {
            "columnName" : "sale_amount",
            "isASC" : true
          } ],
          "page" : {
            "pageIndex" : 1,
            "pageSize" : 10
          }
        })
      }).then((res2)=>{
        let xData = [];
        let yData1 = [];
        let yData2 = [];
        for(let i = 0;i < res1.data.length;i++){
          xData.push(res1.data[i].year);
          yData1.push(Number(res1.data[i].output_value_unit)/10000);
        }
        for(let i = 0;i < res2.data.length;i++){
          yData2.push(Number(res2.data[i].output_value_unit)/10000);
        }

        let obj = {
          showTitle:true,
          title:'万吨',
          titleTop:6,
          showTooltip:false,
          showTick:true,
          unitArr:['万吨','万吨'],
          circleArr:['rgba(0,255,246,1)','rgba(255,243,141,1)'],
          showLegend:true,
          itemGap:25,
          legendLeft:125,
          legendTop:3,
          legendName:['鲜芒果','芒果加工品'],
          gridLeft:'7%',
          gridTop:0,
          gridBottom:0,
          gridRight:'5%',
          smooth:true,
          num:2,
          yNum:1,
          xData:xData,
          yData1:yData1,
          yData2:yData2,
          colorStartOne:'rgba(0,255,246,1)',
          colorEndOne:'rgba(0,255,246,0.3)',
          colorStartTwo:'rgba(255,243,141,1)',
          colorEndTwo:'rgba(255,243,141,0.3)'
        };
        me.refs.manggoValue.setData(obj);
      }));
    }));

    //销售产值
    me._tokens.push(api.saleResult.send({
      jsonData : JSON.stringify({
        "entityRelated" : {

        },
        "page" : {

        }
      })
    }).then((res)=>{
      me.refs.saleResult.setData(res)
    }));

    //消费特点
    me._tokens.push(api.combineHobby.send({
      jsonData : JSON.stringify({
        "entityRelated" : {
          "queryType" : "1",     //查询类型 1：品种、单价组合，2：规格、单价组合
          "queryTime" : "2018",  //查询日期 2018 YYYY
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 25   //需要此字段
        }
      })
      }
    ).then((res1) => {
      me._tokens.push(api.combineHobby.send({
        jsonData : JSON.stringify({
          "entityRelated" : {
            "queryType" : "2",     //查询类型 1：品种、单价组合，2：规格、单价组合
            "queryTime" : "2018",  //查询日期 2018 YYYY
          },
          "orderList" : [ {
            "columnName" : "sale_amount",
            "isASC" : true
          } ],
          "page" : {
            "pageIndex" : 1,
            "pageSize" : 25   //需要此字段
          }
        })
      }).then((res2)=>{
        let obj = {};
        let arr1 = [];
        let arr2 = [];

        for(let i = 0;i < res1.data.data.length;i++){
          arr1.push({"name":res1.data.data[i].name,"lev1":res1.data.data[i].lev1==='-'?'-':parseInt(Number(res1.data.data[i].lev1)),"lev2":res1.data.data[i].lev2==='-'?'-':parseInt(Number(res1.data.data[i].lev2)),"lev3":res1.data.data[i].lev3==='-'?'-':parseInt(Number(res1.data.data[i].lev3)),"lev4":res1.data.data[i].lev4==='-'?'-':parseInt(Number(res1.data.data[i].lev4)),"lev5":res1.data.data[i].lev5==='-'?'-':parseInt(Number(res1.data.data[i].lev5))})
        }
        for(let i = 0;i < res2.data.data.length;i++){
          arr2.push({"name":res2.data.data[i].name,"lev1":res2.data.data[i].lev1==='-'?'-':parseInt(Number(res2.data.data[i].lev1)),"lev2":res2.data.data[i].lev2==='-'?'-':parseInt(Number(res2.data.data[i].lev2)),"lev3":res2.data.data[i].lev3==='-'?'-':parseInt(Number(res2.data.data[i].lev3)),"lev4":res2.data.data[i].lev4==='-'?'-':parseInt(Number(res2.data.data[i].lev4)),"lev5":res2.data.data[i].lev5==='-'?'-':parseInt(Number(res2.data.data[i].lev5))})
        }

        obj.data1 = arr1;
        obj.data2 = arr2;
        me.refs.combineHobby.setData(obj);
      }));
    }));

    //消费预测
    me._tokens.push(api.consumForecast1.send({
      jsonData : JSON.stringify({
        "entityRelated" : {
          "queryType" : "1", //查询类型 1：销售量，2：销售额。
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let xArr = [];
      let yArr = [];
      for(let i = 0;i < res.data.mfFreshList.length;i++){
        xArr.push(res.data.mfFreshList[i].time);
        yArr.push(res.data.mfFreshList[i].value/10000);
      }

      let obj = {
        showTooltip:false,
        showTick:true,
        text:'万吨',
        circleArr:['rgba(0,255,246,1)','rgba(255,243,141,1)'],
        showLegend:true,
        itemGap:25,
        legendName:['实际值','芒果加工品'],
        xData:xArr,
        yData1:yArr
      };
      me.refs.consumForecast.setData(obj);
    }));

    //chinaMapBar
    me._tokens.push(api.chinabar1.send({
      jsonData : JSON.stringify({
        "entityRelated" : {
          "queryType" : "1",      //查询类型 1：销售量，2：销售额。
          "queryTime" : "2018-05" //查询日期 2018-05
        },
        "page" : {
          "pageIndex" : 1, //需要传此字段
          "pageSize" : 5   //需要传此字段
        }
      })
    }).then((res)=>{
      let yData1 = [],xData = [];
      res.data.map((v,i)=>{
        xData.push(v.sale_region_text);
        yData1.push(v.sale_amount_unit);
      });

      let obj = {
        legendName:['实际值','芒果加工品'],
        xData:xData,
        yData1:yData1
      };
      me.refs.chinaMapBar.setData(obj);
    }));
  }

  componentDidUpdate(){
    let me = this;
    //消费预测
    let flag1 = undefined;
    let flag2 = undefined;
    if(this.state.num5 === '鲜芒果'){
      flag1 = 'consumForecast1';
    }else if(this.state.num5 === '加工芒果'){
      flag1 = 'consumForecast2';
    }
    if(this.state.num6 === '销售量'){
      flag2 = 1;
    }else if(this.state.num6 === '销售金额'){
      flag2 = 2;
    }
    me._tokens.push(api[flag1].send({
      jsonData : JSON.stringify({
        "entityRelated" : {
          "queryType" : flag2, //查询类型 1：销售量，2：销售额。
        },
        "orderList" : [ {
          "columnName" : "sale_amount",
          "isASC" : true
        } ],
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 10
        }
      })
    }).then((res)=>{
      let xArr = [];
      let yArr = [];
      for(let i = 0;i < res.data.mfFreshList.length;i++){
        xArr.push(res.data.mfFreshList[i].time);
        yArr.push(res.data.mfFreshList[i].value/10000);
      }
      let obj = {
        showTooltip:false,
        showTick:true,
        text:'万吨',
        circleArr:['rgba(0,255,246,1)','rgba(255,243,141,1)'],
        showLegend:true,
        itemGap:25,
        legendName:['实际值','芒果加工品'],
        xData:xArr,
        yData1:yArr
      };
      me.refs.consumForecast.setData(obj);
    }));

    //chinaMapBar
    let ch1 = undefined;
    let ch2 = undefined;
    let f1 = undefined;
    let f2 = undefined;
    if(this.state.num2 === '鲜芒果'){
      ch1 = 'chinabar1';
      f1 = 'map1';
    }else if(this.state.num2 === '加工芒果'){
      ch1 = 'chinabar2';
      f1 = 'map2';
    }
    if(this.state.num3 === '销售量'){
      ch2 = 1;
      f2 = 1;
    }else if(this.state.num3 === '销售金额'){
      f2 = 2;
    }

    me._tokens.push(api[ch1].send({
      jsonData : JSON.stringify({
        "entityRelated" : {
          "queryType" : ch2,      //查询类型 1：销售量，2：销售额。
          "queryTime" : "2018-05" //查询日期 2018-05
        },
        "page" : {
          "pageIndex" : 1, //需要传此字段
          "pageSize" : 5   //需要传此字段
        }
      })
    }).then((res)=>{
      let yData1 = [],xData = [];
      res.data.map((v,i)=>{
        xData.push(v.sale_region_text);
        yData1.push(v.sale_amount_unit);
      });
      let obj = {
        legendName:['实际值','芒果加工品'],
        xData:xData,
        yData1:yData1
      };
      me.refs.chinaMapBar.setData(obj);
    }));



    /* 华坪销售流向监测 */
    let domesticTouristSource = me.saleTrend;
    let mapFlag = undefined;
    me._tokens.push(api[f1].send({
      jsonData: JSON.stringify({
        "entityRelated" : {
          "queryType" : f2, //查询类型 1：销售量，2：销售额。
          "queryTime" : "2018-05" //查询日期 2018-05
        },
        "page" : {
          "pageIndex" : 1,
          "pageSize" : 100
        }
      })
    }).then(response => {
      let arr = [];
      let max = 0;
      let serchMax = [];
      for(let i = 0;i < response.data.length;i++){
        serchMax.push(response.data[i].sale_amount_unit);
      }
      for(let i=0;i<serchMax.length-1;i++){
        for(let j=i+1;j<serchMax.length;j++){
          let cur = serchMax[i];
          if(cur>serchMax[j]){
            let index = serchMax[j];
            serchMax[j] = cur;
            serchMax[i] = index;
          }
        }
      }
      max = 1.2*serchMax[serchMax.length-1];

      for(let i = 0;i < response.data.length;i++){
        arr.push({"fromRegionCode":response.data[i].sale_region_code,"touristNum":response.data[i].sale_region_text,"value":(Number(response.data[i].sale_amount_unit)/max)})
      }
      let centerLonLat = [100.25, 26.86];

      domesticTouristSource.lineData = arr.map(d => {
        return {
          source: d.fromRegionCode,
          target: centerLonLat,
          value: d.touristNum,
          mount:d.value
        };
      });

      domesticTouristSource.markerData = arr.map(d => {
        return {
          id: d.fromRegionCode,
          size: 2,//+ Math.random() * 5,
          mount:d.value
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

export default MarketSale;
