import classnames from 'classnames';
import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ButtonComponent(data) {
  const { style, value, animationClsName } = data;
  const cls = classnames({
    [styles.main]: true,
    animate__animated: true,
    [animationClsName]: animationClsName !== 'none',
  });
  return (
    <button className={cls} style={formatStyle(style, false)}>
      {value}
    </button>
  );
}
