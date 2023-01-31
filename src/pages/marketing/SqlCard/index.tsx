import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Card } from '@arco-design/web-react';
import styles from './index.module.less';
import { SqlCardType } from '../typing';
// 引入echarts
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent,
]);
type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

const SqlCard: FC<SqlCardType> = ({ charts, nftInfo }) => {
  const [dataNav, setDataNav] = useState([]);
  const chartRef = useRef();
  const handleData: () => {
    xData: string[];
    yData: string[];
  } = () => {
    const xData: string[] = [];
    const yData: string[] = [];
    charts.map((item) => {
      xData.push(item.times);
      yData.push(item.price);
    });
    return {
      xData,
      yData,
    };
  };
  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      show: true,
    },
    // x轴
    xAxis: {
      type: 'category',
      data: handleData()?.xData,
      boundaryGap: false,
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    // y轴
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
        },
      },
    },
    series: [
      {
        name: '',
        data: handleData()?.yData,
        type: 'line',
        smooth: true,
        // showSymbol: lineData?.lineObj?.xData.length > 1 ? false : true,
      },
    ],
  };
  const init = () => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(options);
    return () => {
      chart.dispose();
    };
  };

  useEffect(() => {
    setDataNav([
      {
        score: nftInfo?.market_cap,
        option: 'Market Cap',
      },
      {
        score: nftInfo?.floor_price,
        option: 'Floor',
      },
      {
        score: nftInfo?.total_volume,
        option: 'Volume',
      },
      {
        score: nftInfo?.last_sold ? Number(nftInfo?.last_sold) : 0,
        option: 'Last Sold',
      },
      {
        score: nftInfo?.listed ? nftInfo?.listed : nftInfo?.total_supply,
        option: 'Listed/ Supply',
      },
      {
        score: nftInfo?.num_owners,
        option: 'Holders',
      },
    ]);
  }, [nftInfo]);
  useEffect(() => {
    init();
  }, [charts]);

  return (
    <div>
      <div
        style={{
          minWidth: '750px',
          height: '850px',
          borderRadius: '8px 8px 0 0',
          padding: 5,
        }}
        className="bg-fill-1"
      >
        <div style={{ height: '100%' }}>
          {nftInfo && (
            <div className={styles.nav}>
              <div className={styles.image}>
                {nftInfo?.image ? (
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={nftInfo?.image}
                    alt=""
                  />
                ) : (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 112 112"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.2">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0ZM8.61539 56C8.61539 82.1698 29.8302 103.385 56 103.385C82.1698 103.385 103.385 82.1698 103.385 56C103.385 29.8302 82.1698 8.61539 56 8.61539C29.8302 8.61539 8.61539 29.8302 8.61539 56Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.3846 43.0769C47.3846 47.8351 51.2419 51.6923 56 51.6923C60.7581 51.6923 64.6154 47.8351 64.6154 43.0769C64.6154 38.3188 60.7581 34.4615 56 34.4615C51.2419 34.4615 47.3846 38.3188 47.3846 43.0769ZM56 25.8462C46.4837 25.8462 38.7692 33.5606 38.7692 43.0769C38.7692 52.5932 46.4837 60.3077 56 60.3077C65.5163 60.3077 73.2308 52.5932 73.2308 43.0769C73.2308 33.5606 65.5163 25.8462 56 25.8462Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M88.525 90.4599C80.0317 98.4811 68.59 103.385 56 103.385C43.4117 103.385 31.9715 98.4825 23.4784 90.4632C31.9718 82.442 43.4135 77.5385 56.0035 77.5385C68.5918 77.5385 80.032 82.4406 88.525 90.4599ZM56 112C73.9324 112 89.8962 103.571 100.146 90.4593C89.896 77.35 73.9339 68.9231 56.0035 68.9231C38.0711 68.9231 22.1073 77.3519 11.8579 90.4638C22.1075 103.573 38.0696 112 56 112Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                )}
              </div>
              <div style={{ marginLeft: '13px' }}>
                <div className={styles.name}>{nftInfo?.name}</div>
              </div>
              <div style={{ display: 'flex', marginLeft: '64px', gap: '8px' }}>
                {dataNav.map((item, index) => {
                  return (
                    <Card
                      style={{
                        borderRadius: '4px',
                        padding: '8px 12px',
                        background: '#1C1E22',
                      }}
                      bodyStyle={{ padding: 0 }}
                      bordered={false}
                      key={index}
                    >
                      <div
                        style={{
                          textAlign: 'center',
                          fontWeight: 700,
                          fontSize: '14px',
                          lineHeight: '22px',
                        }}
                      >
                        {item?.score}
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontWeight: 500,
                          fontSize: '12px',
                          lineHeight: '20px',
                          color: 'rgba(255, 255, 255, 0.35)',
                        }}
                      >
                        {item?.option}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          <div
            ref={chartRef}
            style={{ width: '100%', minHeight: '776px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SqlCard;
