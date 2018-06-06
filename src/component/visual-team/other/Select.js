import React, {Component} from 'react';
import './visualSelect.css';
/*
*props: nameArr  下拉框名称数组
*       width    下拉框宽度
*       style    下拉框位置
*       _pullDownMes  回调函数 传入选择的li名称对象
* */
class Select extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      seciens: this.props.nameArr,
      showName: this.props.nameArr[0],
      selected: false
    };
    let clickFn = function (e) {
      if ( e.target.className != "pull-down-topic" && e.target.className != "area-word" && e.target.className != "area-img") {
        // me.state.selected = false;
        me.setState({
          selected: false
        });
      }
    };
    document.addEventListener('click',clickFn);
  }
  _selected(e) {
    // this.state.selected = true;
    this.setState({
      selected: true
    });
  }

  _selectList(e){
    let objPullDown = {
      name: e.target.getAttribute('data-name')
    };
    this.state.showName = objPullDown.name;
    // this.state.selected = false;
    this.setState({
      selected: false
    });
    this.props._pullDownMes(objPullDown);
  }
  render() {
    return (
      <div className="visual-pull-down" style={this.props.style}>
        <div className="area-place">
          <div className="pull-down-topic" onClick={this._selected.bind(this)} style={{width: this.props.width + 'px'}}>
            <span className="area-word">{this.state.showName}</span>
            <span className="area-img" style={{transform: this.state.selected ? 'rotate(180deg)' : 'rotate(0deg)'}}></span>
          </div>
          <div className="pull-down-internet area-choice-box" style={{
            display: this.state.selected ? 'block' : 'none',
            width: this.props.width + 20 + 'px'
          }}>
            <ul>
              {
                this.state.seciens.map((item,index)=>{
                  return (
                    <li data-name={item} data-index={index} onClick={this._selectList.bind(this)} key={index}>{item}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate(){
    // console.log(1);
  }
}
export default Select;

