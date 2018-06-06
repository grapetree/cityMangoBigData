import React from 'react';
import retail from './img/retail-bg.png';
import wholeSale from './img/wholeSale-bg.png';
import map from './img/map-bg.png';
import Word from '../other/Word';
import store from '../../../store/Store';
/**
 *
 **/

export default class CircleBig extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.wholeSalePrice = {
      fontSize: '24px',
      textAlign: 'center',
      marginTop: '-40px',
      fontWeight: 700
    };
    me.retailPrice = {
      fontSize: '20px',
      textAlign: 'center',
      marginTop: '4px'
    };
    me.linearGradient = {
      marginTop: '80px',
      marginLeft: '55px',
      width: '130px',
      height: '10px',
      borderRadius: '60px',
      background: 'radial-gradient(closest-side ellipse at 65px 5px,rgba(9,46,126,0.3), rgba(9,46,126,0))'
    };
    me.price = {
      height: '60px',
      lineHeight: '60px',
      textAlign: 'center',
      marginTop: '88px'
    };
    me.weightThing = {
      height: '20px',
      lineHeight: '20px',
      textAlign: 'center',
      marginTop: '5px',
      fontSize: '18px'
    }
  }

  render() {
    let me = this;

    let newData = store.getState().PriceIndex;

    let wholeSaleNum = undefined;
    let retailNum = undefined;

    if(Object.keys(newData).length !== 0){
      wholeSaleNum = newData.wholeSale.year;
      retailNum = newData.retail.year;
    }

    let number = {
      wholeSale: wholeSaleNum || 7.8,
      retail: retailNum || 11.2,
      data: '2018-5-10'
    };
    return (
      <div style={{width: '655px', height: '475px', position: 'absolute', left: '114px', top: '65px'}}>
        <div style={{width: '655px', height: '242px'}}>
          <div style={{
            width: '242px',
            height: '242px',
            float: 'left',
            background: `url(${wholeSale}) no-repeat center center`,
            backgroundSize: 'contain'
          }}>
            <p style={{...me.wholeSalePrice, color: '#00f6ff'}}>田头价</p>

            <p style={me.price}>
              <Word num={number.wholeSale} fontSize={'55px'} color1={'#9affff'} color2={'#21d1f5'}/>
            </p>
            <p style={{...me.weightThing,color: '#41beff'}}>元／斤</p>

            <p style={me.linearGradient}> </p>
            <p style={{...me.retailPrice, color: '#00f6ff'}}>日均价</p>
          </div>
          <div style={{
            width: '242px',
            height: '242px',
            float: 'right',
            background: `url(${retail}) no-repeat center center`,
            backgroundSize: 'contain'
          }}>
            <p style={{...me.wholeSalePrice, color: '#00ff6c'}}>零售价</p>

            <p style={me.price}>
              <Word num={number.retail} fontSize={'55px'} color1={'#afffd9'} color2={'#2af594'}/>
            </p>
            <p style={{...me.weightThing,color: '#00ff6c'}}>元／斤</p>

            <p style={me.linearGradient}> </p>
            <p style={{...me.retailPrice, color: '#00ff6c'}}>日均价</p>
          </div>
        </div>
        <div style={{
          width: '655px',
          height: '233px',
          background: `url(${map}) no-repeat center bottom`,
          backgroundSize: '594px 146px'
        }}>
          <p style={{color: '#3ff6f2', fontSize: '14px', position: 'absolute', right: '-100px', bottom: '0px'}}>
            更新时间：{number.data}
          </p>
        </div>
      </div>
    )
  }

  componentDidMount() {

  }
}
