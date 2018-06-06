import React, {Component} from 'react';
import './select.css';
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
    //console.log(props.nameArr[0])
    me.state = {
      seciens: props.nameArr,
      showName: props.nameArr[0],
      selected: false
    };
    let clickFn = function (e) {
      if ( e.target.className != "pull-down-topic" && e.target.className != "area-word" && e.target.className != "area-img") {
        me.state.selected = false;
        me.setState({});
      }
    };
    document.addEventListener('click',clickFn);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
       seciens: nextProps.nameArr,
       selected: false
    })
  }
  _selected(e) {
    this.state.selected = true;
    this.setState({});
  }

  _selectList(e){
    let objPullDown = {
      name: e.target.getAttribute('data-name'),
      value: e.target.getAttribute('data-value'),
      index: e.target.getAttribute('data-index'),
      key: e.target.getAttribute('data-key')
    };
    this.state.showNameFirst = objPullDown.name;
    this.state.selected = false;
    this.setState({});
    this.props._pullDownMes(objPullDown);
  }
  render() {

    return (
      <div className="history-future" style={this.props.style}>
        <div className="area-place">
          <div className="pull-down-topic" onClick={this._selected.bind(this)} style={{width: this.props.width + 'px'}}>
            <span className="area-word">{this.state.showNameFirst || this.props.nameArr[0]}</span>
            <span className="area-img" style={{transform: this.state.selected ? 'rotate(180deg)' : 'rotate(0deg)'}}></span>
          </div>
          <div className="pull-down-internet area-choice-box" style={{
            display: this.state.selected ? 'block' : 'none',
            width: this.props.width + 20 + 'px'
          }}>
            <ul className='mnSelect'>
              {
                this.props.nameArr.map((item,index)=>{
                  return (
                    <li data-name={item} 
                      data-value={this.props.valueArr ? this.props.valueArr[index]:''} 
                      data-key={this.props.keyArr ? this.props.keyArr[index]:''} 
                      data-index={index} 
                      onClick={this._selectList.bind(this)} 
                      key={index}>
                      {item}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Select;

