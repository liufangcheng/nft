import React, { FC, useEffect, useRef, useState } from 'react';
import { Empty, List, Spin } from '@arco-design/web-react';
import styles from './index.module.less';
import { useLocale, useMyStore } from '@/utils/hooks';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import LoginModal from '@/components/LoginModal';
import { getDiscordApi } from '@/services';
import dayjs from 'dayjs';
import { remove } from 'lodash';
import { useHistory } from 'react-router';
let paginationAsync = {
  pageSize: 10,
  page: 1,
};
const Announcement: FC = () => {
  const locale = useLocale();
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const { userInfo } = state;
  const [AnnouncementData, setAnnouncementData] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      loginRef.current.init();
    } else {
      initData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initData = async () => {
    const { data } = await getDiscordApi.getAllChannelMessage(paginationAsync);
    setAnnouncementData((oldArray) => {
      return [...oldArray, ...data.rows];
    });
    setTotal(data.total);
  };
  const handleScroll = (e) => {
    const content = document.getElementById('logout-content');
    const scrollTop = content.scrollTop;
    const clientHeight = content.clientHeight;
    const scrollHeight = content.scrollHeight;
    console.log(scrollTop + clientHeight, scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight) {
      paginationAsync.page++;
      initData();
    }
  };

  useEffect(() => {
    const content = document.getElementById('logout-content');
    content.addEventListener('scroll', handleScroll);
    if (total === AnnouncementData.length) {
      content.removeEventListener('scroll', handleScroll);
    }

    return () => {
      content.removeEventListener('scroll', handleScroll);
    };
  }, [total, AnnouncementData]);

  return (
    <div className="plr">
      <div className={styles.title}>{locale('menu.announcement')}</div>

      {userInfo ? (
        AnnouncementData.map((item, index) => {
          return (
            <div className={styles.AnnouncementCenter} key={index}>
              <div className={styles.AnnouncementImg}>
                {item.author_avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${item.author_id}/${item.author_avatar}.webp`}
                    alt=""
                    className="border-radius50"
                  />
                ) : (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="120" height="120" rx="60" fill="#424242" />
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M117.455 77.3418C115.822 82.7623 113.442 87.8593 110.435 92.5136L84.0591 102L55.1841 95.149L88.5591 64.5L117.455 77.3418Z"
                      fill="url(#paint0_linear_945_10812)"
                    />
                    <path
                      d="M55.8267 49.892L27 37.696V82.0448L55.8267 94.6103V49.892Z"
                      fill="#727272"
                    />
                    <path
                      d="M94.6318 37.696L55.8267 49.892V94.6103L94.6318 82.0448V37.696Z"
                      fill="#606060"
                    />
                    <path
                      d="M55.8267 49.8918L27 37.6959L44.7395 31.7827L73.5662 44.3482L55.8267 49.8918Z"
                      fill="#E6A453"
                    />
                    <path
                      d="M73.5669 44.3482L44.7402 31.7827L65.0668 25.5L94.6326 37.6959L73.5669 44.3482Z"
                      fill="#E6A453"
                    />
                    <path
                      d="M55.8267 49.8916L27 37.6956L44.7395 31.7825L73.5662 44.348L55.8267 49.8916Z"
                      fill="#818181"
                    />
                    <path
                      d="M73.566 44.3482L44.7393 31.7827L65.0658 25.5L94.6316 37.6959L73.566 44.3482Z"
                      fill="#727171"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_945_10812"
                        x1="66.7498"
                        y1="84"
                        x2="86.3198"
                        y2="102"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop />
                        <stop offset="1" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div style={{ marginLeft: '16px' }}>
                <div className={styles.AnnouncementTitle}>
                  {item.author_username}
                  {item.id}
                </div>
                <div className={styles.AnnouncementTime}>
                  {' '}
                  {dayjs(item.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className={styles.AnnouncementCommon}>{item.content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ marginTop: '10%' }}>
          <Empty></Empty>
        </div>
      )}

      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};

export default Announcement;
