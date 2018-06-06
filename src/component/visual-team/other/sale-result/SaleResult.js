import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import up from './up.png';
import down from './down.png';

export default class SaleResult extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data:undefined
    };
    this.bgArr = [img1,img2,img3,img4]
  }

  setData(d){
    this.setState({
      data:d
    })
  }

  render(){

    if(this.state.data){
      let unit = undefined;
      let bg1 = undefined;
      let bg2 = undefined;

      return this.state.data.map((item,i)=>{
        if(item.flag1>0){
          bg1 = '#46ebff';
        }else if(item.flag1<0){
          bg1 = '#fc5b5b';
        }
        if(item.flag2>0){
          bg2 = '#46ebff';
        }else if(item.flag2<0){
          bg2 = '#fc5b5b';
        }
        if(i<2){
          unit = '吨';
        }else {
          unit = '万元';
        }
        return (
          <li style={{background:`url(${this.bgArr[i]}) no-repeat 15px 42px`,color:'#fff',width:'100%',height:'149px',borderBottom:'1px solid #3353b5'}} key={i}>
            <div style={{width:'140px',height:'149px',float:'left',marginLeft:'95px'}}>
              <p style={{marginTop:'30px',fontSize:'16px',color:'#46ebff',height:'42px',lineHeight:'42px'}}>{item.name}</p>
              <p>
                <span style={{fontSize:'30px'}}>{item.mount}</span>
                <i style={{fontSize:'16px'}}>{unit}</i>
              </p>
            </div>
            <div style={{width:'120px',height:'149px',float:'left'}}>
              <p style={{fontSize:'16px',marginTop:'35px',height:'40px',lineHeight:'40px'}}>同比：<span style={{paddingRight:'22px',color:bg1,background:bg1==='#46ebff'?`url(${up}) no-repeat right center`:`url(${down}) no-repeat right center`}}>{item.onYear}%</span></p>
              <p style={{fontSize:'16px',height:'40px',lineHeight:'40px'}}>环比：<span style={{paddingRight:'22px',color:bg2,background:bg2==='#46ebff'?`url(${up}) no-repeat right center`:`url(${down}) no-repeat right center`}}>{item.onMonth}%</span></p>
            </div>
          </li>
        )
      })
    }else {
      return (
        <div></div>
      )
    }

  }
}
