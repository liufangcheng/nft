import React, { useState } from 'react';
import { Card, Table, TableColumnProps } from '@arco-design/web-react';
import styles from './index.module.less';
function TopMovers() {
  const columns: TableColumnProps[] = [
    {
      title: 'Collection',
      dataIndex: 'Collection',
      sorter: true,
    },
    {
      title: 'Floor Price',
      dataIndex: 'FloorPrice',

      sorter: true,
    },
    {
      title: 'Change',
      dataIndex: 'Change',
      sorter: true,
    },
  ];
  const [data, setData] = useState([
    {
      key: '1',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '2',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '3',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '4',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '5',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '6',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '7',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '8',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '9',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
    {
      key: '10',
      Collection: 'Communi3: Labs',
      FloorPrice: 4000,
      Change: '+ 9.13 %',
    },
  ]);
  const loadMore = () => {
    const moreData = data.concat(JSON.parse(JSON.stringify(data)));
    setData(moreData);
  };
  return (
    <div>
      <Card
        style={{
          width: '400px',
          borderRadius: '8px ',
          overflow: 'hidden',
          marginTop: '4px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className={styles.fontCommon}>Top Movers</div>
        <div className={styles.cover}> </div>
        <div className={styles.delTable}>
          <Table
            columns={columns}
            data={data}
            border={false}
            borderCell={false}
            stripe={false}
            pagination={false}
          />
        </div>
      </Card>
      <Card
        style={{
          width: '400px',
          height: '40px',
          borderRadius: '0 0 8px  8px',
          marginTop: '1px',
        }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div
          style={{ textAlign: 'center', lineHeight: '40px' }}
          onClick={loadMore}
        >
          Load more
        </div>
      </Card>
    </div>
  );
}

export default TopMovers;
