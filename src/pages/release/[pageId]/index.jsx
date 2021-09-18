import { useEffect, useState } from 'react';
import { formatStyle } from '../../../utils';
import { request } from '../../../utils/request';
import { getMapComponent } from '../../../utils/mapComponent';
import styles from './index.less';

export default function RepleasePage(props) {
  const { pageId } = props.match.params;
  const [canvas, setCanvas] = useState({ canvasStyle: {}, comps: [] });
  useEffect(async () => {
    const data = await request({
      url: `/get?pageId=${pageId}`,
    });
    if (data) {
      const { name, content } = data;
      document.title = name;
      setCanvas(JSON.parse(content));
    }
  }, []);
  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        style={{
          ...formatStyle(canvas.canvasStyle),
          backgroundImage: `url(${canvas.canvasStyle?.backgroundImage})`,
        }}
      >
        {canvas.comps.map((comp, index) => {
          return (
            <div
              key={comp.onlyKey}
              className={styles.comp}
              style={{
                ...formatStyle(comp.data.style, true),
                zIndex: index,
              }}
            >
              {getMapComponent(comp)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
