import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'umi';

import styles from './index.less';

export default function Content(props) {
  const selectorData = useSelector(({ globalModel }) => ({
    context: globalModel.context,
  }));
  // 画布所处的位置
  const [canvasPostion, setCanvasPostion] = useState(null);
  // 画布实例
  const canvasRef = useRef();

  // 获取画布属性
  const canvasStyle = selectorData.context.getCanvasStyle();

  // 获取画布所有组件
  const comps = selectorData.context.getComps();

  useEffect(() => {
    // 记录画布的位置，因为最终记录的位置是基于画布计算出来的相对位置
  }, []);

  return (
    <div id="content" className={styles.main}>
      {/* Header */}
      <div className={styles.canvas} id="canvas" style={{}}></div>
    </div>
  );
}
