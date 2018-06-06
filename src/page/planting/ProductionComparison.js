import React from 'react';

import PureLine from './component/echarts/ProductionLine';
import Pie from './component/echarts/ProductionPie';
import TalkBar from './component/echarts/ProductionBar';
import * as productionApi from "./component/api-data/page-date";
import Img from './test.jpg';
import "./component/css/ProductionScss.scss"
import { Select } from 'antd';
const Option = Select.Option;

/**
 * 种植生产--不同主产区对比
 */
class ProductionComparison extends React.Component {
  _tokens = [];
  _clearTokens(){
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };
  state = { visible: false }
  constructor() {
    super();
    const me = this;
    this.state = {
      getYearData:[],
      getPeasantCountHP:[],//华坪种植户数量
      getPeasantCountBS:[],//百色种植户数量
      getPeasantCountPZH:[],//攀枝花种植户数量,
      getGrowStructureInfoHP:[],//华坪种植品种趋势,
      getGrowStructureInfoBS:[],//百色种植品种趋势,
      getGrowStructureInfoPZH:[],//攀枝种植品种趋势,
    }
    me.pieStyle = {
        width: '100%',
        height: '250px'
    };
    me.lineStyle = {
        width: '100%',
        height: '250px'
    };
    me.barStyle = {
      width: '100%',
      height: '250px'
    };
  }

  render() {
    const me = this;
    const getYearDataHP = this.state.getYearData.map((item,index)=>{
      if(item.type === this.state.view){
          return <Option key="530723" value={item.year}>{item.year}</Option>
      }
    })
    const getYearDataBS = this.state.getYearData.map((item,index)=>{
      if(item.type === this.state.view){
          return <Option key="451000" value={item.year}>{item.year}</Option>
      }
    })
    const getYearDataPZH = this.state.getYearData.map((item,index)=>{
      if(item.type === this.state.view){
          return <Option key="510400" value={item.year}>{item.year}</Option>
      }
    })
    return (
      <div className={'ProductionBox'}>
        <div className={'ProductionMain'}>
            <dl>
                <dt>
                    <ul>
                        <li>芒果产地</li>
                        <li>种植品种趋势</li>
                        <li>种植户趋势</li>
                        <li>单位面积产量</li>
                    </ul>
                </dt>
                <dd>
                    <ul>
                        <li>
                            <div style={{width:'100%',height:'40px'}}></div>
                            <img src={Img} alt="aaaaaaaa"/>
                            <span>华坪芒果</span>
                            <p></p>
                        </li>
                        <li>
                            <div style={{display:'flex',justifyContent:'flex-end',width:'100%',height:'40px'}}>
                                <Select dropdownClassName="ProductionSelect1" defaultValue="2018" style={{ width: 120 }} onChange={this.handleChange}>
                                    {getYearDataHP}
                                </Select>
                            </div>
                            <Pie ref={'deepProcessingPieHP'} style={me.pieStyle} />
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：户</div>
                            <TalkBar style={me.barStyle} data={this.state.getPeasantCountHP}/>
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：吨</div>
                            <PureLine ref={'getGrowAreaSumHP'} style={me.lineStyle} />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div style={{width:'100%',height:'40px'}}></div>
                            <img src={Img} alt="aaaaaaaa"/>
                            <span>百色芒果</span>
                            <p></p>
                        </li>
                        <li>
                            <div style={{display:'flex',justifyContent:'flex-end',width:'100%',height:'40px'}}>
                                <Select dropdownClassName="ProductionSelect2" defaultValue="2018" style={{ width: 120 }} onChange={this.handleChange}>
                                    {getYearDataBS}
                                </Select>
                            </div>
                            <Pie ref={'deepProcessingPieBS'} style={me.pieStyle} />
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：户</div>
                            <TalkBar style={me.barStyle} data={this.state.getPeasantCountBS}/>
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：吨</div>
                            <PureLine ref={'getGrowAreaSumBS'} style={me.lineStyle} />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div style={{width:'100%',height:'40px'}}></div>
                            <img src={Img} alt="aaaaaaaa"/>
                            <span>攀枝花芒果</span>
                            <p></p>
                        </li>
                        <li>
                            <div style={{display:'flex',justifyContent:'flex-end',width:'100%',height:'40px'}}>
                                <Select dropdownClassName="ProductionSelect3" defaultValue="2018" style={{ width: 120 }} onChange={this.handleChange}>
                                    {getYearDataPZH}
                                </Select>
                            </div>
                            <Pie ref={'deepProcessingPiePZH'} style={me.pieStyle} />
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：户</div>
                            <TalkBar style={me.barStyle} data={this.state.getPeasantCountPZH}/>
                            <p></p>
                        </li>
                        <li>
                            <div style={{width:'100%',height:'40px',paddingLeft:'5%',color:'#ffffff',fontWeight:'100',fontSize:'18px',lineHeight:'65px'}}>单位：吨</div>
                            <PureLine ref={'getGrowAreaSumPZH'} style={me.lineStyle} />
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
      </div>
    )
  }

  componentDidMount(){
    let me = this;

    //获取年份
    me._tokens.push(productionApi.ProductionData.send({

    }).then((res)=>{
      this.setState({
          getYearData : res.data
      })
    }));

    me.handleChange('2018',{key:'530723'});
    me.handleChange('2018',{key:'451000'});
    me.handleChange('2018',{key:'510400'});

    me.getPeasantCount('2018','530723');
    me.getPeasantCount('2018','451000');
    me.getPeasantCount('2018','510400');

    me.getGrowAreaSum('2018','530723');
    me.getGrowAreaSum('2018','451000');
    me.getGrowAreaSum('2018','510400');
  }
  //获取种植品种趋势
  handleChange = (key,value) => {
    //获取种植品种趋势  默认2018年
    let params = {
        jsonData: {
            "entityRelated" : {
                "year" : key,
                "regionId" : value.key
            }
        }
    }
    this._tokens.push(productionApi.getGrowStructureInfo.send(params).then((res)=>{
      this.setState({
          getGrowStructureInfoHP : res.data
      })
      let obj = {
          titleShow: false,
          legendShow: false,
          seriesRadius: ['35%', '65%'],
          seriesCenter: ['55%', '45%'],
          seriesData: this.state.getGrowStructureInfoHP,
          colorTop: ['#1093f5','#11e0ff','#fed645','#2af594','#2fffe4'],
          colorBottom: ['#1779ff','#00b4ff','#eea21f','#12d578','#14e6ff']
      };
      if(value.key == '530723'){
          console.log(obj);
          this.refs.deepProcessingPieHP.setData(obj);
      }else if(value.key == '451000'){
          console.log(obj);
          this.refs.deepProcessingPieBS.setData(obj);
      }else if(value.key == '510400'){
          console.log(obj);
          this.refs.deepProcessingPiePZH.setData(obj);
      }

    }));
  }
  //分别获取种植户数量--地区region_id :华坪县530723 百色451000 攀枝花 510400
  getPeasantCount = (key,value) => {
    let params = {
        jsonData: {
            "entityRelated" : {
                "year" : key,
                "regionId" : value
            }
        }
    }
    this._tokens.push(productionApi.getPeasantCount.send(params).then((res)=>{
        if(value == '530723'){
            this.setState({
                getPeasantCountHP : res.data
            })
        }else if(value == '451000'){
            this.setState({
                getPeasantCountBS : res.data
            })
        }else if(value == '510400'){
            this.setState({
                getPeasantCountPZH : res.data
            })
        }
    }));
  }
  //单位面积产量
  getGrowAreaSum = (key,value) => {
    //获取种植品种趋势  默认2018年
    let params = {
        jsonData: {
            "entityRelated" : {
                "year" : key,
                "regionId" : value
            }
        }
    }
    this._tokens.push(productionApi.getGrowAreaSum.send(params).then((res)=>{
        console.log(res)
        let data = res.data.total;
        const dataX = [];
        const dataY = [];
        if(data != undefined && data != null){
            data.map((item,index)=>{
                dataX.push(item.year);
                if(item.areaSum != 0){
                    dataY.push((item.productSum / item.areaSum * 1000).toFixed(2))
                }else{
                    dataY.push(0)
                }

            })
        }
        let obj = {
            showTitle:false,
            title:'单产(公斤/亩)',
            titleTop:6,
            showTooltip:true,
            showTick:true,
            unitArr:['公斤/亩','公斤/亩'],
            circleArr:['#00ffff','#2af594'],
            lineColor:['#00ffff','#2af594'],
            showLegend:false,
            itemGap:25,
            legendLeft:150,
            legendTop:10,
            legendName:['实际单产','预测单产'],
            gridLeft:'10%',
            gridTop:'5%',
            gridBottom:'20%',
            gridRight:'12%',
            xData:dataX,
            yData1:dataY
        };
        if(value == '530723'){
            this.refs.getGrowAreaSumHP.setData(obj);
        }else if(value == '451000'){
            this.refs.getGrowAreaSumBS.setData(obj);
        }else if(value == '510400'){
            this.refs.getGrowAreaSumPZH.setData(obj);
        }

    }));
  }
  componentWillUnmount(){
    this._clearTokens();
  }
}

export default ProductionComparison;
