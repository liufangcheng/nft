/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Tabs,
  Table,
  TableColumnProps,
  Message,
} from '@arco-design/web-react';
import styles from './index.module.less';
import { getUserApi } from '@/services';
import dayjs from 'dayjs';
const pageNumber = {
  page: 1,
  pageSize: 5,
};
function invitationCode() {
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const loadMore = async () => {
    if (total === list.length) {
      Message.warning({
        content: 'no more data',
        className: 'messageWarn',
      });
      return;
    }

    pageNumber.page++;
    initData();
  };
  const initData = async () => {
    const { data } = await getUserApi.getInvitationRecord(pageNumber);
    setTotal(data.total);
    setList((oldArray) => {
      return [...oldArray, ...data.rows];
    });
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          padding: '24px 24px 16px 24px',
          boxSizing: 'border-box',
          borderRadius: '0 0 8px 8px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>
          Invitation record ( 5 / {total} )
        </div>
        <div className="mt24">
          {list.map((item, index) => {
            return (
              <div key={index} className={styles.list}>
                <div className="flex">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item?.avatar ? item?.avatar : '/images/10.png'}
                      alt=""
                      className="w100 h100"
                    />
                  </div>
                  <div style={{ marginLeft: '12px' }}>
                    <div className={styles.username}>
                      {item?.name ? item?.name : item?.email}
                    </div>
                    <div className={styles.time}>
                      {dayjs(item?.update_time).format('YYYY-MM-DD hh:mm:ss')}
                    </div>
                  </div>
                </div>
                <div className={styles.score}>+ {item.score} space</div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card
        style={{
          width: '416px',
          height: '40px',
          borderRadius: '0 0 8px  8px',
          marginTop: '1px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div
          style={{ textAlign: 'center', lineHeight: '40px' }}
          onClick={loadMore}
        >
          Load more
        </div>
      </Card>
    </div>
  );
}

export default invitationCode;
