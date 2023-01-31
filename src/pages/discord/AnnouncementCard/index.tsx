import React, { FC, useEffect, useState } from 'react';
import { Card, List, Spin, Tabs, Timeline } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
import { useLocale } from '@/utils/hooks';
import styles from './index.module.less';
import { CardType, InfoType } from '../type.d';
import { getDiscordApi } from '@/services';
import dayjs from 'dayjs';
let paginationAsync = {
  pageSize: 10,
  page: 1,
};

const AnnouncementCard: FC<CardType> = ({ discordProjectId, info }) => {
  const locale = useLocale();
  const [tabHeader, setTabHeader] = useState([]);
  const [AnnouncementData, setAnnouncementData] = useState([]);
  const [activeTab, setActiveTab] = useState('0');
  const [total, setTotal] = useState(0);
  const [scrollLoading, setScrollLoading] = useState(<Spin loading={true} />);
  const tabData = async (channel_id) => {
    const { data } = await getDiscordApi.getChannelMessage({
      ...paginationAsync,
      channelId: channel_id,
    });
    setAnnouncementData((oldArray) => {
      return [...oldArray, ...data.rows];
    });
    setTotal(data.total);
  };
  const initData = async () => {
    const { data } = await getDiscordApi.getChannel({
      page: 1,
      pageSize: 20,
      discordProjectId,
    });
    setTabHeader(data.rows);
    tabData(data.rows[0].channel_id);
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const handleScroll = () => {
  //   const content = document.getElementById('logout-content');
  //   const scrollTop = content.scrollTop;
  //   const clientHeight = content.clientHeight;
  //   const scrollHeight = content.scrollHeight;
  //   if (scrollTop + clientHeight === scrollHeight) {
  //     paginationAsync.page++;
  //     tabData(tabHeader[Number(activeTab)].channel_id);
  //   }
  // };

  // useEffect(() => {
  //   const content = document.getElementById('logout-content');
  //   content.addEventListener('scroll', handleScroll);

  //   if (AnnouncementData.length === total) {
  //     content.removeEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     content.removeEventListener('scroll', handleScroll);
  //   };
  // }, [AnnouncementData.length, tabHeader]);

  return (
    <div>
      <Card
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.tabContent}>
          <Tabs
            activeTab={activeTab}
            onChange={(e) => {
              setActiveTab(e + '');
            }}
          >
            {tabHeader.map((itemTabPane, index) => {
              return (
                <TabPane
                  destroyOnHide
                  title={itemTabPane.name}
                  key={index}
                  style={{ paddingBottom: '10px' }}
                >
                  <List
                    className={styles.list}
                    scrollLoading={scrollLoading}
                    bordered={false}
                    onReachBottom={(currentPage) => {
                      paginationAsync.page = currentPage;
                      tabData(tabHeader[Number(activeTab)].channel_id);
                    }}
                    dataSource={AnnouncementData}
                    render={(item, index) => {
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
                                viewBox="0 0 112 112"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.2">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0ZM8.61539 56C8.61539 82.1698 29.8302 103.385 56 103.385C82.1698 103.385 103.385 82.1698 103.385 56C103.385 29.8302 82.1698 8.61539 56 8.61539C29.8302 8.61539 8.61539 29.8302 8.61539 56Z"
                                    fill="white"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M47.3846 43.0769C47.3846 47.8351 51.2419 51.6923 56 51.6923C60.7581 51.6923 64.6154 47.8351 64.6154 43.0769C64.6154 38.3188 60.7581 34.4615 56 34.4615C51.2419 34.4615 47.3846 38.3188 47.3846 43.0769ZM56 25.8462C46.4837 25.8462 38.7692 33.5606 38.7692 43.0769C38.7692 52.5932 46.4837 60.3077 56 60.3077C65.5163 60.3077 73.2308 52.5932 73.2308 43.0769C73.2308 33.5606 65.5163 25.8462 56 25.8462Z"
                                    fill="white"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M88.525 90.4599C80.0317 98.4811 68.59 103.385 56 103.385C43.4117 103.385 31.9715 98.4825 23.4784 90.4632C31.9718 82.442 43.4135 77.5385 56.0035 77.5385C68.5918 77.5385 80.032 82.4406 88.525 90.4599ZM56 112C73.9324 112 89.8962 103.571 100.146 90.4593C89.896 77.35 73.9339 68.9231 56.0035 68.9231C38.0711 68.9231 22.1073 77.3519 11.8579 90.4638C22.1075 103.573 38.0696 112 56 112Z"
                                    fill="white"
                                  />
                                </g>
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
                              {dayjs(item.timestamp * 1000).format(
                                'YYYY-MM-DD HH:mm:ss'
                              )}
                            </div>
                            <div className={styles.AnnouncementCommon}>
                              {item.content}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />

                  {/* {AnnouncementData.map((item, index) => {
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
                              viewBox="0 0 112 112"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.2">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0ZM8.61539 56C8.61539 82.1698 29.8302 103.385 56 103.385C82.1698 103.385 103.385 82.1698 103.385 56C103.385 29.8302 82.1698 8.61539 56 8.61539C29.8302 8.61539 8.61539 29.8302 8.61539 56Z"
                                  fill="white"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M47.3846 43.0769C47.3846 47.8351 51.2419 51.6923 56 51.6923C60.7581 51.6923 64.6154 47.8351 64.6154 43.0769C64.6154 38.3188 60.7581 34.4615 56 34.4615C51.2419 34.4615 47.3846 38.3188 47.3846 43.0769ZM56 25.8462C46.4837 25.8462 38.7692 33.5606 38.7692 43.0769C38.7692 52.5932 46.4837 60.3077 56 60.3077C65.5163 60.3077 73.2308 52.5932 73.2308 43.0769C73.2308 33.5606 65.5163 25.8462 56 25.8462Z"
                                  fill="white"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M88.525 90.4599C80.0317 98.4811 68.59 103.385 56 103.385C43.4117 103.385 31.9715 98.4825 23.4784 90.4632C31.9718 82.442 43.4135 77.5385 56.0035 77.5385C68.5918 77.5385 80.032 82.4406 88.525 90.4599ZM56 112C73.9324 112 89.8962 103.571 100.146 90.4593C89.896 77.35 73.9339 68.9231 56.0035 68.9231C38.0711 68.9231 22.1073 77.3519 11.8579 90.4638C22.1075 103.573 38.0696 112 56 112Z"
                                  fill="white"
                                />
                              </g>
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
                            {dayjs(item.timestamp * 1000).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )}
                          </div>
                          <div className={styles.AnnouncementCommon}>
                            {item.content}
                          </div>
                        </div>
                      </div>
                    );
                  })} */}
                </TabPane>
              );
            })}
            {/* <TabPane
              destroyOnHide
              key="1"
              title={locale('discord.Announcement')}
              style={{ paddingBottom: '10px' }}
            >
              {AnnouncementData.map((item, index) => {
                return (
                  <div className={styles.AnnouncementCenter} key={index}>
                    <div className={styles.AnnouncementImg}>
                      <img src={item.src} alt="" className="border-radius50" />
                    </div>
                    <div style={{ marginLeft: '16px' }}>
                      <div className={styles.AnnouncementTitle}>
                        {item.name}
                      </div>
                      <div className={styles.AnnouncementTime}>
                        {' '}
                        {item.date}
                      </div>
                      <div className={styles.AnnouncementCommon}>
                        {item.common}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane> */}
            <TabPane
              destroyOnHide
              key="Roadmap"
              title={locale('discord.Roadmap')}
            >
              <div className="w100">
                <img
                  src={
                    info?.roadmap_image ? info?.roadmap_image : '/images/14.png'
                  }
                  alt=""
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default AnnouncementCard;
