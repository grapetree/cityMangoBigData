import React from 'react';
/**
 *left,top,content为传递的参数
 *
 **/

export default class HeaderText extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <p style={{
        position: 'absolute',
        top:this.props.top||'55px',
        left:this.props.left||'20px',
        color: '#46ebff',
        fontSize:this.props.fontSize||'0.18rem',
      }}>{this.props.content}</p>
    )
  }
}
