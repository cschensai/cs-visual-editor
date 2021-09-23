import DynamicComp from '../components/DynamicComp';
import { formatStyle } from '../../utils';
import styles from './index.less';

export default function RepleasePage(props) {
  const { pageId } = props.match.params;
  const dataSource = JSON.parse(localStorage.getItem('release'));
  const { style: canvasStyle, comps } = dataSource;
  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        style={{
          ...formatStyle(canvasStyle),
          backgroundImage: `url(${canvasStyle?.backgroundImage})`,
        }}
      >
        {comps.map((comp, index) => {
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
