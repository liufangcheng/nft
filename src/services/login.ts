import { request } from './base';

export const authLoginApi = {
  authLogin: request({
    url: 'authLogin',
    method: 'POST',
  }),
  sendEmailCode: request({
    url: 'sendEmailCode',
    method: 'POST',
  }),
};
