import React, { useState } from 'react';
import { Card } from '@arco-design/web-react';

function CardImages() {
  return (
    <div>
      <Card
        style={{
          width: '372px',
          height: '552px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: 'auto',
            marginTop: '48px',
            backgroundColor: 'red',
          }}
        ></div>
        <div
          style={{
            width: '100%',
            fontSize: '18px',
            lineHeight: '22px',
            fontWeight: 500,
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          THE BORED APE YACHT CLUB
        </div>

        <div
          style={{
            width: '308px',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 500,
            margin: 'auto',
            marginTop: '16px',
          }}
        >
          A limited NFT collection where the token itself doubles as your
          membership to a swamp club for apes. The club is open! Ape in with us.
        </div>
        <div
          style={{
            width: '320px',
            margin: 'auto',
            marginTop: '40px',
            display: 'flex',

            flexFlow: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Card
            style={{
              width: '100px',
              height: '58px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
            >
              24.56K
            </div>
            <div
              style={{ textAlign: 'center', fontWeight: 500, fontSize: '12px' }}
            >
              Follower
            </div>
          </Card>
          <Card
            style={{
              width: '100px',
              height: '58px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
            >
              24.56K
            </div>
            <div
              style={{ textAlign: 'center', fontWeight: 500, fontSize: '12px' }}
            >
              Follower
            </div>
          </Card>
          <Card
            style={{
              width: '100px',
              height: '58px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
            >
              24.56K
            </div>
            <div
              style={{ textAlign: 'center', fontWeight: 500, fontSize: '12px' }}
            >
              Follower
            </div>
          </Card>
          <Card
            style={{
              width: '100px',
              height: '58px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
            >
              24.56K
            </div>
            <div
              style={{ textAlign: 'center', fontWeight: 500, fontSize: '12px' }}
            >
              Follower
            </div>
          </Card>
          <Card
            style={{
              width: '210px',
              height: '58px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
            >
              24.56K
            </div>
            <div
              style={{ textAlign: 'center', fontWeight: 500, fontSize: '12px' }}
            >
              Follower
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default CardImages;
