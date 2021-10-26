import React, {
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { Modal, Form, Input, message } from 'antd';
import { request } from '@/utils/request';
import { COMMON_FORM_ITEM_LAYOUT } from '@/utils/constant';

const { Item: FormItem } = Form;

export default function TitleModal(props) {
  const { titleModalRef } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const paramsRef = useRef();

  useImperativeHandle(
    titleModalRef,
    () => ({
      show(canvasDataStr) {
        setVisible(true);
        paramsRef.current = canvasDataStr;
      },
    }),
    [],
  );

  // 确定
  const handleOk = useCallback(async () => {
    const values = await validateFields();
    try {
      const res = await request({
        method: 'POST',
        url: '/add',
        data: {
          ...values,
          content: paramsRef.current,
        },
      });
      if (res?.code === 0) {
        message.success('发布成功');
        handleCancel();
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  // 取消
  const handleCancel = useCallback(() => {
    setVisible(false);
    resetFields();
  }, []);

  return (
    <Modal
      title="保存画布"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...COMMON_FORM_ITEM_LAYOUT} form={form} autoComplete="off">
        <FormItem
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </FormItem>
      </Form>
    </Modal>
  );
}
