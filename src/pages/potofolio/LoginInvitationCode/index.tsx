import React, { useState, useRef } from 'react';
import { Card, Tabs, Table, TableColumnProps } from '@arco-design/web-react';
import styles from './index.module.less';
import { useLocale } from '@/utils/hooks';

function LoginInvitationCode() {
  const locale = useLocale();
  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          height: '198px',
          boxSizing: 'border-box',
          padding: '24px',
          borderRadius: '0 0 8px 8px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>
          {' '}
          {locale('personalCenter.My.invitation.code')}
        </div>
        <div className={styles.MyInvitationContent}>
          {locale('personalCenter.My.invitation.code.Details')}
        </div>
        <Card
          className={styles.MyInvitationCode}
          bodyStyle={{ padding: 0 }}
          bordered={false}
        >
          {locale('personalCenter.code.to.view')}
        </Card>
      </Card>
    </div>
  );
}

export default LoginInvitationCode;
