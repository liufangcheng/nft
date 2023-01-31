import { request } from './base';

export const getDiscordApi = {
  getDiscord: (data) => {
    return request({
      url: `getDiscord?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&blockchain=${data.blockchain}&follower=${data.follower}`,
      method: 'GET',
    })();
  },
  getNftCalendar: (data) => {
    return request({
      url: `getNftCalendar?page=${data.page}&pageSize=${data.pageSize}&startTimestamp=${data.startTimestamp}&endTimestamp=${data.endTimestamp}`,
      method: 'GET',
    })();
  },
  getDiscordDetails: (data) => {
    return request({
      url: `getDiscordDetails?discordProjectId=${data.discordProjectId}`,
      method: 'GET',
    })();
  },
  getAllChannelMessage: (data) => {
    return request({
      url: `getAllChannelMessage?page=${data.page}&pageSize=${data.pageSize}`,
      method: 'GET',
    })();
  },
  getChannel: (data) => {
    return request({
      url: `getChannel?page=${data.page}&pageSize=${data.pageSize}&discordProjectId=${data.discordProjectId}`,
      method: 'GET',
    })();
  },
  getChannelMessage: (data) => {
    return request({
      url: `getChannelMessage?page=${data.page}&pageSize=${data.pageSize}&channelId=${data.channelId}`,
      method: 'GET',
    })();
  },
  getDiscordStatus: request({
    url: 'getDiscordStatus',
    method: 'GET',
  }),
  getFeatureNft: (data) => {
    return request({
      url: `getFeatureNft?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&blockchain=${data.blockchain}`,
      method: 'GET',
    })();
  },
  getFeatureNftDetails: (data) => {
    return request({
      url: `getFeatureNftDetails?contractAddress=${data.contractAddress}&discordProjectId=${data.discordProjectId}`,
      method: 'GET',
    })();
  },
  getFloorPrice: (data) => {
    return request({
      url: `getFloorPrice?page=${data.page}&pageSize=${data.pageSize}&contractAddress=${data.contractAddress}&discordProjectId=${data.discordProjectId}`,
      method: 'GET',
    })();
  },
  getDiscordProjectFollower: (data) => {
    return request({
      url: `getDiscordProjectFollower?page=${data.page}&pageSize=${data.pageSize}&discordProjectId=${data.discordProjectId}`,
      method: 'GET',
    })();
  },
};
