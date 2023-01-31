import React, { FC, useEffect, useState } from 'react';
import { Card, Message, Tabs } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
import styles from './index.module.less';
import { divide } from 'lodash';
import { CommentType } from '../CommentsCard/type';
import { getDiscordApi } from '@/services';
const pageCurrent = {
  page: 1,
  pageSize: 10,
};
const TabCard: FC<CommentType> = ({ id }) => {
  const [chooseChecked, setChooseChecked] = useState(1);
  const [total, setTotal] = useState(0);
  const [nameData, setNameData] = useState([]);
  const tabData = async () => {
    const { data } = await getDiscordApi.getDiscordProjectFollower({
      ...pageCurrent,
      discordProjectId: id,
    });

    setNameData(data.rows);
    setTotal(data.total);
  };
  const loadMore = async () => {
    if (total === nameData.length) {
      Message.warning({
        content: 'no more data',
        className: 'messageWarn',
      });
      return;
    }
    pageCurrent.page++;
    tabData();
  };
  useEffect(() => {
    tabData();
  }, []);

  return (
    <div>
      <Card
        style={{
          width: '400px',
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div
          style={{
            boxSizing: 'border-box',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className={styles.titleTab}
            style={{
              marginLeft: '24px',
              alignItems: 'center',
              // borderBottom: chooseChecked === 1 ? '2px solid #2D67D5' : '',
            }}
            onClick={() => {
              setChooseChecked(1);
            }}
          >
            <div
              style={{
                height: '56px',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '56px',
                fontFamily: 'Noto Sans SC',
              }}
            >
              Followers
            </div>

            <div
              style={{
                marginLeft: '10px',
                lineHeight: '22px',
                background: '#313238',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Noto Sans SC',
                padding: '2px 5px',
              }}
            >
              {total} k
            </div>
          </div>
          {/* 
          <div
            style={{
              height: '56px',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '56px',
              padding: '0 20px',
              boxSizing: 'border-box',
              fontFamily: 'Noto Sans SC',
              marginLeft: '52px',
              borderBottom: chooseChecked === 2 ? '2px solid #2D67D5' : '',
            }}
            className={styles.titleTab}
            onClick={() => {
              setChooseChecked(2);
            }}
          >
            Live
          </div> */}
        </div>
        {/* <div style={{ height: '16px', backgroundColor: '#1C1E22' }}></div> */}
        {chooseChecked === 1 && (
          <div
            style={{
              paddingBottom: '10px',
              boxSizing: 'border-box',
              backgroundColor: '#1C1E22',
            }}
          >
            {nameData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="leftList"
                  style={{ backgroundColor: '#1C1E22' }}
                >
                  <div
                    className="flex align-center "
                    style={{ height: '48px' }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        marginLeft: '24px',
                        overflow: 'hidden',
                      }}
                    >
                      {item?.avatar ? (
                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={item?.avatar}
                          alt=""
                        />
                      ) : (
                        <svg
                          width="32"
                          height="32"
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
                    <div
                      style={{
                        marginLeft: '8px',
                        fontFamily: 'Noto Sans SC',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      {item?.name ? item?.name : item?.email}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* {chooseChecked === 2 && (
          <div
            style={{ height: '386px', overflowY: 'auto' }}
            className={styles.scrollTwo}
          >
            {liveData.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: '90px',
                    width: '100%',
                    padding: '12px 24px',
                    boxSizing: 'border-box',
                    backgroundColor: '#1C1E22',
                    display: 'flex',
                  }}
                >
                  <div>
                    <img
                      src={item.src}
                      alt=""
                      style={{
                        height: '66px',
                        width: '66',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        marginLeft: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontFamily: 'Noto Sans SC',
                      }}
                    >
                      <span>Name</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex align-center">
                      <div
                        style={{
                          marginLeft: '12px',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: '22px',
                          color: '#FFFFFF',
                          fontFamily: 'Noto Sans SC',
                          padding: '3px 7px',
                          backgroundColor:
                            item.method === 'LIST'
                              ? '#4E81F7'
                              : item.method === 'DELIST'
                              ? 'rgba(255, 255, 255, 0.45)'
                              : '#D6534C',
                          borderRadius: '4px',
                        }}
                      >
                        {item.method}
                      </div>
                      <div
                        style={{
                          marginLeft: '5px',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: '22px',
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontFamily: 'Noto Sans SC',
                        }}
                      >
                        {' '}
                        for {item.price}
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        color: '#24E34E',
                        fontFamily: 'Noto Sans SC',
                      }}
                    >
                      7.29% above floor
                    </div>
                  </div>
                  <div
                    style={{
                      flex: '1',
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: 'rgba(255, 255, 255, 0.45)',
                      fontFamily: 'Noto Sans SC',
                    }}
                  >
                    {item.ago} sec ago
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign: 'center', lineHeight: '40px' }}>
              Load more
            </div>
          </div>
        )} */}
      </Card>
      <div
        style={{
          textAlign: 'center',
          lineHeight: '40px',
          backgroundColor: '#1C1E22',
          marginTop: '2px',
          color: 'rgba(255, 255, 255, 0.45)',
          borderRadius: '0 0 8px 8px',
        }}
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </div>
    </div>
  );
};

export default TabCard;
