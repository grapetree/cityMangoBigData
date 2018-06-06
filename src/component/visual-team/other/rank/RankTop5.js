import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';

export default class RankTop5 extends React.Component{
  constructor(props){
    super(props);
    this.imgArr = [img1,img2,img3];
    this.state = {
      data:undefined
    };
    this.commonStyle = {
      float:'left',display:'block'
    };
    this.max = 0;
  }

  setData(d){
    this.setState({
      data:d
    })
  }

  addList(){
    let bg = undefined;
    this.max = 1.1 * this.state.data[0].val;
    return this.state.data.map((item,i)=>{
      if(i===0){
        bg = 'linear-gradient(to right,#fc6b49, #fc496f)';
      }else if(i===1){
        bg = 'linear-gradient(to right,#fff485, #fde634)';
      }else if(i===2){
        bg = 'linear-gradient(to right,#72ffbc, #00d18d)';
      }else {
        bg = 'linear-gradient(to right,#0aabf5, #00fff6)';
      }
      return(
        <li style={{marginBottom:'20px',height:'26px'}} key={i}>
          <span style={{color:i>=3?'#fff':'#1f3082',background:`url(${this.imgArr[i]})`,width:'24px',textAlign:'center',...this.commonStyle,marginRight:'20px'}}>{i+1}</span>
          <span style={{...this.commonStyle,width:'70px'}}>{item.name}</span>
          <span style={{marginRight:'20px',width:'180px',borderRadius:'5px',marginTop:'8px',height:'10px',background:'#191f6a',...this.commonStyle}}>
            <i style={{width:item.val/this.max*180+'px',borderRadius:'5px',background:bg,height:'10px',display:'block'}}></i>
          </span>
          <span style={{...this.commonStyle,width:'80px'}}>{item.val}元/公斤</span>
        </li>
      )
    })
  }

  render(){
    if(this.state.data){
      return(
        <div style={{color:'#fff',fontSize:'16px',lineHeight:'26px',position:'absolute',top:this.props.top||'0px',left:this.props.left||'0px',height:this.props.height||'100px',width:this.props.width||'100px'}}>
          <p style={{color:"#46ebff",fontSize:'18px',lineHeight:'18px',height:'18px'}}>{this.props.title}</p>
          {
            this.addList()
          }
        </div>
      )
    }else {
      return(
        <div></div>
      )
    }
  }
}
