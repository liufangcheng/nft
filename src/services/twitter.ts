import { request } from './base';

export const twitterApi = {
  cancelTwitterBind: request({
    url: 'cancelTwitterBind',
    method: 'POST',
  }),
  twitterAuth: request({
    url: 'twitter/auth',
    method: 'GET',
  }),
  bindTwitter: request({
    url: '/twitter/auth/bindUser',
    method: 'POST',
  }),
};
