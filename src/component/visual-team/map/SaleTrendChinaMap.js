import React from 'react';
import ReactThreeBase from '../base/ReactThreeBase';
import {GeneralMapApp, ColorScale ,ChartLib} from '../../../vendor/threejs-chart-library-apps.min.js';


//import * as ChartLib from './threejs-chart-library-apps.min.js';
// FOR TEST
// window.devicePixelRatio = 0.5;

/**
 *
 */
class ChinaMap extends ReactThreeBase {
  constructor(props) {
    super(props);
    let me = this;

    let env = new GeneralMapApp({
      cameraPosition: [10.808370057456004, -15.364198757897254, 341.96305373876106],
      scaleX: 9,
      scaleY: 11,
      fillColor: ['#21a5f0','#1db0f2','#1bb4f2'],  //['#5efdff', '#47fdff', 0x38fcff],
      lightColor: 0xCCCCCC,
      labelStrokeColor: 0xFFFFFF,
      labelFillColor: 0xFFFFFF,
      southChinaSea: {
        position: [200, -130, 0],
        fillColor: '#21a5f0'
      },
      useRank: false
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

  set lineData(value) {
    // 柱子的颜色比例尺，这里假设数据的值域domain为[0,1]，实际应从数据中抽取出值域，下同
    let color = new ColorScale()
      .domain(0, 1)
      .colors(0xF2ED3B, 0xECD137, 0xE08F2D, 0xD72D30);

    value.forEach(v => {
      if(v.mount>0.5) {
        v.color = 0xFDE634;
      }else {
        v.color = 0x00FFFF;
      }
      // v.color2 = 0xff8ba6;
      // v.color3 = 0xb3267f;
    });
    this._env.lineData = value;
  }

  set markerData(value) {
    // 柱子的颜色比例尺，这里假设数据的值域domain为[0,1]，实际应从数据中抽取出值域，下同
    let color = new ColorScale()
      .domain(0, 1)
      .colors(0xF2ED3B, 0xECD137, 0xE08F2D, 0xD72D30);

    value.forEach(v => {
      if(v.mount>0.5) {
        v.color = 0xFDE634;
      }else {
        v.color = 0X00FFFF;
      }
      // v.color2 = 0xff8ba6;
      // v.color3 = 0xb3267f;
    });
    //console.log(value);
    this._env.markerData = value;
  }
}

export default ChinaMap;
