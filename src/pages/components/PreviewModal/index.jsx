import { useState, useImperativeHandle, useCallback } from 'react';
import { Modal, Button } from 'antd';
import { formatStyle } from '../../../utils';
import { getMapComponent } from '../../../utils/mapComponent';
import styles from './index.less';

export default function PreviewModal(props) {
  const { previewModalRef } = props;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  useImperativeHandle(
    previewModalRef,
    () => ({
      show(canvasData) {
        setVisible(true);
        setData(canvasData);
      },
    }),
    [],
  );

  const handleCancel = useCallback(() => {
    setVisible(false);
    setData({});
  }, []);
  console.log(111, data);
  return (
    <Modal
      wrapClassName={styles.previwModal}
      maskClosable={false}
      onCancel={handleCancel}
      visible={visible}
      footer={<Button onClick={handleCancel}>确定</Button>}
    >
      <div className={styles.main}>
        <div
          className={styles.canvas}
          style={{
            ...formatStyle(data.style),
            backgroundImage: `url(${data?.style?.backgroundImage})`,
          }}
        >
          {data?.comps?.map((comp, index) => {
            return (
              <div
                key={comp.onlyKey}
                className={styles.comp}
                style={{
                  ...formatStyle(comp.data.style, true),
                  zIndex: index,
                }}
              >
                {getMapComponent(comp)}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
