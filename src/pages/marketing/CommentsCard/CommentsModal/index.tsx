import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useContext,
} from 'react';
import { Button, Form, Input, Modal } from '@arco-design/web-react';
import { DetailDrawerRef } from './typings';
import styles from './index.module.less';
import form from '@arco-design/web-react/es/Form/form';
import FormItem from '@arco-design/web-react/es/Form/form-item';
import useForm from '@arco-design/web-react/es/Form/useForm';
import { commentsApi } from '@/services/comment';
import { useMyStore } from '@/utils/hooks';
import { CommentsGrandfather } from '../index';
function LoginModal(props: any, ref) {
  const [visible, setVisible] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState();
  const [form] = Form.useForm();
  const { state, dispatch } = useMyStore();
  const { userInfo } = state;
  const refreshData = useContext(CommentsGrandfather);

  const init = (info) => {
    setInfoModal(info);
    setVisible(true);
  };
  useImperativeHandle<any, DetailDrawerRef>(ref, () => ({
    init,
  }));
  const close = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      className={styles.modal}
    >
      <div>
        <div style={{ textAlign: 'right' }} onClick={() => close()}>
          <img src="/svg/关闭.svg" alt="" />
        </div>
      </div>
      <div>
        <Form form={form} className={styles.arcoForm}>
          <FormItem
            field="content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className={styles.input} />
          </FormItem>
        </Form>
      </div>
      <div
        className={styles.Continue}
        onClick={async () => {
          if (form.getFieldValue('content')) {
            try {
              await commentsApi.addComment({
                parent_id: infoModal?.id,
                discord_id: infoModal?.discord_id,
                user_id: userInfo.userId,
                content: form.getFieldValue('content'),
              });
              setVisible(false);
              refreshData();
            } catch (error) {}
          }
        }}
      >
        <Button style={{ width: '100%', height: '60px' }}>Reply</Button>
      </div>
    </Modal>
  );
}

export default forwardRef<DetailDrawerRef, any>(LoginModal);
