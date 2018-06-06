import React from 'react';
import { PublicAngleData,countryData,weatherData,priceData,unmarketBarData} from './unmarketableData.js';
//title 组件
import Title from '../../component/visual-team/title/Title';
import smallBorder from './small-border.png';
import bigBorder from './big-border.png';
import UnmarketBarline from '../../component/web-team/production-test/unmarketBarline';
import PriceLine from '../../component/web-team/production-test/priceLine';
import PublicLine from '../../component/web-team/production-test/publicLine';
import WeatherLine from '../../component/web-team/production-test/weatherLine';
//引入接口文件
import * as api from '../api/api-unmarketableWarning';

/**
 * 市场价格--价格监测
 */
class UnmarketableWarning extends React.Component {
    constructor(props) {
        super(props);
        const me = this;
        me.state = {
            KlineData:'12',
            PublicAngleData:PublicAngleData(),
            countryData:countryData(),
            weatherData:weatherData(),
            priceData:priceData(),
            unmarketBarData:unmarketBarData(),
        }
        me.UnmarketableSupply = {
            position: 'absolute',
            top: '106px',
            left: '160px',
            width: '1033px',
            height: '460px',
            background: `url(${bigBorder}) no-repeat center center`,
        };
        me.UnmarketablePrice = {
            position: 'absolute',
            top: '596px',
            left: '160px',
            width: '1033px',
            height: '460px',
            background: `url(${bigBorder}) no-repeat center center`,
        };
        me.UnmarketablePublic = {
            position: 'absolute',
            top: '106px',
            right: '40px',
            width: '663px',
            height: '300px',
            background: `url(${smallBorder}) no-repeat center center`,
        };
        me.UnmarketableCountry = {
            position: 'absolute',
            top: '430px',
            right: '40px',
            width: '663px',
            height: '300px',
            background: `url(${smallBorder}) no-repeat center center`,
        };
        me.UnmarketableWeather= {
            position: 'absolute',
            top: '754px',
            right: '40px',
            width: '662px',
            height: '300px',
            background: `url(${smallBorder}) no-repeat center center`,
        };
    }
    _tokens = [];
    _clearTokens(){
        this._tokens.forEach(token => token.cancel());
        this._tokens = [];
    };

    componentDidMount() {
       /* 舆情角度*/
        let publicParams = {
            jsonData:{"entityRelated":{"themeId":"fsdf34t81h84158h148141g481g34gg3","timeTypeCode":"4"},"orderList":[{"columnName":"","isASC":true}],"page":{"pageIndex":1,"pageSize":10}}
        };
        api.UnmarketablePublic.send(publicParams).then((res) => {
            this.setState({
                PublicAngleData: {
                    xAxisData:res.data[0].times,
                    seriesData: [res.data[1].sentimentTypeCode1,res.data[1].sentimentTypeCode2,res.data[1].sentimentTypeCode3],
                    legendName:['正面传播','中立传播','负面传播'],
                    yName:"%"
                }
            })
        })
    /*国际角度*/
        api.countryLine.send({jsonData:{}}).then((res) => {
            console.log(res)
            let xData = [];
            let c1 = [];
            let c2 = [];
            res.data.map((item, index) => {
                //console.log(item),
                xData.push(item.month);
                c1.push(item.saleAmount);
                c2.push(item.importAmount);
            });
            //console.log(c2)
            this.setState({
                countryData: {
                    xAxisData: xData,
                    seriesData: [c1,c2],
                    legendName:['芒果进口量','华坪芒果销售量'],
                    yName:"吨"
                }
            })
        })
      /*  价格角度*/
        api.priceLine.send({jsonData:{}}).then((res) => {
            //console.log(res)
            let xData = [];
            let p1 = [];
            let p2 = [];
            res.data.map((item, index) => {
                //console.log(item),
                    xData.push(item.month);
                p1.push(item.fieldPrice);
                p2.push(item.costPrice);
            });
            //console.log(p2)
            this.setState({
                priceData: {
                    xAxisData: xData,
                    seriesData: [p1,p2],
                }
            })
        })
      //供求角度
        let unmarketParams = {
            jsonData: {
                "entitySale":{
                    "year":"2018"
                }
            }
        };
        api.unmarketBarline.send(unmarketParams).then((res) => {
           // console.log(res)
            let xData = [];
            let u1 = [];
            let u2 = [];
            let u3 = [];

            res.data.map((item, index) => {
                //console.log(item),
                    xData.push(item.month);
                u1.push(item.saleAmount);
                u2.push(item.productTotal);
                u3.push(item.productTotal);
            });

           // console.log(u2)
            this.setState({
                unmarketBarData: {
                    xAxisData: xData,
                    seriesData: [u1,u2,u3],
                }
            })
        })
        /*气象角度*/
        api.WeatherLine.send({jsonData:{}}).then((res) => {
            console.log(res)
            this.setState({
                weatherData: {
                    xAxisData:res.data.dateTime,
                    seriesData: res.data.weatherThresholdList
                }
            })
        })

    }
    render() {
        const me = this;
        return (
            <div   style={this.UnmarketableWarningClass}>
        {/*供求角度*/}
        <div style={me.UnmarketableSupply}>
            <p style={{color:'#46ebff',marginTop:'65px',marginLeft:'30px',fontSize:'16px'}}>从供求角度分析，9月份芒果将大量集中上市，需求量逐渐低迷，供大于求，华坪芒果存在滞销风险</p>
            <Title content={'供求角度'}  top={'0.2rem'} left={'0.2rem'}/>
            <UnmarketBarline style={{position:'absolute',top:'22px'}} data={this.state.unmarketBarData}/>
        </div>
        {/*价格角度*/}
        <div style={me.UnmarketablePrice}>
            <Title content={'价格角度'}  top={'0.2rem'} left={'0.2rem'}/>
            <p style={{color:'#46ebff',marginTop:'65px',marginLeft:'30px',fontSize:'16px'}}>当前市场价14元/公斤，高于成本价11元/公斤。从价差角度分析当前不存在滞销风险</p>
            <PriceLine style={{position:'absolute',top:'22px'}} data={this.state.priceData}/>
        </div>
        {/*舆情角度*/}
        <div style={me.UnmarketablePublic}>
            <Title content={'舆情角度'}  top={'0.2rem'} left={'0.2rem'}/>
            <p style={{color:'#46ebff',marginTop:'65px',marginLeft:'30px',fontSize:'16px'}}>广西芒果”黑心病“事件舆情负面传播率98%，导致同行芒果面临压力，存在滞销风险</p>
            <PublicLine style={{width:'630px',height:'195px',position:'absolute',top:'50px'}} data={this.state.PublicAngleData}/>
        </div>
            {/*国际角度*/}
         <div style={me.UnmarketableCountry}>
            <Title content={'国际角度'}  top={'0.2rem'} left={'0.2rem'}/>
            <p style={{color:'#46ebff',marginTop:'65px',marginLeft:'30px',fontSize:'16px'}}>晚熟芒果出口中国量大幅度增加，给华坪芒果销售带来巨大压力</p>
            <PublicLine style={{width:'630px',height:'195px',position:'absolute',top:'50px'}} data={this.state.countryData}/>
        </div>
        {/*气象角度*/}
        <div style={me.UnmarketableWeather}>
            <Title content={'气象角度'}  top={'0.2rem'} left={'0.2rem'}/>
            <p  style={{color:'#46ebff',marginTop:'65px',marginLeft:'30px',fontSize:'16px'}}>气象灾害预警次数未超过阈值，从气象角度分析当前不存在滞销风险</p>
            <WeatherLine style={{width:'630px',height:'195px',position:'absolute',top:'50px'}} data={this.state.weatherData}/>
         </div>
        </div>
    )
    }
    componentWillUnmount() {
        this._clearTokens();
        this.flagError = false;
    }

}
export default UnmarketableWarning;
