import React, { useState, useRef } from 'react';
import { Card } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
function NameCard() {
  const listRef = useRef();
  const [nameData, setNameData] = useState([
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
    {
      src: '/images/5.png',
      name: 'Name',
    },
  ]);
  return (
    <div>
      <Card
        style={{
          width: '320px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: '16px 0' }}>
          {nameData.map((item, index) => {
            return (
              <div key={index} className="leftList" ref={listRef}>
                <div className="flex align-center">
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      marginLeft: '24px',
                    }}
                  >
                    <img src={item.src} alt="" className="h100 w100" />
                  </div>
                  <div
                    style={{
                      marginLeft: '8px',
                      fontFamily: 'Noto Sans SC',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    {item.name}
                  </div>
                </div>
                <div className="iconClose">
                  <IconClose />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default NameCard;
