import React, { FC, useState, useRef, useEffect, useContext } from 'react';
import { Calendar, Card, DatePicker } from '@arco-design/web-react';
import styles from './index.module.less';
import { IconDown, IconLeft, IconRight } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import { InfoCalendarType } from './typings';
import { useLocale, useMyStore } from '@/utils/hooks';
const { MonthPicker } = DatePicker;
import LoginModal from '../LoginModal';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import { GlobalContext } from '@/context';
enum DateForDay {
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SET',
  'SUN',
}

const InfoCalendar: FC<InfoCalendarType> = (props) => {
  const { lang } = useContext(GlobalContext);

  const locale = useLocale();
  const { onChangeCalendar } = props;
  const { state, dispatch } = useMyStore();
  const [hidePicker, setHidePicker] = useState(false);
  const [nowTime, setNowTime] = useState(dayjs().format('MMM YYYY'));
  const [leftWhite, setLeftWhite] = useState(false);
  const [rightWhite, setRightWhite] = useState(true);
  const { userInfo } = state;
  const loginRef = useRef<DetailDrawerRef>();
  const HeaderRender = (props) => {
    const { onChange } = props;
    return (
      <div className={styles.nav}>
        {hidePicker && (
          <div className={styles.monthPicker}>
            <MonthPicker
              triggerElement={null}
              onChange={(e) => {
                onChange(dayjs(e));

                if (lang === 'en-US') {
                  const selectTime = dayjs(e).format('MMM YYYY');
                  setNowTime(selectTime);
                  setHidePicker(false);
                } else {
                  const selectTime = dayjs(e).format('YYYY-MM');
                  setNowTime(selectTime);
                  setHidePicker(false);
                }
              }}
            />
          </div>
        )}
        <div>
          <span>{nowTime}</span>
          <span
            className={styles.down}
            onClick={() => {
              setHidePicker(!hidePicker);
            }}
          >
            <IconDown />
          </span>
        </div>
        <div>
          <IconLeft
            className={`${styles.arrow} ${styles.left} ${
              leftWhite ? styles.leftArrow : ''
            }`}
            onClick={() => {
              const arcoCalendarMonth = document.querySelector(
                '.arco-calendar-month-cell-body'
              );
              arcoCalendarMonth.scrollLeft -= 350;

              if (arcoCalendarMonth.scrollLeft > 350) {
                setLeftWhite(true);
                setRightWhite(true);
              } else {
                setLeftWhite(false);
                setRightWhite(true);
              }
            }}
          />
          <IconRight
            className={`${styles.arrow} ${rightWhite ? styles.rightArrow : ''}`}
            onClick={() => {
              const arcoCalendarMonth = document.querySelector(
                '.arco-calendar-month-cell-body'
              );
              arcoCalendarMonth.scrollLeft += 350;
              const scrollDiff =
                arcoCalendarMonth.scrollWidth - arcoCalendarMonth.clientWidth;
              if (scrollDiff - arcoCalendarMonth.scrollLeft >= 350) {
                setRightWhite(true);
                setLeftWhite(true);
              } else {
                setRightWhite(false);
              }
            }}
          />
        </div>
      </div>
    );
  };

  const initialScroll = () => {
    const arcoCalendarMonth = document.querySelector(
      '.arco-calendar-month-cell-body'
    );
    const day = Number(dayjs().format('DD'));
    if (day >= 1 && day < 10) {
      arcoCalendarMonth.scrollTo({
        left: 0,
      });
    } else if (day >= 10 && day < 20) {
      arcoCalendarMonth.scrollTo({
        left: 700,
      });
    } else {
      arcoCalendarMonth.scrollTo({
        left: arcoCalendarMonth.scrollWidth - arcoCalendarMonth.clientWidth,
      });
    }
  };
  useEffect(() => {
    if (lang === 'en-US') {
      setNowTime(dayjs().format('MMM YYYY'));
    } else {
      setNowTime(dayjs().format('YYYY-MM'));
    }
  }, [lang]);
  useEffect(() => {
    initialScroll();
  }, []);

  return (
    <Card
      className={styles.contentCalendar}
      bodyStyle={{ padding: 0 }}
      bordered={false}
    >
      <Calendar
        headerRender={HeaderRender}
        onChange={(day) => {
          if (
            userInfo ||
            dayjs(day).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
          ) {
            onChangeCalendar(dayjs(day).format('YYYY-MM-DD'));
          } else {
            loginRef.current.init();
          }

          const arcoCalendarMonth = document.querySelector(
            '.arco-calendar-month-cell-body'
          );
          const date = day.date();
          const daysInMonth = day.daysInMonth();
          const num = date / daysInMonth;
          const scrollDiff =
            arcoCalendarMonth.scrollWidth - arcoCalendarMonth.clientWidth;
          let left = 0;
          if (0.33 < num && num < 0.66) {
            left = scrollDiff / 2;
          } else if (0.66 < num && num <= 1) {
            left = scrollDiff;
          }

          arcoCalendarMonth.scrollTo({
            left,
          });
        }}
        defaultValue={dayjs().format()}
        dateRender={(currentDate) => {
          const date = currentDate.date();
          const day = DateForDay[currentDate.day()];
          const localeDay = 'home.' + day;
          return (
            <div
              className="flex flex-column justify-center align-center"
              style={{
                width: 60,
                height: 50,
                padding: 10,
              }}
            >
              <div className="text-color-4 fs12">{locale(localeDay)}</div>
              <div className="fw700 fs24">{date}</div>
            </div>
          );
        }}
      />
      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </Card>
  );
};
export default InfoCalendar;
