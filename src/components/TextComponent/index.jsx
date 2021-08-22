import { formatStyle } from '../../utils';
import styles from './index.less';

export default function TextComponent(data) {
  const { style, value } = data;
  return (
    <div className={styles.main} style={formatStyle(style, false)}>
      {value}
    </div>
  );
}
