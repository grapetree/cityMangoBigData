import React from 'react';
import sun from './img/sun.png';
import bg from './img/yield-bg.png';
/*
* x       x轴 坐标范围
* yStart  y轴起始点坐标范围
* yEnd    y轴终点坐标范围
* r       太阳半径坐标范围
* canvas  canvas标签的位置、宽、高
* clear   canvas标签的清除范围
* num     生成太阳的个数
* */
const dataJson = {
  square: {
    x: {
      a: 290,
      b: 20
    },
    yStart: {
      a: -10,
      b: -10
    },
    yEnd: {
      a: 10,
      b: 180
    },
    r: {
      a: 70,
      b: 5
    },
    canvas:{
      xPosition: 104,
      yPosition: 120,
      width: 400,
      height: 200
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 400,
      height: 217
    },
    num: 30
  },
  pillar: {
    x: {
      a: 119,
      b: 0
    },
    yStart: {
      a: -10,
      b: -10
    },
    yEnd: {
      a: 10,
      b: 140
    },
    r: {
      a: 25,
      b: 5
    },
    canvas:{
      xPosition: 235,
      yPosition: 297,
      width: 139,
      height: 160
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 139,
      height: 175
    },
    num: 20
  },
  juice: {
    x: {
      a: 35,
      b: 0
    },
    yStart: {
      a: 5,
      b: 0
    },
    yEnd: {
      a: 10,
      b: 75
    },
    r: {
      a: 15,
      b: 2
    },
    canvas:{
      xPosition: 64,
      yPosition: 592,
      width: 44,
      height: 90
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 90
    },
    num: 15
  },
  driedFood: {
    x: {
      a: 35,
      b: 0
    },
    yStart: {
      a: 5,
      b: 0
    },
    yEnd: {
      a: 10,
      b: 75
    },
    r: {
      a: 15,
      b: 2
    },
    canvas:{
      xPosition: 233,
      yPosition: 592,
      width: 44,
      height: 90
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 90
    },
    num: 15
  },
  sauce: {
    x: {
      a: 35,
      b: 0
    },
    yStart: {
      a: 5,
      b: 0
    },
    yEnd: {
      a: 10,
      b: 75
    },
    r: {
      a: 15,
      b: 2
    },
    canvas:{
      xPosition: 403,
      yPosition: 592,
      width: 44,
      height: 90
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 90
    },
    num: 15
  },
  vinegar: {
    x: {
      a: 35,
      b: 0
    },
    yStart: {
      a: 5,
      b: 0
    },
    yEnd: {
      a: 10,
      b: 75
    },
    r: {
      a: 15,
      b: 2
    },
    canvas:{
      xPosition: 573,
      yPosition: 592,
      width: 44,
      height: 90
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 90
    },
    num: 15
  },
  wine: {
    x: {
      a: 35,
      b: 0
    },
    yStart: {
      a: 5,
      b: 0
    },
    yEnd: {
      a: 10,
      b: 75
    },
    r: {
      a: 15,
      b: 2
    },
    canvas:{
      xPosition: 743,
      yPosition: 592,
      width: 44,
      height: 90
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 90
    },
    num: 15
  }
};
/**
 *
 **/
export default class Yield extends React.Component {
  constructor(props) {
    super(props);
    this.positions = {
      position: 'absolute',
      left: 0,
      top: 0
    }
  }

  render() {
    return (
      <div style={{
        width: '975',
        height: '682px',
        position: 'relative'
      }} ref={'box'}>

        <canvas ref={'bottomVas'} style={this.positions}> </canvas>

      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const bottomVas = me.refs.bottomVas;
    const width = 975;
    const height = 682;
    // 加背景底
    bottomVas.width = width;
    bottomVas.height = height;
    let bottomCtx = bottomVas.getContext('2d');
    let img1 = new Image();
    img1.src = bg;
    img1.onload = () => {
      bottomCtx.drawImage(img1, 0, 0, width, height);
    };

    const box = me.refs.box;

    let variable = me._createSun( box , dataJson.square);
    let ctx1 = variable[0].getContext('2d');

    let variable1 = me._createSun( box , dataJson.pillar);
    let ctx2 = variable1[0].getContext('2d');

    let variable2 = me._createSun( box , dataJson.juice);
    let ctx3 = variable2[0].getContext('2d');

    let variable3 = me._createSun( box , dataJson.driedFood);
    let ctx4 = variable3[0].getContext('2d');

    let variable4 = me._createSun( box , dataJson.sauce);
    let ctx5 = variable4[0].getContext('2d');

    let variable5 = me._createSun( box , dataJson.vinegar);
    let ctx6 = variable5[0].getContext('2d');

    let variable6 = me._createSun( box , dataJson.wine);
    let ctx7 = variable6[0].getContext('2d');

    let variableArr = [variable1,variable2,variable3,variable4,variable5,variable6];
    let dataArr = [dataJson.pillar,dataJson.juice,dataJson.driedFood,dataJson.sauce,dataJson.vinegar,dataJson.wine];
    let timeArr = [5500,10000,12000,9000,10500,11000];

    let img = new Image();
    img.src = sun;

    // me.ctx.fillStyle = 'grey';
    // me.ctx.fillRect(0, 0, width, height);



    img.onload = () => {

      me._time( variable[3], variable[1], variable[2], 100, img, variable[5], dataJson.square, ctx1 ,variable[4] );

      [ctx2,ctx3,ctx4,ctx5,ctx6,ctx7].map((v,i)=>{
        setTimeout(()=>{
          me._time( variableArr[i][3], variableArr[i][1], variableArr[i][2], 100, img, variableArr[i][5], dataArr[i], v ,variableArr[i][4] );
        },timeArr[i]);
      });

    };

  };

  _createSun(box,data){
    let me = this;
    let canvas2 = document.createElement('canvas');
    canvas2.width = data.canvas.width;
    canvas2.height = data.canvas.height;
    canvas2.style.position = 'absolute';
    canvas2.style.left = data.canvas.xPosition + 'px';
    canvas2.style.top = data.canvas.yPosition + 'px';
    box.appendChild(canvas2);

    let circleNum1 = data.num;  //页面中太阳的数量
    let yStart1 = me._createArr(data.yStart.a, data.yStart.b, circleNum1);  //从 120--130  y开始出现
    let yEnd1 = me._createArr(data.yEnd.a, data.yEnd.b, circleNum1);    // 走 210 --220 的距离
    let x1 = me._createArr(data.x.a, data.x.b, circleNum1);      //从 120--420  x开始出现
    let increase = me._createArr(1.5,1.5,circleNum1);

    //生成canvas标签  以及y轴起始和终点坐标 x轴坐标 增加变量数字 太阳个数的数组
    return[canvas2,yStart1,yEnd1,x1,increase,circleNum1]
  }

  //xRandom x轴生成的范围 yStart起始点生成的范围  time定时器的时间 img 图片  circleNum生成太阳的数量 data自己定义的数据  ctx canvas对象
  _time(xRandom, yStart, yEnd, time, img, circleNum, data, ctx, increase ) {

    let me = this;

    let arr = me._createArr(data.r.a, data.r.b, circleNum);   //圆的大小的随机数

    let timer = setInterval(() => {

      me._clearRect(data.clear.xPosition, data.clear.yPosition, data.clear.width, data.clear.height,ctx);

      let increaseNum = increase; //累加数组 和 circleNum数组 数量保持一致

      //改变Y的位置
      yStart.map((v, i) => {
        yStart[i] = yStart[i] + increaseNum[i];
      });

      xRandom.map((v, i) => {

        // me.ctx.globalAlpha=0.5;
        ctx.drawImage(img, v, yStart[i], arr[i], arr[i]);

        if (yStart[i] > yEnd[i]) {

          let x = me._createRandom(data.x.a, data.x.b);    //重新给 X的位置
          let y = me._createRandom(data.yStart.a, data.yStart.b);    //重新给 Y的位置
          let r = me._createRandom(data.r.a, data.r.b);       //重新给 太阳的大小

          xRandom.splice(i, 1, x);
          yStart.splice(i, 1, y);
          arr.splice(i, 1, r);

        }
      });
    }, time)
  }

  _createArr(a, b, num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push((Math.random() * a) + b)
    }
    return arr;
  }

  _createRandom(a, b) {
    return (Math.random() * a) + b
  }

  _clearRect(x, y, width, height,ctx) {
    ctx.clearRect(x, y, width, height);
  }

}
