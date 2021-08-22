import { useCallback, useContext } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { CanvasContext } from '../../utils/Context';
import { menus } from './menu';
import styles from './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2749648_q5js6t9u3hk.js',
});

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
      <div className={styles.compTop}>测试</div>
      <div className={styles.compList}>
        {menus.map((item) => {
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
