import React, {Component} from 'react';
import {
  Scaler,
  MODE_NORMAL,
  MODE_WIDTH,
  MODE_HEIGHT,
  MODE_FULL,
  MODE_NONE,
  MODE_DEBUG
} from '@jusfoun-vis/scaler';

/**
 * React缩放管理器。
 * @author Molay
 */
class ResizeManager extends Component {
  /**
   * 通用模式，取全屏居中比例。
   * @type {number}
   */
  static MODE_NORMAL = MODE_NORMAL;
  /**
   * 宽度自适应模式。
   * @type {number}
   */
  static MODE_WIDTH = MODE_WIDTH;
  /**
   * 高度自适应模式。
   * @type {number}
   */
  static MODE_HEIGHT = MODE_HEIGHT;
  /**
   * 铺满模式，会产生形变。
   * @type {number}
   */
  static MODE_FULL = MODE_FULL;
  /**
   * 沉默模式，不执行任何操作。
   * @type {number}
   */
  static MODE_NONE = MODE_NONE;
  /**
   * 调试模式。
   * @type {number}
   */
  static MODE_DEBUG = MODE_DEBUG;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let me = this;
    let props = me.props;
    let scaler = new Scaler(props.mode, props.fullWidth, props.fullHeight);
    me._scaler = scaler;

    scaler.manage();
  }

  componentWillUnmount() {
    let me = this;
    me._scaler.unmanage();
  }

  render() {
    return false;
  }
}

export default ResizeManager;
