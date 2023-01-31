import React, { FC, useEffect, useState } from 'react';
import DiscoedLeftCard from './DiscoedLeftCard';
import AnnouncementCard from './AnnouncementCard';
import './styles/index.less';
import { Typography, Divider, Message } from '@arco-design/web-react';
import { useLocale } from '@/utils/hooks';
import { useHistory } from 'react-router';
import { getDiscordApi, getWatchListApi } from '@/services';
import { InfoType } from './type';

const { Text } = Typography;

const Discord: FC = () => {
  const locale = useLocale();
  const history = useHistory();
  const discordProjectId = history.location.state['id'];

  const [info, setInfo] = useState<InfoType>();
  const initData = async () => {
    const { data } = await getDiscordApi.getDiscordDetails({
      discordProjectId,
    });
    setInfo(data.info);
  };
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discordProjectId]);

  return (
    <div className="plr">
      <div className="mt24 flex justify-between align-center">
        <div className="homeTitle">{locale('global.Discord')}</div>
        <div className="flex align-center">
          <div
            className="flex"
            onClick={() => history.push('/Marketing', { id: discordProjectId })}
          >
            <div style={{ marginRight: '5px' }}>
              <img src="/svg/marketing.svg" alt="" />
            </div>
            <Text className="iconChange">{locale('global.Marketing')}</Text>
          </div>
          <Divider
            type="vertical"
            style={{ height: '12px', color: 'rgba(255, 255, 255, 0.12)' }}
          />
          <div
            onClick={async () => {
              await getWatchListApi.setWatchList({
                discordProjectId,
              });

              initData();
            }}
          >
            {info?.isWatch === 1 ? (
              <div className="flex">
                <div style={{ marginRight: '5px' }}>
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
                <Text className="iconChange">unsubscribe to watch</Text>
              </div>
            ) : (
              <div className="flex">
                <div style={{ marginRight: '5px' }}>
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
                <Text className="iconChange">
                  {locale('global.Add.to.watch')}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="left">
          <DiscoedLeftCard
            discordProjectId={discordProjectId}
            info={info}
          ></DiscoedLeftCard>
        </div>
        <div className="right">
          <AnnouncementCard
            discordProjectId={discordProjectId}
            info={info}
          ></AnnouncementCard>
        </div>
      </div>
    </div>
  );
};
export default Discord;
