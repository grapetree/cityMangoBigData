import React from 'react';


export default class Panel extends React.Component{
  constructor(props){
    super(props);
    this.box = {
      position:'absolute',
      left:this.props.left||0,
      top:this.props.top||0,
      width:this.props.width||'200px',
      height:this.props.height||'200px'
    };
    this.box1 = {
      width: '100%',
      height: '8px',
      borderRadius: '8px 8px 0 0',
      borderTop: '1px solid rgba(55, 255, 251, 1)',
      borderLeft: '1px solid rgba(55, 255, 251, 1)',
      borderRight: '1px solid rgba(55, 255, 251, 1)',
      background:'#2f4eb1'

    };
    this.box2 = {
      width: '100%',
      height: this.props.height-8,
      borderLeft: '1px solid rgba(55, 255, 251, 1)',
      borderRight: '1px solid rgba(55, 255, 251, 1)',
      borderImage: 'linear-gradient(rgba(55, 255, 251, 1), rgba(55, 255, 251, 0)) 10 10',
      borderBottom: 'none',
      background:'#2f4eb1',
      borderRadius:'0 0 8px 8px'
    }
  }
  render(){
    return(
      <div style={this.box}>
        <div style={this.box1}></div>
        <div style={this.box2}>
          {this.props.children}
        </div>
      </div>
    )
  }
  componentWillMount(){

  }
}
