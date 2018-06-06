import React from 'react';
/**
 *left,top,content为传递的参数
 *
 **/

export default class Title extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <li style={{
          position:'absolute',
          top:this.props.top||'0',
          left:this.props.left||'0',
          color:'#46ebff',
          height:'0.22rem',
          fontSize:'0.22rem',
          lineHeight:'0.22rem',
          borderLeft:'0.03rem solid #46ebff',
          paddingLeft:'0.08rem'
        }}>{this.props.content}</li>
      </div>
    )
  }
}
