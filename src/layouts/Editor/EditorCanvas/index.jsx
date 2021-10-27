import { useCallback } from 'react';
import { Form, InputNumber, Input, Select } from 'antd';
import InputColor from 'react-input-color';
import { isNotEqualUndefined } from '../../../utils';
import { DEVICE_MAP, FORM_ITEM_LAYOUT } from '../../../utils/constant';
import editorCanvasSchema from '../jsonSchema/editorCanvasSchema';
import styles from './index.less';

const requireds = editorCanvasSchema.required;
const { Item: FormItem } = Form;
const { Option } = Select;

export default function EditorCanvas(props) {
  const { globalCanvas } = props;
  const [form] = Form.useForm();
  const style = globalCanvas.getCanvasStyle();

  const handleValuesChange = (changedValues) => {
    // 处理颜色字段，取十六进制值
    if ('backgroundColor' in changedValues) {
      const hexColor = changedValues.backgroundColor.hex;
      changedValues.backgroundColor = hexColor;
    }
    if ('mode' in changedValues) {
      const modeVal = changedValues.mode;
      const { width, height } = DEVICE_MAP[modeVal] || {};
      changedValues.width = width;
      changedValues.height = height;
      form.setFieldsValue({ width, height });
    }
    globalCanvas.updateCanvasStyle(changedValues);
  };

  const renderComponent = useCallback((item) => {
    if (item.type === 'array') {
      return (
        <Select style={{ width: '100%' }}>
          {item?.enums.map((ele) => (
            <Option key={ele.value}>{ele.label}</Option>
          ))}
        </Select>
      );
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
        <InputColor style={{ width: '100%' }} initialValue={style[item.$id]} />
      );
    }
    if (item.type === 'string') {
      return <Input placeholder="请输入" />;
    }
  }, []);

  return (
    <div className={styles.editorCanvas}>
      <div className={styles.title}>画布属性</div>
      <Form
        autoComplete="off"
        form={form}
        className={styles.formBox}
        {...FORM_ITEM_LAYOUT}
        onValuesChange={handleValuesChange}
        initialValues={style}
      >
        {Object.keys(editorCanvasSchema.properties).map((key) => {
          const item = editorCanvasSchema.properties[key];
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
