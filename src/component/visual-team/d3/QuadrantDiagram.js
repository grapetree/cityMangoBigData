import React, {Component} from 'react';
import bg from './img/fourIndex.png';
import BallCharts from '../ball/Ball3d';
import Category from '../ball/Category';

class QuadrantDiagram extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{width: '1125px', height: '800px', position: 'absolute', left: '180px', top: '114px'}}>
        <div style={{width: '306px', height: '267px', position: 'absolute', left: '0px', top: '123px'}}>
          <img src={bg} style={{width: '100%', height: '100%'}}/>
        </div>

        <div id={'box'} style={{width: '1125px', height: '800px'}}></div>

      </div>
    )
  }

  componentDidMount() {
    let box = document.getElementById('box');

    let ballObj = BallCharts(box, function (info) {

    });
    ballObj.init();

    ballObj.show([
      {
        name: "苹果",
        districtName: "活草鱼1",
        id: "AF01001",
        quadrant: 'a',
        x: 23,
        y: 42
      },
      {
        name: "鸡蛋",
        districtName: "活草鱼2",
        id: "AL05001",
        x: 230,
        y: 42
      },
      {
        name: "猪肉",
        districtName: "活草鱼3",
        id: "AL01002",
        x: 23,
        y: 142
      },
      {
        name: "活草鱼",
        districtName: "活草鱼4",
        id: "AM01002",
        x: 123,
        y: 42
      }]);
  }
}

export default QuadrantDiagram;