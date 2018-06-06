/**
 * 水球 简单css3动画制成
 * 半径尽量控制在 1rem -- 1.5rem 之间
 * zll
 */
import React,{Component} from 'react';
import './water.css';
import Word from '../other/Word';
import bgLeft1 from './bg1.png';
import bgLeft2 from './bg2.png';
import bgRight1 from './bg3.png';
import bgRight2 from './bg4.png';
const data = {
  left: {
    bg: [bgLeft1,bgLeft2],
    fontColor: '#21d1f5',
    color1: '#b7ffff',
    color2: '#21d1f5',
  },
  right: {
    bg: [bgRight1,bgRight2],
    fontColor: '#18ff90',
    color1: '#b5ffdc',
    color2: '#18ff90',
  },
};
class WaterPolo extends Component {
  constructor(props){
    super(props);
    let me = this;
    me.state = {
      data: ''
    };
    me.flag = false;
  }
  setData(d){
    this.flag = true;
    this.setState({
      data : d
    })
  }
  render(){
    let me = this;
    if(me.flag){

      let me = this;
      const dataIcon = me.props.dataIcon;
      let width = me.props.width || '1.2rem';
      let value = parseFloat(me.state.data.value).toFixed(1) || 16.6;

      let val;
      let bgHeight = width;

      if(value === 100){
        bgHeight = parseFloat(bgHeight) + 0.3 + 'rem';
        val = -18;
      }else{
        val = 100 - value;
      }
      return(
        <div ref={'box'} className={'water-polo'} style={{
          width: width,
          height: width,
          position: 'absolute',
          top: this.props.top,
          left: this.props.left,
        }}>
          <div className={'polo-bg1'} style={{
            height: bgHeight,
            background: `url(${data[dataIcon].bg[0]}) no-repeat center center`,
            backgroundSize: `3.59rem ${bgHeight}`,
            top: parseFloat(bgHeight) * (val/100) + 'rem'
          }}></div>
          <div className={'polo-bg2'} style={{
            height: bgHeight,
            background: `url(${data[dataIcon].bg[1]}) no-repeat center center`,
            backgroundSize: `3.59rem ${bgHeight}`,
            top: parseFloat(bgHeight) * (val/100) + 'rem'
          }}></div>
          <span className={'value'} style={{
            width: width,
            color: data[dataIcon].fontColor,
            fontSize: me.props.fontSize || '0.16rem'
          }}>
            <Word fontSize={'28px'} color1={data[dataIcon].color1} color2={data[dataIcon].color2} num={value}/>
            <span>%</span>
          </span>
        </div>
      )
    }else{
      return(
        <div>加载中</div>
      )
    }
    me.flag = false;
  }
  componentDidMount(){
    let me = this;
  }

}

export default WaterPolo;
