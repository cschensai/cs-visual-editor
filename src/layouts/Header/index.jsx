import { useCallback, useContext, useRef } from 'react';
import { uniqueId } from 'lodash';
import PreviewModal from '../../pages/components/PreviewModal';
import IconFont from '../../utils/Iconfont';
import { CanvasContext } from '../../utils/Context';
import styles from './index.less';

function Header(props) {
  const previewModalRef = useRef();
  const globalCanvas = useContext(CanvasContext);

  // 预览
  const handlePreview = useCallback(() => {
    previewModalRef.current.show(globalCanvas.getCanvasData());
  }, []);

  // 发布操作
  const handleRelease = useCallback(() => {
    console.log('发布', globalCanvas.getCanvasData());

    localStorage.setItem(
      'release',
      JSON.stringify({
        [uniqueId('release')]: globalCanvas.getCanvasData(),
      }),
    );
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.preview} onClick={handlePreview}>
        <IconFont className={styles.compIcon} type="icon-fontyulan" />
        预览
      </div>
      <div className={styles.release} onClick={handleRelease}>
        <IconFont className={styles.compIcon} type="icon-fontfabu" />
        发布
      </div>
      <PreviewModal previewModalRef={previewModalRef} />
    </div>
  );
}
export default Header;
