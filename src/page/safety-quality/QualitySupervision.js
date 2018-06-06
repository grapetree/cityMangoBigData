import React from 'react';
import Title from '../../component/web-team/title/Title'
//  虚拟数据
import { lineData, pieData, areaNum, completion, FeedBack } from './qualityData.js'
//  折线图
import QualityLine from '../../component/web-team/safety-quality/quality-line'
//  折线图
import Feedback from '../../component/web-team/safety-quality/quality-line-area'
//  仪表盘
import QualityGauge from '../../component/web-team/safety-quality/quality-gauge'
//  水球图
import LiquidPie from '../../component/web-team/safety-quality/liquidFillPie'
//  饼图
import QualityPie from '../../component/web-team/safety-quality/quality-pie'
//  下拉框
import Select from '../../component/web-team/select/Select'
// 地图
import QualityMap from '../../component/web-team/safety-quality/quality-city-map'
import './quality.scss'
import * as api from '../api/api-quality-page';
import { getTimeData } from '../api/api-import-trade'
/**
 * 质量安全--质量监管
 */

class QualitySupervision extends React.Component {
  constructor(pros) {
    super(pros);
    this.state = {
      regulatoryData: lineData(),
      mainBodyData: lineData(),
      pieData: pieData(),
      areaNum: areaNum,
      FeedBackData: FeedBack(),
      completion: completion,
      qualityProblem: { zcount: 0, wtcount: 0 }, // 扫码反馈
      timeData:[],
      typeInput: [],
      cityMapArr:[]
    }
  }
  //  投入品种类监管下拉
  initRegulatoryType = ()=>{
    api.regulatoryType.send().then(res=>{
      // console.log(res)
      if (res.isSuccess){
        let typeInputArr = [],keyArr = [],valueArr = [];
        res.data.map((v,i)=>{
          typeInputArr[i] = v.text
          keyArr[i] = v.code
          valueArr[i] = v.id
        })
        this.setState({
          typeInput: typeInputArr,
          keyArr: keyArr,
          valueArr: valueArr
        })
        //  投入品种类监管折线
        this.initRegulatory(res.data[0].code, this.state.nowTime)
      }
    })
  }
  //  华坪县地图
  initCityMap = () =>{
    api.cityMap.send().then(res=>{
      if (res.isSuccess) {
        let arrCity = [];
        res.data.map((item,index)=>{
          arrCity[index] = {
            name:item.name,
            value: [item.latitude, item.longitude, 10, item.organicArea, item.inspection, item.inspectionQualified, item.issueTimes]
          }
        })
        this.setState({
          cityMapArr: arrCity
        })
      }
    })
  }
  //  时间下拉初始化
  initSelect = () =>{
    let getTimeDataParams = {
      jsonData: {
        "entityRelated": {
          "viewName": "year",
          "hasCurrent": true,
          "pastNum": "5",//包括现在，然后往前推多少，现在为6
          "afterNum": "0"
        } 
      }
    }
    getTimeData.send(getTimeDataParams).then((res) => {
      // console.log(res.data)
      this.setState({
        timeData: res.data,
        firstInitTime: res.data[0]
      })
      // 扫码反馈
      this.initFeddBack(res.data[0])
      //  投入品种类监管折线
      // this.initRegulatory(this.state.nowTypeInput,res.data[0])
      // 投入主体监管
      this.initMainBody(res.data[0])
    })
  }
  //  投入品种类监管时间下拉
  _inputRegulatory = (a)=>{
    // console.log(a)
    this.setState({
      nowTime: a.name
    })
    this.initRegulatory(this.state.nowTypeInput, a.name)
  }
  //  投入品种类监管品种下拉
  _typeInput = (a)=>{
    this.setState({
      nowTypeInput: a.key
    })
    this.initRegulatory(a.key, this.state.nowTime)
  }
  //  投入品种类监管折线
  initRegulatory = (type,year)=>{
    let params = {
      jsonData: {
        "entityTypeInput": {
          "typeInput": type || 1,
          "year": year || new Date().getFullYear()
        }, 
        "page": { 
          "pageIndex": 1, 
          "pageSize": 10 
        } 
      }
    }
    api.initRegulatory.send(params).then((res)=>{
      // console.log(res.data)
      let x = [], v1 = [], v2 = [];
      res.data.dateList.map((item, index) => {
        x[index] = item.month;
        v1[index] = item.num;
        v2[index] = res.data.qualityThreshold;
      })
      this.setState({
        regulatoryData: {
          xAxisData: x,
          seriesData: [v1, v2]
        }
      })
    })
  }
  //  投入主体类监管下拉
  _inputMainBody = (a)=>{
    this.initMainBody(a.name)
  }
  //  投入主体类监管折线
  initMainBody = (year)=>{
    let params = {
      "jsonData": {
        "entityInputSubject": { "year": year || new Date().getFullYear() }
      }
    }
    api.inputMainBody.send(params).then((res)=>{
      let x=[],v1=[],v2=[];
      res.data.map((item,index)=>{
        x[index] = item.month;
        v1[index] = item.ztcont;
        v2[index] = item.num;
      })
      this.setState({
        mainBodyData: {
          xAxisData: x,
          seriesData: [ v1, v2 ]
        }
      })
    })
  }
  //  扫码反馈下拉
  _feedBack = (a) =>{
    this.initFeddBack(a.name)
  }
  // 扫码反馈折线
  initFeddBack = (year) => {
    let params = {
      "jsonData":{
        "entityScavenging": { "year": year || new Date().getFullYear() }
      }
    }
    api.feedback.send(params).then((res) => {
      let data = res.data[0]
      let x = []
      let v = []
      data.smcount.map((item,index)=>{
        x[index] = item.month
        v[index] = item.smcount
      })
      this.setState({
        qualityProblem: data.qualityProblem[0],
        FeedBackData:{
          xAxisData: x,
          seriesData: v 
        }
      })
    })
  }
  //  质量安全综合指数仪表盘下拉
  _cityMap = (a) => {
    this.initQualityNum(a.name)
  }
   // 质量安全综合指数
  initQualityNum = (year) =>{
    let params = {
      jsonData: {
        "entityQuality": {
          "year": year || new Date().getFullYear()
        }
      }
    }
    api.safetyIndex.send(params).then(res => {
      // console.log(res.data[0].exponent)
      this.setState({
        completion: res.data[0].exponent
      })
    })
  }
  componentDidMount(){
    // 质量安全综合指数
    this.initQualityNum()
    // 三品种植情况
    api.plantSituation.send().then(res =>{
      // console.log(res)
      let pieArr = [],arrMax = [],sumArr = 0;
      res.data[0].threeCertification.map((item,index)=>{
        arrMax[index] = item.identificationArea
        pieArr.push({
          name: item.identificationTypeText,
          value: item.identificationArea
        })
      })
      sumArr = ((Math.max(...arrMax) / arrMax.reduce((prev, curr, idx, arrMax) => { return prev + curr })).toFixed(2))*100+'%'
      this.setState({
        areaNum:{   //  水球图
          unit: res.data[0].totalArea[0].identificationAreaText2,
          value: res.data[0].totalArea[0].identificationArea2
        },
        pieData: pieArr,
        maxValue: sumArr
      })
    })
    // 质量检测
    api.qualityDetection.send().then((res) => {
      // console.log(res)
      let x = [];
      let v1 = [];
      let v2 = [];
      res.data.map((item, index)=>{
        x.push(item.month)
        v1.push(item.inspectionQualified)
        v2.push(item.lastInspectionQualified)
      })
      this.setState({
        totalCount: res.totalCount,
        detectionData: {
          xAxisData: x,
          seriesData: [v1, v2]
        }
      })
    });
    // 时间下拉
    this.initSelect()
    //  投入品种类监管下拉
    this.initRegulatoryType()
    //  华坪县地图
    this.initCityMap()
  }
  render() {
    return (
      <div className="my-chart">
        <div className="my-chart-bg left-chart">
          <div className="quality-title">
            <Title content="质量安全综合指数" />
          </div>
          <Select _pullDownMes={this._cityMap} nameArr={this.state.timeData} width={110} style={{
            position: 'absolute',
            top: '18px',
            left: '285px',
            zIndex: 999999
          }} />
          <div className="quality-chart" style={{width:'420px',height:'300px'}}>
            <QualityGauge data={this.state.completion} a={this.state.a} />
            <div className="gauge-bg"></div>
          </div>
        </div>
        <div className="my-chart-bg left-chart">
          <div className="quality-title">
            <Title content="质量检测" />
            {/* <p style={{ 
              position: 'absolute', 
              color: '#46ebff', 
              fontSize: '14px', 
              padding: '46px 20px 0', 
              lineHeight: '22px'
              }}>2017-09 华坪县芒果质量安全抽样检测次数{ this.state.totalCount }次，检测合格率98%</p> */}
          </div>
          <div className="quality-chart">
            <QualityLine 
              data={this.state.detectionData} 
              legend={['当年', '上一年']} 
              legrndLeft="260px" 
              unitName="合格率"
              showSymbol='yes'
              legendTop="10"
              formatter={'{value}%'}
              gird={{ left: 30, right: 20, top: 45, bottom: 20, containLabel: true}} />
          </div>
        </div>
        <div className="my-chart-bg center-chart">
          <QualityMap data={this.state.cityMapArr}/>
        </div>
        <div className="my-chart-bg right-chart">
          <div className="quality-title">
            <Title content="三品种植情况" />
          </div>
          <div className="quality-chart clearfix">
            <div className="center-chart-left fl">
              <LiquidPie data={this.state.areaNum}/>
            </div>
            <div className="center-chart-right fr">
              <QualityPie maxValue={this.state.maxValue} data={this.state.pieData}/>
            </div>
          </div>
        </div>
        <div className="my-chart-bg right-chart">
          <div className="quality-title">
            <Title content="扫码反馈" />
          </div>
          <Select _pullDownMes={this._feedBack} nameArr={this.state.timeData} width={110} style={{
            position: 'absolute',
            top: '20px',
            left: '280px'
          }} />
          <div className="quality-title-under clearFix">
            <div style={{marginRight:'36px'}}>
              <strong><i className="numSpan">{this.state.qualityProblem.zcount}</i>次</strong>
              <span>溯源扫码数量</span>
            </div>
            <div>
              <strong><i className="numSpan">{this.state.qualityProblem.wtcount}</i>次</strong>
              <span>质量问题</span>
            </div>
          </div>
          <div className="quality-chart" style={{position:'absolute',lett:0,bottom:0}}>
            <Feedback
              data={this.state.FeedBackData}
              legend={['', '']}
              legrndLeft="260px"
              unitName="单位：次"
              showSymbol='yes'
              legendTop="45"
              gird={{ left: 20, right: 20, top: 110, bottom: 20, containLabel: true 
            }} />
          </div>
        </div>
        <div className="my-chart-bg bottom-left-chart">
          <div className="quality-title">
            <Title content="投入品种类监管" />
          </div>
          <Select _pullDownMes={this._inputRegulatory} nameArr={this.state.timeData} width={110} style={{
            position: 'absolute',
            top: '20px',
            left: '700px'
          }} />
          <Select _pullDownMes={this._typeInput} keyArr={this.state.keyArr} valueArr={this.state.valueArr} nameArr={this.state.typeInput} width={110} style={{
            position: 'absolute',
            top: '20px',
            left: '560px'
          }} />
          <div className="quality-chart">
            <QualityLine 
              data={this.state.regulatoryData} 
              legend={['当前检测值', '预警值']} 
              unitName="单位：个"
              showSymbol='true'/>
          </div>
        </div>
        <div className="my-chart-bg bottom-right-chart">
          <div className="quality-title">
            <Title content="投入主体类监管" />
          </div>
          <Select _pullDownMes={this._inputMainBody} nameArr={this.state.timeData} width={110} style={{
            position: 'absolute',
            top: '20px',
            left: '700px'
          }} />
          <div className="quality-chart">
            <QualityLine 
              data={this.state.mainBodyData} 
              legend={['检测主题数', '处罚次数']} 
              unitName="单位：次"/>
          </div>
        </div>
      </div>
    )
  }
}

export default QualitySupervision;
