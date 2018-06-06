import React from 'react';
import * as api from '../api/api-production-actuality';
import Panel from '../../component/visual-team/panel/Panel';
import Title from '../../component/visual-team/title/Title';
import Select from '../../component/visual-team/other/Select';

import PureLine from '../../component/visual-team/line/PureLine';
import PureLine1 from '../../component/visual-team/line/PureLine1';

import PureBar from '../../component/visual-team/bar/PureBar1';
import ManggoProductPlace from '../../component/visual-team/other/manggo-product-place/ManggoProductPlace';

import MangoValue from '../../component/visual-team/d3/MangoValue';

import WaterPolo from '../../component/visual-team/water-polo/WaterPolo';
//地图中间组件
import town from '../../component/visual-team/town-map/town-bg.png';
import NanGeErPie from '../../component/visual-team/pie/PlantMap';
//地图
import ProductionStatus from '../../component/visual-team/town-map/ProductionStatus.jsx';

import MangoPlantState from '../../component/visual-team/data-box/MangoPlantState';

import up from '../../component/visual-team/data-box/arrow-up.png';
import down from '../../component/visual-team/data-box/arrow-down.png';

/**
 * 种植生产--生产现状
 */
class ProductionActuality extends React.Component {
  constructor(props) {
    super(props);
    this.flagError = false;
    this.plantStyle = {
      width: '235px',
      height: '220px',
      position: 'absolute',
      right: '20px',
      top: '93px'
    }
    this.state = {
      manggoPlantStructure1: 0,
      manggoPlantStructure2: 0
    }
  }

  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  _pullDownMes() {

  }
  _pullDownMes1(e) {
    console.log(e);
    this.refs.productConditionTrend.setSelect(e.name);
  }

  render() {

    return (
      <div>
        <Panel height={300} width={420} left={'160px'} top={'125px'}>
          <Title left={20} top={20} content={'芒果产值情况'} />

          <p style={{ fontSize: '18px', color: '#46ebff', position: 'absolute', left: '35px', top: '50px', marginBottom: 0 }}>
            <span>总产值</span>
            <span style={{ fontSize: '30px', color: '#fff', fontWeight: 700, margin: '0 5px' }}>10</span>
            <span style={{ color: '#fff' }}>亿元</span>
          </p>
          <MangoValue style={{ position: 'absolute', left: '40px', top: '100px' }} dataIcon={'fruits'} />
          <WaterPolo width={'0.8rem'} top={'123px'} left={'63px'} dataIcon={'left'} ref={'water'} />

          <div style={{ position: 'absolute', left: '250px', top: '97px' }}>
            <p style={{ width: '150px', fontSize: '18px', color: '#46ebff', position: 'absolute', left: '0px', top: '-50px', marginBottom: 0, height: '40px', lineHeight: '50px' }}>
              <span style={{ float: 'left' }}>同比</span>
              <span style={{ float: 'left', fontSize: '30px', color: '#fff', fontWeight: 700, margin: '0 5px' }}>+</span>
              <span style={{ float: 'left', fontSize: '30px', color: '#fff' }}>2</span>
              <span style={{ float: 'left', color: '#fff' }}>%</span>
              <img src={up} alt="" style={{ float: 'left', margin: '12px 0 0 8px' }} />
            </p>
            <MangoValue style={{ position: 'absolute', left: '0px', top: '0px' }} dataIcon={'agriculture'} />
            <WaterPolo width={'0.8rem'} top={'23px'} left={'22px'} dataIcon={'right'} ref={'water1'} />
          </div>
          <p style={{ color: '#fff', fontSize: '15px', position: 'absolute', left: '18px', bottom: '-5px' }}>注：芒果产值是鲜芒果产值与加工品产值之和</p>

        </Panel>

        <div style={{ background: `url(${town}) no-repeat right bottom`, backgroundSize: '862px 670px', width: '862px', height: '670px', position: 'absolute', left: '586px', top: '70px', border: '1px solid #fff' }}>
          <Select _pullDownMes={this._pullDownMes.bind(this)} nameArr={['2015', '2016', '2017']} width={115} style={{
            position: 'absolute',
            top: '60px',
            right: '20px'
          }} />
          <NanGeErPie ref={'plantRefs'} style={this.plantStyle} title={''} />
          <div style={{ width: '550px', height: '607px', marginLeft: '142px', marginTop: '54px' }}>
            <ProductionStatus data={60} ref={'ProductionStatusRefs'} />
          </div>
        </div>

        <Panel height={610} width={420} left={'1460px'} top={'125px'}>
          <Title left={20} top={20} content={'芒果种植情况'} />

          <MangoPlantState />

        </Panel>

        <Panel height={300} width={420} left={'160px'} top={'435px'}>
          <Title left={20} top={20} content={'芒果单产预测'} />
          <div style={{ width: 400, height: 235, position: 'absolute', left: '17px', top: '60px' }}>
            <PureLine style={{ width: '400px', height: '235px', position: 'absolute' }} ref={'mangoForeat'} />
          </div>
        </Panel>

        <Panel height={295} width={420} left={'160px'} top={'745px'}>
          <Title left={20} top={20} content={'芒果品种种植结构'} />
          <div style={{ width: 400, height: 235, position: 'absolute', left: '17px', top: '60px' }}>
            <p style={{ color: '#46ebff', fontSize: '14px' }}>{`2017年华坪县芒果种植品种主要是${this.state.manggoPlantStructure1}，占 总面积的${this.state.manggoPlantStructure2}%`}</p>
            <PureBar style={{ width: '400px', height: '235px', position: 'absolute', top: '10px' }} ref={'manggoPlantStructure'} />
          </div>
        </Panel>

        <Panel height={295} width={850} left={'595px'} top={'745px'}>
          <Title left={20} top={20} content={'生产情况走势'} />
          <Select _pullDownMes={this._pullDownMes1.bind(this)} nameArr={['种植面积', '产量', '产值']} width={80} style={{
            position: 'absolute',
            top: '20px',
            left: '723px'
          }} />
          <div style={{ width: 825, height: 235, position: 'absolute', left: '17px', top: '60px' }}>
            <p style={{ color: '#46ebff', fontSize: '14px' }}>2017年华坪县芒果种植面积20万亩，有机种植面积10万亩，绿色认证面积5万亩</p>
            <PureLine1 style={{ width: '825px', height: '235px', position: 'absolute' }} ref={'productConditionTrend'} />
          </div>
        </Panel>

        <Panel height={295} width={420} left={'1460px'} top={'745px'}>
          <Title left={20} top={20} content={'芒果生产基地'} />
          <ManggoProductPlace ref={'place'} />
        </Panel>
      </div>
    )
  }
  componentDidMount() {
    let me = this;

    me.refs.water.setData({
      value: 27
    });
    me.refs.water1.setData({
      value: 47
    });

    // 龙头企业产量及产值占比
    me._tokens.push(api.plantJson.send({}).then((res) => {
      let obj = {
        titleShow: false,
        legendShow: false,
        seriesRadius: [15, 75],
        seriesCenter: ['50%', '50%'],
        seriesData: res.data,
        colorTop: ['#fed645', '#1093f5', '#29ccf4', '#2af594', '#58e2c2', '#d9ff87', '#fed645', '#1093f5'],
        colorBottom: ['#eea21f', '#1779ff', '#29ccf4', '#12d578', '#58e2c2', '#feff87', '#eea21f', '#1779ff']
      };
      me.refs.plantRefs.setData(obj);
    }));

    // 平均单产预测
    me._tokens.push(api.manggoForeat.send({
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
      me.refs.mangoForeat.setData(obj);
    }));

    // // 芒果单产预测
    // me._tokens.push(api.manggoForeat.send().then((res) => {
    //   this.flagError = true;
    //   try {
    //     let obj = {
    //       showTitle: true,
    //       title: '单产（公斤／亩）',
    //       titleTop: 6,
    //       showTooltip: true,
    //       showTick: true,
    //       unitArr: ['公斤/亩', '公斤/亩'],
    //       circleArr: ['#fde634', '#46ebff'],
    //       lineColor: ['#fde634', '#46ebff'],
    //       showLegend: true,
    //       itemGap: 25,
    //       legendLeft: 140,
    //       legendTop: 7,
    //       legendName: ['预测平均单产', '实际平均单产'],
    //       gridLeft: '6%',
    //       gridTop: '20%',
    //       gridBottom: '12%',
    //       smooth: true,
    //       gridRight: '8%',
    //       xData: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
    //       yData1: [1.3, 2.3, 4.7, 2.4, 1.5, 5.6, 3.3, 1.5],
    //       yData2: [4.3, 3.3, 2.7, 5.4, 5.5, 2.6, 5.3, 1]
    //     };
    //     me.refs.mangoForeat.setData(obj);
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }));

    // 生产情况走势
    me._tokens.push(api.productConditionTrend.send({ jsonData: JSON.stringify({ "entityRelated": { "regionId": "530723" } }) }).then((res) => {
      this.flagError = true;
      try {
        let obj = {
          showTitle: true,
          title: '万亩',
          titleTop: 6,
          showTooltip: true,
          showTick: true,
          unitArr: ['万亩', '万亩', '万亩'],
          circleArr: ['#00ffff', '#2af594', '#fde634'],
          lineColor: ['#00ffff', '#2af594', '#fde634'],
          showLegend: true,
          itemGap: 25,
          legendLeft: 440,
          legendTop: 7,
          legendName: ['总种植面积', '有机产品认证面积', '绿色认证面积'],
          gridLeft: '4%',
          gridTop: '20%',
          gridBottom: '20%',
          smooth: true,
          gridRight: '3%',
          Data: res.data,
          xData: res.data.xData,
          yData1: [33, 23, 47, 24, 15, 56, 33, 15],
          yData2: [43, 33, 27, 54, 55, 26, 53, 18],
          yData3: [53, 43, 67, 57, 35, 56, 56, 15]
        };
        console.log(obj);
        me.refs.productConditionTrend.setData(obj);
      } catch (e) {
        console.log(e);
      }
    }));

    //芒果品种种植结构
    me._tokens.push(api.manggoPlantStructure.send({ jsonData: JSON.stringify({ "entityRelated": { "year": "2018", "regionId": "530723" } }) }).then((res) => {

      function compare(attr) {
        return function (a, b) {
          let v1 = parseFloat(a[attr]), v2 = parseFloat(b[attr]);
          return v2 - v1;
        }
      }
      res.data.sort(compare('growProportion'));
      let _xdata = [];
      let _ydata = [];
      let _manggoPlantStructure1 = '';
      let _manggoPlantStructure2 = 0;
      for (let i = 0; i < res.data.length; i++) {
        _xdata.push(res.data[i].strainsText);
        _ydata.push(res.data[i].growArea);
        if (i <= 2) {
          _manggoPlantStructure1 = _manggoPlantStructure1 + res.data[i].strainsText + '，';
          _manggoPlantStructure2 = _manggoPlantStructure2 + parseFloat(res.data[i].growProportion);
        }
        if (i == 3) {
          _manggoPlantStructure1 = _manggoPlantStructure1 + res.data[i].strainsText;
          _manggoPlantStructure2 = _manggoPlantStructure2 + parseFloat(res.data[i].growProportion);

        }
      }
      this.flagError = true;
      try {
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
          gridLeft: '8%',
          gridTop: 0,
          gridBottom: 40,
          gridRight: '10%',
          smooth: true,
          num: 1,
          yNum: 2,
          Data: res.data,
          xData: _xdata,
          yData1: _ydata,
          colorStartOne: 'rgba(0,204,255,1)',
          colorEndOne: 'rgba(0,204,255,0.3)'
        };
        if (this.flagError) {
          me.refs.manggoPlantStructure.setData(obj);
          this.setState({
            manggoPlantStructure1: _manggoPlantStructure1,
            manggoPlantStructure2: _manggoPlantStructure2
          })
        }
      } catch (e) {
        console.log(e);
      }
    }));

    //芒果产业基地
    me._tokens.push(api.manggoProductPlace.send().then((res) => {
      this.flagError = true;
      try {
        if (this.flagError) {
          me.refs.place.setData(res);
        }
      } catch (e) {
        console.log(e);
      }
    }));
  }

  componentWillUnmount() {
    this._clearTokens();
    this.flagError = false;
  }

}

export default ProductionActuality;
