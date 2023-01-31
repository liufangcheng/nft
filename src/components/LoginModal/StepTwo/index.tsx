import React, { FC, useRef, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Modal,
  Message,
  Grid,
  Statistic,
} from '@arco-design/web-react';
import styles from '../index.module.less';
const FormItem = Form.Item;
import { StepOneType } from '../typings';
import { center } from '@turf/turf';
import { useMyStore } from '@/utils/hooks';
import { myLocalStorage } from '@/utils';
const Countdown = Statistic.Countdown;
const loginStatus = false;
import { authLoginApi } from '@/services';
const StepOne: FC<StepOneType> = (props) => {
  const { onchangeStep, closeModal, email, emailCode } = props;
  const now = Date.now();
  const [form] = Form.useForm();
  const { state, dispatch } = useMyStore();
  const [startHide, setStartHide] = useState(true);
  const inputOneRef = useRef();
  const inputTwoRef = useRef();
  const inputThreeRef = useRef();
  const inputFourRef = useRef();
  const [changeInput, setChangeInput] = useState(0);

  const timeFinish = () => {
    setStartHide(false);
  };
  const sendCode = () => {
    if (!startHide) {
      setStartHide(true);
    }
  };
  const inputBlur = async () => {
    const { codeOne, codeTwo, codeThree, codeFour } = form.getFields();
    if (codeOne && codeTwo && codeThree && codeFour) {
      const code = codeOne + codeTwo + codeThree + codeFour;
      if (code === emailCode) {
        const res = await authLoginApi.authLogin({
          email: email,
          verificationCode: code,
        });
        if (res.data) {
          myLocalStorage.setValue('userInfo', res.data.userInfo);
          myLocalStorage.setValue('token', res.data.token);
          dispatch({
            type: 'update-userInfo',
            payload: { userInfo: res.data.userInfo },
          });
          window.location.reload();
        } else {
          onchangeStep(3);
        }
        Message.success({
          content: 'Login successfully!',
          className: 'message',
        });
      } else {
        Message.warning({
          content: 'Verification code error!',
          className: 'messageWarn',
        });
      }
    } else {
      Message.warning({
        content: 'Verification code error!',
        className: 'messageWarn',
      });
    }
  };
  return (
    <div>
      <div className={styles.iconSvg}>
        <svg
          width="44"
          height="32"
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
      </div>
      <div className={styles.title}>Check your email</div>
      <div className={styles.describe} style={{ marginTop: '12px' }}>
        We sent a 4-digit code to {email}
      </div>
      <div className={styles.describe}>Please enter it below</div>
      <div>
        <Form form={form} className={styles.arcoForm}>
          <Grid.Row gutter={24}>
            <Grid.Col span={6}>
              <FormItem field="codeOne">
                <Input
                  className={
                    changeInput === 1 ? styles.inputChange : styles.input
                  }
                  ref={inputOneRef}
                  maxLength={1}
                  onChange={(e) => {
                    if (e.length === 1) {
                      inputTwoRef.current.focus();
                    }
                  }}
                  onFocus={() => {
                    setChangeInput(1);
                  }}
                  onBlur={() => {
                    setChangeInput(0);
                  }}
                />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={6}>
              <FormItem field="codeTwo">
                <Input
                  className={
                    changeInput === 2 ? styles.inputChange : styles.input
                  }
                  maxLength={1}
                  ref={inputTwoRef}
                  onChange={(e) => {
                    document.onkeydown = function (event) {
                      if (!e && event?.code === 'Backspace') {
                        inputOneRef.current.focus();
                      }
                    };
                    if (e.length === 1) {
                      inputThreeRef.current.focus();
                    }
                  }}
                  onFocus={() => {
                    setChangeInput(2);
                  }}
                  onBlur={() => {
                    setChangeInput(0);
                  }}
                />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={6}>
              <FormItem field="codeThree">
                <Input
                  className={
                    changeInput === 3 ? styles.inputChange : styles.input
                  }
                  maxLength={1}
                  ref={inputThreeRef}
                  onChange={(e) => {
                    document.onkeydown = function (event) {
                      if (!e && event?.code === 'Backspace') {
                        inputTwoRef.current.focus();
                      }
                    };
                    if (e.length === 1) {
                      inputFourRef.current.focus();
                    }
                  }}
                  onFocus={() => {
                    setChangeInput(3);
                  }}
                  onBlur={() => {
                    setChangeInput(0);
                  }}
                />
              </FormItem>
            </Grid.Col>
            <Grid.Col span={6}>
              <FormItem field="codeFour">
                <Input
                  className={
                    changeInput === 4 ? styles.inputChange : styles.input
                  }
                  maxLength={1}
                  onFocus={() => {
                    setChangeInput(4);
                  }}
                  onBlur={() => {
                    setChangeInput(0);
                  }}
                  onChange={(e) => {
                    document.onkeydown = function (event) {
                      if (!e && event?.code === 'Backspace') {
                        inputThreeRef.current.focus();
                      }
                    };
                    if (e) {
                      inputBlur();
                      setChangeInput(0);
                    }

                    // ;
                  }}
                  ref={inputFourRef}
                />
              </FormItem>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </div>
      <div className={styles.statistic}>
        <span onClick={sendCode}>{'Click to send a new code' + ' ' + ' '}</span>
        {startHide && (
          <span>
            (
            <Countdown
              start={startHide}
              value={now + 1000 * 60}
              now={now}
              format="ss"
              onFinish={timeFinish}
            />
            )
          </span>
        )}
      </div>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          lineHeight: '22px',
        }}
      >
        <span>Noticed a typo? </span>

        <a
          href="#"
          style={{ color: '#2D67D5' }}
          onClick={(e) => {
            onchangeStep(1);
          }}
        >
          Fix your email address
        </a>
      </div>
    </div>
  );
};

export default StepOne;
