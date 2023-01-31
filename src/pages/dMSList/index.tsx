import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './styles/index.module.less';
import SearchCard from '@/components/LeftCard';
import TableList from '@/components/TableList';
import {
  TableColumnProps,
  Divider,
  Typography,
  Empty,
} from '@arco-design/web-react';
import {
  DataColumnsInterface,
  TableListRef,
} from '@/components/TableList/types';
const { Text } = Typography;
import { useHistory } from 'react-router';
import { useLocale, useMyStore } from '@/utils/hooks';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import LoginModal from '@/components/LoginModal';
import { getDiscordApi, getWatchListApi } from '@/services';
import { SearchConfig } from '@/components/LeftCard/types';

const DMSList: FC = () => {
  const locale = useLocale();
  const history = useHistory();
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const refreshRef = useRef<TableListRef>();
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({
    search: null,
    blockchain: null,
    follower: null,
  });
  const { userInfo } = state;
  const onSearch = (config: SearchConfig) => {
    setSearchConfig(config);
    refreshRef.current.getList(config);
  };
  const columns: TableColumnProps[] = [
    {
      title: `${locale('dms.name')}/${locale('dms.ListedCount')}`,
      dataIndex: 'name',
      headerCellStyle: {
        height: '56px',
      },
      bodyCellStyle: {
        height: '78.2px',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (col, item: any, index: number) => {
        const {
          name,
          image,
          guild_id,
          discord_icon,
          discord_name,
          description,
          discord_description,
        } = item;

        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              history.push('/discord', { id: item.id });
            }}
          >
            <div style={{ width: '30px', textAlign: 'center' }}>
              {index + 1}
            </div>
            <div
              style={{
                borderRadius: '50%',
                marginLeft: '16px',
              }}
            >
              <img
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                src={
                  image
                    ? image
                    : `https://cdn.discordapp.com/icons/${guild_id}/${discord_icon}.webp`
                }
                alt=""
              />
            </div>

            <div style={{ marginLeft: '13px' }}>
              <div className={styles.nftName}>{name ? name : discord_name}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: locale('dms.follower'),
      dataIndex: 'approximate_member_count',
    },
    {
      title: 'Online',
      dataIndex: 'approximate_presence_count',
    },
    {
      title: 'New Users/24h',
      dataIndex: 'newUserH',
    },
    {
      title: 'Retention Rate/d',
      dataIndex: 'rateD',
      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700 }}>
            {Number(col) > 0 ? Number(col * 100).toFixed(5) + '%' : col}
          </div>
        );
      },
    },
    {
      title: locale('global.Operation'),
      dataIndex: 'op',
      width: 380,
      fixed: 'right',
      render: (col, record) => {
        return (
          <div className="flex align-center">
            <div
              className={styles.discord}
              onClick={() => {
                history.push('/discord', { id: record.id });
              }}
            >
              <div className="flex flex-center" style={{ marginRight: '3px' }}>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1055 1.34595C14.7553 3.78672 15.5701 6.53985 15.2655 9.70934C15.2642 9.72275 15.2573 9.73506 15.2464 9.74314C13.9969 10.6662 12.7864 11.2265 11.5929 11.598C11.5836 11.6008 11.5737 11.6007 11.5645 11.5975C11.5553 11.5944 11.5473 11.5885 11.5416 11.5805C11.2659 11.1945 11.0153 10.7875 10.7958 10.3601C10.7832 10.335 10.7947 10.3046 10.8207 10.2947C11.2186 10.1439 11.5969 9.96308 11.9609 9.74902C11.9895 9.73212 11.9914 9.69078 11.9649 9.67093C11.8876 9.61324 11.8111 9.55261 11.7379 9.49197C11.7242 9.48077 11.7058 9.47856 11.6902 9.48609C9.32747 10.5839 6.73917 10.5839 4.34847 9.48609C4.33294 9.47911 4.3145 9.4815 4.30117 9.49253C4.22813 9.55316 4.15143 9.61324 4.07492 9.67093C4.04844 9.69078 4.05063 9.73212 4.07948 9.74902C4.44342 9.95904 4.82179 10.1439 5.21914 10.2955C5.24489 10.3054 5.25713 10.335 5.24434 10.3601C5.0296 10.7881 4.77906 11.195 4.4982 11.5811C4.48597 11.5967 4.46588 11.6039 4.44689 11.598C3.25902 11.2265 2.04851 10.6662 0.799107 9.74314C0.788698 9.73506 0.781211 9.7222 0.780116 9.70879C0.52556 6.96723 1.04435 4.19132 2.93818 1.3454C2.94275 1.33786 2.94969 1.33198 2.95772 1.32849C3.88957 0.898178 4.88789 0.581597 5.93132 0.400799C5.95031 0.397859 5.9693 0.406679 5.97916 0.423582C6.10808 0.653255 6.25545 0.947787 6.35515 1.18848C7.455 1.01945 8.57202 1.01945 9.69487 1.18848C9.79458 0.952932 9.93683 0.653255 10.0652 0.423582C10.0698 0.415197 10.0769 0.408478 10.0855 0.404387C10.094 0.400295 10.1037 0.399039 10.113 0.400799C11.157 0.582148 12.1553 0.898729 13.0865 1.32849C13.0947 1.33198 13.1014 1.33786 13.1055 1.34595ZM6.9143 6.5586C6.9258 5.74813 6.33853 5.07748 5.60134 5.07748C4.87018 5.07748 4.28857 5.74225 4.28857 6.5586C4.28857 7.37476 4.88168 8.03953 5.60134 8.03953C6.33269 8.03953 6.9143 7.37476 6.9143 6.5586ZM11.7684 6.5586C11.7799 5.74813 11.1926 5.07748 10.4556 5.07748C9.72427 5.07748 9.14267 5.74225 9.14267 6.5586C9.14267 7.37476 9.73578 8.03953 10.4556 8.03953C11.1926 8.03953 11.7684 7.37476 11.7684 6.5586Z"
                    fill="white"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>
              <Text className={styles.operationColor}>
                {locale('global.Discord')}
              </Text>
            </div>
            <Divider
              type="vertical"
              style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
            />
            <div
              className={styles.marketing}
              onClick={() => history.push('/Marketing', { id: record.id })}
            >
              <div style={{ marginRight: '5px' }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 0C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H10C11.1046 12 12 11.1046 12 10V2C12 0.895431 11.1046 0 10 0H2ZM10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645C10.1583 3.45118 9.84171 3.45118 9.64645 3.64645L7 6.29289L5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645L1.64645 7.64645C1.45118 7.84171 1.45118 8.15829 1.64645 8.35355C1.84171 8.54882 2.15829 8.54882 2.35355 8.35355L5 5.70711L6.64645 7.35355C6.84171 7.54882 7.15829 7.54882 7.35355 7.35355L10.3536 4.35355Z"
                    fill="white"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>
              <Text className={styles.operationColor}>
                {locale('global.Marketing')}
              </Text>
            </div>
            <Divider
              type="vertical"
              style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
            />
            <div
              onClick={async () => {
                await getWatchListApi.setWatchList({
                  discordProjectId: record.id,
                });

                refreshRef.current.getList();
              }}
            >
              {record.isWatch === 1 ? (
                <div className={styles.star}>
                  <div
                    className="flex flex-center"
                    style={{ marginRight: '5px' }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.62003 1.54818C7.79269 1.26259 8.20862 1.26259 8.38127 1.54818L10.3406 4.78927C10.4027 4.89187 10.5038 4.96505 10.621 4.99207L14.323 5.84557C14.6492 5.92078 14.7777 6.31456 14.5582 6.56628L12.0672 9.42288C11.9884 9.51331 11.9497 9.63171 11.9601 9.75101L12.2887 13.5196C12.3176 13.8517 11.9811 14.095 11.6728 13.965L8.17394 12.4894C8.06318 12.4427 7.93812 12.4427 7.82736 12.4894L4.32847 13.965C4.02016 14.095 3.68367 13.8517 3.71262 13.5196L4.04117 9.75101C4.05157 9.63171 4.01292 9.51331 3.93407 9.42288L1.44309 6.56628C1.22359 6.31456 1.35212 5.92078 1.67832 5.84557L5.38027 4.99207C5.49745 4.96505 5.59863 4.89187 5.66065 4.78927L7.62003 1.54818Z"
                        stroke="white"
                        strokeOpacity="0.85"
                      />
                    </svg>
                  </div>
                  <Text className={styles.operationColor}>
                    unsubscribe to watch
                  </Text>
                </div>
              ) : (
                <div className={styles.star}>
                  <div
                    className="flex flex-center"
                    style={{ marginRight: '5px' }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.62003 1.54818C7.79269 1.26259 8.20862 1.26259 8.38127 1.54818L10.3406 4.78927C10.4027 4.89187 10.5038 4.96505 10.621 4.99207L14.323 5.84557C14.6492 5.92078 14.7777 6.31456 14.5582 6.56628L12.0672 9.42288C11.9884 9.51331 11.9497 9.63171 11.9601 9.75101L12.2887 13.5196C12.3176 13.8517 11.9811 14.095 11.6728 13.965L8.17394 12.4894C8.06318 12.4427 7.93812 12.4427 7.82736 12.4894L4.32847 13.965C4.02016 14.095 3.68367 13.8517 3.71262 13.5196L4.04117 9.75101C4.05157 9.63171 4.01292 9.51331 3.93407 9.42288L1.44309 6.56628C1.22359 6.31456 1.35212 5.92078 1.67832 5.84557L5.38027 4.99207C5.49745 4.96505 5.59863 4.89187 5.66065 4.78927L7.62003 1.54818Z"
                        stroke="white"
                        strokeOpacity="0.85"
                      />
                    </svg>
                  </div>
                  <Text className={styles.operationColor}>
                    {locale('global.Add.to.watch')}
                  </Text>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!userInfo) {
      loginRef.current.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="plr">
      <div className={styles.homeTitle}>{locale(['dms.DMS'])}</div>

      {userInfo ? (
        <div className="mt16 flex " style={{ gap: '4px' }}>
          <div>
            <SearchCard disableFollower={true} onSearch={onSearch}></SearchCard>
          </div>
          <div
            style={{ flex: 1, borderRadius: '8px' }}
            className={styles.table}
          >
            <TableList
              columns={columns}
              pagination={true}
              request={getDiscordApi.getDiscord}
              ref={refreshRef}
              searchProps={searchConfig}
              scroll={{ x: 1400 }}
            ></TableList>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '15%' }}>
          <Empty></Empty>
        </div>
      )}
      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};
export default DMSList;
