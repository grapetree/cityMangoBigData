import React, {Component} from 'react';
import {Timer} from '../../../vendor/common-library.min.js';

let autoid = 0;

/**
 * React组件基类，提供一些常用的基础方法。
 * @author Molay
 */
class ReactBase extends Component {

  _id = undefined;
  _forceUpdate = true;
  _forceUpdateTimer = undefined;

  constructor(props) {
    super(props);

    let me = this;
    me._id = ++autoid;

    let timer = new Timer(Timer.REQUEST_ANIMATION_FRAME, 5);
    timer.on('timerComplete', () => me.componentDidUpdate());
    me._forceUpdateTimer = timer;
  }

  setState(updater, callback) {
    super.setState(updater, callback);
    let me = this;
    if (me._forceUpdate) {
      let timer = me._forceUpdateTimer;
      timer.reset();
      timer.start();
    }
  }

  componentDidUpdate() {
  }
}

export default ReactBase;
