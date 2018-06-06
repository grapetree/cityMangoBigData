import React from 'react';

export default class CombineHobby extends React.Component{
  constructor(props){
    super(props);
    this.divStyle = {
      fontSize:'16px',
      color:'#fff',
      float:'left',
      width:'810px',
      height:'230px'
    };
    this.liStyle = {
      borderRadius:'3px',
      height:'34px'
    };
    this.spanStyle = {
      display:'block',
      width:'135px',
      float:'left'
    };
    this.state = {
      data:undefined
    }
  }

  addList1(){
    let bg = '';
    return this.state.data.data1.map((item,i)=>{
      if(i%2===1){
        bg = '#23429c';
      }else {
        bg = '';
      }
      return(
        <li style={{...this.liStyle,background:bg}} key={i}>
          <span style={{...this.spanStyle}}>{item.name}</span>
          <span style={{...this.spanStyle}}>{item.lev1}</span>
          <span style={{...this.spanStyle}}>{item.lev2}</span>
          <span style={{...this.spanStyle}}>{item.lev3}</span>
          <span style={{...this.spanStyle}}>{item.lev4}</span>
          <span style={{...this.spanStyle}}>{item.lev5}</span>
        </li>
      )
    })
  }

  addList2(){
    let bg = '';
    return this.state.data.data2.map((item,i)=>{
      if(i%2===1){
        bg = '#23429c';
      }else {
        bg = '';
      }
      return(
        <li style={{...this.liStyle,background:bg}} key={i}>
          <span style={{...this.spanStyle}}>{item.name}</span>
          <span style={{...this.spanStyle}}>{item.lev1}</span>
          <span style={{...this.spanStyle}}>{item.lev2}</span>
          <span style={{...this.spanStyle}}>{item.lev3}</span>
          <span style={{...this.spanStyle}}>{item.lev4}</span>
          <span style={{...this.spanStyle}}>{item.lev5}</span>
        </li>
      )
    })
  }

  setData(d){
    this.setState({
      data:d
    })
  }


  render(){
    if(this.state.data){
      return(
        <div>
          <div style={{
            ...this.divStyle,
            marginLeft:'20px'
          }}>
            <p style={{
              color:'#46ebff',
              lineHeight:'16px',
              height:'16px',
              marginBottom:'10px'
            }}>品种和单价交叉组合</p>
            <ul style={{
              textAlign:'center',
              lineHeight:'34px'
            }}>
              <li style={{
                ...this.liStyle,
                background:'#1e4197'
              }}>
                <span style={{
                  ...this.spanStyle
                }}>品种／单价</span>
                <span style={{
                  ...this.spanStyle
                }}>5元以下／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>5-10元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>10-15元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>15－20元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>20元以上</span>
              </li>
              {
                this.addList1()
              }
            </ul>
          </div>

          <div style={{
            ...this.divStyle,
            marginLeft:'58px'
          }}>
            <p style={{
              color:'#46ebff',
              lineHeight:'16px',
              height:'16px',
              marginBottom:'10px'
            }}>品种和单价交叉组合</p>
            <ul style={{
              textAlign:'center',
              lineHeight:'34px'
            }}>
              <li style={{
                ...this.liStyle,
                background:'#1e4197'
              }}>
                <span style={{
                  ...this.spanStyle
                }}>规格／单价</span>
                <span style={{
                  ...this.spanStyle
                }}>5元以下／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>5-10元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>10-15元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>15－20元／斤</span>
                <span style={{
                  ...this.spanStyle
                }}>20元以上</span>
              </li>
              {
                this.addList2()
              }
            </ul>
          </div>
        </div>
      )
    }else {
      return (
        <div></div>
      )
    }
  }

}
