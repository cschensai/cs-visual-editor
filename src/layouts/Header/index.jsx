import { useCallback, useContext, useRef } from 'react';
import { message } from 'antd';
import { uniqueId, cloneDeep } from 'lodash';
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
    // 处理真机预览兼容性问题 按照真机ipone5 dpr: 1 fontSize: 32进行设置处理, base-font-size
    const baseFontSize = 32;
    const { style: canvasStyle, comps = [] } = cloneDeep(
      globalCanvas.getCanvasData(),
    );
    canvasStyle.width = `${canvasStyle.width / baseFontSize}rem`;
    canvasStyle.height = `${canvasStyle.height / baseFontSize}rem`;
    comps.forEach((comp) => {
      const { style: compStyle } = comp.data || {};
      for (const key in compStyle) {
        if (Object.hasOwnProperty.call(compStyle, key)) {
          const compAttrVal = compStyle[key];
          if (typeof compAttrVal === 'number') {
            compStyle[key] = `${compAttrVal / baseFontSize}rem`;
          }
        }
      }
    });
    // 本地存储 模拟 存储数据库 操作
    localStorage.setItem(
      'release',
      JSON.stringify({
        [uniqueId('release')]: { style: canvasStyle, comps },
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
    <div className={styles.main} id="header">
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
      <PreviewModal previewModalRef={previewModalRef} />
    </div>
  );
}
export default Header;
