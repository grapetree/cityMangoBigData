import React from 'react';
// component
import bg from './mango-homepage.png';
import * as api from '../api/api-home-page';
//title 组件
import Title from '../../component/visual-team/title/Title';

import PureLine from '../../component/visual-team/line/PureLine';
import PureBar from '../../component/visual-team/bar/PureBar';
import PureLineChange from '../../component/visual-team/line/PureLineChange';
//饼图
import Pie from '../../component/visual-team/pie/Pie';
//首页中间靠上文本框
import DataBox from '../../component/visual-team/data-box/DataBox';

import store from '../../store/Store';

import Select from '../../component/visual-team/other/Select';
//田头价 零售价
import CircleSmall from '../../component/visual-team/d3/CircleSmall';
import CircleBig from '../../component/visual-team/d3/CircleBig';
//桑吉图
import EChartsSankey from '../../component/visual-team/san-key/EChartsSankey'

/**
 * 首页
 */
class HomePage extends React.Component {
  constructor() {
    super();
    const me = this;
    this.state = {
      t: '种植面积'
    };
    me.homePageStyle = {
      width: '1920px',
      height: '1080px',
      background: `url(${bg}) no-repeat center center`,
      backgroundSize: 'contain'
    };
    me.pieStyle = {
      width: '410px',
      height: '205px',
      position: 'absolute',
      top: '578px',
      left: '170px'
    };
    me.saleMangoStyle = {
      width: '400px',
      height: '180px',
      position: 'absolute',
      top: '135px',
      left: '1470px'
    }
  }

  _tokens = [];

  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  componentWillMount() {
    let me = this;
    // 经深加工
    me._tokens.push(api.dataBox.send({
        jsonData: JSON.stringify({
          "entityRelated": {"year": "2018", "regionId": "530723"},
          "orderList": [{"columnName": "", "isASC": true}],
          "page": {"pageIndex": 1, "pageSize": 10}
        })
      }
    ).then((res1) => {
      me._tokens.push(api.dataBox1.send({
        jsonData: JSON.stringify({
          "entityRelated": {"year": "2018", "regionId": "530723"},
          "orderList": [{"columnName": "", "isASC": true}],
          "page": {"pageIndex": 1, "pageSize": 10}
        })
      }).then((res2) => {
        let obj = {
          yield: res1.data[0].productSum,
          sale: res2.data[0].saleSum
        };
        store.dispatch({type: 'box', data: obj})
      }));
    }));

    // 田头价 零售价
    me._tokens.push(api.priceIndex.send().then((res) => {
      store.dispatch({type: 'price', data: res.data})
    }));

  }

  _pullDownMes(a) {
    this.setState({
      t: a.name
    })
  }

  _changePieHandle(a) {
    let me = this;
    let obj = {
      titleShow: false,
      legendShow: false,
      seriesRadius: ['40%', '70%'],
      seriesCenter: ['50%', '57%'],
      seriesData: a,
      colorTop: ['#11e0ff', '#2af594', '#fed645'],
      colorBottom: ['#00b4ff', '#12d578', '#eea21f']
    };
    me.refs.saleMangoPie.setData(obj);
  }

  render() {
    const me = this;
    return (
      <div ref={ref => me.container = ref} style={this.homePageStyle}>

        <Pie ref={'deepProcessingPie'} style={me.pieStyle} title={'经深加工'}/>

        <Pie ref={'saleMangoPie'} style={me.saleMangoStyle} title={'芒果消费结构'}/>

        <div style={{width: '410px', height: '235px', position: 'absolute', top: '807px', left: '168px'}}>
          <Title content={'平均单产预测'}/>
          <PureLine style={{width: '410px', height: '213px', position: 'absolute', top: '22px'}}
                    ref={'aveYieldForecast'}/>
        </div>

        <div style={{width: '420px', height: '235px', position: 'absolute', top: '807px', left: '580px'}}>
          <Title content={'各环节差价'}/>
          <PureLine style={{width: '420px', height: '213px', position: 'absolute', top: '22px'}} ref={'allStateSub'}/>
        </div>

        <div style={{width: '420px', height: '200px', position: 'absolute', top: '150px', left: '168px'}}>
          <Title content={'种植生产'}/>
          <PureLine style={{width: '400px', height: '180px', position: 'absolute', top: '22px'}} ref={'greenPlant'}/>
        </div>

        <div style={{width: '400px', height: '215px', position: 'absolute', top: '580px', left: '1480px'}}>
          <Title content={'芒果产值'}/>
          <PureBar ref={'manggoValue'} style={{width: '400px', height: '195px', position: 'absolute', top: '22px'}}/>
        </div>

        <div style={{width: '400px', height: '195px', position: 'absolute', top: '365px', left: '170px'}}>
          <Title content={'种植结构'}/>
          <PureBar ref={'plantForm'} style={{width: '400px', height: '175px', position: 'absolute', top: '10px'}}/>
        </div>
        {/*芒果消费结构折线图*/}
        <div style={{width: '420px', height: '245px', position: 'absolute', top: '308px', left: '1470px'}}>
          <PureLineChange style={{width: '420px', height: '220px', position: 'absolute', top: '22px'}}
                          changePieHandle={me._changePieHandle.bind(me)}
                          ref={'mangoConsumInfo'}/>
        </div>

        <div style={{width: '400px', height: '235px', position: 'absolute', top: '807px', left: '1480px'}}>
          <Title content={'芒果销量预测'}/>
          <p style={{color: '#46ebff', marginTop: '35px', fontSize: '14px'}}>预测2020年华坪芒果销售量将达到234万吨</p>
          <PureLine style={{width: '400px', height: '170px', position: 'absolute', top: '60px'}} ref={'mangoSaleCalc'}/>
        </div>

        <DataBox positions={{left: '620px', top: '127px'}} boxColor={'#46ebff'} icon={true} title={'2017年总产量'}
                 typeData={'yield'}/>

        <DataBox positions={{left: '1040px', top: '127px'}} boxColor={'#2af594'} icon={false} color1={'#afffd9'}
                 color2={'#2af594'} title={'2017年总销量'} typeData={'sale'}/>

        <Select _pullDownMes={this._pullDownMes.bind(this)} nameArr={['种植面积', '产量', '产值']} width={80} style={{
          position: 'absolute',
          top: '145px',
          left: '450px'
        }}/>
        <div style={{width: '880px', height: '550px', position: 'absolute', top: '235px', left: '580px'}}>

          <CircleBig/>

          <CircleSmall style={{position: 'absolute', top: '200px', left: '50px'}} typeData={'wholeSale'} times={'month'}
                       propsMarke={'monthPriceBlue'}/>
          <CircleSmall style={{position: 'absolute', top: '200px', left: '290px'}} typeData={'wholeSale'} times={'year'}
                       propsMarke={'dataPriceBlue'}/>
          <CircleSmall style={{position: 'absolute', top: '200px', left: '460px'}} typeData={'retail'} times={'month'}
                       propsMarke={'monthPriceGreen'}/>
          <CircleSmall style={{position: 'absolute', top: '200px', left: '700px'}} typeData={'retail'} times={'year'}
                       propsMarke={'dataPriceGreen'}/>
        </div>

        <div style={{width: '400px', height: '232px', position: 'absolute', left: '1045px', top: '804px'}}>
          <Title content={'产销流向'}/>
          <p style={{color: '#46ebff', marginTop: '35px', fontSize: '14px'}}>2017年华坪鲜果主要销往北京，加工品主要销往上海</p>
          <EChartsSankey width={400} height={180} left={0} top={56} ref={ref => me._echartsSankeyRef = ref}/>
        </div>

      </div>
    )
  }

  componentDidMount() {
    let me = this;
    // 经深加工
    me._tokens.push(api.deepProcessing.send({
      jsonData: JSON.stringify({
        "entityRelated": {
          "year": "2018", //年份
          "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
        },
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })
    }).then((res) => {
      let data = res.data.resultList.slice();
      let bestSale = res.data.maxTrainsText;
      let lastData = data.map((item, index) => {
        return {
          names: item.strainsText,
          //per: parseFloat(item.processProportion) * 100,
          vals: item.valueSum / 100000000
        }
      });

      let obj = {
        titleShow: true,
        titleText: '2017年华坪芒果加工品产值1亿元，其中' + bestSale + '销量最好',
        legendShow: false,
        seriesName: '经深加工',
        seriesRadius: ['35%', '65%'],
        seriesCenter: ['50%', '65%'],
        seriesData: lastData,
        colorTop: ['#1093f5', '#11e0ff', '#2fffe4', '#2af594', '#fed645'],
        colorBottom: ['#1779ff', '#00b4ff', '#14e6ff', '#12d578', '#eea21f']
      };
      me.refs.deepProcessingPie.setData(obj);
    }));
    // 芒果消费结构
    /*me._tokens.push(api.saleMango.send({
      jsonData: JSON.stringify({
          "entityRelated": {
            "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
          },
          "orderList": [{
            "columnName": "",
            "isASC": true
          }],
          "page": {
            "pageIndex": 1,
            "pageSize": 10
          }
        }
      )
    }).then((res) => {
      console.log(res)
      let obj = {
        titleShow: false,
        legendShow: false,
        seriesRadius: ['45%', '75%'],
        seriesCenter: ['50%', '50%'],
        seriesData: res.data,
        colorTop: ['#11e0ff', '#2af594', '#fed645'],
        colorBottom: ['#00b4ff', '#12d578', '#eea21f']
      };
      me.refs.saleMangoPie.setData(obj);
    }));*/
    // 平均单产预测
    me._tokens.push(api.aveYieldForecast.send({
      jsonData: JSON.stringify({
        "entityRelated": {},
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })
    }).then((res) => {
      let data = res.data.slice();
      let xAxisData = [];
      let forecastData = [];
      let actualData = [];
      data.forEach((item, i) => {
        xAxisData.push(item.dateTime);
        forecastData.push(item.forecastVolume);
        actualData.push(item.actualVolume);
      });
      let obj = {
        showTitle: true,
        title: '单产(公斤/亩)',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: ['公斤/亩', '公斤/亩'],
        circleArr: ['#00ffff', '#2af594'],
        lineColor: ['#00ffff', '#2af594'],
        showLegend: true,
        itemGap: 25,
        legendLeft: 150,
        legendTop: 10,
        legendName: ['实际单产', '预测单产'],
        gridLeft: '10%',
        gridTop: '20%',
        gridBottom: '20%',
        smooth: true,
        gridRight: '12%',
        //xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        xData: xAxisData.slice(),
        //yData1: [1.3, 2.3, 4.7, 2.4, 1.5, 5.6, 3.3, 1.5],
        yData1: actualData.slice(),
        //yData2: [4.3, 3.3, 2.7, 5.4, 5.5, 2.6, 5.3, 1]
        yData2: forecastData.slice()
      };
      me.refs.aveYieldForecast.setData(obj);
    }));

    // 各环节差价
    me._tokens.push(api.allStateSub.send({
      jsonData: JSON.stringify({
        "entityRelated": {
          "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
        },
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })

    }).then((res) => {

      //console.log(res)
      let data = res.data.slice();
      let fieldData = []; //田头价
      let retailData = []; //零售价
      let dispatchData = []; //批发价

      data.forEach((item, index) => {
        for (let i in item) {
          if (i.indexOf('field') > -1) {
            fieldData = item[i];
          } else if (i.indexOf('retail') > -1) {
            retailData = item[i];
          } else if (i.indexOf('dispatch') > -1) {
            dispatchData = item[i];
          }
        }
      });
      /*console.log(fieldData)
      console.log(retailData)
      console.log(dispatchData)*/
      let obj = {
        showTitle: true,
        title: '元/斤',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: ['元/斤', '元/斤', '元/斤'],
        circleArr: ['#00ffff', '#2af594', '#fde634'],
        lineColor: ['#00ffff', '#2af594', '#fde634'],
        showLegend: true,
        itemGap: 25,
        legendLeft: 70,
        legendTop: 10,
        legendName: ['零售价格', '批发价格', '收购价'],
        gridLeft: '10%',
        gridTop: '20%',
        gridBottom: '20%',
        smooth: true,
        xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        yData1: [1.3, 2.3, 4.7, 2.4, 1.5, 5.6, 3.3, 1.5],
        yData2: [4.3, 3.3, 2.7, 5.4, 5.5, 2.6, 5.3, 1],
        yData3: [3.3, 2.3, 2.2, 5.9, 5.4, 2.1, 2.3, 1.9]
      };
      me.refs.allStateSub.setData(obj);
    }));

    // 芒果销量预测
    me._tokens.push(api.mangoSaleCalc.send({
      jsonData: JSON.stringify({
        "entityRelated": {},
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })
    }).then((res) => {
      let data = res.data[0];
      let saleData = [];
      let xAxisData = [];
      for (let i in data) {
        if (i.indexOf('date') > -1) {
          xAxisData = data[i];
        } else if (i.indexOf('sale') > -1) {
          saleData = data[i];
        }
      }
      console.log(xAxisData)
      console.log(saleData)
      let obj = {
        showTitle: true,
        title: '万吨',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: [''],
        circleArr: ['rgba(42,245,148,1)'],
        lineColor: ['rgba(42,245,148,1)'],
        showLegend: false,
        itemGap: 25,
        legendLeft: 70,
        legendTop: 10,
        legendName: ['销量'],
        gridLeft: '10%',
        gridTop: '20%',
        gridBottom: '20%',
        gridRight: '8%',
        smooth: false,
        symbolSize: 6,
        // xData: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        xData: xAxisData.slice(),
        //yData1: [144, 134, 125, 156, 160, 180, 189, 196],
        yData1: saleData.slice(),
        flag: 1,
        colorStartOne: 'rgba(42,245,148,1)',
        colorEndOne: 'rgba(42,245,148,0)'
      };
      me.refs.mangoSaleCalc.setData(obj);
    }));
    //芒果消费结构
    me._tokens.push(api.mangoConsumInfo.send({
      jsonData: JSON.stringify({
          "entityRelated": {
            "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
          },
          "orderList": [{
            "columnName": "",
            "isASC": true
          }],
          "page": {
            "pageIndex": 1,
            "pageSize": 10
          }
        }
      )
    }).then((res) => {
      let data = res.data.slice();
      let fresh = [];
      let freshList = [];
      let process = [];
      let processList = [];
      let wastage = [];
      let wastageList = [];
      let xAxisData = [];
      data.forEach((item, index) => {
        for (let i in item) {
          if (i.indexOf('fresh') > -1) {
            fresh = item[i];
          } else if (i.indexOf('process') > -1) {
            process = item[i];
          } else if (i.indexOf('wastage') > -1) {
            wastage = item[i];
          }
        }
      });
      fresh.forEach((item, i) => {
        xAxisData.push(item.YEAR);
        freshList.push(item.saleSum / (1000 * 10000));
      });
      process.forEach((item, i) => {
        processList.push(item.saleSum / (1000 * 10000));
      });
      wastage.forEach((item, i) => {
        wastageList.push(item.wasteSum / (1000 * 10000));
      });
      let obj = {
        showTitle: true,
        title: '万吨',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: ['万吨', '万吨', '万吨'],
        circleArr: ['#00ffff', '#2af594', '#fde634'],
        lineColor: ['#00ffff', '#2af594', '#fde634'],
        showLegend: true,
        itemGap: 25,
        legendLeft: 90,
        legendTop: 10,
        legendName: ['鲜果销量', '加工品销量', '损耗量'],
        gridLeft: '6%',
        gridTop: '20%',
        gridBottom: '10%',
        gridRight: '10%',
        smooth: true,
        //xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        xData: xAxisData.slice(),
        //yData1: [30, 40, 45, 50, 65, 70, 75, 80],
        yData1: freshList.slice(),
        //yData2: [20, 34, 47, 34, 45, 56, 67, 77],
        yData2: processList.slice(),
        // yData3: [10, 15, 20, 22, 18, 23, 25, 28]
        yData3: wastageList.slice()
      };
      me.refs.mangoConsumInfo.setData(obj);
      let pieD = [
        {
          names: "鲜果销量",
          vals: freshList[freshList.length - 1]
        }, {
          names: "加工品销量",
          vals: processList[processList.length - 1]
        }, {
          names: "损耗量",
          vals: wastageList[wastageList.length - 1]
        }
      ];
      let pieData = {
        titleShow: false,
        legendShow: false,
        seriesRadius: ['45%', '75%'],
        seriesCenter: ['50%', '57%'],
        seriesData: pieD,
        colorTop: ['#11e0ff', '#2af594', '#fed645'],
        colorBottom: ['#00b4ff', '#12d578', '#eea21f']
      };
      me.refs.saleMangoPie.setData(pieData);
    }));
    //绿色种植
    me._tokens.push(api.plantSpace.send().then((res) => {
      let obj = {
        showTitle: true,
        title: '万吨',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: ['万吨', '万吨', '万吨'],
        circleArr: ['#00ffff', '#2af594', '#fde634'],
        lineColor: ['#00ffff', '#2af594', '#fde634'],
        showLegend: true,
        itemGap: 10,
        legendLeft: 55,
        legendTop: 10,
        legendName: ['总种植面积', '有机产品认证面积', '绿色认证面积'],
        gridLeft: '10%',
        gridTop: '20%',
        gridBottom: '20%',
        smooth: true,
        xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        yData1: [30, 40, 45, 50, 65, 70, 75, 80],
        yData2: [20, 34, 47, 34, 45, 56, 67, 77],
        yData3: [10, 15, 20, 22, 18, 23, 25, 28]
      };
      me.refs.plantSpace.setData(obj);
    }));

    //芒果产值
    me._tokens.push(api.manggoValue.send({
      jsonData: JSON.stringify({
        "entityRelated": {
          "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
        },
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })
    }).then((res) => {
      let data = res.data.slice();
      //console.log(data)
      let barData1 = data[0].freshList.slice();
      let barData2 = data[1].processList.slice();
      let xAxisData = [];
      let bar1 = [];
      let bar2 = [];
      barData1.forEach((item, i) => {
        xAxisData.push(item.YEAR);
        bar1.push(item.outputSum / 10000);
      });
      barData2.forEach((item, i) => {
        bar2.push(item.outputSum);
      });
      let obj = {
        showTitle: true,
        title: '万吨',
        titleTop: 6,
        titleLeft: 28,
        showTooltip: false,
        showTick: true,
        unitArr: ['万吨', '万吨'],
        circleArr: ['rgba(0,255,246,1)', 'rgba(255,243,141,1)'],
        showLegend: true,
        itemGap: 25,
        legendLeft: 125,
        legendTop: 10,
        legendName: ['鲜芒果', '芒果加工品'],
        gridLeft: '2%',
        gridTop: 0,
        gridBottom: 0,
        gridRight: '8%',
        smooth: true,
        num: 2,
        yNum: 1,
        //xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        xData: xAxisData,
        //yData1: [30, 40, 45, 50, 65, 70, 75, 80, 90],
        yData1: bar1,
        //yData2: [20, 34, 47, 34, 45, 56, 67, 77, 88],
        yData2: bar2,
        colorStartOne: 'rgba(0,255,246,1)',
        colorEndOne: 'rgba(0,255,246,0.3)',
        colorStartTwo: 'rgba(255,243,141,1)',
        colorEndTwo: 'rgba(255,243,141,0.3)'
      };
      me.refs.manggoValue.setData(obj);
    }));

    //种植结构
    me._tokens.push(api.plantForm.send({
      jsonData: JSON.stringify({
          "entityRelated": {
            "year": "2018", //年份
            "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
          },
          "orderList": [{
            "columnName": "",
            "isASC": true
          }],
          "page": {
            "pageIndex": 1,
            "pageSize": 10
          }
        }
      )
    }).then((res) => {

      let data = res.data.slice();
      let xAxisData = [];
      let barData = [];
      let percentArr = [];
      data.forEach(function (item, index) {
        xAxisData.push(item.strainsText);
        barData.push({
          value: (item.growArea / 10000).toFixed(2),
          percent: item.growProportion
        });
        percentArr.push(item.growProportion);
      });
      let obj = {
        showTitle: false,
        title: '万吨',
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: ['万亩'],
        circleArr: ['rgba(0,255,246,1)'],
        showLegend: false,
        itemGap: 25,
        legendLeft: 125,
        legendTop: 0,
        legendName: [''],
        gridLeft: '4%',
        gridTop: 0,
        gridBottom: 0,
        gridRight: '4%',
        smooth: true,
        num: 1,
        yNum: 2,
        // xData: ['凯特芒', '圣心芒', '象牙芒', '鹰嘴芒', '爱文芒', '台农芒', '澳芒', '金煌芒'],
        xData: xAxisData,
        // yData1: [30, 40, 45, 50, 65, 70, 75, 88],
        yData1: barData,
        percentData: percentArr,
        colorStartOne: 'rgba(0,204,255,1)',
        colorEndOne: 'rgba(0,204,255,0.3)'
      };
      me.refs.plantForm.setData(obj);
    }));

    let data = {
      nodes: [
        {name: '华坪产量', level: '0', value: 10},

        {name: '鲜芒果', level: '1', value: 5},
        {name: '加工品', level: '1', value: 5},

        {name: '北京', level: '2-1', value: 1.5},
        {name: '上海', level: '2-1', value: 0.5},
        {name: '浙江', level: '2-1', value: 1},
        {name: '江苏', level: '2-1', value: 1},
        {name: '河南', level: '2-1', value: 1},

        {name: '北京', level: '2-2', value: 2},
        {name: '江苏', level: '2-2', value: 1.5},
        {name: '山东', level: '2-2', value: 0.5},
        {name: '河北', level: '2-2', value: 1},
      ],
      links: [
        {source: 0, target: 1, value: 5},
        {source: 0, target: 2, value: 5},

        {source: 1, target: 3, value: 1.5},
        {source: 1, target: 4, value: 0.5},
        {source: 1, target: 5, value: 1},
        {source: 1, target: 6, value: 1},
        {source: 1, target: 7, value: 1},

        {source: 2, target: 8, value: 2},
        {source: 2, target: 9, value: 1.5},
        {source: 2, target: 10, value: 0.5},
        {source: 2, target: 11, value: 1},
      ]
    };
    me._echartsSankeyRef.setData(data)


    //绿色种植

    me._tokens.push(api.plantSpace.send({
      jsonData: JSON.stringify({
        "entityRelated": {
          "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
        },
        "orderList": [{
          "columnName": "",
          "isASC": true
        }],
        "page": {
          "pageIndex": 1,
          "pageSize": 10
        }
      })
    }).then((res) => {
      console.log(res)
      let data = res.data;
      let green = data.green; //绿色认证
      let total = data.total;//总数据
      let organic = data.organic; // 有机认证

      let xAxisData = [];

      let areaSum = [];//总面积
      let productSum = [];//总产量
      let outputSum = [];//总产值

      total.forEach((item, i) => {
        xAxisData.push(item.year);
        areaSum.push(item.areaSum);
        productSum.push(item.productSum);
        outputSum.push(item.outputSum);
      });
      console.log(green)
      console.log(total)
      console.log(organic)
      let title = '万亩';
      let unitArr = ['万亩', '万亩', '万亩'];
      let legendName = ['总种植面积', '有机产品认证面积', '绿色认证面积'];
      let yData1 = [30, 40, 45, 50, 65, 70, 75, 80];
      let yData2 = [20, 34, 47, 34, 45, 56, 67, 77];
      let yData3 = [10, 15, 20, 22, 18, 23, 25, 28];
      let obj = {
        showTitle: true,
        title: title,
        titleTop: 6,
        showTooltip: true,
        showTick: true,
        unitArr: unitArr,
        circleArr: ['#00ffff', '#2af594', '#fde634'],
        lineColor: ['#00ffff', '#2af594', '#fde634'],
        showLegend: true,
        itemGap: 10,
        legendLeft: 55,
        legendTop: 10,
        legendName: legendName,
        gridLeft: '10%',
        gridTop: '20%',
        gridBottom: '20%',
        smooth: true,
        xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        yData1: yData1,
        yData2: yData2,
        yData3: yData3
      };
      me.refs.greenPlant.setData(obj);
    }));
  }

  componentDidUpdate() {
    let me = this;
    //绿色种植
    /* let apiFlag = undefined, title = '', unitArr = [], legendName = [], yData1 = [], yData2 = [], yData3 = [];
     switch (this.state.t) {
       case '种植面积':
         apiFlag = 'plantSpace';
         title = '万亩';
         unitArr = ['万亩', '万亩', '万亩'];
         legendName = ['总种植面积', '有机产品认证面积', '绿色认证面积'];
         yData1 = [30, 40, 45, 50, 65, 70, 75, 80];
         yData2 = [20, 34, 47, 34, 45, 56, 67, 77];
         yData3 = [10, 15, 20, 22, 18, 23, 25, 28];
         break;
       case '产量':
         apiFlag = 'plantSpace';
         title = '万亩';
         unitArr = ['万吨', '万吨', '万吨'];
         legendName = ['总产量', '有机认证产量', '绿色认证产量'];
         yData1 = [34, 45, 45, 56, 35, 50, 65, 90];
         yData2 = [24, 44, 44, 30, 48, 57, 57, 87];
         yData3 = [12, 16, 25, 26, 13, 20, 20, 28];
         break;
       case '产值':
         apiFlag = 'plantSpace';
         title = '亿元';
         unitArr = ['亿元', '亿元', '亿元'];
         legendName = ['总产值', '有机认证产值', '绿色认证产值'];
         yData1 = [33, 46, 48, 56, 68, 78, 79, 89];
         yData2 = [23, 38, 44, 54, 42, 53, 64, 76];
         yData3 = [9, 12, 19, 25, 13, 20, 29, 27];
         break;
       default:
         apiFlag = 'plantSpace';
         title = '万亩';
         unitArr = ['万亩', '万亩', '万亩'];
         legendName = ['总种植面积', '有机产品认证面积', '绿色认证面积'];
         yData1 = [30, 40, 45, 50, 65, 70, 75, 80];
         yData2 = [20, 34, 47, 34, 45, 56, 67, 77];
         yData3 = [10, 15, 20, 22, 18, 23, 25, 28];
         break;
     }
     me._tokens.push(api[apiFlag].send({
       jsonData: JSON.stringify({
         "entityRelated": {
           "regionId": "530723" //地区region_id :华坪县530723 百色451000 攀枝花 510400
         },
         "orderList": [{
           "columnName": "",
           "isASC": true
         }],
         "page": {
           "pageIndex": 1,
           "pageSize": 10
         }
       })
     }).then((res) => {
       console.log(res)
       let obj = {
         showTitle: true,
         title: title,
         titleTop: 6,
         showTooltip: true,
         showTick: true,
         unitArr: unitArr,
         circleArr: ['#00ffff', '#2af594', '#fde634'],
         lineColor: ['#00ffff', '#2af594', '#fde634'],
         showLegend: true,
         itemGap: 10,
         legendLeft: 55,
         legendTop: 10,
         legendName: legendName,
         gridLeft: '10%',
         gridTop: '20%',
         gridBottom: '20%',
         smooth: true,
         xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
         yData1: yData1,
         yData2: yData2,
         yData3: yData3
       };
       me.refs.greenPlant.setData(obj);
     }));*/
  }

  componentWillUnmount() {
    this._clearTokens();
  }

}

export default HomePage;
