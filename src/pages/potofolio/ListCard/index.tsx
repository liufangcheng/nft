import React, { useState, useRef, useEffect } from 'react';
import { Card, Table, TableColumnProps } from '@arco-design/web-react';

import styles from './index.module.less';
import DropCard from '@/components/DropsCard';
import { DataColumnsInterface } from '@/components/TableList/types';
import { getUserApi } from '@/services';
import { useLocale } from '@/utils/hooks';

function ListCard(props) {
  const { userInfo } = props;
  const locale = useLocale();
  const Homestyle = {
    width: '218px',
    borderRadius: '8px',
    overflow: 'hidden',
    paddingBottom: '10px',
  };
  const [sourceData, setSourceData] = useState([]);
  const getSourceData = async () => {
    const { data } = await getUserApi.getNFT({
      address: '0x342981b3e9f7705b42302f1cbd66cfe7335cbcee',
    });

    setSourceData(data.rows);
  };
  useEffect(() => {
    if (userInfo) {
      getSourceData();
    }
  }, []);

  return (
    <div>
      <Card
        style={{
          minWidth: '100%',
          borderRadius: '8px',
          backgroundColor: '#1C1E22',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.Collections}>
          {locale('personalCenter.Collections')}
        </div>
        {userInfo ? (
          <div style={{ boxSizing: 'border-box' }}>
            <div
              style={{
                padding: '30px 20px 30px 24px',
                rowGap: '24px',
                columnGap: '14px',
              }}
              className="flex flex-wrap "
            >
              {sourceData.map((item, index) => {
                return (
                  <DropCard
                    key={index}
                    sonData={item}
                    cardStyle={Homestyle}
                    iconsDisable={false}
                  ></DropCard>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.wallet}>
              <img
                src="/svg/灰色钱包.svg"
                alt=""
                style={{
                  width: '80px',
                  height: '80px',
                }}
              />
            </div>
            <div className={styles.title}>
              {' '}
              {locale('personalCenter.Connect.to.your.wallet')}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ListCard;
