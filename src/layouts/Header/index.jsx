import { useCallback, useContext, useRef } from 'react';
import { message } from 'antd';
import { uniqueId } from 'lodash';
import IconFont from '@/pages/components/Iconfont';
import PreviewModal from '../../pages/components/PreviewModal';
import { CanvasContext } from '../../utils/Context';
import { HEADER_OPERRATIONS } from '../../utils/constant';
import styles from './index.less';

function Header(props) {
  const previewModalRef = useRef();
  const globalCanvas = useContext(CanvasContext);

  // 上一步
  const handlePrevStep = useCallback(() => {
    globalCanvas.getPrevCanvasHistory();
  }, []);

  // 下一步
  const handleNextStep = useCallback(() => {
    globalCanvas.getNextCanvasHistory();
  }, []);

  // 清空画布
  const handleCleanCanvas = useCallback(() => {
    message.success('清空画布成功');
    globalCanvas.emptyCanvas();
  }, []);

  // 预览
  const handlePreview = useCallback(() => {
    previewModalRef.current.show(globalCanvas.getCanvasData());
  }, []);

  // 发布操作
  const handleRelease = useCallback(() => {
    message.success('模拟发布成功');
    console.log('发布', globalCanvas.getCanvasData());

    localStorage.setItem(
      'release',
      JSON.stringify({
        [uniqueId('release')]: globalCanvas.getCanvasData(),
      }),
    );
  }, []);

  // 操作菜单
  const handleOperation = useCallback(
    (key) => {
      switch (key) {
        case 'icon-fontshangyibu':
          handlePrevStep();
          break;
        case 'icon-fontxiayibu':
          handleNextStep();
          break;
        case 'icon-fontqingkong':
          handleCleanCanvas();
          break;
        case 'icon-fontyulan':
          handlePreview();
          break;
        case 'icon-fontfabu':
          handleRelease();
          break;
        default:
          break;
      }
    },
    [
      handlePrevStep,
      handleNextStep,
      handleCleanCanvas,
      handlePreview,
      handleRelease,
    ],
  );

  return (
    <div className={styles.main}>
      {HEADER_OPERRATIONS.map((item) => {
        return (
          <div
            key={item.key}
            className={styles.operation}
            onClick={() => handleOperation(item.key)}
          >
            <IconFont className={styles.compIcon} type={item.key} />
            {item.label}
          </div>
        );
      })}
      <PreviewModal previewModalRef={previewModalRef} />
    </div>
  );
}
export default Header;
