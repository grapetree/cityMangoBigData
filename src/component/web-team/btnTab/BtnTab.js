import React, {Component} from 'react';
import './btnTab.css';

class BtnTab extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      tabList: this.props.nameArr,
      selected: this.props.sid //传入要显示的默认id
    };
    let clickFn = function (e) {
        me.state.selected = e;
    };
    document.addEventListener('click',clickFn);
  }
  _tabList(i,v){
    let ObjChange = {
      sid: i,
    };
    this.setState({
        selected:i
    })
    this.props._change(ObjChange);
  }
  render() {
    return (
      <div>
        <ul className="btn-tab">
          {
            this.state.tabList.map((item,index)=>{
              return (
                <li data-name={item}  className={this.state.selected==index?'active':''} data-index={index} onClick={this._tabList.bind(this,index)} key={index}>{item}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default BtnTab;

