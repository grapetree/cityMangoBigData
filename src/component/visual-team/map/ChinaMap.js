import React from 'react';
import ReactThreeBase from '../base/ReactThreeBase';
import {ChartLib, ColorScale, GeneralMapApp, SimpleTooltip} from '../../../vendor/threejs-chart-library-apps.min.js';

// FOR TEST
// window.devicePixelRatio = 0.5;

/**
 *
 */
class ChinaMap extends ReactThreeBase {
  constructor(props) {
    super(props);
    let me = this;

    let tooltip = new SimpleTooltip({});
    document.body.appendChild(tooltip.domElement);
    me._tooltip = tooltip;

    let env = new GeneralMapApp({
      // cameraPosition: [10.808370057456004, -15.364198757897254, 341.96305373876106],
      // scaleX: 8,
      // scaleY: 10,
      // fillColor: [0x5efdff, 0x47fdff, 0x38fcff],
      // lightColor: 0xCCCCCC,
      // labelStrokeColor: 0x000000,
      // labelFillColor: 0x000000,
      // southChinaSea: {
      //   position: [200, -130, 0],
      //   fillColor: 0x38fcff
      // },
      //mapData: require('./geojson/world.geo.json'),
      // cameraPosition: [8.06787086891024, -31.830933810182398, 340.9007343810265],
      cameraPosition: [8.06787086891024, 0, 340.9007343810265],
      idField: 'name',
      fillColor: 0x055bcd,
      strokeColor: 0xFFFFFF,
      scaleX: 8,
      scaleY: 10,
      // scaleZ: 5,
      showLabels: false,
      highlightColor: 0xfed23d,
      isChina: true,
      // 控制连线的粗细
      lineWidth: 5,
      // 控制连线距离地面的最高高度
      lineHeight: 50,
      // 控制连线的流向速度
      lineSpeed: 0.25,
      rank: {
        palette: [0x00c7ff, 0x23cdfc, 0x1ca6fc, 0x1682fb],
        textFillColor: '#8ac7ff',
        textStrokeColor: '#8ac7ff',
        position: [-280, -130, 0]
      },
      controls: {
        enableRotate: false,
        enableZoom: false
      },
      useRank: true
    });
    env._initLights = function () {
      let me2 = this;
      let c = 0.25;
      let c2 = 0xFFFFFF;
      me2.addPointLight(c2, 0.2, 1200.0 * c, 0.0, 100.0 * c);
      me2.addPointLight(c2, 0.2, -1200.0 * c, 0.0, 100.0 * c);
      me2.addPointLight(c2, 0.2, 0.0, 1200.0 * c, 100.0 * c);
      me2.addPointLight(c2, 0.2, 0.0, -1200.0 * c, 100.0 * c);
      me2.addPointLight(c2, 1.1, 0.0, 0.0, 1200.0 * c);

      me2.controls.enableZoom = false;
    };
    // env._initFinally = function () {
    //   let me2 = this;
    //   me2.camera.position.set();
    //   me2.controls.update();
    //   me2.controls.enableZoom = false;
    // };
    me._env = env;

  }
  // set lineData(value) {
  //   // 柱子的颜色比例尺，这里假设数据的值域domain为[0,1]，实际应从数据中抽取出值域，下同
  //   let color = new ColorScale()
  //     .domain(0, 1)
  //     .colors(0xF2ED3B, 0xECD137, 0xE08F2D, 0xD72D30);
  //
  //   value.forEach(v => {
  //     v.color = 0xf04755;
  //     v.color2 = 0xff8ba6;
  //     v.color3 = 0xb3267f;
  //   });
  //
  //   this._env.lineData = value;
  // }

  set mapColor(value) {
    // 设置地图各板块的信息与颜色，测试用，请替换为真实数据。
    // 颜色比例尺
    let me = this;
    let tooltip = me._tooltip;
    let env = me._env;

    let color = new ColorScale()
      .domain(0, 1)
      .colors(0x00c7ff, 0x23cdfc, 0x1ca6fc, 0x1682fb);

    value = value.map(function (f) {
      // 值域假设在[0,1]之间
      //let value = Math.random();
      return {
        id: f.id,
        value: f.value,
        value1: f.value1,
        value2: f.value2,
        value3: f.value3,
        color: color.get(f.value)
      };
    });

    //console.log(this._env.generalMap);

    env.mapItemData = value;

    env.on('mapItemMouseOver', function (e) {
      tooltip.show([
          e.feature.properties.name,
          '<br/>',
           e.item.value1 ? '芒果平均价：' + e.item.value1 +'元/公斤'+'<br/>' : '',
           e.item.value2 ? '芒果最低价：' + e.item.value2 +'元/公斤'+'<br/>' : '',
           e.item.value3 ? '芒果最高价：' + e.item.value3 +'元/公斤'+'<br/>' : ''
        ].join(''),
        {
          mouseEvent: e.mouseEvent
        });
    });

    env.on('mapItemMouseOut',function () {
      tooltip.hide();
    })

    // return value.map(function (f) {
    //   var value2 = Math.random();
    //   return {
    //     id: f.id,
    //     value: value2,
    //     color: color.get(value2)
    //   };
    // });
  }
}

export default ChinaMap;
