import React, { Component } from 'react';
import classnames from 'classnames';
import { debounce, formatStyle } from '../../../../utils';
import { POINTS } from '../../../../utils/constant';
import IconFont from '../../../../utils/Iconfont';
import { CanvasContext } from '../../../../utils/Context';
import styles from './index.less';

export default class ControlPoints extends Component {
  static contextType = CanvasContext;
  // 旋转操作
  handleMouseDownRotate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { updateSelectedCompStyle } = this.context;
    const startX = e.pageX;
    const startY = e.pageY;

    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      const disX = x - startX;
      const disY = y - startY;

      // 计算角度
      const deg = (360 * Math.atan2(disY, disX)) / (2 * Math.PI);
      // 防抖，变换频繁时，不写入历史记录，在up事件时再进入
      debounce(
        updateSelectedCompStyle(
          {
            transform: `rotate(${deg}deg)`,
          },
          'frequently',
        ),
      );
    };
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      this.context.recordCanvasChangeHistory();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  // 缩放操作
  handleMounseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const { comp } = this.props;
    const { updateSelectedCompStyle } = this.context;
    const { style } = comp.data;
    const {
      width: compWidth,
      height: compHeight,
      top: compTop,
      left: compLeft,
    } = style;
    const startX = e.pageX;
    const startY = e.pageY;
    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;
      const newStyle = {};

      if (direction.includes('t')) {
        // TODO: 为什么变换负数?
        disY = -disY;
        newStyle.top = compTop - disY;
      }
      if (direction.includes('l')) {
        disX = -disX;
        newStyle.left = compLeft - disX;
      }
      // 防抖，变换频繁时，不写入历史记录，在up事件时再进入
      debounce(
        updateSelectedCompStyle(
          {
            ...newStyle,
            width: compWidth + disX,
            height: compHeight + disY,
          },
          'frequently',
        ),
      );
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      this.context.recordCanvasChangeHistory();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  render() {
    const { comp } = this.props;
    const { style } = comp.data;
    const { width, height, top, left } = style;
    const gapTop = top - 2;
    const gapLeft = left - 2;

    return (
      <div
        className={styles.controlPoints}
        style={{
          transform: style.transform,
          width,
          height,
          left: gapLeft + 2,
          top: gapTop + 2,
        }}
      >
        <IconFont
          type="icon-fontxuanzhuan"
          className={styles.rotate}
          style={{
            left: -2 + width / 2,
            top: -22,
          }}
          onMouseDown={this.handleMouseDownRotate}
        />
        {POINTS.map((item) => {
          return (
            <div
              key={item.dirction}
              className={styles.point}
              style={item.styleFunc({
                width,
                height,
                left: -2,
                top: -2,
              })}
              onMouseDown={(e) => this.handleMounseDown(e, item.dirction)}
            />
          );
        })}
      </div>
    );
  }
}