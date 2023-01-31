import React, { FC, useState } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import styles from '../index.module.less';
const FormItem = Form.Item;
import { StepOneType } from '../typings';
import { useMyStore } from '@/utils/hooks';
import { myLocalStorage } from '@/utils';
import { authLoginApi } from '@/services';
const StepThree: FC<StepOneType> = (props) => {
  const { state, dispatch } = useMyStore();
  const { email, emailCode, closeModal } = props;
  const [continueDiscord, setContinueDiscord] = useState(false);
  const [form] = Form.useForm();
  const LoginClick = async () => {
    try {
      await form.validate();
      const invitationCode = form.getFieldValue('invitationCode');
      const res = await authLoginApi.authLogin({
        email: email,
        verificationCode: emailCode,
        invitationCode: invitationCode,
      });
      console.log(res);

      Message.success({
        content: 'Login successfully!',
        className: 'message',
      });

      myLocalStorage.setValue('userInfo', res.data.userInfo);
      myLocalStorage.setValue('token', res.data.token);
      dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data.userInfo },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);

      Message.warning({
        content: 'Log in successfully!',
        className: 'messageWarn',
      });
    }
  };
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.9986 42.5663L44.1589 21.8531L36.4844 9H11.5128L3.83838 21.8531L23.9986 42.5663Z"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M6 22H42"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <path
            d="M20 9L16 22L24 42"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 9L32 22L24 42"
            stroke="white"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.Invitation}>Invitation code</div>
      <div style={{ marginTop: '12px' }}>
        <div className={styles.titleOne}>Please enter the invitation code.</div>
        <div className={styles.titleOne} style={{ marginTop: '3px' }}>
          Only the invitation code can log in
        </div>
        <div>
          <Form form={form} className={styles.arcoForm}>
            <FormItem
              field="invitationCode"
              rules={[
                {
                  required: true,
                  length: 7,
                },
              ]}
            >
              <Input
                className={styles.input}
                placeholder="Click here to enter your invitation code"
                onChange={async () => {
                  try {
                    await form.validate(['invitationCode']);
                    setContinueDiscord(true);
                  } catch (error) {
                    setContinueDiscord(false);
                  }
                }}
              />
            </FormItem>
          </Form>
        </div>
        <div
          className={`${styles.Continue} ${
            continueDiscord ? styles.continueTrue : styles.continueMistake
          }`}
        >
          <Button
            style={{ width: '100%', height: '48px' }}
            onClick={LoginClick}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
