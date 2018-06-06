import React,{Component} from 'react';
import lefts from './bar-bg.png';
import rights from './up-bg.png';
import Word from '../other/Word';
import store from '../../../store/Store';
/*
* boxColor 盒子边框颜色
* positions 盒子的位置
* icon  判断用哪张图片
* color1  字体颜色渐变色
* color1  字体颜色渐变色
* title 盒子的主题
* typeData 区分组建 给store标示
* */

class DataBox extends Component {
  constructor(props){
    super(props);
    let me = this;
    let boxColor = this.props.boxColor;
    me.boxStyle = {
      width: '380px',
      // height: '98px',
      borderTop: '1px solid '+boxColor+'',
      borderBottom: '5px solid '+boxColor+'',
      position: 'absolute',
      ...props.positions
    };
    me.leftSmallBox = {
      width: '20px',
      height: '5px',
      backgroundColor: boxColor,
      position: 'absolute',
      left: 0,
      top: '-3px'
    };
    me.rightSmallBox = {
      width: '20px',
      height: '5px',
      backgroundColor: boxColor,
      position: 'absolute',
      right: 0,
      top: '-3px'
    };
    me.leftLogo = {
      width: '120px',
      height: '98px',
      float: 'left',
      background: this.props.icon ? `url(${lefts}) no-repeat right center` : `url(${rights}) no-repeat right center`,
      backgroundSize: '56px 64px'
    };
    me.rightData = {
      width: '260px',
      height: '98px',
      float: 'right'
    }
  }
  render(){
    let me = this;
    let typeData = me.props.typeData;

    let data = store.getState().DataBox;

    let num = data[typeData];

    return(
      <div style={me.boxStyle}>
        <div style={me.leftSmallBox}></div>
        <div style={me.rightSmallBox}></div>

        <div style={me.leftLogo}> </div>
        <div style={me.rightData}>
          <p style={{height: '45px',lineHeight:'65px',textAlign:'center',fontSize:'18px',color:'#fff',marginBottom:0}}>{this.props.title}</p>
          <p style={{height: '53px',lineHeight:'53px',fontSize:'18px',color:'#46ebff',marginBottom:0}}>
            <span style={{width: '142px', height: '53px', float: 'left',textAlign:'right'}}>
              <Word num={num} color1={me.props.color1} color2={me.props.color2}/>
            </span>
            <span style={{width: '105px', height: '53px',lineHeight:'63px', float: 'right',textAlign:'left'}}>万吨 </span>
          </p>
        </div>
      </div>
    )
  }
}
export default DataBox;
