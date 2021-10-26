import classnames from 'classnames';
import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ImgComponent(data) {
  const { style, value, animationClsName } = data;
  const cls = classnames({
    [styles.main]: true,
    animate__animated: true,
    [animationClsName]: animationClsName !== 'none',
  });
  return (
    <img
      className={cls}
      style={formatStyle(style, false)}
      src={value}
      alt="imgComponent"
    />
  );
}
