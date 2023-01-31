import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './styles/index.module.less';
import SearchCard from '@/components/LeftCard';
import TableList from '@/components/TableList';
import { useHistory } from 'react-router';

import {
  Table,
  TableColumnProps,
  Divider,
  Typography,
  Empty,
} from '@arco-design/web-react';
import {
  DataColumnsInterface,
  TableListRef,
} from '@/components/TableList/types';
import { useLocale, useMyStore } from '@/utils/hooks';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import LoginModal from '@/components/LoginModal';
import { getDiscordApi, getWatchListApi } from '@/services';
import { SearchConfig } from '@/components/LeftCard/types';
const { Text } = Typography;
const FeatureNFTList: FC = () => {
  const locale = useLocale();
  const history = useHistory();
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const { userInfo } = state;
  const refreshRef = useRef<TableListRef>();
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({
    search: null,
    blockchain: null,
  });
  const onSearch = (config: SearchConfig) => {
    delete config.follower;

    setSearchConfig(config);
    refreshRef.current.getList(config);
  };
  const columns: TableColumnProps[] = [
    {
      title: `${locale(['dms.name'])} / ${locale(['dms.ListedCount'])}`,
      dataIndex: 'name',
      headerCellStyle: {
        height: '56px',
      },
      bodyCellStyle: {
        height: '72px',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (col, item: any, index: number) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',

              cursor: 'pointer',
            }}
            onClick={() => {
              history.push('/Marketing', {
                contractAddress: item?.contract_address,
              });
            }}
          >
            <div style={{ width: '30px', textAlign: 'center' }}>
              {index + 1}
            </div>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginLeft: '16px',
              }}
            >
              {item.image ? (
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={item.image}
                  alt=""
                />
              ) : (
                <svg
                  width="40"
                  height="40"
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
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>

            <div style={{ marginLeft: '13px' }}>
              <div className="nftName">{col}</div>
              <div className="listedCount">Listed count: {item?.listed}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: locale(['dms.Floor']),
      dataIndex: 'floor_price',
    },
    {
      title: '1d  %',
      dataIndex: 'floor_price_historic_one_day',

      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#FF3838' }}>
            {col}
          </div>
        );
      },
    },
    {
      title: locale(['dms.Volume']),
      dataIndex: 'total_volume',
      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700 }}>
            {Number(col) > 0 ? Number(col).toFixed(2) : col}
          </div>
        );
      },
    },
    {
      title: '1d Volume',
      dataIndex: 'one_day_volume',

      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#00FF57' }}>
            {Number(col) > 0 ? Number(col).toFixed(2) : col}
          </div>
        );
      },
    },
    {
      title: locale(['dms.Market.Cap']),
      dataIndex: 'market_cap',
      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700 }}>
            {Number(col) > 0 ? Number(col).toFixed(2) : col}
          </div>
        );
      },
    },
    {
      title: locale(['dms.Holders']),
      dataIndex: 'num_owners',
    },
    // {
    //   title: locale('global.Operation'),
    //   dataIndex: 'op',

    //   render: (col, record) => {
    //     return (
    //       <div style={{ display: 'flex ', alignItems: 'center' }}>
    //         <div
    //           className="flex "
    //           onClick={() => {
    //             history.push('/discord', { id: record.id });
    //           }}
    //         >
    //           <div style={{ marginRight: '3px' }}>
    //             <img src="/svg/discord.svg" alt="" />
    //           </div>
    //           <Text className="operationColor">{locale('global.Discord')}</Text>
    //         </div>
    //         <Divider
    //           type="vertical"
    //           style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
    //         />
    //         <div
    //           className="flex"
    //           onClick={() => {
    //             console.log(record?.contract_address);

    //             history.push('/Marketing', {
    //               contractAddress: record?.contract_address,
    //             });
    //           }}
    //         >
    //           <div style={{ marginRight: '5px' }}>
    //             <img src="/svg/marketing.svg" alt="" />
    //           </div>
    //           <Text className="operationColor">
    //             {locale('global.Marketing')}
    //           </Text>
    //         </div>
    //         <Divider
    //           type="vertical"
    //           style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
    //         />
    //          <div
    //           onClick={async () => {
    //             await getWatchListApi.setWatchList({
    //               discordProjectId: record.id,
    //             });

    //             refreshRef.current.getList();
    //           }}
    //         >
    //           {record.isWatch === 1 ? (
    //             <div className="flex">
    //               <div style={{ marginRight: '5px' }}>
    //                 <svg
    //                   width="16"
    //                   height="16"
    //                   viewBox="0 0 16 16"
    //                   fill="yellow"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M7.62003 1.54818C7.79269 1.26259 8.20862 1.26259 8.38127 1.54818L10.3406 4.78927C10.4027 4.89187 10.5038 4.96505 10.621 4.99207L14.323 5.84557C14.6492 5.92078 14.7777 6.31456 14.5582 6.56628L12.0672 9.42288C11.9884 9.51331 11.9497 9.63171 11.9601 9.75101L12.2887 13.5196C12.3176 13.8517 11.9811 14.095 11.6728 13.965L8.17394 12.4894C8.06318 12.4427 7.93812 12.4427 7.82736 12.4894L4.32847 13.965C4.02016 14.095 3.68367 13.8517 3.71262 13.5196L4.04117 9.75101C4.05157 9.63171 4.01292 9.51331 3.93407 9.42288L1.44309 6.56628C1.22359 6.31456 1.35212 5.92078 1.67832 5.84557L5.38027 4.99207C5.49745 4.96505 5.59863 4.89187 5.66065 4.78927L7.62003 1.54818Z"
    //                     stroke="white"
    //                     strokeOpacity="0.85"
    //                   />
    //                 </svg>
    //               </div>
    //               <Text className="operationColor">unsubscribe to watch</Text>
    //             </div>
    //           ) : (
    //             <div className="flex">
    //               <div style={{ marginRight: '5px' }}>
    //                 <svg
    //                   width="16"
    //                   height="16"
    //                   viewBox="0 0 16 16"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M7.62003 1.54818C7.79269 1.26259 8.20862 1.26259 8.38127 1.54818L10.3406 4.78927C10.4027 4.89187 10.5038 4.96505 10.621 4.99207L14.323 5.84557C14.6492 5.92078 14.7777 6.31456 14.5582 6.56628L12.0672 9.42288C11.9884 9.51331 11.9497 9.63171 11.9601 9.75101L12.2887 13.5196C12.3176 13.8517 11.9811 14.095 11.6728 13.965L8.17394 12.4894C8.06318 12.4427 7.93812 12.4427 7.82736 12.4894L4.32847 13.965C4.02016 14.095 3.68367 13.8517 3.71262 13.5196L4.04117 9.75101C4.05157 9.63171 4.01292 9.51331 3.93407 9.42288L1.44309 6.56628C1.22359 6.31456 1.35212 5.92078 1.67832 5.84557L5.38027 4.99207C5.49745 4.96505 5.59863 4.89187 5.66065 4.78927L7.62003 1.54818Z"
    //                     stroke="white"
    //                     strokeOpacity="0.85"
    //                   />
    //                 </svg>
    //               </div>
    //               <Text className="operationColor">
    //                 {locale('global.Add.to.watch')}
    //               </Text>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    if (!userInfo) {
      loginRef.current.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="plr">
      <div className={styles.homeTitle}>{locale('global.Feature.NFT')}</div>

      {userInfo ? (
        <div className="mt24 flex" style={{ gap: '4px' }}>
          <div>
            <SearchCard
              disableFollower={false}
              onSearch={onSearch}
            ></SearchCard>
          </div>
          <div
            style={{ flex: 1, borderRadius: '8px' }}
            className={styles.table}
          >
            <TableList
              columns={columns}
              pagination={true}
              request={getDiscordApi.getFeatureNft}
              ref={refreshRef}
              searchProps={searchConfig}
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
export default FeatureNFTList;
