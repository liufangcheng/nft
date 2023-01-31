import React, { FC } from 'react';
import { Card, Divider } from '@arco-design/web-react';
import { IconGitlab } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import { useLocale } from '@/utils/hooks/useLocale';
import { DropsCardType } from './typing';

const DropCard: FC<DropsCardType> = (props) => {
  const locale = useLocale();
  const { cardStyle, iconsDisable, sonData } = props;
  const { collection_name, image, sale_price, content, name } = sonData;

  return (
    <div>
      <Card
        className={styles.marTop}
        style={cardStyle}
        bodyStyle={{ padding: 0 }}
        bordered={false}
        cover={
          <div
            style={{ width: '100%', height: '234px', overflow: 'hidden' }}
            className="cursor-pointer"
          >
            <img
              style={{ width: '100%', height: '100%' }}
              alt="dessert"
              src={image}
            />
          </div>
        }
        onClick={() => {
          if (props.sonData.website_url) {
            window.open(props.sonData.website_url);
          }
        }}
      >
        <div className={styles.title}>
          {iconsDisable ? collection_name : name}
        </div>
        {content && <div className={styles.content}>{content}</div>}
        {iconsDisable && (
          <div className={styles.price}>
            <img src="/svg/ethLeft.svg" alt="" />
            <span style={{ paddingLeft: '4px' }}>{sale_price}</span>
          </div>
        )}
        {iconsDisable && (
          <div className={styles.iconsDisable}>
            <div
              className="flex cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (props.sonData.discord_url) {
                  window.open(props.sonData.discord_url);
                }
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <img
                  src="/svg/discord.svg"
                  alt=""
                  style={{ width: '18px', height: '18px', marginTop: '2px' }}
                />
              </div>

              <div style={{ marginLeft: '6px' }} className={styles.colorChange}>
                {locale('global.Discord')}
              </div>
            </div>
            <Divider
              type="vertical"
              style={{ height: '12px', color: 'rgba(255, 255, 255, 0.08)' }}
            />
            <div
              className="flex cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (props.sonData.twitter_handle) {
                  window.open(
                    `https://twitter.com/${props.sonData.twitter_handle}`
                  );
                }
              }}
            >
              <div>
                <img
                  src="/svg/推特.svg"
                  alt=""
                  style={{ width: '18px', height: '18px', marginTop: '2px' }}
                />
              </div>

              <div style={{ marginLeft: '6px' }} className={styles.colorChange}>
                {locale('global.Twitter')}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DropCard;
