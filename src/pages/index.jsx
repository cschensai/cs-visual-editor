import { useLayoutEffect } from 'react';
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

  return (
    <div id="app" className={styles.main}>
      <CanvasContext.Provider value={globalCanvas}>
        <Comps />
        <Content />
        <Editor />
      </CanvasContext.Provider>
    </div>
  );
}
