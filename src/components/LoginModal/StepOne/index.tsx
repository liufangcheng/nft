import React, { FC, useState } from 'react';
import { Form, Input, Button, Modal, Message } from '@arco-design/web-react';
import styles from '../index.module.less';
const FormItem = Form.Item;
import { StepOneType } from '../typings';
import { authLoginApi } from '@/services';

const StepOne = (props: StepOneType) => {
  const { onchangeStep, onSaveEmail } = props;

  const [form] = Form.useForm();
  const [continueDefault, setContinueDefault] = useState(false);
  return (
    <div>
      <div className={styles.emallTitle}>Log in to Infodoxx</div>
      <div className={styles.formContent}>
        <Form form={form} className={styles.arcoForm}>
          <FormItem
            field="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: '邮箱格式错误',
              },
            ]}
          >
            <Input
              className={styles.input}
              prefix={
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.523577 0.650843C0.198381 1.00652 0 1.48009 0 2V14C0 15.1046 0.89543 16 2 16H20C21.1046 16 22 15.1046 22 14V2C22 0.895431 21.1046 0 20 0H2C1.782 0 1.57186 0.0348798 1.37543 0.0993631C1.15542 0.171585 0.952251 0.280941 0.773332 0.420019C0.683627 0.48975 0.600157 0.567103 0.523577 0.650843ZM14.0204 8.72755L12.4693 10.4079C11.6774 11.2658 10.322 11.2658 9.53012 10.4079L7.97927 8.72784L1.74098 14.9661C1.82359 14.9882 1.91042 15 2 15H20C20.0896 15 20.1764 14.9882 20.259 14.9661L14.0204 8.72755ZM13.5762 7.73455L11.7345 9.72965C11.3386 10.1586 10.6609 10.1586 10.2649 9.72965L8.42501 7.73641C8.40514 7.70443 8.38132 7.67421 8.35355 7.64645C8.33562 7.62851 8.31665 7.61222 8.29685 7.59757L2.20678 1H19.7927L13.7014 7.59889C13.6822 7.61319 13.6639 7.62904 13.6464 7.64645C13.6192 7.67368 13.5958 7.70326 13.5762 7.73455ZM14.6993 7.99216L20.9661 14.259C20.9882 14.1764 21 14.0896 21 14V2C21 1.77066 20.9228 1.55936 20.793 1.39065L14.6993 7.99216ZM1.20678 1.39098L7.30044 7.99245L1.03387 14.259C1.01178 14.1764 1 14.0896 1 14V2C1 1.77081 1.0771 1.55963 1.20678 1.39098Z"
                    fill="white"
                    fillOpacity="0.65"
                  />
                </svg>
              }
              placeholder="Enter your email address"
              onChange={async () => {
                try {
                  await form.validate(['email']);
                  setContinueDefault(true);
                } catch (error) {
                  setContinueDefault(false);
                }
              }}
            />
          </FormItem>
        </Form>
      </div>
      <div
        style={{
          width: 320,
          margin: 'auto',
          borderRadius: '8px',
          overflow: 'hidden',
          marginTop: '24px',
        }}
      >
        <div
          className={
            continueDefault
              ? styles.continueBlueDefault
              : styles.continueDefault
          }
          onClick={async () => {
            try {
              await form.validate(['email']);
              const emailCode = await authLoginApi.sendEmailCode({
                email: form.getFieldValue('email'),
              });
              console.log(emailCode.data.emailCode);

              onSaveEmail(
                form.getFieldValue('email'),
                emailCode.data.emailCode
              );
              onchangeStep(2);
            } catch (error) {
              Message.warning({
                content: 'Mailbox format error',
                className: 'messageWarn',
              });
            }
          }}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default StepOne;
