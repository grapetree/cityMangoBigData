import React from 'react';
/**
 *left,top,content,color,fontSize为传递的参数
 *
 **/

export default class MangoListTitle extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <li style={{
          color:this.props.color || '#46ebff',
          height:'0.22rem',
          fontSize:this.props.fontSize || '0.22rem',
          lineHeight:'0.22rem',
          borderLeft:'0.03rem solid #46ebff',
          paddingLeft:'0.1rem',
          margin: '0.2rem 0'
        }}>{this.props.content}</li>
      </div>
    )
  }
}
