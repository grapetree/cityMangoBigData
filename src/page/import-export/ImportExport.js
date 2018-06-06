import React from 'react';
//  小标题
import Title from '../../component/web-team/title/Title'
//  下拉框
import Select from '../../component/web-team/select/Select'
//  前十国贸易
import FreshTop10 from "../../component/web-team/SupplyAanlysis/freshTop10";
//  进出口价格
import Feedback from '../../component/web-team/safety-quality/quality-line-area'
//  贸易规模
import RiseFall from '../../component/web-team/market-price/riseFallBar'
import WorldMap from '../../component/web-team/import-export/worldMap'
import './import-export.scss';
import * as api from '../api/api-import-trade'
import {  Tabs,Radio } from 'antd';
const TabPane = Tabs.TabPane;
let worldGeoCoordMap = {
  '北京市': [116.24, 39.55],
  '中国香港': [114.1178, 22.3242],
  '中国澳门': [111.5547, 22.1484],
  '中国台湾': [120.0254, 23.5986],
  "阿富汗": [69.11, 34.28],
  "阿尔巴尼亚": [19.49, 41.18],
  "阿尔及利亚": [3.08, 36.42],
  "美属萨摩亚": [-170.43, -14.16],
  "安道​​尔": [1.32, 42.31],
  "安哥拉": [13.15, -8.50],
  "安提瓜和巴布达": [-61.48, 17.20],
  "阿根廷": [-60.00, -36.30],
  "亚美尼亚": [44.31, 40.10],
  "阿鲁巴": [-70.02, 12.32],
  "澳大利亚": [149.08, -35.15],
  "奥地利": [16.22, 48.12],
  "阿塞拜疆": [49.56, 40.29],
  "巴哈马": [-77.20, 25.05],
  "巴林": [50.30, 26.10],
  "孟加拉国": [90.26, 23.43],
  "巴巴多斯": [-59.30, 13.05],
  "白俄罗斯": [27.30, 53.52],
  "比利时": [4.21, 50.51],
  "伯利兹": [-88.30, 17.18],
  "贝宁": [2.42, 6.23],
  "不丹": [89.45, 27.31],
  "玻利维亚": [-68.10, -16.20],
  "波斯尼亚和黑塞哥维那": [18.26, 43.52],
  "博茨瓦纳": [25.57, -24.45],
  "巴西": [-47.55, -15.47],
  "英属维尔京群岛": [-64.37, 18.27],
  "文莱": [115.00, 4.52],
  "保加利亚": [23.20, 42.45],
  "布基纳法索": [-1.30, 12.15],
  "布隆迪": [29.18, -3.16],
  "柬埔寨": [104.55, 11.33],
  "喀麦隆": [11.35, 3.50],
  "加拿大": [-75.42, 45.27],
  "佛得角": [-23.34, 15.02],
  "开曼群岛": [-81.24, 19.20],
  "中非共和国": [18.35, 4.23],
  "乍得": [14.59, 12.10],
  "智利": [-70.40, -33.24],
  "中国": [116.20, 39.55],
  "哥伦比亚": [-74.00, 4.34],
  "科摩罗": [43.16, -11.40],
  "刚果": [15.12, -4.09],
  "哥斯达黎加": [-84.02, 9.55],
  "科特迪瓦": [-5.17, 6.49],
  "克罗地亚": [15.58, 45.50],
  "古巴": [-82.22, 23.08],
  "塞浦路斯": [33.25, 35.10],
  "捷克共和国": [14.22, 50.05],
  "朝鲜": [125.30, 39.09],
  "刚果(扎伊尔)": [15.15, -4.20],
  "丹麦": [12.34, 55.41],
  "吉布提": [42.20, 11.08],
  "多米尼加": [-61.24, 15.20],
  "多米尼加共和国": [-69.59, 18.30],
  "东帝汶": [125.34, -8.29],
  "厄瓜多尔": [-78.35, -0.15],
  "埃及": [31.14, 30.01],
  "萨尔瓦多": [-89.10, 13.40],
  "赤道几内亚": [8.50, 3.45],
  "厄立特里亚": [38.55, 15.19],
  "爱沙尼亚": [24.48, 59.22],
  "埃塞俄比亚": [38.42, 9.02],
  "福克兰群岛(马尔维纳斯群岛)": [-59.51, -51.40],
  "法罗群岛": [-6.56, 62.05],
  "斐济": [178.30, -18.06],
  "芬兰": [25.03, 60.15],
  "法国": [2.20, 48.50],
  "法属圭亚那": [-52.18, 5.05],
  "法属波利尼西亚": [-149.34, -17.32],
  "加蓬": [9.26, 0.25],
  "冈比亚": [-16.40, 13.28],
  "格鲁吉亚": [44.50, 41.43],
  "德国": [13.25, 52.30],
  "加纳": [-0.06, 5.35],
  "希腊": [23.46, 37.58],
  "格陵兰": [-51.35, 64.10],
  "瓜德罗普岛": [-61.44, 16.00],
  "危地马拉": [-90.22, 14.40],
  "根西岛": [-2.33, 49.26],
  "几内亚": [-13.49, 9.29],
  "几内亚比绍": [-15.45, 11.45],
  "圭亚那": [-58.12, 6.50],
  "海地": [-72.20, 18.40],
  "赫德岛和麦当劳群岛": [74.00, -53.00],
  "洪都拉斯": [-87.14, 14.05],
  "匈牙利": [19.05, 47.29],
  "冰岛": [-21.57, 64.10],
  "印度": [77.13, 28.37],
  "印度尼西亚": [106.49, -6.09],
  "伊朗": [51.30, 35.44],
  "伊拉克": [44.30, 33.20],
  "爱尔兰": [-6.15, 53.21],
  "以色列": [35.12, 31.47],
  "意大利": [12.29, 41.54],
  "牙买加": [-76.50, 18.00],
  "约旦": [35.52, 31.57],
  "哈萨克斯坦": [71.30, 51.10],
  "肯尼亚": [36.48, -1.17],
  "基里巴斯": [173.00, 1.30],
  "科威特": [48.00, 29.30],
  "吉尔吉斯斯坦": [74.46, 42.54],
  "老挝": [102.36, 17.58],
  "拉脱维亚": [24.08, 56.53],
  "黎巴嫩": [35.31, 33.53],
  "莱索托": [27.30, -29.18],
  "利比里亚": [-10.47, 6.18],
  "阿拉伯利比亚民众国": [13.07, 32.49],
  "列支敦士登": [9.31, 47.08],
  "立陶宛": [25.19, 54.38],
  "卢森堡": [6.09, 49.37],
  "马达加斯加": [47.31, -18.55],
  "马拉维": [33.48, -14.00],
  "马来西亚": [101.41, 3.09],
  "马尔代夫": [73.28, 4.00],
  "马里": [-7.55, 12.34],
  "马耳他": [14.31, 35.54],
  "马提尼克岛": [-61.02, 14.36],
  "毛里塔尼亚": [57.30, -20.10],
  "马约特岛": [45.14, -12.48],
  "墨西哥": [-99.10, 19.20],
  "密克罗尼西亚(联邦) ": [158.09, 6.55],
  "摩尔多瓦共和国": [28.50, 47.02],
  "莫桑比克": [32.32, -25.58],
  "缅甸": [96.20, 16.45],
  "纳米比亚": [17.04, -22.35],
  "尼泊尔": [85.20, 27.45],
  "荷兰": [4.54, 52.23],
  "荷属安的列斯": [-69.00, 12.05],
  "新喀里多尼亚": [166.30, -22.17],
  "新西兰": [174.46, -41.19],
  "尼加拉瓜": [-86.20, 12.06],
  "尼日尔": [2.06, 13.27],
  "尼日利亚": [7.32, 9.05],
  "诺福克岛": [168.43, -45.20],
  "北马里亚纳群岛": [145.45, 15.12],
  "挪威": [10.45, 59.55],
  "阿曼": [58.36, 23.37],
  "巴基斯坦": [73.10, 33.40],
  "帕劳": [134.28, 7.20],
  "巴拿马": [-79.25, 9.00],
  "巴布亚新几内亚": [147.08, -9.24],
  "巴拉圭": [-57.30, -25.10],
  "秘鲁": [-77.00, -12.00],
  "菲律宾": [121.03, 14.40],
  "波兰": [21.00, 52.13],
  "葡萄牙": [-9.10, 38.42],
  "波多黎各": [-66.07, 18.28],
  "卡塔尔": [51.35, 25.15],
  "韩国": [126.58, 37.31],
  "罗马尼亚": [26.10, 44.27],
  "俄罗斯": [37.35, 55.45],
  "卢旺达": [30.04, -1.59],
  "圣基茨和尼维斯": [-62.43, 17.17],
  "圣卢西亚": [-60.58, 14.02],
  "圣皮埃尔和密克隆": [-56.12, 46.46],
  "圣文森特和格林纳丁斯": [-61.10, 13.10],
  "萨摩亚": [-171.50, -13.50],
  "圣马力诺": [12.30, 43.55],
  "圣多美和普林西比": [6.39, 0.10],
  "沙特阿拉伯": [46.42, 24.41],
  "塞内加尔": [-17.29, 14.34],
  "塞拉利昂": [-13.17, 8.30],
  "斯洛伐克": [17.07, 48.10],
  "斯洛文尼亚": [14.33, 46.04],
  "所罗门群岛": [159.57, -9.27],
  "索马里": [45.25, 2.02],
  "比勒陀利亚": [28.12, -25.44],
  "西班牙": [-3.45, 40.25],
  "苏丹": [32.35, 15.31],
  "苏里南": [-55.10, 5.50],
  "斯威士兰": [31.06, -26.18],
  "瑞典": [18.03, 59.20],
  "瑞士": [7.28, 46.57],
  "阿拉伯叙利亚共和国": [36.18, 33.30],
  "塔吉克斯坦": [68.48, 38.33],
  "泰国": [100.35, 13.45],
  "马其顿": [21.26, 42.01],
  "多哥": [1.20, 6.09],
  "汤加": [-174.00, -21.10],
  "突尼斯": [10.11, 36.50],
  "土耳其": [32.54, 39.57],
  "土库曼斯坦": [57.50, 38.00],
  "图瓦卢": [179.13, -8.31],
  "乌干达": [32.30, 0.20],
  "乌克兰": [30.28, 50.30],
  "阿联酋": [54.22, 24.28],
  "英国": [-0.05, 51.36],
  "坦桑尼亚": [35.45, -6.08],
  "美国": [-77.02, 39.91],
  "美属维尔京群岛": [-64.56, 18.21],
  "乌拉圭": [-56.11, -34.50],
  "乌兹别克斯坦": [69.10, 41.20],
  "瓦努阿图": [168.18, -17.45],
  "委内瑞拉": [-66.55, 10.30],
  "越南": [105.55, 21.05],
  "南斯拉夫": [20.37, 44.50],
  "赞比亚": [28.16, -15.28],
  "津巴布韦": [31.02, -17.43],
}
/**
 * 进出口贸易
 */
//   随机数
function randomNum() {
  return (Math.random() * 100).toFixed(0);
}
//  前十国贸易
let FreshTop10Data = {
  yAxisData: ['内蒙古', '湖北', '云南', '福建', '上海', '安徽', '北京', '河北', '河南', '四川'],
  seriesData: [426, 455, 508, 563, 592, 643, 688, 779, 838, 1064]
};
//  贸易规模
let riseFallData = {
  legendData: ['长期趋势', '价格'],
  xAxisData: ['2001', '2002', "2003", '2004', "2005", "2006", "2007", "2008"],
  seriesData: [
    ['32', '42', '52', '62', '42', '22', '12', '52']
  ]
}
//  进出口价格
let FeedBack = {
  xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
  seriesData: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]
}
class ImportExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FreshTop10Data: FreshTop10Data,
      riseFallData: riseFallData,
      FeedBack: FeedBack,
      queryType: 1,
      queryPattern: 1,
      timeData:[],
      worldMapData:{
        data:[],
        sImport:1
      }
    }
  }
  //  世界地图芒果进出口
  initWorldMap = (sImport, unit, year)=>{
    let params = {
      jsonData: { 
        "entityRelated": { 
          "queryPattern": sImport || "1",
          "queryType": unit || "1",
          "queryTime": year || new Date().getFullYear() 
        }, 
        "orderList": [
          { "columnName": "sale_amount", "isASC": true }
        ], 
        "page": { 
          "pageIndex": 1, 
          "pageSize": 10 
        } 
      }
    }
    api.worldMap.send(params).then(res => {
      //  芒果流向
      let dataArr = {
        dataMapNow: [],
        markerArr: [
          {
            "name": "中国",
            "value": [116.24, 39.55, [100, "20%"]]
          }
        ]
      }
      if (res.isSuccess){
        //  芒果流向
        if (sImport == 1) {
          res.data.map((item, index) => {
            dataArr.dataMapNow[index] = {
              "fromName": item.country,
              "toName": "中国",
              "coords": [worldGeoCoordMap[item.country], [116.24, 39.55]],
              "value": item.value,
              "unit": item.unit
            }
            dataArr.markerArr[index + 1] = {
              "name": item.country,
              "value": worldGeoCoordMap[item.country].concat([[item.value, item.unit, 1]])
            }
          })
        } else if (sImport == 2) {
          res.data.map((item, index) => {
            dataArr.dataMapNow[index] = {
              "fromName": "中国",
              "toName": item.country,
              "coords": [[116.24, 39.55], worldGeoCoordMap[item.country]],
              "value": item.value,
              "unit": item.unit
            }
            dataArr.markerArr[index + 1] = {
              "name": item.country,
              "value": worldGeoCoordMap[item.country].concat([[item.value, item.unit, 2]])
            }
          })
        }
        this.setState({
          worldMapData: dataArr
        })
        // console.log(this.state.worldMapData)
      }else{
        this.setState({
          worldMapData: dataArr
        })
      }
    })
  }
  //  时间下拉初始化
  initSelect = () => {
    let getTimeDataParams = {
      jsonData: { 
        "entityRelated": { 
          "viewName": "year", 
          "hasCurrent": true, 
          "pastNum": "5", 
          "afterNum": "0" 
        } 
      }
    }
    api.getTimeData.send(getTimeDataParams).then((res) => {
      // console.log(res.data)
      this.setState({
        timeData: res.data || [new Date().getFullYear()],
        timeNow: res.data[0] || new Date().getFullYear()
      })

      //  前十贸易国
      this.initTradeTop10(1, 1, res.data[0])
      this.initWorldMap(1, 1, res.data[0])
    })
  }
  //  地图前十贸易国进出口
  totalTradeTop10 = (e)=>{
    this.setState({
      importInput: e
    })
    this.initTradeTop10(e, this.state.selectType, this.state.timeNow)
    this.initWorldMap(e, this.state.selectType, this.state.timeNow)
  }
  //  地图按金额按数量
  totalUnitTradeTop10 = (e) =>{
    // console.log(e)
    this.setState({
      selectType: e
    })
    this.initTradeTop10(this.state.importInput, e, this.state.timeNow)
    this.initWorldMap(this.state.importInput, e, this.state.timeNow)
  }
  //  地图时间
  _totalTradeTop10 = (e) =>{
    // console.log(e)
    this.setState({
      timeNow: e.name
    })
    this.initTradeTop10(this.state.importInput, this.state.selectType, e.name)
    this.initWorldMap(this.state.importInput, this.state.selectType, e.name)
  }
  //  前十贸易国
  initTradeTop10 = (sImport,unit,year) =>{
    // console.log(year)
    let params = {
      jsonData: { 
        "entityRelated": { 
          "queryPattern": sImport || "1", 
          "queryType": unit || "1", 
          "queryTime": year || new Date().getFullYear() 
        },
        "page": {
          "pageIndex": 1, 	//页数 默认1即可
          "pageSize": 10		//每页条数 前十条填10即可
        }
      }
    }
    api.tradeTop.send(params).then(res => {
      // console.log(res)
      //  TOP10
      let x = [], v = [];
      if (res.isSuccess){
        
        res.data.map((item,index)=>{
          x[index] = item.country
          v[index] = item.value
        })
        this.setState({
          FreshTop10Data: {
            yAxisData: x.reverse(),
            seriesData: v.reverse(),
          }
        })
      }else{
        this.setState({
          FreshTop10Data: {
            yAxisData: x.reverse(),
            seriesData: v.reverse(),
          }
        })
      }
      
    })
  }
  //  进出口价格选择
  _importPrice = (e) => {
    // console.log(e.target.value)
    this.setState({
      queryPattern: e.target.value
    });
    this.initImportPrice(e.target.value);
  }
  //  进出口价格
  initImportPrice = (queryPattern) => {
    let params = {
      jsonData: {
        "entityRelated": {
          "queryPattern": queryPattern || 1
        }
      }
    }
    api.importPrice.send(params).then(res => {
      let x = [],v = [];
      res.data.map((item,index)=>{
        x[index] = item.time;
        v[index] = item.value;
      })
      this.setState({
        FeedBack: {
          xAxisData: x,
          seriesData: v
        }
      })
    })
  }
  //  贸易进出口选择
  _tradeImport=(e)=> {
    // console.log(e.target.value)
    this.setState({
      queryPattern: e.target.value
    });
    this.initTradeSizeFn(this.state.queryType, e.target.value);
  }
  //  贸易规模下拉
  _tradeSizeFn = (a)=>{
    // console.log(a)
    let queryTypeValue = (a.name === '按金额') ? 1 : 2
    this.setState({
      queryType: queryTypeValue
    });
    this.initTradeSizeFn(queryTypeValue, this.state.queryPattern);
  }
  //  贸易规模柱状图
  initTradeSizeFn = (queryType, queryPattern)=>{
    let params1 = {
      jsonData: {
        "entityRelated": {
          "queryPattern": queryPattern || "1",
          "queryType": queryType || "1"
        }
      }
    }
    api.tradeSize.send(params1).then(res => {
      // console.log(res)
      let x=[],v=[];
      res.data.map((item,index)=>{
        x[index] = item.time;
        v[index] = item.value;
      })
      this.setState({
        riseFallData: {
          legendData: ['长期趋势', '价格'],
          xAxisData: x,
          seriesData: v
        }
      })
    })
  }
  componentDidMount() {
    //  时间下拉
    this.initSelect()
    // 贸易规模
    this.initTradeSizeFn(this.state.queryType, this.state.queryPattern);
    // 贸易规模
    this.initImportPrice();
  }
  render() {
    return (
      <div className="import-container">
        <div className="left-chart">
          <div className="import-select-container">
            <div className="import-change">
              <Tabs defaultActiveKey="1" onChange={this.totalTradeTop10}>
                <TabPane tab="对中国出口" key="1"></TabPane>
                <TabPane tab="对中国进口" key="2"></TabPane>
              </Tabs>
            </div>
            <div className="import-change">
              <Tabs defaultActiveKey="1" onChange={this.totalUnitTradeTop10}>
                <TabPane tab="按金额" key="1"></TabPane>
                <TabPane tab="按数量" key="2"></TabPane>
              </Tabs>
            </div>
            <Select _pullDownMes={this._totalTradeTop10} nameArr={this.state.timeData} style={{
              position: 'absolute',
              top: '20px',
              left: '560px',
              width: '110px',
              zIndex: '9999999'
            }} />
          </div>
          <WorldMap data={this.state.worldMapData}/>
        </div>
        <div className="right-chart">
          <div className="import-price-title">
            <Title content="前十贸易国" />
          </div>
          <div className="import-price-chart">
            <FreshTop10
              data={this.state.FreshTop10Data}
              linearColor={['#0C80E8', '#01ECF6']}
              margins="80"
              textStyle={{
                color: '#FFF',
                fontFamily: 'Microsoft YaHei',
                fontSize: 14,
                align:'left'
              }}
              format={true}
              gird={{
                right: '10%',
                left: '15%',
                bottom: '5%',
                top: '2%'
              }}
            />
          </div>
        </div>
        <div className="right-chart">
          <div className="import-price-title">
            <Title content="进出口价格" />
          </div>
          <div className="import-tab">
            <Radio.Group onChange={this._importPrice} defaultValue="1" style={{ marginBottom: 16 }}>
              <Radio.Button value="1">进口</Radio.Button>
              <Radio.Button value="2">出口</Radio.Button>
            </Radio.Group>
          </div>
          <div className="import-price-chart">
            <Feedback
              data={this.state.FeedBack}
              legend={['', '']}
              legrndLeft="260px"
              unitName="美元/公斤"
              showSymbol='yes'
              legendTop="45"
              gird={{
                left: 20, right: 20, top: 35, bottom: 20, containLabel: true
              }} />
          </div>
        </div>
        <div className="right-chart">
          <div className="import-price-title">
            <Title content="贸易规模" />
          </div>
          <Select _pullDownMes={this._tradeSizeFn} nameArr={['按金额', '按数量']} style={{
            position: 'absolute',
            top: '20px',
            right: '160px',
            width: '110px',
            zIndex: '9999999'
          }} />
          <div className="import-tab">
            <Radio.Group onChange={this._tradeImport} defaultValue="1" style={{ marginBottom: 16 }}>
              <Radio.Button value="1">进口</Radio.Button>
              <Radio.Button value="2">出口</Radio.Button>
            </Radio.Group>
          </div>
          <div className="import-price-chart">
            <RiseFall data={this.state.riseFallData} sort={true} unit="单位：1000美元"/>
          </div>
        </div>
      </div>
    )
  }
}

export default ImportExport;
