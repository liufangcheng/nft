import { useState } from 'react';

// 获取用户信息的的hooks
export const useUserInfo = (): [
  {
    user: Record<string, any>;
    roles: Record<string, any>[];
    menus: Record<string, any>[];
  }
] => {
  console.log(JSON.parse(localStorage.getItem('loginParams')) || null);

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('loginParams')) || {
      user: {},
      roles: [],
      menus: [],
    }
  );
  return [userInfo];
};
