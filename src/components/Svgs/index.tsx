import React, { FC } from 'react';
import { vars } from './vars';

type Types = keyof typeof vars;

const Svgs: FC<{
  type: Types;
  style?: React.CSSProperties;
}> = (props) => {
  const { style = {} } = props;
  const styleSheet: React.CSSProperties = {
    ...{ width: 14, height: 14 },
    ...style,
  };
  return (
    <>
      <span>{vars[props.type](styleSheet)}</span>;
    </>
  );
};
export default Svgs;
