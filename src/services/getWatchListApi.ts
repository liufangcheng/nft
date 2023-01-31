import { request } from './base';

export const getWatchListApi = {
  getWatchList: (data) => {
    return request({
      url: `getWatchList?page=${data.page}&pageSize=${data.pageSize}`,
      method: 'GET',
    })();
  },
  setWatchList: request({
    url: 'setWatchList',
    method: 'POST',
  }),
};
