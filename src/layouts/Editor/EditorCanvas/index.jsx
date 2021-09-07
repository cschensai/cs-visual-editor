import { Form, InputNumber, Input } from 'antd';
import InputColor from 'react-input-color';
import { isNotEqualUndefined } from '../../../utils';
import { FORM_ITEM_LAYOUT } from '../../../utils/constant';
import styles from './index.less';

const { Item: FormItem } = Form;

export default function EditorCanvas(props) {
  const { globalCanvas } = props;
  const style = globalCanvas.getCanvasStyle();

  const handleValuesChange = (changedValues) => {
    // 处理颜色字段，取十六进制值
    if ('backgroundColor' in changedValues) {
      const hexColor = changedValues.backgroundColor.hex;
      changedValues.backgroundColor = hexColor;
    }
    globalCanvas.updateCanvasStyle(changedValues);
  };

  return (
    <div className={styles.editorCanvas}>
      <div className={styles.title}>画布属性</div>
      <Form
        className={styles.formBox}
        {...FORM_ITEM_LAYOUT}
        onValuesChange={handleValuesChange}
        initialValues={style}
      >
        {isNotEqualUndefined(style.width) && (
          <FormItem label="画布宽度" name="width">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.height) && (
          <FormItem label="画布高度" name="height">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.backgroundColor) && (
          <FormItem label="背景颜色" name="backgroundColor">
            <InputColor
              style={{ width: '100%' }}
              initialValue={style.backgroundColor}
            />
          </FormItem>
        )}
        {isNotEqualUndefined(style.backgroundImage) && (
          <FormItem label="背景颜色" name="backgroundImage">
            <Input placeholder="请输入" />
          </FormItem>
        )}
      </Form>
    </div>
  );
}
