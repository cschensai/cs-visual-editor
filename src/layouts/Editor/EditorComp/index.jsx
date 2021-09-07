import { Form, Input, InputNumber, Select } from 'antd';
import InputColor from 'react-input-color';
import { isNotEqualUndefined } from '../../../utils';
import { FORM_ITEM_LAYOUT } from '../../../utils/constant';
import styles from './index.less';

const { Item: FormItem } = Form;
const { Option } = Select;

export default function EditorComp(props) {
  const { selectedComp, globalCanvas } = props;
  const { data, desc, onlyKey } = selectedComp;
  const { style, type, value: dataValue } = data;

  const handleValuesChange = (changedValues) => {
    // 处理描述字段
    if ('value' in changedValues) {
      globalCanvas.updateSelectedCompValue(changedValues.value);
      return false;
    }

    // 处理颜色字段，取十六进制值
    const nameKeys = Object.keys(changedValues);
    const nameKey = nameKeys[0];
    if (nameKey.toLowerCase().includes('color')) {
      const hexColor = changedValues[nameKey].hex;
      changedValues[nameKey] = hexColor;
    }
    globalCanvas.updateSelectedCompStyle(changedValues);
  };

  return (
    <div id="editorComp" className={styles.editorComp}>
      <div className={styles.title}>{desc}</div>
      {/* 表单区域 */}
      <Form
        className={styles.formBox}
        key={onlyKey}
        {...FORM_ITEM_LAYOUT}
        onValuesChange={handleValuesChange}
        initialValues={{
          value: dataValue,
          ...style,
        }}
      >
        {isNotEqualUndefined(dataValue) && (
          <FormItem name="value" label={type === 2 ? '图片地址' : '描述'}>
            <Input placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.fontSize) && (
          <FormItem name="fontSize" label="字体大小">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.color) && (
          <FormItem name="color" label="字体颜色">
            <InputColor style={{ width: '100%' }} initialValue={style.color} />
          </FormItem>
        )}
        {isNotEqualUndefined(style.fontWeight) && (
          <FormItem name="fontWeight" label="字体粗细">
            <Select style={{ width: '100%' }}>
              <Option key="normal">normal</Option>
              <Option key="bold">bold</Option>
              <Option key="lighter">lighter</Option>
            </Select>
          </FormItem>
        )}
        {isNotEqualUndefined(style.backgroundColor) && (
          <FormItem name="backgroundColor" label="背景颜色">
            <InputColor
              style={{ width: '100%' }}
              initialValue={style.backgroundColor}
            />
          </FormItem>
        )}
        {isNotEqualUndefined(style.lineHeight) && (
          <FormItem name="lineHeight" label="行高">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.textAlign) && (
          <FormItem name="textAlign" label="对齐方式">
            <Select style={{ width: '100%' }}>
              <Option key="left">居左</Option>
              <Option key="center">居中</Option>
              <Option key="right">居右</Option>
            </Select>
          </FormItem>
        )}
        {isNotEqualUndefined(style.borderRadius) && (
          <FormItem name="borderRadius" label="圆角">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.borderWidth) && (
          <FormItem name="borderWidth" label="边框宽度">
            <InputNumber style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        )}
        {isNotEqualUndefined(style.borderColor) && (
          <FormItem name="borderColor" label="边框颜色">
            <InputColor
              style={{ width: '100%' }}
              initialValue={style.borderColor}
            />
          </FormItem>
        )}
        {isNotEqualUndefined(style.borderStyle) && (
          <FormItem name="borderStyle" label="边框样式">
            <Select style={{ width: '100%' }}>
              <Option key="none">none</Option>
              <Option key="dashed">dashed</Option>
              <Option key="dotted">dotted</Option>
              <Option key="double">double</Option>
              <Option key="groove">groove</Option>
              <Option key="hidden">hidden</Option>
              <Option key="solid">solid</Option>
            </Select>
          </FormItem>
        )}
      </Form>
    </div>
  );
}
