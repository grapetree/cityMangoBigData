import React from 'react';
import sun from './img/sun.png';
/*
* x       x轴 坐标范围
* yStart  y轴起始点坐标范围
* yEnd    y轴终点坐标范围
* r       太阳半径坐标范围
* canvas  canvas标签的位置、宽、高
* clear   canvas标签的清除范围
* num     生成太阳的个数
*
* one   从右数第一个柱子 走的
*
* two   从右数第二个柱子 走的
*
* three  从左数第一个柱子 走的
*
* four   从左数第二个
*
* five   中间的那个
* */
const dataJson = {
  one: {
    xStart: {
      a: 3,
      b: 0
    },
    xEnd: {
      a: 5,
      b: 255
    },
    xFinal: {
      a: 4,
      b: 310
    },
    yStart: {
      a: 1,
      b: 2
    },
    yEnd: {
      a: 5,
      b: 85
    },
    r: {
      a: 5,
      b: 8
    },
    increase:{
      a: 1,
      b: 2
    },
    canvas:{
      xPosition: 373,
      yPosition: 387,
      width: 314,
      height: 105
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 314,
      height: 105
    },
    num: 1
  },
  two: {
    xStart: {
      a: 3,
      b: 0
    },
    xEnd: {
      a: 4,
      b: 220
    },
    yStart: {
      a: 1,
      b: 1
    },
    yEnd: {
      a: 8,
      b: 37
    },
    r: {
      a: 5,
      b: 8
    },
    increase:{
      a: 1.5,
      b: 1.5
    },
    canvas:{
      xPosition: 373,
      yPosition: 439,
      width: 231,
      height: 43
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 231,
      height: 43
    },
    num: 1
  },
  three: {
    xStart: {
      a: 3,
      b: 153
    },
    xEnd: {
      a: 2,
      b: 1
    },
    yStart: {
      a: 1,
      b: 0
    },
    yEnd: {
      a: 8,
      b: 37
    },
    r: {
      a: 5,
      b: 8
    },
    increase:{
      a: -1.5,
      b: -1.5
    },
    canvas:{
      xPosition: 83,
      yPosition: 349,
      width: 155,
      height: 43
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 155,
      height: 43
    },
    num: 1
  },
  four: {
    xStart: {
      a: 3,
      b: 44
    },
    xEnd: {
      a: 2,
      b: 3
    },
    yStart: {
      a: 1,
      b: 1
    },
    yEnd: {
      a: 5,
      b: 18
    },
    r: {
      a: 5,
      b: 8
    },
    increase:{
      a: -1.5,
      b: -1.5
    },
    canvas:{
      xPosition: 388,
      yPosition: 472,
      width: 44,
      height: 18
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 44,
      height: 18
    },
    num: 1
  },
  five: {
    xStart: {
      a: 3,
      b: 0
    },
    xEnd: {
      a: 2,
      b: 85
    },
    yStart: {
      a: 1,
      b: 1
    },
    yEnd: {
      a: 5,
      b: 27
    },
    r: {
      a: 5,
      b: 8
    },
    increase:{
      a: 1.5,
      b: 1.5
    },
    canvas:{
      xPosition: 373,
      yPosition: 414,
      width: 95,
      height: 32
    },
    clear: {
      xPosition: 0,
      yPosition: 0,
      width: 95,
      height: 32
    },
    num: 1
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
        position: 'absolute',
        left:0,
        top:0
      }} ref={'box'}>

      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const box = me.refs.box;
    // let canvas1 = document.createElement('canvas');
    // canvas1.width = dataJson.one.canvas.width;
    // canvas1.height = dataJson.one.canvas.height;
    // canvas1.style.position = 'absolute';
    // canvas1.style.left = dataJson.one.canvas.xPosition + 'px';
    // canvas1.style.top = dataJson.one.canvas.yPosition + 'px';
    // box.appendChild(canvas1);

    let attrArr1 = me._createSun(box,dataJson.one);
    const ctx1 = attrArr1.canvas.getContext('2d');

    let attrArr2 = me._createSun(box,dataJson.two);
    const ctx2 = attrArr2.canvas.getContext('2d');

    let attrArr3 = me._createSun(box,dataJson.three);
    const ctx3 = attrArr3.canvas.getContext('2d');

    let attrArr4 = me._createSun(box,dataJson.four);
    const ctx4 = attrArr4.canvas.getContext('2d');

    let attrArr5 = me._createSun(box,dataJson.five);
    const ctx5 = attrArr5.canvas.getContext('2d');

    let img = new Image();
    img.src = sun;

    let drawRightArr = [
      {
        attrArr: attrArr1,
        ctx: ctx1,
        time: 80,
        img: img,
        data: dataJson.one
      },
      {
        attrArr: attrArr2,
        ctx: ctx2,
        time: 80,
        img: img,
        data: dataJson.two
      }
    ];

    let drawLeftArr = [
      {
        attrArr: attrArr3,
        ctx: ctx3,
        time: 80,
        img: img,
        data: dataJson.three
      },
      {
        attrArr: attrArr4,
        ctx: ctx4,
        time: 80,
        img: img,
        data: dataJson.four
      },
    ];

    img.onload = function(){

      setTimeout(()=>{
        me._xMove(
          attrArr1.xStart , attrArr1.xEnd , attrArr1.xFinal ,
          attrArr1.yStart , attrArr1.yEnd , 80 , img ,
          attrArr1.circleNum , dataJson.one , ctx1 , attrArr1.increase );
      },7000);

      setTimeout(()=>{
        me._xMove(
          attrArr2.xStart , attrArr2.xEnd , attrArr2.xFinal ,
          attrArr2.yStart , attrArr2.yEnd , 80 , img ,
          attrArr2.circleNum , dataJson.two , ctx2 , attrArr2.increase );
      },7000);

      setTimeout(()=>{
        me._xMove(
          attrArr5.xStart , attrArr5.xEnd , attrArr5.xFinal ,
          attrArr5.yStart , attrArr5.yEnd , 80 , img ,
          attrArr5.circleNum , dataJson.five , ctx5 , attrArr5.increase );
      },7000);

      setTimeout(()=>{
        me._xLeftMove(
          attrArr3.xStart , attrArr3.xEnd , attrArr3.xFinal ,
          attrArr3.yStart , attrArr3.yEnd , 80 , img ,
          attrArr3.circleNum , dataJson.three , ctx3 , attrArr3.increase );
      },7000);

      setTimeout(()=>{
        me._xLeftMove(
          attrArr4.xStart , attrArr4.xEnd , attrArr4.xFinal ,
          attrArr4.yStart , attrArr4.yEnd , 80 , img ,
          attrArr4.circleNum , dataJson.four , ctx4 , attrArr4.increase );
      },7000);

    }

  };

  _createSun(box,data){
    let me = this;
    let canvas = document.createElement('canvas');
    canvas.width = data.canvas.width;
    canvas.height = data.canvas.height;
    canvas.style.position = 'absolute';
    canvas.style.left = data.canvas.xPosition + 'px';
    canvas.style.top = data.canvas.yPosition + 'px';
    box.appendChild(canvas);

    let circleNum = data.num;  //页面中太阳的数量
    let yStart = me._createArr(data.yStart.a, data.yStart.b, circleNum);  //从 120--130  y开始出现
    let yEnd = me._createArr(data.yEnd.a, data.yEnd.b, circleNum);    // 走 210 --220 的距离
    let xStart = me._createArr(data.xStart.a, data.xStart.b, circleNum);      //从 120--420  x开始出现
    let xEnd = me._createArr(data.xEnd.a, data.xEnd.b, circleNum);      //从 120--420  x结束
    let xFinal = undefined;
    if(data.xFinal){
      xFinal = me._createArr(data.xFinal.a, data.xFinal.b, circleNum);      //从 120--420  x结束
    }
    let increase = me._createArr(data.increase.a , data.increase.b ,circleNum);
    console.log(increase);
    //生成canvas标签  以及y轴起始和终点坐标 x轴坐标 增加变量数字 太阳个数的数组
    return {
      canvas: canvas,
      yStart: yStart,
      yEnd: yEnd,
      xStart: xStart,
      xEnd: xEnd,
      xFinal: xFinal,
      increase: increase,
      circleNum: circleNum
    }
  }

  _xMove( xStart, xEnd, xFinal, yStart, yEnd, time, img, circleNum, data, ctx, increase ) {

    let me = this;

    let arr = me._createArr(data.r.a, data.r.b, circleNum);   //圆的大小的随机数

    let one = true;
    let two = false;

    let timer = setInterval(() => {

      me._clearRect(data.clear.xPosition, data.clear.yPosition, data.clear.width, data.clear.height,ctx);

      let increaseNum = increase; //累加数组 和 circleNum数组 数量保持一致

      if(one)
      //第一步先改变 X 的位置向右移动
        xStart.map((v, i) => {
          xStart[i] = xStart[i] + increaseNum[i];
        });

      if(two)
      //第一步先改变 X 的位置向右移动
        yStart.map((v, i) => {
          yStart[i] = yStart[i] + increaseNum[i];
        });

      xStart.map((v, i) => {

        // me.ctx.globalAlpha=0.5;
        ctx.drawImage(img, v, yStart[i], arr[i], arr[i]);

        if (xStart[i] >= xEnd[i]) {

          one = false;
          two = true;

          xStart[i] = xEnd[i];

          if(yStart[i] >= yEnd[i]){

            yStart[i] = yEnd[i];

            let x = me._createRandom(data.xStart.a, data.xStart.b);    //重新给 X的位置
            let y = me._createRandom(data.yStart.a, data.yStart.b);    //重新给 Y的位置
            let r = me._createRandom(data.r.a, data.r.b);       //重新给 太阳的大小

            xStart.splice(i, 1, x);
            yStart.splice(i, 1, y);
            arr.splice(i, 1, r);
            one = true;
            two = false;
          }
        }
      });
    }, time)
  }

  _xLeftMove( xStart, xEnd, xFinal, yStart, yEnd, time, img, circleNum, data, ctx, increase ) {

    let me = this;

    let arr = me._createArr(data.r.a, data.r.b, circleNum);   //圆的大小的随机数

    let one = true;
    let two = false;

    let timer = setInterval(() => {

      me._clearRect(data.clear.xPosition, data.clear.yPosition, data.clear.width, data.clear.height,ctx);

      let increaseNum = increase; //累加数组 和 circleNum数组 数量保持一致

      if(one)
      //第一步先改变 X 的位置向右移动
        xStart.map((v, i) => {
          xStart[i] = xStart[i] + increaseNum[i];
        });

      if(two)
      //第一步先改变 Y 的位置向下移动
        yStart.map((v, i) => {
          yStart[i] = yStart[i] - increaseNum[i];
        });

      xStart.map((v, i) => {

        // me.ctx.globalAlpha=0.5;
        ctx.drawImage(img, v, yStart[i], arr[i], arr[i]);

        if (xStart[i] <= xEnd[i]) {

          one = false;
          two = true;

          xStart[i] = xEnd[i];

          if(yStart[i] >= yEnd[i]){

            yStart[i] = yEnd[i];

            let x = me._createRandom(data.xStart.a, data.xStart.b);    //重新给 X的位置
            let y = me._createRandom(data.yStart.a, data.yStart.b);    //重新给 Y的位置
            let r = me._createRandom(data.r.a, data.r.b);       //重新给 太阳的大小

            xStart.splice(i, 1, x);
            yStart.splice(i, 1, y);
            arr.splice(i, 1, r);
            one = true;
            two = false;
          }
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
