import React, {Component} from 'react';
import arrowUp from './arrow-up.png';
import arrowDown from './arrow-down.png';
import Word from '../other/Word';
/*
*
* */

class DeepDetailData extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me._flag = false;
    this.state = {
      value : 10,
      value_percentage:52,
    }
  }

  getData(d){
    this._flag = false;
    this.setState({
      value:d.value,
      value_percentage:d.value_percentage
      // data: d
    })
  }
  render() {
    let me = this;
    return (
      <div style={{width:'243px',height:'100px',...me.props.style}}>
        <p style={{height:'23px',textAlign:'center',color:'#fff',fontSize:'20px',marginTop:'10px',marginBottom:0}}>{this.props.title}</p>
        <p style={{height:'60px',textAlign:'center',marginBottom:0}}>
          <Word fontSize={'45px'} color1={'#fff'} color2={'#00eaff'} num={this.state.value}/>
          <span style={{fontSize: '16px', color: '#fff',margin:'0 10px'}}>同比: </span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '27px',
            background: `url(${arrowUp}) no-repeat center center`,
            backgroundSize: 'contain',
            marginRight: '5px'
          }}> </span>
          <span style={{fontSize: '28px', color: '#fff'}}>{this.state.value_percentage}%</span>
        </p>
      </div>
    )
  }
}

export default DeepDetailData;
