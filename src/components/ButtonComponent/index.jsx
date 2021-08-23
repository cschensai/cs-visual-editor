import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ButtonComponent(data) {
  const { style, value } = data;
  return (
    <button className={styles.main} style={formatStyle(style, false)}>
      {value}
    </button>
  );
}
