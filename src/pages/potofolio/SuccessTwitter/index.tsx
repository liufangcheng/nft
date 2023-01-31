import React, { useState, useRef } from 'react';
import { Card, Tabs, Table, TableColumnProps } from '@arco-design/web-react';
import styles from './index.module.less';

function SuccessTwitter() {
  return (
    <div>
      <Card
        style={{
          minWidth: '416px',
          height: '176px',
          boxSizing: 'border-box',
          padding: '24px',
          borderRadius: '8px 8px 0 0',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.MyInvitationTitle}>Connect your twitter</div>
        <div className={styles.MyInvitationContent}>
          You have already got 5 additional spaces !
        </div>
        <Card
          className={styles.MyInvitationButton}
          bodyStyle={{ padding: 0 }}
          bordered={false}
        >
          Successfully connected to twitter !
        </Card>
      </Card>
    </div>
  );
}

export default SuccessTwitter;
