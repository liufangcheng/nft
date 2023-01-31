import React, { FC, useState } from 'react';
import { Card, Avatar, Divider, Typography } from '@arco-design/web-react';
import styles from './index.module.less';
const { Text } = Typography;
import { useLocale } from '@/utils/hooks';
import { CardImagesType } from './typings';
import { useHistory } from 'react-router';
const CardImages: FC<CardImagesType> = (props) => {
  const locale = useLocale();
  const history = useHistory();
  const {
    id,
    image,
    discord_name,
    guild_id,
    discord_icon,
    approximate_member_count,
    approximate_presence_count,
    visitH,
    nu24H,
    rateD,
    newUserH,
  } = props?.info;

  return (
    <div>
      <Card
        className={styles.disCard}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className="flex mt24 ml16 align-center">
          <Avatar className={styles.Avatar}>
            <img
              alt="avatar"
              src={
                image
                  ? image
                  : `https://cdn.discordapp.com/icons/${guild_id}/${discord_icon}.webp`
              }
            />
          </Avatar>
          <div className={styles.discord_name}>{discord_name}</div>
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            marginLeft: '16px',
            gap: '2px',
          }}
        >
          <Card
            className={styles.downCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.option}>{approximate_member_count}</div>
            <div className={styles.score}>{locale('home.Follower')}</div>
          </Card>
          <Card
            className={styles.downCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.option}>{approximate_presence_count}</div>
            <div className={styles.score}>{locale('home.Online')}</div>
          </Card>
          <Card
            className={styles.downCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.option}>
              {' '}
              {Number(rateD) > 0 ? Number(rateD).toFixed(2) + '%' : rateD}
            </div>
            <div className={styles.score}>{locale('home.rateD')}</div>
          </Card>
          <Card
            className={styles.downCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.option}>{newUserH}</div>
            <div className={styles.score}>{locale('home.newUserH')} </div>
          </Card>
        </div>
        <div className={styles.coverBlue}>
          <div
            className="flex cursor-pointer align-center"
            onClick={() => {
              history.push('/discord', { id });
            }}
          >
            <div>
              <img src="/svg/discord.svg" alt="" className={styles.img} />
            </div>
            <span>{locale('global.Discord')}</span>
          </div>
          <div className={styles.divider}>
            <Divider type="vertical" style={{ height: '12px' }} />
          </div>

          <div
            className="flex cursor-pointer"
            onClick={() => {
              history.push('/Marketing', { id });
            }}
          >
            <div>
              <img src="/svg/marketing.svg" alt="" className={styles.img1} />
            </div>
            <span>{locale('global.Marketing')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardImages;
