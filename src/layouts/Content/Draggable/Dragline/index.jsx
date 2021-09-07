import React, { Component } from 'react';
import styles from './index.less';

export default class Dragline extends Component {
  render() {
    const { comp, canvasStyle } = this.props;
    const { style } = comp.data;
    const { width, height, top, left } = style;
    const gapWidth = width + 2;
    const gapHeight = height + 2;

    return (
      <div
        className={styles.dragline}
        style={{
          // transform: style.transform,
          width: gapWidth,
          height: gapHeight,
          left: left,
          top: top,
        }}
      >
        <div
          className={styles.pointLineHorizon}
          style={{
            width: canvasStyle?.width / 2,
            left: 0,
            top: height / 2,
            // transform: `translateX(-${canvasStyle?.width / 2 - width / 2}px)`,
            transform: `translateX(-${(canvasStyle?.width / 2 - width) / 2}px)`,
          }}
        />
        <div
          className={styles.pointLineVertical}
          style={{
            height: canvasStyle?.height / 2,
            left: width / 2,
            top: 0,
            // transform: `translateY(-${canvasStyle?.height / 2 - height 2}px)`,
            transform: `translateY(-${
              (canvasStyle?.height / 2 - height) / 2
            }px)`,
          }}
        />
      </div>
    );
  }
}
