import React from 'react';
import ReactBase from './ReactBase';
import {Timer} from '../../../vendor/common-library.min.js';
import * as THREE from 'three';
import {
  General3DEnv, InteractiveMesh, TWEEN
} from '../../../vendor/threejs-chart-library-apps.min.js';
// import A from '../../vendor/jusfoun/threejs-chart-library-maps.min.js';
// console.log(A);

/**
 * 经过交互等能力扩展的THREE.Mesh基类。
 * @author Molay
 */
class ExampleMesh extends InteractiveMesh {
  _material0 = undefined;
  _material1 = undefined;

  constructor(geometry, material0, material1) {
    super(geometry, material0);

    let me = this;

    me._material0 = material0;
    me._material1 = material1;

    me.interactive = true;
    me.buttonMode = true;
  }

  mouseOut() {
    let me = this;

    me.material = me._material0;
  }

  mouseOver() {
    let me = this;

    me.material = me._material1;
  }
}

/**
 * React Three.js基类。
 * @author Molay
 */
class ReactThreeBase extends ReactBase {
  constructor(props) {
    super(props);

    let me = this;

    // 创建通用3D环境。
    let env = new General3DEnv();
    env._initObjects = function () {
      // 默认示例，在实际场合应进行调整。
      const DP = Math.PI * 2;
      let boxBufferGeometry = new THREE.BoxBufferGeometry(10, 10, 10);
      let meshNormalMaterial = new THREE.MeshNormalMaterial();
      let meshBasicMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
      });

      for (let i = 0; i < 100; i++) {
        let mesh = new ExampleMesh(boxBufferGeometry, meshNormalMaterial, meshBasicMaterial);
        mesh.position.set(
          -100 + Math.random() * 200,
          -100 + Math.random() * 200,
          -100 + Math.random() * 200
        );
        mesh.rotation.set(
          Math.random() * DP,
          Math.random() * DP,
          Math.random() * DP
        );
        mesh.scale.set(0, 0, 0);
        new TWEEN.Tween(mesh.position)
          .to({
            x: -100 + Math.random() * 200,
            y: -100 + Math.random() * 200,
            z: -100 + Math.random() * 200
          }, 600)
          .delay(i * 10)
          .start();
        new TWEEN.Tween(mesh.rotation)
          .to({
            x: Math.random() * DP,
            y: Math.random() * DP,
            z: Math.random() * DP
          }, 600)
          .delay(i * 10)
          .start();
        new TWEEN.Tween(mesh.scale)
          .to({
            x: 1,
            y: 1,
            z: 1
          }, 600)
          .delay(i * 10)
          .start();
        env.addObject(mesh);
      }
    };
    // console.log(env);
    me._env = env;
  }

  _env = undefined;
  get env() {
    return this._env;
  }

  render() {
    return <div ref='domElement' style={this.props.style}></div>;
  }

  componentDidMount() {
    let me = this;

    let env = me._env;
    // env.initialize();
    env.appear();

    let domElement = this.refs.domElement;
    domElement.appendChild(env.domElement);
    me._domElement = domElement;

    this.componentDidUpdate();
  }

  componentWillUnmount() {
    let me = this;
    me._domElement.removeChild(me._env.domElement);
  }

  componentDidUpdate() {
    let me = this;
    let domElement = me._domElement;
    let parentElement = domElement.parentNode;
    let env = me._env;
    if (parentElement)
      env.resize(parentElement.clientWidth, parentElement.clientHeight);
  }

  start3DRender() {
    this._env.startRender();
  }

  stop3DRender() {
    this._env.stopRender();
  }
}

export default ReactThreeBase;
