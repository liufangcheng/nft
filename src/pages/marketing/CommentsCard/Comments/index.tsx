import React, { useState, useRef } from 'react';
import {
  Card,
  Input,
  Button,
  Comment,
  Avatar,
  Divider,
  Message,
} from '@arco-design/web-react';
import {
  IconMessage,
  IconThumbUp,
  IconDown,
  IconUp,
} from '@arco-design/web-react/icon';
import styles from '../index.module.less';
import { commentsApi } from '@/services/comment';
import CommentsModal from '../CommentsModal';
import { DetailDrawerRef } from '../CommentsModal/typings';

function Comments(props) {
  const { info, level, refreshData, ModalSuccess } = props;
  const [visible, setVisible] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const modalRef = useRef<DetailDrawerRef>();

  const marginLevel = () => {
    if (level === 1) {
      return {
        marginTop: '24px',
      };
    } else if (level === 2) {
      return {
        marginTop: '24px',
        marginLeft: '50px',
      };
    } else if (level === 3) {
      return {
        marginTop: '24px',
        marginLeft: '90px',
      };
    }
  };

  return (
    <>
      <div style={marginLevel()}>
        <Comment
          actions={
            <div className="flex">
              <div
                className={styles.iconStyle}
                onClick={async () => {
                  console.log(info);
                  try {
                    await commentsApi.likeComment({
                      comment_id: info.id,
                      user_id: info.user_id,
                    });
                    Message.success({
                      content: 'Liked successfully',
                      className: 'message',
                    });
                    refreshData();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <div style={{ marginRight: '6.5px' }}>
                  <IconThumbUp />
                </div>
                <div>{info.like_quantity}</div>
              </div>
              {level < 3 && (
                <div
                  className={styles.iconStyle}
                  onClick={() => {
                    // const res = ModalSuccess();
                    // console.log(res);
                    modalRef.current.init(info);
                  }}
                >
                  <div style={{ marginRight: '6.5px' }}>
                    <IconMessage />
                  </div>
                  <div>Reply</div>
                </div>
              )}
            </div>
          }
          avatar={
            <img
              src="/images/12.png"
              alt=""
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
              }}
            />
          }
          author={
            <div className="flex">
              <div className={styles.commentName}>
                {info?.name ? info?.name : info?.email}
              </div>
              <div className={styles.commentDate}>{info.update_time}</div>
            </div>
          }
          content={<div className={styles.commentCenter}>{info?.content}</div>}
        ></Comment>
      </div>

      {info?.comments && (
        <div onClick={() => setVisible(!visible)}>
          <div
            className="flex"
            style={{ marginLeft: '60px', marginTop: '20px' }}
          >
            <div className="flex" style={{ alignItems: 'center' }}>
              <div className={styles.divider}></div>
              {visible ? (
                <div className="flex">
                  <div>Hide {info?.comments?.length}replies</div>
                  <div style={{ marginLeft: '15px' }}>
                    <IconUp />
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div>View {info?.comments?.length}replies</div>
                  <div style={{ marginLeft: '15px' }}>
                    <IconDown />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {visible ? props?.commentsTree : <div></div>}
      <CommentsModal ref={modalRef}></CommentsModal>
    </>
  );
}
export default Comments;
