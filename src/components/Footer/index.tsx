import React from 'react';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from 'classnames';
import styles from './style/index.module.less';
import { useLocale } from '@/utils/hooks';

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  const locale = useLocale();
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      {/* {locale('global.footer')} */}
    </Layout.Footer>
  );
}

export default Footer;
