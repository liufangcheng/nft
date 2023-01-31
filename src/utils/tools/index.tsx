
import * as Icon from '@arco-design/web-react/icon';
import React from 'react';
import { IconProps } from '@arco-design/web-react/icon';


export * from './download';
export * from './localStorage';


export const getIcon = (
  name: string,
  config?: {
    iconProps: IconProps
  }
) => {
  const IconCom = Icon[name];
  if (IconCom) {
    return <IconCom {...config?.iconProps} />;
  }
};