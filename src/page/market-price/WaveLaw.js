import React from "react";
//虚拟数据
import { SeasonData, CircleData, VariationData } from "./marketData";
import * as api from '../api/api-wavelaw-page';
import { cityArr, ChinaMap } from "./chinaMapData";
//全国芒果批发价格长期波动规律
import SeasonalRule from "../../component/web-team/market-price/seasonalRule";
//  全国芒果批发价格短周期波动
import CircleMove from "../../component/web-team/market-price/circleDateMove";
//  全国芒果批发价格季节性规律
import VariationRule from "../../component/web-team/market-price/variationRule";
// china3DMap
import MapChina from "../../component/web-team/market-price/china3D";
import Title from "../../component/web-team/title/Title";
import "./market.scss";

/**
 * 市场价格--波动规律
 */
export default class WaveLaw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonRuseData: SeasonData,
      circleDate: CircleData,
      variationData: VariationData,
      chinaMapData: ChinaMap
    }
  }
  //  转换地图数据
  convertData = (data) => {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = cityArr[data[i].region_name];
    if (geoCoord) {
      res.push({
        name: data[i].region_name,
        value: geoCoord.concat(data[i].average_price_unit)
      });
    }
  }
  // console.log(res)
  return res;
};
  //  波动规律地图
  initMapBar=()=>{
    let params = {
      jsonData: { 
        "entityRelated": { 
          "queryType": "1", 
          "regionCode": "530723", 
          "regionName": "华坪县", 
          "strainsCode": "1", 
          "strainsName": "凯特芒" 
        }, 
        "orderList": [
          { 
            "columnName": "sale_amount", 
            "isASC": true 
          }
        ], 
        "page": { 
          "pageIndex": 1, 
          "pageSize": 10 
        } 
      }
    }
    api.mapBar3D.send(params).then(res=>{
      // console.log(res)
      let priceArr = [];
      res.data.map((item,index)=>{
        priceArr[index] = item.average_price_unit
      })
      this.setState({
        minPrice: Math.min(...priceArr),
        maxPrice: Math.max(...priceArr),
        chinaMapData:{
          chinaMapData:this.convertData(res.data)
        } 
      })
    })
  }
  //  全国芒果批发价格长期波动规律
  initWaveRule=()=>{
    let params = {
      jsonData: { 
        "entityRelated": {}, 
        "orderList": [
          { 
            "columnName": "date_time", 
            "isASC": true 
          }
        ], 
        "page": { 
          "pageIndex": 1, 
          "pageSize": 200 
        } 
      }
    }
    api.waveRule.send(params).then(res=>{
      // console.log(res.data);
      let x = [],v1 = [], v2 = [];
      res.data.map((item,index)=>{
        x[index] = item.date_time;
        v1[index] = item.trend;
        v2[index] = item.dately_price;
      })
      this.setState({
        seasonRuseData: {
          legendData: ['长期趋势', '价格'],
          xAxisData: x,
          seriesData: [
            v1,
            v2
          ]
        }
      })
    })
  }
  //  全国芒果批发价格季节性规律
  initSeasonalRule = () => {
    let params = {
      jsonData: {
        "entityRelated": {},
        "orderList": [
          {
            "columnName": "date_time",
            "isASC": true
          }
        ],
        "page": {
          "pageIndex": 1,
          "pageSize": 12
        }
      }
    }
    api.seasonalRule.send(params).then(res=>{
      // console.log(res)
      let x = [],v = [];
      res.data.map((item,index)=>{
        x[index] = item.date_time;
        v[index] = item.undulation;
      })
      this.setState({
        variationData: {
          xAxisData: x,
          seriesData: v
        }
      })
    })
  }
  //  全国芒果批发价格短周期波动
  initCycleWave=()=>{
    let params = {
      jsonData: { 
        "entityRelated": {}, 
        "orderList": [
          { 
            "columnName": "date_time", 
            "isASC": true 
          }
        ], 
        "page": { 
          "pageIndex": 1, 
          "pageSize": 200 
        } 
      }
    }
    api.cycleWave.send(params).then(res=>{
      // console.log(res);
      let x = [],v = [];
      res.data.map((item,index)=>{
        x[index] = item.date_time;
        v[index] = item.undulation;
      })
      this.setState({
        circleDate: {
          xAxisData: x,
          seriesData: v
        }
      })
    })
  }
  componentDidMount(){
    //  波动规律地图
    this.initMapBar()
    //  全国芒果批发价格长期波动规律
    this.initWaveRule()
    //  全国芒果批发价格季节性规律
    this.initSeasonalRule()
    //  全国芒果批发价格短周期波动
    this.initCycleWave()
  }
  render() {
    return (
      <div className="market-container">
        <div className="left-chart">
          <MapChina minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} data={this.state.chinaMapData}/>
        </div>
        <div className="right-chart">
          <div className="market-price-title">
            <Title content="全国芒果批发价格长期波动规律" />
          </div>
          <div className="market-price-chart">
            <SeasonalRule data={this.state.seasonRuseData}/>
          </div>
        </div>
        <div className="right-chart">
          <div className="market-price-title">
            <Title content="全国芒果批发价格季节性规律" />
          </div>
          <div className="market-price-chart">
            <VariationRule data={this.state.variationData} />
          </div>
        </div>
        <div className="right-chart">
          <div className="market-price-title">
            <Title content="全国芒果批发价格短周期波动" />
          </div>
          <div className="market-price-chart">
            <CircleMove data={this.state.circleDate} />
          </div>
        </div>
      </div>
    )
  }
}


