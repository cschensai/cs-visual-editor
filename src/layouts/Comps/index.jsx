import { useCallback, useContext } from 'react';
import IconFont from '@/pages/components/Iconfont';
import { CanvasContext } from '../../utils/Context';
import { baseMenus, businessMenus } from './menu';
import styles from './index.less';

export default function Comps(props) {
  const globalCanvas = useContext(CanvasContext);

  // 拖拽
  const handleDragStart = useCallback((e, comp) => {
    // TODO: 对img进行处理

    // 借助event属性 存储数据
    e.dataTransfer.setData('add-component', JSON.stringify(comp));
  }, []);

  const handleClick = useCallback((e, comp) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: 对img处理

    globalCanvas.addComp(comp);
  }, []);

  return (
    <div id="comps" className={styles.main}>
      <div className={styles.compList}>
        <div className={styles.componentTitle}>基础组件</div>
        {baseMenus(globalCanvas.getCanvasStyle().width).map((item) => {
          return (
            <div
              key={item.desc}
              className={styles.comp}
              // TODO: img组件的处理
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => handleClick(e, item)}
            >
              <IconFont className={styles.compIcon} type={item.data.iconfont} />
              <span className={styles.compText}>{item.desc}</span>
            </div>
          );
        })}
        <div className={styles.componentTitle}>业务组件</div>
        {businessMenus(globalCanvas.getCanvasStyle().width).map((item) => {
          return (
            <div
              key={item.desc}
              className={styles.comp}
              // TODO: img组件的处理
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => handleClick(e, item)}
            >
              <IconFont className={styles.compIcon} type={item.data.iconfont} />
              <span className={styles.compText}>{item.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
