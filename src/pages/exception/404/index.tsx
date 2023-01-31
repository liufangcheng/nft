import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import locale from './locale';
import { useLocale } from '@/utils/hooks';
import styles from './style/index.module.less';

function Exception404() {
  const t = useLocale(locale);

  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="404"
        subTitle={t('exception.result.404.description')}
      />
    </div>
  );
}

export default Exception404;
