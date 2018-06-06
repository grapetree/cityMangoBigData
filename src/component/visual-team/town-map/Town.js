import React from 'react';
import town from './town-bg.png';
import Select from '../other/Select';
import NanGeErPie from '../pie/NanGeErPie';
/*
 *
 **/
export default class Yield extends React.Component {

  constructor(props) {
    super(props);
    this.plantStyle = {
      width: '235px',
      height: '220px',
      position: 'absolute',
      right: 0,
      top: 0
    }
  }
  _pullDownMes(){

  }
  render() {
    return (
      <div style={{background:`url(${town}) no-repeat right bottom`,backgroundSize:'862px 670px',width:'862px',height:'670px',position:'absolute',left:'586px',top:'70px',border:'1px solid #fff'}}>

        <Select _pullDownMes={this._pullDownMes.bind(this)} nameArr={['2015','2016','2017']} width={115} style={{
          position: 'absolute',
          top: '60px',
          right: '20px'
        }}/>

        <NanGeErPie ref={'plantRefs'} style={this.plantStyle} title={''}/>

      </div>
    )
  }

  componentDidMount() {
    const me = this;

  }

}
