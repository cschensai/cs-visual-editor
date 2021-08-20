import { useLayoutEffect, useEffect } from 'react';
import { useDispatch } from 'umi';
import Comps from '../layouts/Comps';
import Content from '../layouts/Content';
import Editor from '../layouts/Editor';

import { useCanvas } from '../store/globalCanvas';
import { useForceUpdate } from '../utils';

import styles from './index.less';

export default function IndexPage() {
  const dispatch = useDispatch();

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

  // global model
  useEffect(() => {
    dispatch({
      type: 'globalModel/updateState',
      payload: {
        context: globalCanvas,
      },
    });
  }, []);

  return (
    <div className={styles.mainBox}>
      <Comps />
      <Content />
      <Editor />
    </div>
  );
}
