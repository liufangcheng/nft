import React, { FC, useEffect, useRef, useState } from 'react';
import NameCard from './NameCard';
import TableList from '@/components/TableList';
import './styles/index.less';
import {
  TableColumnProps,
  Divider,
  Typography,
  Empty,
} from '@arco-design/web-react';
import { useHistory } from 'react-router';
import { DataColumnsInterface } from '@/components/TableList/types';
import { useLocale, useMyStore } from '@/utils/hooks';
import LoginModal from '@/components/LoginModal';
import { DetailDrawerRef } from '@/components/LoginModal/typings';
import { getWatchListApi } from '@/services';

const { Text } = Typography;

const WatchList: FC = () => {
  const history = useHistory();
  const locale = useLocale();
  const { state, dispatch } = useMyStore();
  const loginRef = useRef<DetailDrawerRef>();
  const { userInfo } = state;
  const columns: TableColumnProps[] = [
    {
      title: locale('watchlist.Discord.Name'),
      dataIndex: 'discord_name',
      headerCellStyle: {
        height: '56px',
      },
      bodyCellStyle: {
        height: '72px',
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
              history.push('/Marketing');
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
              <div className="nftName">{name ? name : discord_name}</div>
              <div className="describe">
                {description ? description : discord_description}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: locale('watchlist.Follower'),
      dataIndex: 'approximate_member_count',
    },
    {
      title: locale('watchlist.Online'),
      dataIndex: 'approximate_presence_count',

      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#FF3838' }}>
            {col}
          </div>
        );
      },
    },
    {
      title: locale('watchlist.Visit/h'),
      dataIndex: 'visitH',
    },
    {
      title: locale('watchlist.New.Users/24h'),
      dataIndex: 'nu24H',

      render: (col) => {
        return (
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#00FF57' }}>
            {col}
          </div>
        );
      },
    },
    {
      title: locale('watchlist.Retention.Rate/d'),
      dataIndex: 'Retention',
    },
    {
      title: locale('watchlist.Operation'),
      dataIndex: 'op',

      render: (col, record) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className="flex"
              onClick={() => history.push('/discord', { id: record.id })}
            >
              <div style={{ marginRight: '3px', marginTop: '2px' }}>
                <img src="/svg/discord.svg" alt="" />
              </div>
              <Text className="operationColor">{locale('global.Discord')}</Text>
            </div>
            <Divider
              type="vertical"
              style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
            />
            <div
              className="flex"
              onClick={() => history.push('/Marketing', { id: record.id })}
            >
              <div style={{ marginRight: '5px' }}>
                <img src="/svg/marketing.svg" alt="" />
              </div>
              <Text className="operationColor">
                {locale('global.Marketing')}
              </Text>
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
  }, [userInfo]);

  return (
    <div className="plr">
      <div className="homeTitle mt24">{locale('watchlist.watchlist')}</div>
      {userInfo ? (
        <div style={{ marginTop: '16px', display: 'flex', gap: '4px' }}>
          {/* <div>
            <NameCard></NameCard>
          </div> */}
          <div style={{ flex: 1, borderRadius: '8px' }}>
            <TableList
              columns={columns}
              pagination={true}
              request={getWatchListApi.getWatchList}
            ></TableList>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '200px' }}>
          <Empty />
        </div>
      )}
      <div>
        <LoginModal ref={loginRef}></LoginModal>
      </div>
    </div>
  );
};
export default WatchList;
