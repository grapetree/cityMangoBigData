import React,{Component} from 'react';

class Word extends Component {
  constructor(props){
    super(props);
    let me = this;

    me.fontSize = me.props.fontSize || '38px';
    me.fontFamily = me.props.fontFamily || 'SimHei';
    me.fontWeight = me.props.fontWeight || 700;
    me.direction = me.props.direction || 'bottom';
    me.color1 = me.props.color1 || '#9affff';
    me.color2 = me.props.color2 || '#21d1f5';

  }
  render(){
    let me = this;
    return(
      <span style={{
        fontSize: me.fontSize,
        fontFamily: me.fontFamily,
        fontWeight: me.fontWeight,
        background: `linear-gradient(to ${me.direction}, ${me.color1}, ${me.color2})`,
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        {me.props.num}
      </span>
    )
  }
}
export default Word;
