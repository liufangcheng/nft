import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Table,
  TableColumnProps,
  Modal,
} from '@arco-design/web-react';
import styles from './index.module.less';
import { connetTwitterRef } from './types';
import { twitterApi } from '@/services';
import { myLocalStorage } from '@/utils';
import { useHistory } from 'react-router';
import { useLocale, useMyStore } from '@/utils/hooks';
function ConnetTwitter(props, ref) {
  const locale = useLocale();
  const [bindVisible, setBindVisible] = useState(false);
  const history = useHistory();
  const { state, dispatch } = useMyStore();
  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          height: '198px',
          boxSizing: 'border-box',
          padding: '24px',
          borderRadius: '8px 8px 0 0',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>
          {locale('personalCenter.Connect.to.your.wallet')}
        </div>
        <div className={styles.MyInvitationContent}>
          <div>{locale('personalCenter.Please.connect')} </div>
          <div>{locale('personalCenter.will.get')}</div>
        </div>
        <Card
          className={styles.MyInvitationButton}
          bodyStyle={{ padding: 0 }}
          bordered={false}
          onClick={() => {
            setBindVisible(true);
          }}
        >
          {locale('personalCenter.Connect.to.your.wallet')}
        </Card>
      </Card>
      <Modal
        visible={bindVisible}
        className={styles.modalBind}
        closable={false}
        footer={null}
      >
        <div>
          <div
            style={{ textAlign: 'right' }}
            onClick={() => setBindVisible(false)}
          >
            <img src="/svg/关闭.svg" alt="" />
          </div>

          <div
            className={`${styles.disconnectText} ${styles.disconnectMargin}`}
          >
            Are you sure you want to{' '}
          </div>
          <div className={styles.disconnectText}>bind twitter </div>

          <div className="flex" style={{ marginTop: '50px', gap: '16px' }}>
            <div
              className={styles.yes}
              onClick={async () => {
                const { data } = await twitterApi.twitterAuth();
                myLocalStorage.setValue('tokenSecret', data.tokenSecret);
                dispatch({
                  type: 'update-tokenSecret',
                  payload: {
                    tokenSecret: data.tokenSecret,
                  },
                });
                window.open(data.url);
              }}
            >
              Yes
            </div>
            <div className={styles.no} onClick={() => setBindVisible(false)}>
              No
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConnetTwitter;
