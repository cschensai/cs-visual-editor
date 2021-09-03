import React, { Component } from 'react';
import styles from './index.less';

export default class Dragline extends Component {
  render() {
    const { comp, canvasWidth } = this.props;
    const { style } = comp.data;
    const { width, height, top, left } = style;
    const gapWidth = width + 2;
    const gapHeight = height + 2;

    return (
      <div
        className={styles.dragline}
        style={{
          transform: style.transform,
          width: gapWidth,
          height: gapHeight,
          left: left,
          top: top,
        }}
      >
        <div
          className={styles.pointLine}
          style={{
            width: canvasWidth,
            left: -3,
            top: height / 2,
            transform: `translateX(-${canvasWidth / 2 - width / 2}px)`,
          }}
        />
      </div>
    );
  }
}
