import { useLayoutEffect, useEffect } from 'react';
import Guides from '@scena/guides';
import Comps from '../layouts/Comps';
import Content from '../layouts/Content';
import Editor from '../layouts/Editor';

import { useCanvas } from '../store/globalCanvas';
import { CanvasContext } from '../utils/Context';
import { useForceUpdate } from '../utils';

import styles from './index.less';

export default function IndexPage() {
  // 所有组件
  const globalCanvas = useCanvas();

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubscribe = globalCanvas.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [globalCanvas, forceUpdate]);

  useEffect(() => {
    const guidesHorizontal = new Guides(
      document.querySelector('#ruler_horizontal'),
      {
        type: 'horizontal',
        displayDragPos: true,
      },
    ).on('changeGuides', (e) => {
      console.log(e.guides);
    });
    const guidesVertical = new Guides(
      document.querySelector('#ruler_vertical'),
      {
        type: 'vertical',
        displayDragPos: true,
      },
    ).on('changeGuides', (e) => {
      console.log(e.guides);
    });

    // let scrollX = 0;
    // let scrollY = 0;
    window.addEventListener('resize', () => {
      guidesHorizontal.resize();
      guidesVertical.resize();
    });

    // window.addEventListener("wheel", e => {
    //     scrollX += e.deltaX;
    //     scrollY += e.deltaY;

    //     guidesHorizontal.scrollGuides(scrollY);
    //     guidesHorizontal.scroll(scrollX);
    //     guidesVertical.scrollGuides(scrollY);
    //     guidesVertical.scroll(scrollX);
    // });
  }, []);

  return (
    <div className={styles.optBox}>
      <div className={styles.corner} />
      <div className={styles.ruler_horizontal} id="ruler_horizontal" />
      <div className={styles.ruler_vertical} id="ruler_vertical" />
      <div id="app" className={styles.main}>
        <CanvasContext.Provider value={globalCanvas}>
          <Comps />
          <Content />
          <Editor />
        </CanvasContext.Provider>
      </div>
    </div>
  );
}
