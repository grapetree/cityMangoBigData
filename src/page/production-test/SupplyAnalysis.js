import React from 'react';
import * as api from '../api/api-supplyAnalysis';
import { getTimeData} from '../api/api-price-monitor';  //时间下拉框

import bigBorder from './big-border.png';
import smallBorder from './small-border.png';
//title 组件
import Title from '../../component/web-team/title/Title';

import ActualityLineBar from '../../component/web-team/SupplyAanlysis/actualityLineBar';
import PredictionLine from "../../component/web-team/SupplyAanlysis/predictionLine";
import MonitorLine from "../../component/web-team/SupplyAanlysis/monitorLine";
import ProcessLine from "../../component/web-team/SupplyAanlysis/processLine";
import FreshTop10 from "../../component/web-team/SupplyAanlysis/freshTop10";
import Select from '../../component/web-team/select/Select';

import { ActualityData, PredictionData, FreshTop10Data, MonitorLineData} from "./productionData";

/**
 * 产销监测--供需分析
 * @author wxy
 */
class SupplyAnalysis extends React.Component {
  constructor() {
    super();
    const me = this;
    this.state = {
      actualityData: ActualityData,
      precisionData: PredictionData,
      // freshTop10Data: FreshTop10Data,
      monitorLineData: MonitorLineData,
      processLineData: MonitorLineData,
      timeData: [],
      processNameData: [],
      processCodeData: [],
      monitorNameData: [],
      monitorCodeData: []
    };

    me.homePageStyle = {
      width: '1920px',
      height: '1080px',
      backgroundSize: 'contain'
    };
    me.actualityStyle = {
      position: 'absolute',
      top: '106px',
      left: '160px',
      width: '1030px',
      height: '457px',
      background: `url(${bigBorder}) no-repeat center center`,
      backgroundSize: '100%'
    };
    me.predictionStyle = {
      position: 'absolute',
      top: '596px',
      left: '160px',
      width: '1030px',
      height: '457px',
      background: `url(${bigBorder}) no-repeat center center`,
      backgroundSize: '100%'
    };
    me.top10Style = {
      position: 'absolute',
      top: '105px',
      right: '40px',
      width: '660px',
      height: '298px',
      background: `url(${smallBorder}) no-repeat center center`,
      fontSize:'0',
      backgroundSize: '100%'
    };
    me.monitor = {
      position: 'absolute',
      top: '429px',
      right: '40px',
      width: '660px',
      height: '298px',
      background: `url(${smallBorder}) no-repeat center center`,
      backgroundSize: '100%'
    };
    me.process = {
      position: 'absolute',
      top: '753px',
      right: '40px',
      width: '660px',
      height: '298px',
      background: `url(${smallBorder}) no-repeat center center`,
      backgroundSize: '100%'
    };
    me.headerText = {
      position: 'absolute',
      top: '55px',
      left: '20px',
      color: '#46ebff',
      fontSize: '14px'
    };
    me.freshTop10 = {
      display: 'inline-block',
      width: '50%',
      height: '100%',
    };
    me.processedTop10 = {
      display: 'inline-block',
      width: '50%',
      height: '100%',
    }
  }
  //时间下拉框初始化
  initTimeSelect = () => {
    let getTimeDataParams = {
      jsonData: {
        "entityRelated" : {
          "viewName" : "year", //视图名，年year，月month，日date，小时hour（默认为年）
          "hasCurrent" : true,
          "pastNum" : "5", //往前推多少
          "afterNum" : "0",//往后推多少
          "isASC" : false
        }
      }
    };
    getTimeData.send(getTimeDataParams).then((res) => {
      // console.log(res)
      this.setState({
        timeData: (res.data),
      });
      this.freshTop(res.data[0]);
      this.Monitor(res.data[0], this.state.strainsCode);
      this.Process(res.data[0], this.state.processStrainsCode);
    })
  };
  //鲜芒果不同品种下拉框
  initMonitorSelect = () => {
    api.selectMonitorData.send().then((res) => {
      let monitorName = [];
      let monitorCode = [];
      // console.log(res)
      res.data.map((item, index) => {
        monitorName[index] = item.text;
        monitorCode[index] = item.code;
      });
      this.setState({
        monitorNameData: monitorName,
        monitorCodeData: monitorCode
      });
      this.Monitor(this.state.year, res.data[0].code);
    })
  };
  //芒果加工品下拉框
  initProcessSelect = () => {
    api.selectProcessData.send().then((res) => {
      let processName = [];
      let processCode = [];
      res.data.map((item, index) => {
        processName[index] = item.text;
        processCode[index] = item.code
      });
      // console.log(processCode)
      this.setState({
        processNameData: processName,
        processCodeData: processCode
      });
      this.Process(this.state.year, res.data[0].code);
    })
  };
  //top10
  _freshTop = (a) => {
    this.freshTop(a.name)
  };
  //鲜芒果
  _monitorYear = (a) => {
    this.Monitor(a.name, this.state.strainsCode);
    this.setState({
      year: a.name
    })
  };
  _monitorVariety = (a) => {
    this.Monitor(this.state.year, a.key);
    this.setState({
      strainsCode: a.key
    })
  };
  //芒果加工产品
  _processYear = (a) => {
    this.Process(a.name,this.state.processStrainsCode);
    this.setState({
      year:a.name
    })
  };
  _processVariety = (a) => {
    // console.log(a.key)
    this.Process(this.state.year,a.key);
    this.setState({
      processStrainsCode:a.key
    })
  };

  //华坪芒果销售地区TOP10
  freshTop = (year) => {
    let freshTop10Params = {
      jsonData: {
        "entitySale": { "year": year || new Date().getFullYear() }
      }
    };
    api.FreshTop10.send(freshTop10Params).then((res) => {
      let saleFreshData = res.data[0].saleFresh;
      let saleProcessData = res.data[0].saleProcess;
      let FreshTop10Area = [];
      let FreshTop10Value = [];
      let saleProcessArea = [];
      let saleProcessValue = [];
      saleFreshData.map((item, index) => {
        FreshTop10Area.push(item.saleRegionText);
        FreshTop10Value.push(item.saleAmount);
      });
      saleProcessData.map((item, index) => {
        saleProcessArea.push(item.saleRegionText);
        saleProcessValue.push(item.saleAmount);
      });
      this.setState ({
        freshTop10Data: {
          yAxisData: FreshTop10Area.reverse(),
          seriesData: FreshTop10Value.reverse()
        },
        saleProcessData: {
          yAxisData: saleProcessArea.reverse(),
          seriesData: saleProcessValue.reverse()
        }
      });
      // console.log(this.state);
    });
  };

  //鲜芒果不同品种产销率监测
  Monitor = (year, strainsCode) => {
    let MonitorParams = {
      jsonData: {
        "entitySale":{
          "year": year || new Date().getFullYear(),
          "strainsCode": strainsCode || "1"
        }
      }
    };
    api.MonitorLine.send(MonitorParams).then((res) => {
      let monthData = [];
      let proSaleRateData = [];
      res.data.map((item, index) => {
        monthData.push(item.month);
        proSaleRateData.push(item.proSaleRate);
      });
      this.setState ({
        monitorLineData: {
          xAxisData: monthData,
          seriesData: proSaleRateData
        }
      })
    });
  };

  //芒果加工品产销率监测
  Process = (year, processStrainsCode) => {
    let ProcessParams = {
      jsonData: {
        "entitySale":{
          "year": year || new Date().getFullYear(),
          "processStrainsCode": processStrainsCode || "1"
        }
      }
    };
    api.ProcessLine.send(ProcessParams).then((res) => {
      // console.log(res);
      let monthData = [];
      let proSaleRate = [];
      res.data.map((item, index) => {
        monthData.push(item.month);
        proSaleRate.push(item.proSaleRate)
      });
      this.setState ({
        processLineData: {
          xAxisData: monthData,
          seriesData: proSaleRate
        }
      });
      // console.log(this.state);
    })
  };

  componentDidMount(){
    //时间下拉
    this.initTimeSelect();
    //不同品种下拉框
    this.initMonitorSelect();
    //芒果加工品下拉框
    this.initProcessSelect();
    this.freshTop();
    this.Monitor();
    this.Process();
    // 供求预测
    let PredictionLineParams = {
      jsonData: {}
    };
    api.PredictionLine.send(PredictionLineParams).then((res) => {
      let yearData = [];
      let saleData = [];
      let yieldData = [];
      yearData = res.data[0].dateTime;
      saleData = res.data[0].saleY;
      yieldData = res.data[0].yieldY;
      this.setState ({
        precisionData: {
          xAxisData: yearData,
          seriesData: [saleData, yieldData]
        }
      })
    });

    //供求现状
    let actualityParams = {
      jsonData: {}
    };
    api.ActualityLineBar.send(actualityParams).then((res) => {
      // console.log(res);
      let yearData = [];
      let saleAmount = [];
      let productGrowthRate = [];
      let saleGrowthRate = [];
      let productTotal = [];
      //小标题数据
      let titleYear = '';
      let titleProduct = '';
      let titleSale = '';
      let length = '';
      let cValue = '';
      length = res.data.length;
      titleYear = res.data[length-1].year;
      titleProduct = res.data[length-1].productTotal;
      titleSale = res.data[length-1].saleAmount;
      cValue = Math.abs(titleProduct-titleSale);

      res.data.map((item, index) => {
        yearData.push(item.year);
        saleAmount.push(item.saleAmount);
        productGrowthRate.push(item.productGrowthRate);
        saleGrowthRate.push(item.saleGrowthRate);
        productTotal.push(item.productTotal);
      });
      this.setState({
        actualityData: {
          xAxisData: yearData,
          seriesData: [productTotal, saleAmount, productGrowthRate, saleGrowthRate]
        },
        titleYear: titleYear,
        titleProduct: titleProduct,
        titleSale: titleSale,
        cValue: cValue
      })
    })
  };

  render() {
    const me = this;
    return (
      <div style={me.homePageStyle}>
        {/*供求现状*/}
        <div style={me.actualityStyle}>
          <Title content={'供求现状'}/>
          <p style={{ position:'absolute',color: '#46ebff',fontSize:'16px',padding:'52px 20px 0',lineHeight:'22px'}}>{me.state.titleYear}年度，华坪芒果产量{me.state.titleProduct}万吨，销量{me.state.titleSale}万吨，差值为{me.state.cValue}万吨</p>
          <ActualityLineBar data={me.state.actualityData}/>
        </div>
        {/*供求预测*/}
        <div style={me.predictionStyle}>
          <Title content={'供求预测'}/>
          <PredictionLine data={me.state.precisionData}/>
        </div>
        {/*华坪芒果销售地区TOP10*/}
        <div style={me.top10Style}>
          <Title content={'华坪芒果销售地区TOP10'}/>
          <Select _pullDownMes={this._freshTop} nameArr={this.state.timeData} style={{
            position: 'absolute',
            top: '10px',
            right: '35px',
            width: '110px',
            zIndex: '9999999'
          }}/>
          <div style={me.freshTop10}>
            <FreshTop10 
              data={me.state.freshTop10Data}
              text="鲜果销量TOP10地区"
              linearColor={['#0C80E8', '#01ECF6']}
              margins="50"
              textStyle={{
                color: '#FFF',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                align:'left'
              }}
              gird={{
                right: '15%',
                left: '20%',
                bottom: '5%',
                top: '28%'
              }}
            />
          </div>
          <div style={me.processedTop10}>
            <FreshTop10
              data={me.state.saleProcessData}
              text="加工品销量TOP10地区"
              linearColor={['#d0bc44', '#F8EE27']}
              margins="50"
              textStyle={{
                color: '#FFF',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                align:'left'
              }}
              gird={{
                right: '15%',
                left: '20%',
                bottom: '5%',
                top: '28%'
              }}
            />
          </div>
        </div>
        {/*鲜芒果不同品种产销率监测*/}
        <div style={me.monitor}>
          <Title content={'鲜芒果不同品种产销率监测'}/>
          <Select _pullDownMes={this._monitorYear} nameArr={this.state.timeData} style={{
            position: 'absolute',
            top: '20px',
            right: '180px',
            width: '110px',
            zIndex: '9999999'
          }}/>
          <Select _pullDownMes={this._monitorVariety} keyArr={this.state.monitorCodeData} nameArr={this.state.monitorNameData} width={110} style={{
            position: 'absolute',
            top: '20px',
            right: '35px',
            width: '110px',
            zIndex: '9999999'
          }}/>
          <MonitorLine data={me.state.monitorLineData}/>
        </div>
        {/*芒果加工品产销率监测*/}
        <div style={me.process}>
          <Title content={'芒果加工品产销率监测'}/>
          <Select _pullDownMes={this._processYear} nameArr={this.state.timeData} style={{
            position: 'absolute',
            top: '20px',
            right: '180px',
            width: '110px',
            zIndex: '9999999'
          }}/>
          <Select _pullDownMes={this._processVariety} keyArr={this.state.processCodeData} nameArr={this.state.processNameData} width={110} style={{
            position: 'absolute',
            top: '20px',
            right: '35px',
            width: '110px',
            zIndex: '9999999'
          }}/>
          <ProcessLine data={me.state.processLineData}/>
        </div>
      </div>
    )
  }
}

export default SupplyAnalysis;
