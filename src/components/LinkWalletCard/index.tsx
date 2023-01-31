import React, { useState } from 'react';
import { Card, Button } from '@arco-design/web-react';

function CardImages(props: FooterProps = {}) {
  return (
    <div>
      <Card
        style={{
          width: '384px',
          height: '358px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 500,
            textAlign: 'center',
            marginTop: '64px',
          }}
        >
          Connect your wallet
        </div>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: 'auto',
            marginTop: '40px',
            backgroundColor: 'red',
          }}
        ></div>
        <div
          style={{
            width: '100%',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 400,
            textAlign: 'center',
            marginTop: '8px',
          }}
        >
          Mata Mask
        </div>
        <div
          style={{
            width: '320px',
            height: '48px',
            margin: 'auto',
            borderRadius: '8px',
            marginTop: '40px',
          }}
        >
          <Button
            style={{
              width: '320px',
              height: '48px',
              background: '#2D67D5',
              borderRadius: '8px',
            }}
          >
            Connect
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CardImages;
