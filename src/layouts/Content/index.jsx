import { useState, useRef, useEffect, useCallback, useContext } from 'react';

import Header from '../Header';
import Draggable from './Draggable';
import { formatStyle } from '../../utils';

import styles from './index.less';
import { CanvasContext } from '../../utils/Context';

export default function Content(props) {
  const globalCanvas = useContext(CanvasContext);

  // 画布所处的位置
  const [canvasPostion, setCanvasPostion] = useState({});
  // 画布实例
  const canvasRef = useRef();

  // 获取画布属性
  const canvasStyle = globalCanvas.getCanvasStyle();
  // 获取画布所有组件
  const comps = globalCanvas.getComps();

  // 取消选中的组件
  const cancelSelect = (e) => {
    if (
      [
        'app',
        'root',
        'header',
        'operationIcon',
        'content',
        'canvas',
        'editorComp',
      ].includes(e.target.id)
    ) {
      globalCanvas.setSelectedComp(null);
    }
  };

  useEffect(() => {
    // 记录画布的位置，因为最终记录的位置是基于画布计算出来的相对位置
    const canvasPos = canvasRef.current.getBoundingClientRect?.();
    setCanvasPostion(canvasPos);

    // 取消当前选中的组件
    document.querySelector('#root').addEventListener('click', cancelSelect);
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 新增组件
      let addingComp = e.dataTransfer.getData('add-component');
      if (addingComp) {
        // 拖拽进来新增的组件
        addingComp = JSON.parse(addingComp);
        const top = e.pageY - canvasPostion.top - 15;
        const left = e.pageX - canvasPostion.left - 40;
        addingComp.data.style.top = top;
        addingComp.data.style.left = left;
        globalCanvas.addComp(addingComp);
      } else {
        // 拖拽画布内的组件
        let startPos = e.dataTransfer.getData('startPos');
        startPos = JSON.parse(startPos); // {pageX,pageY}
        // 记录员移动的距离
        const disX = e.pageX - startPos.pageX;
        const disY = e.pageY - startPos.pageY;

        // 获取当前选中组件的最新信息
        const selctedComp = globalCanvas.getSelectedComp();
        const top = selctedComp.data.style.top + disY;
        const left = selctedComp.data.style.left + disX;
        globalCanvas.updateSelectedCompStyle({ top, left });
      }
    },
    [canvasPostion],
  );

  return (
    <div id="content" className={styles.main}>
      <Header />
      <div
        className={styles.canvas}
        style={{
          ...formatStyle(canvasStyle),
          backgroundImage: `url(${canvasStyle?.backgroundImage})`,
        }}
        ref={canvasRef}
        id="canvas"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {comps.map((comp, index) => {
          return comp.data ? (
            <Draggable key={comp.onlyKey} index={index} />
          ) : null;
        })}
      </div>
    </div>
  );
}
