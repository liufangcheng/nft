import React, { FC, useState, useRef, useEffect } from 'react';
import TableList from '@/components/TableList';
import styles from './index.module.less';
import { Table, TableColumnProps } from '@arco-design/web-react';
import { IconRight, IconLeft } from '@arco-design/web-react/icon';
import { DataColumnsInterface } from '@/components/TableList/types';
import { useHistory } from 'react-router';
import { useLocale } from '@/utils/hooks';
import { getDiscordApi } from '@/services';

const FeatureNF: FC = () => {
  const history = useHistory();
  const locale = useLocale();

  const columns: TableColumnProps[] = [
    {
      title: `${locale(['home.Name.Listed'])}`,
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
              <div className="listedCount">
                {locale('home.listed')}: {item?.listed}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: locale(['home.floor.price']),
      dataIndex: 'floor_price',
    },
    {
      title: locale('home.floor.price.historic.one.day'),
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
      title: locale(['home.total.volume']),
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
      title: locale('home.one_day_volume'),
      dataIndex: 'one_day_volume',

      render: (col) => {
        console.log(typeof col);

        return (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#00FF57' }}>
            {Number(col) > 0 ? Number(col).toFixed(2) : col}
          </div>
        );
      },
    },
    {
      title: locale('home.market.cap'),
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
      title: locale('home.Holders'),
      dataIndex: 'num_owners',
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div className={styles.homeTitle}> {locale('dms.Feature.NFT')}</div>
        <div className="flex cursor-pointer">
          <div
            className={styles.more}
            onClick={() => history.push('/featureNFT')}
          >
            {locale(['global.more'])}
            <IconRight />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        <TableList
          columns={columns}
          pagination={false}
          request={getDiscordApi.getFeatureNft}
        ></TableList>
      </div>
    </div>
  );
};
export default FeatureNF;
