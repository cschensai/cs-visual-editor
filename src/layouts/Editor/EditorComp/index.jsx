import { useCallback, useMemo } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import InputColor from 'react-input-color';
import {
  isImgComponent,
  isListComponent,
  isNotEqualUndefined,
} from '../../../utils';
import { FORM_ITEM_LAYOUT } from '../../../utils/constant';
import editorCompSchema from '../jsonSchema/editorCompSchema';
import styles from './index.less';

const requireds = editorCompSchema.required;
const { Item: FormItem } = Form;
const { Option, OptGroup } = Select;

export default function EditorComp(props) {
  const { selectedComp, globalCanvas } = props;
  const [form] = Form.useForm();
  const { data, desc, onlyKey } = selectedComp;
  const { style, type, value: dataValue, requestUrl } = data;

  const handleValuesChange = (changedValues, allValues) => {
    // 处理描述字段
    if ('value' in changedValues) {
      globalCanvas.updateSelectedCompValue(changedValues.value);
      return false;
    }

    // 处理颜色字段，取十六进制值
    const nameKeys = Object.keys(changedValues);
    const nameKey = nameKeys[0];
    if (nameKey?.toLowerCase()?.includes('color')) {
      const hexColor = changedValues[nameKey].hex;
      changedValues[nameKey] = hexColor;
    }
    globalCanvas.updateSelectedCompStyle(changedValues);
  };

  // 根据组件style字段 展示不同的控件
  const renderComponent = useCallback(
    (item) => {
      if (item.type === 'string') {
        return <Input placeholder="请输入" />;
      }
      if (item.type === 'number') {
        return (
          <InputNumber
            style={{ width: '100%' }}
            placeholder="请输入"
            min={item.minimum}
          />
        );
      }
      if (item.type === 'color') {
        return (
          <InputColor
            style={{ width: '100%' }}
            initialValue={style[item.$id]}
          />
        );
      }
      if (item.type === 'array') {
        return (
          <Select style={{ width: '100%' }}>
            {item.enums.map((ele) => (
              <Option key={ele.value}>
                <span style={{ fontFamily: ele.value }}>{ele.label}</span>
              </Option>
            ))}
          </Select>
        );
      }
    },
    [selectedComp],
  );

  //
  const formLabel = useMemo(() => {
    if (type === isImgComponent) return '图片地址';
    if (type === isListComponent) return '请求地址';
    return '描述';
  }, [selectedComp]);

  return (
    <div id="editorComp" className={styles.editorComp}>
      <div className={styles.title}>{desc}</div>
      {/* 表单区域 */}
      <Form
        autoComplete="off"
        form={form}
        className={styles.formBox}
        key={onlyKey}
        {...FORM_ITEM_LAYOUT}
        onValuesChange={handleValuesChange}
        initialValues={{
          value: dataValue,
          requestUrl,
          ...style,
        }}
      >
        {isNotEqualUndefined(dataValue) && (
          <FormItem
            name="value"
            label={formLabel}
            rules={[{ required: true, message: '该字段不能为空' }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
        )}
        {Object.keys(editorCompSchema.properties).map((key) => {
          const item = editorCompSchema.properties[key];
          const isRequired = requireds.includes(item.$id);
          if (isNotEqualUndefined(style[item.$id])) {
            return (
              <FormItem
                key={item.$id}
                label={item.title}
                name={item.$id}
                rules={[{ required: isRequired, message: '该字段不能为空' }]}
              >
                {renderComponent(item)}
              </FormItem>
            );
          }
          return null;
        })}
      </Form>
    </div>
  );
}
