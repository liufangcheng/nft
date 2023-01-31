import React, { FC, useState, useRef, useEffect } from 'react';
import { Calendar, Empty } from '@arco-design/web-react';
import DropCard from '@/components/DropsCard';
import styles from './index.module.less';
import dayjs from 'dayjs';
import { useLocale } from '@/utils/hooks';
import InfoCalendar from '@/components/InfoCalendar';
import { getDiscordApi } from '@/services';
const NftCalendar: FC = () => {
  const locale = useLocale();
  const [total, setTotal] = useState(0);
  const [sourceData, setSourceData] = useState([]);
  const [dateTime, setDateTime] = useState({
    startTimestamp: dayjs(
      dayjs().format('YYYY-MM-DD') + ' ' + '00:00:00'
    ).unix(),
    endTimestamp: dayjs(dayjs().format('YYYY-MM-DD') + ' ' + '23:59:59').unix(),
  });
  const Homestyle = {
    width: '218px',
    height: '354px',
    borderRadius: '8px',
    overflow: 'hidden',
  };
  const init = async (Time = dateTime) => {
    const { data } = await getDiscordApi.getNftCalendar({
      page: 1,
      pageSize: 300,
      ...Time,
    });
    setTotal(data.total);
    setSourceData(data.rows);
  };
  const onChangeCalendar = (data: string) => {
    init({
      startTimestamp: dayjs(data + ' ' + '00:00:00').unix(),
      endTimestamp: dayjs(data + ' ' + '23:59:59').unix(),
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="plr">
      <div className="flex justify-between">
        <div className={styles.homeTitle}>{locale(['dms.NFT.Calendar'])}</div>
      </div>
      <div
        style={{
          width: '100%',
          height: '156px',
          marginTop: '24px',
          marginBottom: '24px',
        }}
      >
        <InfoCalendar onChangeCalendar={onChangeCalendar}></InfoCalendar>
      </div>
      <div className={styles.drops}>
        {total} {locale(['dms.drops'])}{' '}
      </div>
      {total ? (
        <div
          className="mt24 flex w100 flex-wrap "
          style={{ rowGap: '24px', columnGap: '16px' }}
        >
          {sourceData.map((item, index) => {
            return (
              <DropCard
                key={index}
                sonData={item}
                cardStyle={Homestyle}
                iconsDisable={true}
              ></DropCard>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <Empty />
        </div>
      )}
    </div>
  );
};
export default NftCalendar;
