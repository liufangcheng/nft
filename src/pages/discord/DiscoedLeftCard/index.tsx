import React, { FC, useEffect, useState } from 'react';
import { Card } from '@arco-design/web-react';
import { useLocale } from '@/utils/hooks';
import { CardType } from '../type.d';
import styles from './index.module.less';
const DiscoedLeftCard: FC<CardType> = ({ info }) => {
  const locale = useLocale();
  return (
    <div>
      <Card
        style={{
          width: '372px',
          paddingBottom: '32px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: 'auto',
            marginTop: '48px',

            overflow: 'hidden',
          }}
        >
          <img
            className="h100 w100"
            src={
              info?.image
                ? info?.image
                : `https://cdn.discordapp.com/icons/${info?.guild_id}/${info?.discord_icon}.webp`
            }
            alt=""
          />
        </div>

        <div style={{}} className={styles.title}>
          {info?.discord_name}
        </div>

        <div className={styles.description}>{info?.discord_description}</div>
        <div
          style={{
            width: '320px',
            margin: 'auto',
            marginTop: '20px',
            display: 'flex',
            flexFlow: 'wrap',
            gap: '8px',
          }}
        >
          <Card
            className={styles.blackCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.price}>{info?.approximate_member_count}</div>
            <div className={styles.option}>Follower</div>
          </Card>
          <Card
            className={styles.blackCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.price}>
              {info?.approximate_presence_count}
            </div>
            <div className={styles.option}>Online</div>
          </Card>

          <Card
            className={styles.blackCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.price}>{info?.newUserH}</div>
            <div className={styles.option}>New User/24h</div>
          </Card>
          <Card
            className={styles.blackCard}
            bodyStyle={{ padding: 0 }}
            bordered={false}
          >
            <div className={styles.price}>{info?.rateD}</div>
            <div className={styles.option}>Retention Rate/d</div>
          </Card>
        </div>
        <div
          className="flex justify-between"
          style={{
            width: '320px',
            height: '40px',
            margin: 'auto',
            marginTop: '28px',
          }}
        >
          <Card
            style={{
              width: '320px',
              height: '100%',
              background: '#232528',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
            }}
            className="flex flex-center"
            bodyStyle={{ padding: 0 }}
            bordered={false}
            onClick={() => {
              if (info?.website_url) {
                window.open(info?.website_url);
              }
            }}
          >
            <div className="flex flex-center">
              <div style={{ marginTop: '5px' }}>
                <img
                  src="/svg/home.svg"
                  alt=""
                  style={{ width: '18px', height: '18px' }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'Noto Sans SC',
                  fontWeight: 500,
                  fontSize: '14px',
                  paddingLeft: '8px',
                }}
              >
                {locale('discord.Website')}
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default DiscoedLeftCard;
