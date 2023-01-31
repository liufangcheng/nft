import React, { FC } from 'react';
import { IconProps } from '@arco-design/web-react/icon';
import * as Icon from '@arco-design/web-react/icon';

const AllIcon: FC<{
  name: string,
  iconProps?: IconProps
}> = (props) => {
  const {
    name,
    iconProps
  } = props
  const IconCom = Icon[name];
  if(IconCom) {
    return <IconCom {...iconProps} />
  } else {
    return <></>
  }
};

export default AllIcon