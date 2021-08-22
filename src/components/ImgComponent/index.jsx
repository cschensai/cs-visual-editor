import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ImgComponent(data) {
  const { style, value } = data;
  return (
    <img
      className={styles.main}
      style={formatStyle(style)}
      src={value}
      alt="imgComponent"
    />
  );
}
