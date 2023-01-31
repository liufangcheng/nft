import React, { FC, useEffect, useState } from 'react';
import './styles/index.less';
import { Typography, Divider, Message } from '@arco-design/web-react';
import SqlCard from './SqlCard';
import TabCard from './TabCard';
// import TopMoversCard from './TopMovers';
import CommentsCard from './CommentsCard';
import { useLocale } from '@/utils/hooks';
import { useHistory } from 'react-router';
import { InfoType } from '../discord/type';
import { getDiscordApi, getWatchListApi } from '@/services';
import { floorPriceType, nftDetailsType } from './typing';
import dayjs from 'dayjs';
const { Text } = Typography;

const Marketing: FC = () => {
  const history = useHistory();
  const locale = useLocale();
  // 判断从哪个页面进来的
  const id: number | null = history.location.state?.id || '';
  const contractAddress: string | null =
    history.location.state?.contractAddress || '';

  const [info, setInfo] = useState<InfoType>();
  const [nftDetails, setNftDetails] = useState<nftDetailsType | null>();
  const [floorPrice, setFloorPrice] = useState<floorPriceType[]>([]);

  const initData = async () => {
    if (id) {
      try {
        const discordDetail = await getDiscordApi.getDiscordDetails({
          discordProjectId: id,
        });
        setInfo(discordDetail.data.info);
      } catch (error) {}
    }
    try {
      const getNftDetails = await getDiscordApi.getFeatureNftDetails({
        discordProjectId: id,
        contractAddress,
      });
      console.log(getNftDetails);

      setNftDetails(getNftDetails.data.info);
      const getPrice = await getDiscordApi.getFloorPrice({
        page: 1,
        pageSize: 1000,
        discordProjectId: id,
        contractAddress,
      });

      if ((getPrice?.data?.rows as any[]).length > 0) {
        const newArray = [];
        getPrice?.data?.rows.map((item: any) => {
          newArray.push({
            price: item?.floor_price_eth,
            times: dayjs(item?.timestamp * 1000).format('YYYY-MM-DD hh:mm:ss'),
          });
        });
        setFloorPrice(newArray);
      }
    } catch (error) {
      console.log('[ error ] >', error);
    }
  };
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="plr">
      {/* 头部 */}
      <div className="mt24 flex justify-between align-center">
        <div className="homeTitle">{locale('global.Marketing')}</div>
        <div className="flex">
          <div
            className="flex"
            onClick={() => history.push('/discord', { id })}
          >
            <div style={{ marginRight: '6px', marginTop: '2px' }}>
              <img src="/svg/discord.svg" alt="" />
            </div>
            <Text className="iconChange">Discord</Text>
          </div>
          {id && <Divider type="vertical" style={{ height: '18px' }} />}
          {id && (
            <div
              onClick={async () => {
                await getWatchListApi.setWatchList({
                  discordProjectId: id,
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
          )}
        </div>
      </div>
      <div style={{ marginTop: '16px', gap: '7px' }} className="flex">
        <div style={{ flex: 1 }}>
          <div>
            <SqlCard nftInfo={nftDetails} charts={floorPrice}></SqlCard>
          </div>
          {id && (
            <div style={{ marginTop: '0px' }}>
              <CommentsCard id={id}></CommentsCard>
            </div>
          )}
        </div>
        {id && (
          <div>
            <TabCard id={id}></TabCard>
            {/* <TopMoversCard></TopMoversCard> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default Marketing;
