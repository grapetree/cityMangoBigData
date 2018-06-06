import React from 'react';
import rightBorder from './right-border.png';//引入右侧图表的背景图
import factorCharBg from './echarts-bg.png';//引入右侧图表的背景图
//引入下拉框
import Select from '../../component/web-team/select/Select'
import AgriculturalDisastersClass from './AgriculturalDisasters.scss';
//title 组件
import Title from '../../component/visual-team/title/Title';
//引入图表组件
import { FactorBarData, WarningLineData } from "./plantingData";//引入图表数据
import FactorBar from './component/factorBar'//引入影响因素的图表组件
import WarningLine from './component/warningLine'//引入灾害类型预警图表
/* import { Map, Marker, NavigationControl, InfoWindow, MarkerList} from 'react-bmap'; */
//引入接口文件
import * as api from '../api/api-planting-AgriculturalDisasters.js';
//引入字体库
require('./component/font/iconfont.js');
require('./component/font/iconfont.css');

/**
 * 种植生产--农业灾害评估
 */
const BMap=window.BMap
class AgriculturalDisasters extends React.Component {
  constructor() {
    super();
      const me = this;
      this.initMap = this.initMap.bind(this)
      me.state = {
          FactorBarData: FactorBarData,//引入影响因素的图表数据
          WarningLineData: WarningLineData,//引入灾害类型预警图表数据
          timeData:[],
          timeFirst:'',
          ifShow:'none'
      }
      me.AdisasterRight= {
          position: 'absolute',
          top: '0',
          right: '40px',
          width: '440px',
          height: '930px',
          background: `url(${rightBorder})`,
          backgroundSize:`100% 100%`
      };
      me.TopmsgClass={
          position: 'absolute',
          top: '160px',
          left: '115px',
          width: '1170px',
          height: '110px',
      }
  }
    _tokens = [];
    _clearTokens(){
        this._tokens.forEach(token => token.cancel());
        this._tokens = [];
    };
    _pullDownMes(a){
        //console.log(a)
    }
    _pullDownMesDate = (a) =>{
        console.log(a)
    }

    //点击显示解释说明文字
    showExplain = () =>{
        if (this.state.ifShow == 'none') {  
            this.setState({  
                ifShow: 'block',  
            })  
        }  
        else if (this.state.ifShow == 'block') {  
            this.setState({  
                ifShow: 'none',  
            })
        }
    }
    //时间下拉初始化
      _initSelect = () => {
        let getTimeDataParams = {
          jsonData: { 
            "entityRelated": { 
              "viewName": "month", 
              "hasCurrent": true, 
              "pastNum": "5", 
              "afterNum": "0",
              "isASC":false
            } 
          }
        }
        api.getTimeData.send(getTimeDataParams).then((res) => {
          //console.log(res)
          this.setState({
            timeData: res.data,
            timeFirst: res.data[0]
          })
        })       
    }
    //灾害类型预警信息
      _initAdisasterTable = () => {
        let AdisasterTableParams = {
          jsonData: { 
            "entityRelated": { 
              "viewName": "month", 
              "hasCurrent": true, 
              "pastNum": "5", 
              "afterNum": "0",
              "isASC":false
            } 
          }
        }
        api.getAdisasterTableData.send(AdisasterTableParams).then((res) => {
          //console.log(res)
          this.setState({
            
          })
        })        
    }
    //影响因素
      _initFactorBar = () => {
        let FactorBarParams = {
          jsonData: { 
            "entityRelated": { 
              "viewName": "month", 
              "hasCurrent": true, 
              "pastNum": "5", 
              "afterNum": "0",
              "isASC":false
            } 
          }
        }
        api.getFactorBarData.send(FactorBarParams).then((res) => {
          //console.log(res)
          this.setState({
            
          })
        })        
    }
    //灾害类型预警走势
      _initWarningLine = () => {
        let WarningLineParams = {
          jsonData: { 
            "entityRelated": { 
              "viewName": "month", 
              "hasCurrent": true, 
              "pastNum": "5", 
              "afterNum": "0",
              "isASC":false
            } 
          }
        }
        api.getWarningLineData.send(WarningLineParams).then((res) => {
          //console.log(res)
          this.setState({
            
          })
        })        
    }
    //百度地图数据信息
      _initAdisasterBaiduMap = () => {
        let AdisasterBaiduMapParams = {
          jsonData: { 
            "entityRelated": { 
              "viewName": "month", 
              "hasCurrent": true, 
              "pastNum": "5", 
              "afterNum": "0",
              "isASC":false
            } 
          }
        }
        api.getAdisasterBaiduMap.send(AdisasterBaiduMapParams).then((res) => {
          //console.log(res)
          this.setState({
            
          })
        })        
    }      
    initMap(){
        // 百度地图API功能
        let map = new BMap.Map("BaiduMap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(101.276683, 26.636164), 11);  // 初始化地图,设置中心点坐标和地图级别

        //  自定义标注图片
        let myicon = new BMap.Icon(
            `${require("./rain.png")}`,
            new BMap.Size(91, 91),  //  视窗大小
            {
                imageSize: new BMap.Size(91, 91), // 引用图片实际大小
                imageOffset: new BMap.Size(0, 0)  // 图片相对视窗的偏移
            }
        );
        /*let thunder = new BMap.Icon(
            `${require("./thunder.png")}`,
            new BMap.Size(91, 91),  //  视窗大小
            {
                imageSize: new BMap.Size(91, 91), // 引用图片实际大小
                imageOffset: new BMap.Size(0, 0)  // 图片相对视窗的偏移
            }
        );*/

        //var pointThunder = new BMap.Point(101.224137,26.846357);//雷电 
        var point = new BMap.Point(101.276683, 26.636164);//暴雨
        //暴雨
        var marker = new BMap.Marker(point,{ icon: myicon });  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var obj = {
            title:'2017年生育雷翔:开花期'
        }
        var opts = {
            width: 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "<span style='display:block;font-size:15px;color:#FF0000;background-color:blue;height:100px;width:200px;'>"+obj['title']+"</span>", // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("生育类型:开花期<br/>", opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
        
        let styleJson = [{"label":"水域","featureType":"water","elementType":"all","stylers":{"color":"#397ed8"}},{"label":"公路填充","featureType":"highway","elementType":"geometry.fill","stylers":{"color":"#157da4"}},{"label":"公路线条","featureType":"highway","elementType":"geometry.stroke","stylers":{"color":"#254cb4"}},{"label":"主干道填充","featureType":"arterial","elementType":"geometry.fill","stylers":{"color":"#254cb4"}},{"label":"主干道线条","featureType":"arterial","elementType":"geometry.stroke","stylers":{"color":"#157da4"}},{"label":"局部?","featureType":"local","elementType":"geometry","stylers":{"color":"#2672f3"}},{"label":"陆地","featureType":"land","elementType":"all","stylers":{"color":"#2f53bb"}},{"label":"铁路填充","featureType":"railway","elementType":"geometry.fill","stylers":{"color":"#08304b"}},{"label":"铁路线条","featureType":"railway","elementType":"geometry.stroke","stylers":{"color":"#000000"}},{"label":"建筑填充","featureType":"building","elementType":"geometry.fill","stylers":{"color":"#021736"}},{"label":"建筑默认","featureType":"building","elementType":"geometry","stylers":{"color":"#021736"}},{"label":"标签填充","featureType":"all","elementType":"labels.text.fill","stylers":{"color":"#66ccff","font-size":"38px"}},{"label":"标签线条","featureType":"all","elementType":"labels.text.stroke","stylers":{"weight":"normal","color":"#1f41a0"}},{"label":"绿化","featureType":"green","elementType":"geometry","stylers":{"color":"#2b8284"}},{"label":"边界","featureType":"boundary","elementType":"all","stylers":{"color":"#05365a"}},{"label":"人造物","featureType":"manmade","elementType":"all","stylers":{"color":"#05365a"}}]
        map.setMapStyle({ styleJson: styleJson });
        map.setCurrentCity("华坪县");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        /*map=null;
        infoWindow=null;
        marker=null;
        point=null;*/
    }

    componentDidMount(){
        this.initMap()
        //  时间下拉
        this._initSelect()
    }
  render() {
    const me = this;
    return (
        <div className='AgriculturalDisastersClass'>
            <Select _pullDownMes={this._pullDownMesDate} nameArr={this.state.timeData} width={110} style={{
                position: 'absolute',
                top: '0',
                left: '80px',
            }} />
            <div className='TopmsgClass'>
                <div className='msg-item'>
                    <p >受灾次数</p>
                    <div className='msg-num color1'>
                        <span style={{ fontSize: '0.38rem', marginRight: '0.15rem' }}>10</span><span>次</span>
                        <span className='markDown'>
                            <i class="iconfont icon-xiangxiajiantou"></i>                    
                        </span>
                    </div>
                </div>
                <div className="msg-item">
                    <p>低温预警次数</p>
                    <div className="msg-num color2">
                        <span style={{ fontSize: '0.38rem', marginRight: '0.15rem' }}>10</span><span>次</span>
                        <span className='markDown'>
                            <i class="iconfont icon-xiangxiajiantou"></i>
                        </span>
                    </div>
                </div>
                <div className="msg-item">
                    <p>病虫害预警次数</p>
                    <div className="msg-num color3">
                        <span style={{ fontSize: '0.38rem', marginRight: '0.15rem' }}>10</span><span>次</span>
                        <span className='markUp'><i class="iconfont icon-xiangshangjiantou"></i></span>
                    </div>
                </div>
                <div className="msg-item">
                    <p>霜冻预警次数</p>
                    <div className="msg-num color4">
                        <span style={{ fontSize: '0.38rem', marginRight: '0.15rem' }}>10</span><span>次</span>
                        <span className='markUp'><i class="iconfont icon-xiangshangjiantou"></i></span>
                    </div>
                </div>
            </div>
            <div className="AdisasterBaiduMap" id="BaiduMap"> </div>
            <div style={me.AdisasterRight} className="AdisasterRight">
                <div className="right-item">
                    <Title content={'灾害类型预警信息'}  top={'0.2rem'} left={'0.2rem'}/>
                    <ul className="AdisasterTable" style={me.listStyle}>
                        <li className="TableRow">
                            <span><i class="iconfont icon-leidianyujing"></i>低温</span>
                            <span>发布<i className='disastersType'>低温</i>预警</span>
                            <span>2017-07-19</span>
                        </li>
                        <li className="TableRow">
                            <span><i class="iconfont icon-baoyu"></i>连阴雨</span>
                            <span>发布<i className='disastersType'>连阴雨</i>预警</span>
                            <span>2017-07-19</span>
                        </li>
                        <li className="TableRow">
                            <span><i class="iconfont icon-baoyu"></i>霜冻</span>
                            <span>发布<i className='disastersType'>霜冻</i>预警</span>
                            <span>2017-07-19</span>
                        </li>
                        <li className="TableRow">
                            <span><i class="iconfont icon-ganhan"></i>干旱</span>
                            <span>发布<i className='disastersType'>干旱</i>预警</span>
                            <span>2017-07-19</span>
                        </li>
                        <li className="TableRow">
                            <span><i class="iconfont icon-bingchonghaizonghezhili"></i>病虫害</span>
                            <span>发布<i className='disastersType'>病虫害</i>预警</span>
                            <span>2017-07-19</span>
                        </li>
                    </ul>
                </div>
                <div className="right-item">
                    <Title content={'影响因素'} top={'0.2rem'} left={'0.2rem'}/>
                    <p className="factorExplain" onClick={me.showExplain.bind(this)}><i class="iconfont icon-gantanhao"></i></p>
                    <div className="echartsExplain">芒果不同生育期受气象因素影响程度不同，花期冻害、果实膨 大期干旱、果实成熟期连阴雨对单产影响程度大</div>
                    <div className ='ExplainBox' style={{display: this.state.ifShow}}>
                        图表说明
                        图中每一根柱子代表此种灾害历年来对各地区单产造成的实际影响大小，柱子越高，说明实际影响越大。
                        模型说明
                        以华坪芒果单产为因变量，气象条件（包括气象要素与气象灾害指数）、投入成本等为自变量，对所有变量进行标准化后拟合多元线性回归，各变量的回归系数即为对单产的实际影响程度。这种影响程度的实际含义为：自变量每改变一个标准差，因变量将改变多少个标准差。
                        气象灾害指数计算方法
                        低温指数：该时期日均温最低5天的温度平均值的倒数
                        干旱指数：该时期无降水（降水量小于1mm）天数除以该时期降水量
                        连阴雨指数：该时期连续三天及以上降水天数除以该时期无降
                    </div> 
                    <div className="echartsWarp bgClass" style={me.FactorBarClass}>
                        <FactorBar data={me.state.FactorBarData}/>
                    </div>
                </div>
                <div className="right-item">
                    <Title content={'灾害类型预警走势'} top={'0.2rem'} left={'0.2rem'}/>
                    <div className="echartsExplain">
                    <span className="factorType">灾害类型：</span>
                        <Select _pullDownMes={this._pullDownMes.bind(this)} nameArr={['全部', '低温', '干旱', '连阴雨']} width={110} style={{
                            position: 'absolute',
                            top: '0px',
                            left: '85px',
                        }} />
                    </div>
                    <div className="echartsWarp">
                        <WarningLine data={me.state.WarningLineData} />
                    </div>
                </div>
            </div>
      </div>
    )
  }
  componentWillUnmount() {
    this._clearTokens();
  }
}
export default AgriculturalDisasters;
