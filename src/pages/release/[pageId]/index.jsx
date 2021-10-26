import { useEffect, useState } from 'react';
import DynamicComp from '../../components/DynamicComp';
import { formatStyle } from '../../../utils';
import { request } from '../../../utils/request';
import styles from './index.less';

export default function RepleasePage(props) {
  const { pageId } = props.match.params;
  const [canvas, setCanvas] = useState({ style: {}, comps: [] });
  useEffect(async () => {
    try {
      const res = await request({
        url: `/get?pageId=${pageId}`,
      });
      const { code, data = {} } = res;
      if (code === 0) {
        const { title, content } = data;
        document.title = title;
        setCanvas(JSON.parse(content));
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        style={{
          ...formatStyle(canvas.style),
          backgroundImage: `url(${canvas.style?.backgroundImage})`,
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
              <DynamicComp comp={comp} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
