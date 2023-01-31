/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from 'react';
import { Card, Tabs, Table, TableColumnProps } from '@arco-design/web-react';
import styles from './index.module.less';
import { getDiscordApi } from '@/services';
type InfoType = {
  maximum: number;
  unlockTimes: string;
  useTimes: string;
};
function MyDiscordSpaces() {
  const [info, setInfo] = useState<InfoType>();
  const [progressRatio, setProgressRatio] = useState([
    {
      width: '10%',
      backgroundColor: '#FF3838',
      height: '16px',
    },
    {
      width: '69%',
      backgroundColor: '#12FF63',
      height: '16px',
    },
  ]);
  const spaceData = async () => {
    const { data } = await getDiscordApi.getDiscordStatus();
    setInfo(data);
    const arr1 = data?.useTimes;
    const arr2 = Number(data?.unlockTimes) - Number(data?.useTimes);
    const newRatio = [
      {
        width: `${arr1}%`,
        backgroundColor: '#FF3838',
        height: '16px',
      },
      {
        width: `${arr2}%`,
        backgroundColor: '#12FF63',
        height: '16px',
      },
    ];
    setProgressRatio(newRatio);
  };
  useEffect(() => {
    spaceData();
  }, []);

  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          height: '190px',
          boxSizing: 'border-box',
          padding: '24px',
          borderRadius: '0',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>My discord spaces</div>
        <div className={styles.MyInvitationContent}>
          The maximum space limit for each person is 100
        </div>
        <div className={styles.schedule}>
          {progressRatio.map((item) => {
            const styles = {
              width: item.width,
              backgroundColor: item.backgroundColor,
              height: item.height,
            };
            return <div key={item.width} style={styles}></div>;
          })}
        </div>
        <div className={styles.scheduleTitle}>
          <div>
            Used {info?.useTimes} / {info?.unlockTimes}
          </div>
          <div>{info?.maximum - Number(info?.unlockTimes)} To be unlocked</div>
        </div>
      </Card>
    </div>
  );
}

export default MyDiscordSpaces;
