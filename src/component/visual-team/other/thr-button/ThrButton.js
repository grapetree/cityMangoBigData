import React from 'react';

export default class ThrButton extends React.Component{
  constructor(props){
    super(props);
    this.combineStyle = {
      width:'86px',
      textAlign:'center',
      borderRadius:'30px',
      float:'left',
      cursor: 'pointer',
      transition: 'all .2s ease-in',
      height: '100%',
      display: 'list-item',
      textAlign: 'center'
    };
    this.liActiveStyle = {
      color:'#02165d',
      background:'linear-gradient(#20bbfc, #29eafd)',

    };
    this.liSleepStyle = {

      color:'#8ac7ff',
    };
    this.arr = ['收购价','批发价','零售价'];
    this.state = {
      t:0
    }
  }

  changeStyle(i){
    this.props.fetchInfo(i);
    this.setState({
      t:i
    })

  }

  addList(){
    return this.arr.map((item,i)=>{
      if(this.state.t === i){
        return(
          <li onClick={this.changeStyle.bind(this,i)} style={{...this.combineStyle,...this.liActiveStyle}} key={i}>{item}</li>
        )
      }else {
        return(
          <li onClick={this.changeStyle.bind(this,i)} style={{...this.combineStyle,...this.liSleepStyle}} key={i}>{item}</li>
        )
      }

    })

  }

  render(){
    return(
      <div>
        <ul style={{position:'absolute',zIndex:5,left:this.props.left||'0px',top:this.props.top||'0px',fontSize:'16px',width:'260px',height:'30px',lineHeight:'30px',background:'#0f50fb',border:'1px solid #1fb5fc',borderRadius:'30px'}}>
          {
            this.addList()
          }
        </ul>
      </div>
    )
  }
}
