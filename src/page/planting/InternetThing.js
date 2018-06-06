import React from 'react';
import Iframe from 'react-iframe';
import PureLine from './component/echarts/InternetLine';
import InternetDataLine from './component/echarts/InternetDataLine';
import Pie from './component/echarts/InternetPie';
import * as internetApi from "./component/api-data/page-date";

import "./component/css/InternetScss.scss";
//分页
import { Pagination } from 'antd';
import { Modal } from 'antd';
import { Select } from 'antd';
import { Tabs } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

//tab切换
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
const Option = Select.Option;


require('./component/font/iconfont.css');
/**
 * 种植生产--物联网监控
 */
class InternetThing extends React.Component {
  _tokens = [];
  _clearTokens(){
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };
  state = { visible: false };
  that = this;
  constructor() {
    super();
    const me = this;
    this.state = {
      earlyWarningStyle : '0',//默认预警类别--总预警
      earlyWarningTime : '2018-05',//默认预警类别--预警时间
      earlyWarningStyleList : [],//预警类别列表
      earlyWarningTimeList : [],//预警时间列表
      selectInternetStyleIndex : '788',
      pointstring1 : {},
      pointstring2 : {},
      getBaseInfoByDeviceObj : {},//根据设备查询基地信息
      getActualTimeDataByDeviceObj : {},//根据设备查询获取实时监测数据
      getActualTimeDataByDeviceObjData : {},//根据设备查询获取实时监测数据
      deviceId : '',//点击设备后获取设备ID
      getTimeQuantumDataByDeviceList : [],//历史数据
      startTime : '',//历史数据开始时间
      endTime : '',//历史数据结束时间
      getEarlyWarningAndMangoProportion : {},//预警次数
      earlyWarningShow : false,
      earlyWarningBtnShow : true,
      isFull : false, //gis地图是否全屏
    }
    me.pieStyle = {
        width: '500px',
        height: '350px'
    };
    me.lineStyle = {
      width: '100%',
      height: '259px'
    };
    me.lineStyles = {
      width: '100%',
      height: '259px'
    };
  }
  render() {
    const me = this;

    const earlyWarningStyleList = this.state.earlyWarningStyleList.map((item,index)=>{
          if(item.type === this.state.view){
              return <Option key="530723" value={item.code}>{item.text}</Option>
          }
    })

    const earlyWarningTimeList = this.state.earlyWarningTimeList.map((item,index)=>{
          if(item.type === this.state.view){
              return <Option key="530723" value={item}>{item}</Option>
          }
    })

    var getTimeQuantumDataByDeviceHtml = null;
    if(this.state.getTimeQuantumDataByDeviceList.data){
        const getTimeQuantumDataByDeviceList = this.state.getTimeQuantumDataByDeviceList.data;
        getTimeQuantumDataByDeviceHtml = getTimeQuantumDataByDeviceList.map((item,index)=>{
            if(item.type === this.state.view){
                return <ul key = {item.time}>
                    <li>{item.data['770']}</li>
                    <li>{item.data['769']}</li>
                    <li>{item.data['788']}</li>
                    <li>{item.data['787']}</li>
                    <li>{item.data['782']}</li>
                    <li>{item.data['797']}</li>
                    <li>{item.data['780']}</li>
                    <li>{item.data['781']}</li>
                    <li>{item.data['778']}</li>
                    <li>{item.time}</li>
                </ul>
            }

        })
    }
    return (
      <div className={'InterHomeStyle'}>
          <div className={ this.state.isFull == true ?  'InterIframeStyle InterIframeStyleActive' : 'InterIframeStyle'}>
              <Iframe url="/static/gis/gis_gk.html"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                      allowFullScreen/>
          </div>
          <div>
              <Modal
                  className={'dialogBoxS'}
                  title="绿康源农业开发有限公司"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  wrapClassName={'dialogBoxParent'}
                  maskStyle = {{zIndex:'1002'}}
              >
                  <div className={'dialogBox'}>
                      <div className={'dialogHead'}>
                          <ul>
                              <li>
                                  <dl>
                                      <dt>产地：</dt>
                                      <dd>{this.state.getBaseInfoByDeviceObj.baseName}</dd>
                                  </dl>
                                  <dl>
                                      <dt>种植面积：</dt>
                                      <dd>{this.state.getBaseInfoByDeviceObj.areaSum}</dd>
                                  </dl>
                              </li>
                              <li>
                                  <dl>
                                      <dt>品种：</dt>
                                      <dd>{this.state.getBaseInfoByDeviceObj.mangoType}</dd>
                                  </dl>
                                  <dl>
                                      <dt>种植农户：</dt>
                                      <dd>{this.state.getBaseInfoByDeviceObj.peasantCount}</dd>
                                  </dl>
                              </li>
                          </ul>
                      </div>
                      <div className={'dialogContent'}>
                          <Tabs defaultActiveKey="1"  className={'dialogContentTop'} onChange={callback}>
                              <TabPane tab="物联网数据" key="1">
                                  <div className={'dcpMain'}>
                                      <dl>
                                          <dt className={'dcpMainTitle'}>
                                              <ul>
                                                  <li>
                                                      <span>物联网检测设备：</span>
                                                      <span>{this.state.getActualTimeDataByDeviceObj.bascName}</span>
                                                  </li>
                                                  <li>
                                                      <span>物联网数据</span>
                                                      <span>{this.state.getActualTimeDataByDeviceObj.time}</span>
                                                  </li>
                                              </ul>
                                          </dt>
                                          <dd className={'dcpMainSvg'}>
                                              <ul>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-kongqiwendu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>空气温度</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['770']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-kongqishidu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>空气湿度</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['769']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-guangzhao'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>光照强度</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['782']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-turangwendu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>土壤温度</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['769']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-turangshidu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>土壤湿度</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['788']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-riyu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>日雨</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['797']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-jiangyuliang'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>降雨量</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['780']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-fengsu'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>风速</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['781']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                                  <li>
                                                      <dl>
                                                          <dt>
                                                              <i className={'icon iconfont icon-fengxiang'}></i>
                                                          </dt>
                                                          <dd>
                                                              <p>风向</p>
                                                              <span>{this.state.getActualTimeDataByDeviceObjData['778']}</span>
                                                          </dd>
                                                      </dl>
                                                  </li>
                                              </ul>
                                          </dd>
                                      </dl>
                                  </div>
                                  <div className={'dialogContentCenter'}>
                                      <div>
                                          <div>
                                              <ul className={'InterBottomLNav'}>
                                                  <li className={this.state.selectInternetStyleIndex === '788' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'788')}>
                                                      土壤温度</li>
                                                  <li className={this.state.selectInternetStyleIndex === '787' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'787')}>
                                                      土壤湿度</li>
                                                  <li className={this.state.selectInternetStyleIndex === '770' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'770')}>
                                                      空气温度</li>
                                                  <li className={this.state.selectInternetStyleIndex === '769' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'769')}>
                                                      空气湿度</li>
                                                  <li className={this.state.selectInternetStyleIndex === '782' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'782')}>
                                                      光照强度</li>
                                                  <li className={this.state.selectInternetStyleIndex === '797' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'797')}>
                                                      日雨</li>
                                                  <li className={this.state.selectInternetStyleIndex === '780' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'780')}>
                                                      降雨量</li>
                                                  <li className={this.state.selectInternetStyleIndex === '781' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'781')}>
                                                      风速</li>
                                                  <li className={this.state.selectInternetStyleIndex === '778' ? 'selectInternetStyleClass' : ''}
                                                      onClick={this.selectInternetStyle.bind(this,'778')}>
                                                      风向</li>
                                              </ul>
                                          </div>
                                          <div>

                                          </div>
                                          <div className={'dccLine'}>
                                              <InternetDataLine ref={'getGrowAreaSumData'} style={me.lineStyles} />
                                          </div>
                                      </div>
                                      <div>

                                      </div>
                                  </div>
                              </TabPane>
                              <TabPane tab="历史数据" key="2">
                                  <div className={'historyData'}>
                                      <div className={'historyDataTime'}>
                                          <span>监测时间：</span>
                                          <RangePicker dropdownClassName="dialogRangePicker" onChange={this.dateChange} />
                                      </div>
                                      <div className={'historyDataList'}>
                                          <dl>
                                              <dt>
                                                  <ul>
                                                      <li>空气温度</li>
                                                      <li>空气湿度</li>
                                                      <li>土壤温度</li>
                                                      <li>土壤湿度</li>
                                                      <li>光照强度</li>
                                                      <li>日雨</li>
                                                      <li>降雨量</li>
                                                      <li>风速</li>
                                                      <li>风向</li>
                                                      <li>监测时间</li>
                                                  </ul>
                                              </dt>
                                              <dd>
                                                  {getTimeQuantumDataByDeviceHtml}
                                              </dd>
                                          </dl>
                                          <Pagination showQuickJumper defaultCurrent={1} total={this.state.getTimeQuantumDataByDeviceList.totalCount == undefined ? 0 : this.state.getTimeQuantumDataByDeviceList.totalCount} onChange={this.getTimeQuantumDataByDeviceList} />
                                      </div>

                                  </div>
                              </TabPane>
                          </Tabs>

                      </div>
                  </div>
              </Modal>
          </div>
          {this.state.earlyWarningBtnShow && <div className={'earlyWarningBtn'}>
              <button onClick={this.isFull}>地图全屏</button>
              <button onClick={this.earlyWarningShow}>点击展示预警</button>
          </div>
          }
          {this.state.earlyWarningShow &&
          <div className={ this.state.isFull == true ?  'InterBottomStyle InterBottomStyleActive' : 'InterBottomStyle'}>

              <div className={'InterBottomL'}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
                      <h3>预警监测</h3>
                      <Select dropdownClassName="InternetSelect1" defaultValue="总预警" style={{width: 150}}
                              onChange={this.handleChangeStyle}>
                          {earlyWarningStyleList}
                      </Select>
                      <Select dropdownClassName="InternetSelect2" defaultValue={this.state.earlyWarningTime}
                              style={{width: 150}} onChange={this.handleChangeTime}>
                          {earlyWarningTimeList}
                      </Select>
                  </div>

                  <div className={'IBLPieBox'}>
                      <div>
                          <dl>
                              <dt>
                                  <svg className="icon" aria-hidden="true">
                                      <use xlinkHref="#icon-yujing"></use>
                                  </svg>
                              </dt>
                              <dd>
                                  <p>
                                      <b>{this.state.getEarlyWarningAndMangoProportion.totalCount}</b>
                                      <span>次</span>
                                  </p>
                                  <p style={{fontSize: '30px', color: '#ffffff'}}>预警次数</p>
                              </dd>
                          </dl>
                          <p className={'borderRight'}></p>
                      </div>
                      <Pie ref={'deepProcessingPie'} style={me.pieStyle}/>
                  </div>
              </div>
              <div className={'InterBottomR'}>
                  <h3>预警走势</h3>
                  {/*<div>*/}
                      {/*<ul className={'InterBottomRNav'}>*/}
                          {/*<li><span className={'ct1'}></span>总预警次数</li>*/}
                          {/*<li><span className={'ct2'}></span>土壤温度预警次数</li>*/}
                          {/*<li><span className={'ct3'}></span>土壤湿度预警次数</li>*/}
                          {/*<li><span className={'ct6'}></span>光照强度预警次数</li>*/}
                          {/*<li><span className={'ct7'}></span>日雨预警次数</li>*/}
                          {/*<li><span className={'ct4'}></span>空气温度预警次数</li>*/}
                          {/*<li><span className={'ct5'}></span>空气湿度预警次数</li>*/}
                          {/*<li><span className={'ct8'}></span>降雨量预警次数</li>*/}
                          {/*<li><span className={'ct9'}></span>风速预警次数</li>*/}
                      {/*</ul>*/}
                  {/*</div>*/}
                  <div className={'IBRPieBox'}>
                      <PureLine ref={'getEarlyWarningDetails'} style={me.lineStyle}/>
                  </div>
              </div>
          </div>
          }
      </div>
    )
  }

  componentDidMount(){
    let me = this;
    window.windowThisFun = this;

    me.getBaseList('530723');
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
  }
  //选择预警时间
  handleChangeTime = (e) => {
    this.state.earlyWarningTime = e;
    this.selectEarlyWarning(this.state.earlyWarningStyle, e);
  }
  //选择预警类别
  handleChangeStyle = (e) => {
      this.state.earlyWarningStyle = e;
    this.selectEarlyWarning(e, this.state.earlyWarningTime);
  }
  //查询预警次数
  selectEarlyWarning = (style, time) => {
      let params = {
          jsonData: {
              "entityRelated" : {
                  "time" : time,//时间（目前单位为月份）
                  "warningType" : style
              }
          }
      }
      this._tokens.push(internetApi.getEarlyWarningAndMangoProportion.send(params).then((res)=>{
          this.setState({
              getEarlyWarningAndMangoProportion : res.data
          })
          let obj = {
              titleShow: false,
              legendShow: false,
              seriesRadius: ['35%', '65%'],
              seriesCenter: ['55%', '45%'],
              seriesData: this.state.getEarlyWarningAndMangoProportion.data,
              colorTop: ['#1093f5','#11e0ff','#fed645','#2af594','#2fffe4'],
              colorBottom: ['#1779ff','#00b4ff','#eea21f','#12d578','#14e6ff']
          };
          this.refs.deepProcessingPie.setData(obj);
      }));
  }
  //预警走势
  getEarlyWarningDetails = (style,time) => {
      let params = {
          jsonData: {

          }
      }
    this._tokens.push(internetApi.getEarlyWarningDetails.send(params).then((res)=>{
        let data = res.data;
        console.log(data);
        const dataX = [];
        const dataY = [];
        const dataColor = [];
        if(data != undefined && data != null){
            for(var key in data){
                console.log(data[key])
                for(var keyx in data[key]){
                    dataX.push(keyx);
                }
                break;
            }
            for(var keys in data){
                const dataY1 = [];
                let lineName = '';
                let lineColor = '';
                for(var keyss in data[keys]){
                    dataY1.push(data[keys][keyss]);
                }
                if(keys == '0'){
                    lineName = '总预警';
                    lineColor = 'red';
                }else if(keys == '770'){
                    lineName = '空气温度预警';
                    lineColor = '#2af594';
                }else if(keys == '769'){
                    lineName = '空气湿度预警';
                    lineColor = '#fed645';
                }else if(keys == '788'){
                    lineName = '土壤温度预警';
                    lineColor = '#11e0ff';
                }else if(keys == '787'){
                    lineName = '土壤湿度预警';
                    lineColor = '#fd8325';
                }else if(keys == '781'){
                    lineName = '风速预警';
                    lineColor = '#bf6dff';
                }else if(keys == '780'){
                    lineName = '降雨量预警';
                    lineColor = '#fe854b';
                }else if(keys == '797'){
                    lineName = '日雨预警';
                    lineColor = '#00b4ff';
                }else if(keys == '782'){
                    lineName = '光照强度预警';
                    lineColor = '#1779ff';
                }
                dataColor.push(lineColor)
                dataY.push(
                    {
                        name:lineName,
                        data: dataY1,
                        type: 'line',
                        smooth:false,
                        symbol:'emptyCircle',
                        symbolSize: 4 ,
                        markPoint : {
                            clickable : false,
                            symbol : 'emptyCircle',
                            symbolSize: 4 ,
                        },
                    }
                )
            }
        }
        let obj = {
            showTitle:false,
            title:'单产(公斤/亩)',
            titleTop:6,
            showTooltip:true,
            showTick:true,
            unitArr:['公斤/亩','公斤/亩'],
            circleArr:dataColor,
            lineColor:dataColor,
            showLegend:false,
            itemGap:15,
            legendLeft:100,
            legendTop:0,
            legendName:['总预警','空气温度预警','空气湿度预警','土壤温度预警','土壤湿度预警','风速预警','降雨量预警','日雨预警','光照强度预警'],
            gridLeft:'10%',
            gridTop:'25%',
            gridBottom:'10%',
            gridRight:'12%',
            xData:dataX,
            yData1:dataY
        };
        console.log(obj)
        this.refs.getEarlyWarningDetails.setData(obj);
    }));
  }
  //查询基地坐标
  getBaseList = (id) => {
      let params = {
          jsonData: {
              "entityRelated" : {
                  "regionId" : id
              }
          }
      }
      this._tokens.push(internetApi.getBaseList.send(params).then((res)=>{
          console.log(res)
          const features = [];

          res.data.map((item,index)=>{
              const baseListArr = [parseFloat(item.longitude),parseFloat(item.latitude)];
              features.push(
                  {
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": baseListArr
                      },
                      "properties": {
                          "address": item.baseName,
                          "areaInfos": null,
                          "contacter": "",
                          "createDate": null,
                          "creator": "",
                          "creatorId": "",
                          "email": "",
                          "entId": "1783",
                          "extra": "",
                          "id": item.baseCode,
                          "type":1,
                          "name": item.baseName,
                          "phone": "",
                          "remark": ""
                      }
                  }
              )
          })
          this.setState({
              pointstring1 : {
                  'type': 'FeatureCollection',
                  'features': features
              }
          })
          console.log(this.state.pointstring1);
      }));
  }
  //查询设备坐标
  getDeviceListByBaseCode = (id) => {
      let params = {
          jsonData: {
              "entityRelated" : {
                  "regionId" : "530723", //地区region_id :华坪县530723 百色451000 攀枝花 510400
                  "baseCode" : id//基地base_code
              }
          }
      }
      this._tokens.push(internetApi.getDeviceListByBaseCode.send(params).then((res)=>{
          console.log(res)
          const features = [];

          res.data.map((item,index)=>{
              const baseListArr = [parseFloat(item.longitude),parseFloat(item.latitude)];
              features.push(
                  {
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": baseListArr
                      },
                      "properties": {
                          "address": item.deviceName,
                          "areaInfos": null,
                          "contacter": "",
                          "createDate": null,
                          "creator": "",
                          "creatorId": "",
                          "email": "",
                          "entId": "1783",
                          "extra": "",
                          "id": item.hid,
                          "type":2,
                          "name": item.deviceName,
                          "phone": "",
                          "remark": ""
                      }
                  }
              )
          })
          this.setState({
              pointstring2 : {
                  'type': 'FeatureCollection',
                  'features': features
              }
          })
          console.log(this.state.pointstring2);
      }));
  }
  //设备详情
  showModal = (id) => {
        this.setState({
            visible: true,
        });
      let params = {
          jsonData: {
              "entityRelated" : {
                  "regionId" : "530723", //地区region_id :华坪县530723 百色451000 攀枝花 510400
                  "deviceId" : id //设备id
              }
          }
      }
      this._tokens.push(internetApi.getBaseInfoByDeviceId.send(params).then((res)=>{
          this.setState({
              getBaseInfoByDeviceObj : res.data[0]
          })
      }));
      let paramsgetActualTimeDataByDeviceId = {
          jsonData: {
              "entityRelated" : {
                  "deviceId" : id //设备id
              }
          }
      }
      this._tokens.push(internetApi.getActualTimeDataByDeviceId.send(paramsgetActualTimeDataByDeviceId).then((ress)=>{
          this.setState({
              getActualTimeDataByDeviceObj : ress.data
          })
          this.setState({
              getActualTimeDataByDeviceObjData : ress.data.data
          })
          console.log(this.state.getActualTimeDataByDeviceObj);
      }));
      this.setState({
          deviceId : id
      })
      this.getTimesDataByDeviceId(this.state.deviceId, "788");//默认土壤温度
    }
  //查询 过去24小时的监测数据
  getTimesDataByDeviceId = (id, type) => {
    let params = {
        jsonData: {
            "entityRelated" : {
                "deviceId" : id,//设备id
                "sensorType" : type//传感器类型
            }
        }
    }
    this._tokens.push(internetApi.getTimesDataByDeviceId.send(params).then((res)=>{
        let data = res.data;
        let datas = data.data;
        const dataX = [];
        const dataY = [];
        const ObjM = this.getAirTemperature(data);
        if(datas != undefined && datas != null){
            datas.map((item,index)=>{
                dataX.push(item.shortTime.split(" ")[1]);
                dataY.push(item.val)
            })
        }
        console.log(ObjM.maxM)
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
            legendName:[datas[0].displayName],
            gridLeft:'10%',
            gridTop:'5%',
            gridBottom:'20%',
            gridRight:'12%',
            xData:dataX,
            yData1:dataY,
            mData1:ObjM.dataM,
            maxM:ObjM.maxM,
        };
        this.refs.getGrowAreaSumData.setData(obj);
    }));
  }
  //切换类别
  selectInternetStyle = (id,event) => {
    console.log(id)
    this.setState({selectInternetStyleIndex: id});
    this.getTimesDataByDeviceId(this.state.deviceId, id);
  }
  //选择历史数据检测时间时间
  dateChange = (date, dateString) => {
      this.setState({
          startTime : dateString[0]
      })
      this.setState({
          endTime : dateString[1]
      })
      let me = this;
      setTimeout(function () {
          me.getTimeQuantumDataByDeviceList(1);
      },100)
  }
  //历史数据
  getTimeQuantumDataByDeviceList = (pageNum) => {
      let params = {
          jsonData: {
              "entityRelated" : {
                  "deviceId" : this.state.deviceId,//设备id
                  "startTime" : this.state.startTime,//起始时间
                  "endTime" : this.state.endTime//结束时间
              },
              "orderList" : [ {
                  "columnName" : "",
                  "isASC" : true
              } ],
              "page" : {
                  "pageIndex" : pageNum,
                  "pageSize" : 10
              }
          }
      }
      console.log(params);
      this._tokens.push(internetApi.getTimeQuantumDataByDeviceId.send(params).then((res)=>{
          console.log(res)
          this.setState({
              getTimeQuantumDataByDeviceList : res
          })
      }));
  }
  //24小时监测数据警戒线
  getAirTemperature = (data) => {
      const ObjM = {};
      const dataM = [];
      let maxM = 0;
      if(data.minAirTemperature != undefined){
          dataM.push(
              {
                  name: '低温警戒线',
                  yAxis: data.minAirTemperature,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type : 'solid'
                  }
              }
          )
          dataM.push(
              {
                  name: '高温警戒线',
                  yAxis: data.maxAirTemperature,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#ff8d39',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#ff8d39',
                      type : 'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.maxAirTemperature))
      }else if(data.airHumidity != undefined){
          dataM.push(
              {
                  name: '湿度警戒线',
                  yAxis: data.airHumidity,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.airHumidity) * 2)
      }else if(data.soilTemperature != undefined){
          dataM.push(
              {
                  name: '土壤温度警戒线',
                  yAxis: data.soilTemperature,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.soilTemperature) * 2)
      }else if(data.soilHumidity != undefined){
          dataM.push(
              {
                  name: '土壤湿度警戒线',
                  yAxis: data.soilHumidity,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.soilHumidity) * 2)
      }else if(data.windSpeed != undefined){
          dataM.push(
              {
                  name: '风速警戒线',
                  yAxis: data.windSpeed,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.windSpeed) * 2)
      }else if(data.rainfall != undefined){
          dataM.push(
              {
                  name: '降雨量警戒线',
                  yAxis: data.rainfall,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          ttextStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.rainfall) * 2)
      }else if(data.dayRain != undefined){
          dataM.push(
              {
                  name: '日雨警戒线',
                  yAxis: data.dayRain,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.dayRain) * 2)
      }else if(data.illuminationIntensity != undefined){
          dataM.push(
              {
                  name: '光照强度警戒线',
                  yAxis: data.illuminationIntensity,
                  label: {
                      type:'solid',
                      normal: {
                          show: true,
                          position: 'end',
                          formatter: "{b}\n{c}",
                          textStyle:{
                              color:'#1194c0',
                              fontSize: 18,
                              fontWeight:'bold'
                          }
                      }
                  },
                  lineStyle:{
                      color:'#1194c0',
                      type:'solid'
                  }
              }
          )
          maxM = parseInt(parseInt(data.illuminationIntensity) * 2)
      }
      ObjM.dataM = dataM;
      ObjM.maxM = maxM;
      return ObjM;
  }
  //预警 显隐
  earlyWarningShow = (data) => {
      this.setState({
          earlyWarningShow : !this.state.earlyWarningShow
      })
      if(!this.state.earlyWarningShow){
          console.log(111)
          //预警类别
          this._tokens.push(internetApi.getEarlyWarningStyleList.send().then((res)=>{
              console.log(res)
              this.setState({
                  earlyWarningStyleList : res.data
              })
          }));
          //预警时间
          let params = {
              jsonData: {
                  "entityRelated" : {
                      "viewName" : "month", //视图名，年year，月month，日date，小时hour（默认为年）
                      "hasCurrent" : true,
                      "pastNum" : "5", //往前推多少
                      "afterNum" : "0",//往后推多少
                      "isASC" : "false"//true顺序，false倒序
                  }
              }
          }
          this._tokens.push(internetApi.getEarlyWarningTimeList.send(params).then((res)=>{
              console.log(res.data)
              this.setState({
                  earlyWarningTimeList : res.data
              })
              this.setState({
                  earlyWarningTime : res.data[0]
              })
          }));
          this.selectEarlyWarning('1','2018-05');
          this.getEarlyWarningDetails('2018','530723');
      }
  }
  //地图全屏
  isFull = () => {
      this.setState({
          isFull : !this.state.isFull
      })
  }
  componentWillUnmount(){
      this._clearTokens();
  }
}

export default InternetThing;
