import React, { FC, useState, useRef, useEffect } from 'react';
import CardImages from '@/components/CardImages';
import { useHistory } from 'react-router';
import { IconRight, IconLeft } from '@arco-design/web-react/icon';

import styles from './index.module.less';
import { useLocale, useMyStore } from '@/utils/hooks';
import useWindowSize from '@/utils/hooks/useSize';
import { getDiscordApi } from '@/services';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import LoginModal from '@/components/LoginModal';

const TrendDiscord: FC = () => {
  const history = useHistory();
  const locale = useLocale();
  const { width } = useWindowSize();
  const [hideRightCover, setHideRightCover] = useState(false);
  const [hideStatus, setHideStatus] = useState(0);
  let timeStop = null;
  const [leftWhite, setLeftWhite] = useState(false);
  const [rightWhite, setRightWhite] = useState(true);
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const [info, setInfo] = useState([]);
  const mySwiper = useRef<any>();
  const calculateWidth = (mySwiper) => {
    const allWidth = mySwiper.current.clientWidth;
    const countSize = parseInt(allWidth / 338);
    const hideSize = info.length - countSize;
    const remainingWidth = 326 - (allWidth - countSize * 338);
    const overWidth = (hideSize - 1) * 338 + remainingWidth;
    return overWidth;
  };
  const rightClick = () => {
    const scrollDiff =
      mySwiper.current.scrollWidth - mySwiper.current.clientWidth;
    mySwiper.current.scrollLeft += 338;

    if (scrollDiff - mySwiper.current.scrollLeft >= 338) {
      setRightWhite(true);
      setLeftWhite(true);
    } else {
      setRightWhite(false);
      setHideRightCover(false);
    }
  };
  const leftClick = () => {
    const scrollDiff =
      mySwiper.current.scrollWidth - mySwiper.current.clientWidth;
    if (scrollDiff === mySwiper.current.scrollLeft) {
      const allWidth = mySwiper.current.clientWidth;
      const countRemainder = allWidth % 338;

      mySwiper.current.scrollLeft -= 338 - countRemainder;
    } else {
      mySwiper.current.scrollLeft -= 338;
    }
    if (mySwiper.current.scrollLeft > 338) {
      setLeftWhite(true);
      setRightWhite(true);
    } else {
      setLeftWhite(false);
      setRightWhite(true);
    }

    const overWidth = calculateWidth(mySwiper);
    if (overWidth === mySwiper.current.scrollLeft) {
      setHideRightCover(true);
    }
  };
  const initData = async () => {
    const { data } = await getDiscordApi.getDiscord({
      page: 1,
      pageSize: 6,
      search: '',
      blockchain: '',
      follower: 0,
    });
    setInfo(data?.rows);
  };
  const toDMS = () => {
    if (state.userInfo) {
      history.push('/DMS');
    } else {
      loginRef.current.init();
    }
  };
  useEffect(() => {
    const allWidth = mySwiper.current.clientWidth;
    const countSize = parseInt(allWidth / 338);
    setHideStatus(countSize);
    const countRemainder = allWidth % 338;
    if (countRemainder === 0) {
      setHideRightCover(false);
    } else {
      setHideRightCover(true);
    }
    initData();
  }, []);
  return (
    <div>
      <div className="flex justify-between ">
        <div className={styles.homeTitle}>{locale(['dms.TrendDiscord'])}</div>
        <div className="flex">
          {/* <div
            className={`cursor-pointer ${styles.margin30}`}
            onClick={() => {
              leftClick();
            }}
          >
            <IconLeft
              className={`${styles.more}  ${leftWhite ? styles.leftArrow : ''}`}
            />
          </div>
          <div
            className={`cursor-pointer ${styles.margin37}`}
            onClick={rightClick}
          >
            <IconRight
              className={`${styles.more}  ${
                rightWhite ? styles.rightArrow : ''
              }`}
            />
          </div> */}
          <div
            className={styles.more}
            onClick={() => {
              toDMS();
            }}
          >
            {locale(['global.more'])} <IconRight />
          </div>
        </div>
      </div>
      <div className={`${styles.LateralSwipe} flex`}></div>
      <div className={styles.rightCoverFather}>
        {hideRightCover && <div className={styles.rightCover}></div>}
        <div className={styles.Swiper} ref={mySwiper}>
          {info.map((item, index) => {
            return (
              <div
                key={index}
                // onClick={() => {
                //   if (index >= hideStatus) {
                //     rightClick();
                //   }
                // }}
              >
                <CardImages info={item}></CardImages>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};
export default TrendDiscord;
