import React, { useState, useRef, FC } from 'react';
import { Card, Tabs, Table, TableColumnProps } from '@arco-design/web-react';
import styles from './index.module.less';
import { useLocale } from '@/utils/hooks';
type CodeType = {
  invitation_code: string;
};
const InvitationCode: FC<CodeType> = ({ invitation_code }) => {
  const locale = useLocale();
  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          height: '258px',
          boxSizing: 'border-box',
          padding: '24px',
          borderRadius: '0px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>
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
          {invitation_code}
        </Card>
        <Card
          className={styles.MyInvitationButton}
          bodyStyle={{ padding: 0 }}
          bordered={false}
        >
          Invite now
        </Card>
      </Card>
    </div>
  );
};

export default InvitationCode;
