import { useCallback, useContext, useRef } from 'react';
import { message } from 'antd';
import IconFont from '@/pages/components/Iconfont';
import TitleModal from './TitleModal';
import { px2Rem } from '../../utils';
import { CanvasContext } from '../../utils/Context';
import { HEADER_OPERRATIONS } from '../../utils/constant';
import styles from './index.less';

function Header(props) {
  const titleModalRef = useRef();
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
    // 本地存储 模拟 存储数据库 操作
    localStorage.setItem(
      'release',
      JSON.stringify(px2Rem(globalCanvas.getCanvasData())),
    );
    // 跳转预览页面
    window.open('/preview');
  }, []);

  // 发布操作
  const handleRelease = useCallback(async () => {
    console.log('发布', globalCanvas.getCanvasData());
    const getCanvasDataStr = JSON.stringify(
      px2Rem(globalCanvas.getCanvasData()),
    );
    titleModalRef.current?.show(getCanvasDataStr);
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
    <div className={styles.main} id="header">
      <div className={styles.title}>VISUAL-EDITOR</div>
      <div className={styles.operationBox}>
        {HEADER_OPERRATIONS.map((item) => {
          return (
            <div
              key={item.key}
              className={styles.operation}
              onClick={() => handleOperation(item.key)}
              id="operationIcon"
            >
              <IconFont className={styles.compIcon} type={item.key} />
              {item.label}
            </div>
          );
        })}
      </div>
      <TitleModal titleModalRef={titleModalRef} />
    </div>
  );
}
export default Header;
