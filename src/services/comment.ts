import { request } from './base';

export const commentsApi = {
  getAllCommentsByDiscordId: request({
    url: 'getAllCommentsByDiscordId',
    method: 'POST',
  }),
  getAllCommentsByParentId: request({
    url: 'getAllCommentsByParentId',
    method: 'POST',
  }),
  likeComment: request({
    url: 'likeComment',
    method: 'POST',
  }),
  addComment: request({
    url: 'addComment',
    method: 'POST',
  }),
};
