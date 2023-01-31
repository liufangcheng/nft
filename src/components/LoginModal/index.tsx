import React, {
  FC,
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Modal } from '@arco-design/web-react';
import { DetailDrawerRef } from './typings';
import styles from './index.module.less';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useMyStore } from '@/utils/hooks';

function LoginModal(props: any, ref) {
  const [loginStep, setLoginStep] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailCode, setEmailCode] = useState<string>('');

  const init = () => {
    setVisible(true);
  };
  const onchangeStep = (e) => {
    setLoginStep(e);
  };
  const onSaveEmail = (email, emailCode) => {
    setEmail(email);
    setEmailCode(emailCode);
  };
  useImperativeHandle<any, DetailDrawerRef>(ref, () => ({
    init,
  }));
  const close = () => {
    setLoginStep(1);
    setVisible(false);
  };
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      className={
        loginStep === 1
          ? styles.modal
          : loginStep === 2
          ? styles.modalTwo
          : loginStep === 3
          ? styles.modalThree
          : ''
      }
      closable={false}
      footer={null}
    >
      <div>
        <div className={styles.close} onClick={() => close()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3536 1.35355C17.5488 1.15829 17.5488 0.841709 17.3536 0.646447C17.1583 0.451184 16.8417 0.451184 16.6464 0.646447L9 8.29289L1.35355 0.646447C1.15829 0.451184 0.841709 0.451184 0.646446 0.646447C0.451185 0.841709 0.451185 1.15829 0.646446 1.35355L8.29289 9L0.646447 16.6464C0.451184 16.8417 0.451184 17.1583 0.646447 17.3536C0.841709 17.5488 1.15829 17.5488 1.35355 17.3536L9 9.70711L16.6464 17.3536C16.8417 17.5488 17.1583 17.5488 17.3536 17.3536C17.5488 17.1583 17.5488 16.8417 17.3536 16.6464L9.70711 9L17.3536 1.35355Z"
              fill="white"
              fillOpacity="0.65"
            />
          </svg>
        </div>
        {loginStep === 1 && (
          <StepOne
            onchangeStep={onchangeStep}
            onSaveEmail={onSaveEmail}
          ></StepOne>
        )}
        {loginStep === 2 && (
          <StepTwo
            onchangeStep={onchangeStep}
            closeModal={closeModal}
            email={email}
            emailCode={emailCode}
          ></StepTwo>
        )}
        {loginStep === 3 && (
          <StepThree
            onchangeStep={onchangeStep}
            closeModal={closeModal}
            email={email}
            emailCode={emailCode}
          ></StepThree>
        )}
      </div>
    </Modal>
  );
}

export default forwardRef<DetailDrawerRef, any>(LoginModal);
