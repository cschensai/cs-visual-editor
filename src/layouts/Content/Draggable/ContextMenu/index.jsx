import React, { useContext, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { CanvasContext } from '@/utils/Context';
import { CONTEXT_MENUS } from '@/utils/constant';

import styles from './index.less';

export default function ContextMenu({ index, pos, comp }) {
  const globalCanvas = useContext(CanvasContext);

  const handleClick = useCallback((key) => {
    switch (key) {
      case 'copy':
        const cloneComp = cloneDeep(comp);
        cloneComp.data.style.top = cloneComp.data.style.top + 10;
        globalCanvas.addComp(cloneComp);
        break;
      case 'delete':
        globalCanvas.deleteSelectedComp(comp);
        break;
      case 'top':
        globalCanvas.changeCompIndex(index);
        break;
      case 'bottom':
        globalCanvas.changeCompIndex(index, 0);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className={styles.contextMenu} style={pos}>
      {CONTEXT_MENUS.map((item) => (
        <div
          key={item.key}
          className={styles.item}
          onClick={() => handleClick(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
