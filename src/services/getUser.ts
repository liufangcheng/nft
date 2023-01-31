import { request } from './base';

export const getUserApi = {
  getUser: request({
    url: 'user',
    method: 'GET',
  }),
  // 获取邀请记录
  getInvitationRecord: (data) => {
    return request({
      url: `getInvitationRecord?page=${data.page}&pageSize=${data.pageSize}`,
      method: 'GET',
    })();
  },
  changeEmail: request({
    url: 'changeEmail',
    method: 'POST',
  }),
  getNFT: (data) => {
    return request({
      url: `getNFT?address=${data.address}`,
      method: 'GET',
    })();
  },
};
