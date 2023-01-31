import React, { FC } from 'react';
import TrendDiscord from './TrendDiscord';
import FeatureNFT from './FeatureNFT';
import Calendar from './Calendar';

import './styles/index.less';
const Home: FC = () => {
  return (
    <div className="plr">
      <div className="mt32">
        <TrendDiscord></TrendDiscord>
      </div>
      <div className="mt64">
        <FeatureNFT></FeatureNFT>
      </div>
      <div className="mt64">
        <Calendar></Calendar>
      </div>
    </div>
  );
};
export default Home;
